interface GitHubCommit {
  sha: string;
  commit: {
    committer: {
      date: string;
    };
  };
  files?: Array<{
    filename: string;
  }>;
}

interface FileTimestamps {
  lastEdited: string;
  createdAt: string;
}

export async function getLastEditedTimestamps(
  repo: string,
  directoryPath: string
): Promise<Record<string, FileTimestamps>> {
  const commitsUrl = `https://api.github.com/repos/${repo}/commits?path=${directoryPath}&per_page=100`;
  const response = await fetch(commitsUrl);
  const commits: GitHubCommit[] = await response.json();
  
  const fileTimestamps: Record<string, FileTimestamps> = {};
  
  for (const commit of commits) {
    const commitDate = commit.commit.committer.date;
    
    // Get detailed commit info to see which files were modified
    const detailResponse = await fetch(`https://api.github.com/repos/${repo}/commits/${commit.sha}`);
    const detailCommit = await detailResponse.json();
    
    if (detailCommit.files) {
      for (const file of detailCommit.files) {
        const filename = file.filename.split('/').pop();
        if (filename && filename.endsWith('.md')) {
          if (!fileTimestamps[filename]) {
            // First occurrence is the most recent (lastEdited)
            fileTimestamps[filename] = {
              lastEdited: commitDate,
              createdAt: commitDate
            };
          } else {
            // Later occurrences are older, so update createdAt
            fileTimestamps[filename].createdAt = commitDate;
          }
        }
      }
    }
  }
  
  return fileTimestamps;
}