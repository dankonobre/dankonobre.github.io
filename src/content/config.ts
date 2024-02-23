import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    })
});

export const collections = {
    projects: projects,
};