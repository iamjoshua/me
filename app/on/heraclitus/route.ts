import { handleCacheRevalidation } from "@/lib/cacheTools";

export async function POST(request: Request) {
  console.log("harry colitus");
  try {
    console.log(request?.body);
  } catch (e) {
    console.log("first failed");
  }
  try {
    const body = await request.json();
    console.log("Parsed body");
    console.log(body);
  } catch (e) {
    console.log("parsing failed");
  }

  return await handleCacheRevalidation("essays", request);
}
