import Link from "next/link";

export const readings = [ 
  {
    date: 'September 12th, 2023',
    title: 'Experimental philosophy and philosophical intuition, by Ernest Sosa',
    type: 'Now Reading',
    description: <>
      I am a defender of the role of intuition in philosophy. Reading for a{" "}
      <Link
        target="__blank"
        href="https://www.meetup.com/philosophers-and-gamblers/events/296052937/"
        className="underline"
      >
        philosophy event
      </Link>.
    </>
  },
  {
    date: 'March 6th, 2023',
    title: 'Representation in Cognitive Science, by Nicholas Shea',
    description: 
    <>
      I first heard abot Shea&apos;s work on the{" "}
      <Link
        target="__blank"
        href="https://newbooksnetwork.com/nicholas-shea-representation-in-cognitive-science-oxford-up-2018"
        className="underline"
      >
        Books in Philosophy podcast
      </Link>
      . I was excited to learn that his position on
      representational content is remarkably close to mine.
      I&apos;m looking forward to getting into the details.
    </>
  }

]