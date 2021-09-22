export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'recipe-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],
  googleFonts: {
    families: {
      Roboto: {
        wght: [300, 400],
      },
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyA9h3jhDm6kinnQaFsvLWn_jGSimZAkr6I',
          authDomain: 'brandung-recipe-app.firebaseapp.com',
          projectId: 'brandung-recipe-app',
          storageBucket: 'brandung-recipe-app.appspot.com',
          messagingSenderId: '225835236394',
          appId: '1:225835236394:web:6a0e3e4ef2a9eed4dd1753',
        },
        services: {
          firestore: {
            enablePersistence: true,
          },
        },
      },
    ],
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
};
