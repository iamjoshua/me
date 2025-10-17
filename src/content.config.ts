import { defineCollection } from "astro:content";
import { questionsLoader, questionSchema } from "@/lib/loaders/questionsLoader";
import { readingsLoader, readingSchema } from "@/lib/loaders/readingsLoader";
import { essaysLoader, essaySchema } from "@/lib/loaders/essaysLoader";
import { photosLoader, photoSchema } from "@/lib/loaders/photosLoader";
import {
  photoCollectionsLoader,
  photoCollectionSchema,
} from "@/lib/loaders/photoCollectionsLoader";
import { localPhotoCollectionsLoader } from "./lib/loaders/localPhotoCollectionsLoader";
import { localPhotosLoader } from "./lib/loaders/localPhotosLoader";

const IS_LOCAL = true;

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
  loader: IS_LOCAL ? localPhotosLoader() : photosLoader(),
  schema: photoSchema,
});

const photoCollections = defineCollection({
  loader: IS_LOCAL ? localPhotoCollectionsLoader() : photoCollectionsLoader(),
  schema: photoCollectionSchema,
});

export const collections = {
  essays,
  readings,
  questions,
  photos,
  photoCollections,
};
