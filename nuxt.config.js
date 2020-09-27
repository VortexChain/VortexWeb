export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Vortex project',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.svg',
      },
    ],
  },
  /*
   ** Global CSS
   */
  loading: { color: '#3B8070' },
  css: [
    '@/assets/css/global.css',
    '@/assets/less/global.less',
    '@/assets/less/transitions.less',
    '@/assets/sass/global.scss',
  ],
  styleResources: {
    less: ['@/assets/less/colors.less', '@/assets/less/dark-colors.less'],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '@/plugins/auth-handler.js' },
    { src: '@/plugins/notifications.js' },
    { src: '@/plugins/vue-particles' },
    { src: '@/plugins/nuxt-client-init' },
    { src: '@/plugins/ripple-effect' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/mdi' },
    { src: '@/plugins/overlayscrollbars' },
    { src: '@/plugins/vue-split' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/router',
    '@nuxtjs/style-resources',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    'nuxt-i18n',
    'nuxt-izitoast',
    'semantic-ui-vue/nuxt',
  ],
  // routerModule: {
  //   keepDefaultRouter: true,
  // },
  axios: {},
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English',
        flag: 'us',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru-RU.js',
        name: 'Русский',
        flag: 'ru',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.js',
        name: 'Français',
        flag: 'fr',
      },
    ],
    seo: true,
    defaultLocale: 'en',
    lazy: true,
    langDir: 'langs/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n',
      alwaysRedirect: false,
    },
  },
  izitoast: {
    position: 'bottomLeft',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutRight',
  },
  firebase: {
    // Required:
    config: {
      development: {
        apiKey: 'AIzaSyBtf8H9U6pzjsLMJLNs1p86e_95B4ASYH4',
        authDomain: 'vortex-4b6db.firebaseapp.com',
        databaseURL: 'https://vortex-4b6db.firebaseio.com',
        projectId: 'vortex-4b6db',
        storageBucket: '',
        messagingSenderId: '951093526823',
        appId: '1:951093526823:web:691535202ea0b370',
      },
      production: {
        apiKey: 'AIzaSyBtf8H9U6pzjsLMJLNs1p86e_95B4ASYH4',
        authDomain: 'vortex-4b6db.firebaseapp.com',
        databaseURL: 'https://vortex-4b6db.firebaseio.com',
        projectId: 'vortex-4b6db',
        storageBucket: '',
        messagingSenderId: '951093526823',
        appId: '1:951093526823:web:691535202ea0b370',
      },
    },
    services: {
      auth: {
        persistence: 'local',

        // it is recommended to configure either a mutation or action but you can set both
        // initialize: {
        //   // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
        //   onAuthStateChangedAction: 'user/onAuthStateChangedAction',
        // },
      },
      messaging: true,
    },
  },
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {
                version: 3,
              },
            },
          ],
        ]
      },
    },
  },
  server: {
    port: 4000, // default: 3000
    host: 'localhost', // default: localhost,
  },
}
