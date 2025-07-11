import { defineCollection, z } from "astro:content";
import matter from "gray-matter";
import { questionsLoader } from "./loaders/questions";
import { readingsLoader } from "./loaders/readings";

const questions = defineCollection({
  loader: questionsLoader(),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    elaboration: z.string().optional(),
    position: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
  }),
});

const readings = defineCollection({
  loader: readingsLoader(),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    type: z.string(),
    category: z.string(),
    status: z.string(),
    startedAt: z.string().optional(),
    completedAt: z.string().optional(),
    rating: z.string().optional(),
    notes: z.string().optional(),
  }),
});


export const collections = { questions, readings };
