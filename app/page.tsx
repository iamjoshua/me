import Nav from "./nav";
import HomeV1 from "./homev1";
import TheGrid from "./thegrid";
import { getCurrentReading } from "@/lib/getCurrentReading";

export default async function Home() {
  const reading = await getCurrentReading();

  return (
    <main className="h-[100dvh] w-[100dvw] flex flex-col justify-between overflow-hidden">
      <TheGrid />

      <div className="h-full w-full flex flex-col justify-between">
        <HomeV1 reading={reading} />
      </div>

      {/* Nav cover */}
      <div className="w-full h-[111px] shrink-0 bg-white/90 border-t border-t-gray-100 md:border-0" />
      <Nav fixed={true} className="bg-transparent" />
    </main>
  );
}
