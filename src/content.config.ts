import { defineCollection } from "astro:content";
import { questionsLoader, questionSchema } from "@/lib/loaders/questionsLoader";
import { readingsLoader, readingSchema } from "@/lib/loaders/readingsLoader";
import { essaysLoader, essaySchema } from "@/lib/loaders/essaysLoader";

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

export const collections = { essays, readings, questions };
