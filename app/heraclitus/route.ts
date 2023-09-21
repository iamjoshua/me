import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("data:", data);
    const secret = data?.hook?.config?.secret;
    const isValid = secret === process.env.CACHE_SECRET;
    if (isValid) {
      revalidateTag("essays");
      return new Response("Never the same again\n");
    } else {
      console.log("secret was wrong:", secret, process.env.CACHE_SECRET);
    }
  } catch (e: any) {
    console.log("JSON parsing failed", e);
  }

  return new Response("Some things never change\n");
}
