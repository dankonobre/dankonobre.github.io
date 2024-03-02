import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        draft: z.boolean(),
        tags: z.optional(z.array(z.string())),
        categories: z.optional(z.array(z.string())),
    })
});

export const collections = {
    projects: projects,
};