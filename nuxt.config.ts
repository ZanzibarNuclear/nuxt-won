// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
  ],
  content: {},
})
