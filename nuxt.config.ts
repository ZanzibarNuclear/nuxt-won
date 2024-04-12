// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/test-utils/module',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      descopeProjectId: process.env.DESCOPE_PROJECT_ID,
    },
  },
  content: {},
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/user/login',
      callback: '/user/confirm',
      include: ['/what-say-you', '/user/account'],
      cookieRedirect: true,
    },
    cookieName: 'won',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true,
    },
  },
  ui: {
    icons: ['mdi', 'el', 'mingcute'],
  },
  vite: {
    define: {
      global: 'window',
    },
  },
})
