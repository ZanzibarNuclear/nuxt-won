// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-13',
  devtools: { enabled: true },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'nuxt-tiptap-editor',
    '@nuxt/test-utils/module',
    '@nuxt/image',
    '@nuxt/icon',
  ],
  runtimeConfig: {
    resendWsyKey: process.env.RESEND_WSY_KEY,
    resendFeedbackKey: process.env.RESEND_FEEDBACK_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  content: {},
  tiptap: {
    prefix: 'Tiptap',
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/auth/sign-in',
      callback: '/auth/confirm',
      cookieRedirect: true,
      include: ['/admin(/*)?', '/user(/*)?', '/workshop(/*)?', '/wsy(/*)?'],
    },
    cookieName: 'won',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true,
    },
  },
  icon: {
    serverBundle: 'auto',
  },
  ui: {
    icons: ['ph'],
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    define: {
      global: 'window',
    },
  },
  tailwindcss: {
    quiet: true,
  },
})
