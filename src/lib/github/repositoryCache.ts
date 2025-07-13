import { cloneRepository, type CloneOptions } from "./cloneRepository";

interface CacheEntry {
  promise: Promise<string>;
  path?: string;
}

class RepositoryCache {
  private cache = new Map<string, CacheEntry>();

  async getRepository(options: CloneOptions): Promise<string> {
    const key = `${options.repo}:${options.branch || 'master'}`;
    
    // If we already have this repository in progress or cached, return it
    if (this.cache.has(key)) {
      const entry = this.cache.get(key)!;
      return await entry.promise;
    }

    // Start the clone operation and cache the promise
    const promise = cloneRepository(options);
    this.cache.set(key, { promise });

    try {
      const path = await promise;
      // Update cache with the resolved path
      this.cache.set(key, { promise, path });
      return path;
    } catch (error) {
      // Remove failed operations from cache
      this.cache.delete(key);
      throw error;
    }
  }

  clear() {
    this.cache.clear();
  }
}

// Singleton instance
export const repositoryCache = new RepositoryCache();