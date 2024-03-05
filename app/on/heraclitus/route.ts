import { handleCacheRevalidation } from "@/lib/cacheTools";

export async function POST(request: Request) {
  console.log("github action");
  console.log(request);

  return await handleCacheRevalidation("essays", request);
}
