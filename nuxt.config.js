const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  // mode: 'universal',
  router: {
    mode: 'history',
    base: '/gym_nuxt/'
  },
  generate: {
    fallback: true,
  },
  mode: 'spa',
  head: {
    title: 'Gym',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/dumbbell.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/gym_nuxt/dumbbell.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' }
    ]
  },
  loadingIndicator: { 
    color: '#1E88E5',
    name: 'cube-grid'
  },
  loading: { color: '#FFFFFF' },
  css: [
    'vuetify/src/stylus/main.styl'
  ],
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/firebaseInit',
    '@/plugins/eventBus.js'
  ],
  modules: [
  ],
  axios: {
  },
  build: {
    extend(config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
