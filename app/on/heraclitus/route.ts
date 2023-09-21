import { handleCacheRevalidation } from "@/lib/cacheTools";

export async function POST(request: Request) {
  return await handleCacheRevalidation("essays", request);
}
