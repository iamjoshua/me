import { defineCollection } from "astro:content";
import { questionsLoader, questionSchema } from "@/lib/loaders/questionsLoader";
import { readingsLoader, readingSchema } from "@/lib/loaders/readingsLoader";
import { essaysLoader, essaySchema } from "@/lib/loaders/essaysLoader";
import { photosLoader, photoSchema } from "@/lib/loaders/photosLoader";

const questions = defineCollection({
  loader: questionsLoader(),
  schema: questionSchema,
});

const readings = defineCollection({
  loader: readingsLoader(),
  schema: readingSchema,
});

const essays = defineCollection({
  loader: essaysLoader(),
  schema: essaySchema,
});

const photos = defineCollection({
  loader: photosLoader(),
  schema: photoSchema,
});

export const collections = { essays, readings, questions, photos };
