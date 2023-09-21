import * as crypto from "crypto";
import { revalidateTag } from "next/cache";

const WEBHOOK_SECRET: string = process.env.CACHE_SECRET as string;

export async function POST(request: Request) {
  try {
    const isValid = verifySignature(request);
    if (isValid) {
      const data = await request.json();
      console.log("data:", data);
      revalidateTag("essays");
      return new Response("Never the same again\n");
    } else {
      console.log("secret was wrong:");
    }
  } catch (e: any) {
    console.log("JSON parsing failed", e);
  }

  return new Response("Some things never change\n");
}

const verifySignature = (req: Request) => {
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");
  const reqSignature = req.headers.get("x-hub-signature-256") as string;

  const trusted = Buffer.from(`sha256=${signature}`, "ascii");
  const untrusted = Buffer.from(reqSignature, "ascii");

  return crypto.timingSafeEqual(trusted, untrusted);
};
