import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const diary = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/diary" }),
    schema: z.object({
        date: z.date(),
        cover: z.string().optional(),
        text: z.string().optional(),
        theme: z.enum(["love"]).optional(),
    }),
});

const observatory = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/observatory" }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        cover: z.string().optional(),
    }),
});

export const collections = { diary, observatory };