// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-23',
  devtools: { enabled: true },
  sourcemap: true,
  colorMode: {
    preference: 'light'
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/test-utils/module',
    '@nuxtjs/turnstile',
  ],
  runtimeConfig: {
    resendFeedbackKey: process.env.RESEND_FEEDBACK_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    public: {
      wonServiceEndpoint: process.env.WON_SERVICE_ENDPOINT,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    }
  },
  routeRules: {
    '/admin/**': { appMiddleware: ['admin-route-guard'] },
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio/'
    },
    build: {
      markdown: {
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
          },
        },
      }
    }
  },
  experimental: {
    appManifest: true,
  },
  icon: {
    serverBundle: 'remote',
  },
  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY
  },
  css: ['@/assets/css/main.css', '@/assets/css/font.css', '@/assets/css/tailwind.css', '@/assets/katex/katex.min.css'],
  vite: {
    define: {
      global: 'window',
    },
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern'
        },
        scss: {
          api: 'modern'
        }
      }
    }
  },
})
