const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:400,700' }
    ]
  },
  loadingIndicator: { 
    color: '#1E88E5',
    name: 'folding-cube'
  },
  loading: { color: '#FFFFFF' },
  css: [
    'vuetify/src/stylus/main.styl'
  ],
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/firebaseInit'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
  },
  build: {
    extend(config, ctx) {
      
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
