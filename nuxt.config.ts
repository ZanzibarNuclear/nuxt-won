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
    redirect: false,
    redirectOptions: {
      login: '/user/login',
      callback: '/user/confirm',
      include: undefined,
      exclude: [
        'daily-lessons',
        'fun-and-games',
        'nuclear-news',
        'simulators',
        'what-say-you',
        'essays',
      ],
      cookieRedirect: true,
    },
    cookieName: 'blargy',
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
