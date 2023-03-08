"use client"
import Nav from "../nav"
import Event from "./event"

function Philosophy() {
  return (
    <main className="h-[100dvh] w-screen flex sm:flex-row md:flex-col justify-between">
      <div className="h-full w-full flex justify-end">
        <div className="md:fixed md:top-0 md:left-0 md:h-screen w-full md:w-5/12 lg:w-1/2 bg-sky-700 flex align-center items-center">
          <div className="text-center bg-red-40 flex flex-col justify-end p-20">
            <div className="text-2xl font-thin lg:leading-relaxed text-white">
              America is thus as a nation rapidly drifting towards a state of
              things in which no man of science or letters will be accounted
              respectable unless some kind of badge or diploma is stamped upon
              him.
            </div>
            <div className="text-sky-300 p-10">
              — William James, <span className="italic">The Ph.D. Octopus</span>
            </div>
          </div>
        </div>
        <div className="h-full w-full md:w-7/12 lg:w-1/2 min-h-[200px] flex">
          <div className="p-10">
            <h1 className="mb-5 text-3xl leading-normal md:text-4xl md:leading-normal font-thin">
              Philosophy
            </h1>
            <p className="text-md leading-relaxed text-gray-500">
              I've had a life-long love of philosophy, but it wasn't until my
              mid 30's that I learned that modern analytic philosophy was alive
              and thriving. Ever since, I've been committed to getting up to
              date on the academic literature with the hope of one day
              contributing. I study broadly, but with an emphasis on the
              philosophy of mind.{" "}
            </p>

            <ol className="mt-10 relative border-l border-gray-200 dark:border-gray-700">
              <Event
                date="March 6th, 2023"
                title="Representation in Cognitive Science, by Nicholas Shea"
                type="Now Reading"
                description="I first heard abot Shea's work on the New Books in Philosophy podcast. I was excited to learn that his position on representational content is remarkably close to mine. I'm looking forward to getting into the details."
              />
            </ol>
          </div>
          {/* Nav cover */}
          <div className="fixed bottom-0 w-full h-[6rem] bg-white/95"></div>
        </div>
      </div>
      <Nav
        fixed={true}
        nameClassName="text-white"
        linksClassName="first:text-white"
      />
    </main>
  )
}

export default Philosophy
