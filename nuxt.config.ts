import { window } from './node_modules/happy-dom/src/PropertySymbol';
import vue from '@vitejs/plugin-vue'
import uiPro from '@nuxt/ui-pro/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-23',
  devtools: { enabled: true },
  sourcemap: true,
  experimental: {
    appManifest: true,
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui-pro',
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
  css: ['@/assets/css/main.css', '@/assets/katex/katex.min.css'],
  icon: {
    serverBundle: 'remote',
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
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
  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY
  },
  vite: {
    define: {
      global: 'window'
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
  }
})
