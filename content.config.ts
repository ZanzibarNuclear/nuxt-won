import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    join: defineCollection({
      type: 'page',
      source: 'join/**/*.md',
      schema: z.object({
        date: z.string(),
        published: z.boolean().default(false)
      }),
    }),
    lessons: defineCollection({
      type: 'page',
      source: 'lessons/**/*.md',
      schema: z.object({
        date: z.string(),
        published: z.boolean().default(false)
      }),
    }),
  },
})