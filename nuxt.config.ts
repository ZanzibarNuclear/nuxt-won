// https://nuxt.com/docs/api/configuration/nuxt-config
// TODO: figure out how to use, whether it does anything useful
// import type { Database } from '~/types/supabase'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    // 'nuxt-tiptap-editor',
    '@nuxt/test-utils/module',
    "@nuxt/image"
  ],
  runtimeConfig: {
    wsyInvitationsResendKey: process.env.WSY_RESEND_PROJECT_KEY,
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  content: {},
  // tiptap: {
  //   prefix: 'Tiptap',
  // },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/auth/sign-in',
      callback: '/auth/confirm',
      cookieRedirect: true,
      include: ['/user(/*)?', '/workshop(/*)?', '/wsy(/*)?'],
    },
    cookieName: 'won',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true,
    },
  },
  ui: {
    icons: ['mdi', 'el', 'ri', 'ph'],
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