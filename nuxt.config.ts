// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-23',
  build: {
    sourcemap: true
  },
  devtools: { enabled: true },
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
    'nuxt-tiptap-editor',
    '@nuxt/test-utils/module',
  ],
  runtimeConfig: {
    resendFeedbackKey: process.env.RESEND_FEEDBACK_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    public: {
      wonServiceEndpoint: process.env.WON_SERVICE_ENDPOINT,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
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
  nitro: {
    preset: process.env.NODE_ENV === 'production' ? 'cloudflare-pages' : undefined,
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/']
    }
  },
  tiptap: {
    prefix: 'Tiptap',
  },
  icon: {
    serverBundle: 'remote',
  },
  css: ['@/assets/css/font.css', '@/assets/css/tailwind.css', '@/assets/css/katex.0.16.8.min.css'],
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
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    quiet: true,
  },
})
