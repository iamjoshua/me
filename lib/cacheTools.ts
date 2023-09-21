import * as crypto from "crypto";
import { revalidateTag } from "next/cache";

const WEBHOOK_SECRET: string = process.env.CACHE_SECRET as string;

export async function handleCacheRevalidation(tag: string, request: Request) {
  if (await verifySignature(request)) {
    revalidateTag(tag);
    return new Response("Never the same again\n");
  } else {
    console.log("secret was wrong:");
  }

  return new Response("Some things never change\n");
}

const verifySignature = async (req: Request) => {
  const body = await req.json();
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest("hex");
  const reqSignature = req.headers.get("x-hub-signature-256") as string;

  const trusted = Buffer.from(`sha256=${signature}`, "ascii");
  const untrusted = Buffer.from(reqSignature, "ascii");

  return crypto.timingSafeEqual(trusted, untrusted);
};
