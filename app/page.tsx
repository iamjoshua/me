"use client"
import { motion } from "framer-motion"
import Nav from "./nav"
import HomeV1 from "./homev1"
import TheGrid from "./thegrid"

export default function Home() {
  return (
    <main className="h-[100dvh] w-[100dvw] flex flex-col justify-between">
        <TheGrid />
        <div className="h-full w-full flex flex-col justify-between">
          <HomeV1 />
        </div>
        <Nav />
    </main>
  )
}
