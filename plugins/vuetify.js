import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken1,
    accent: colors.shades.white,
    secondary: colors.grey.darken3,
    info: colors.lightBlue.darken1,
    warning: colors.yellow.darken2,
    error: colors.red.darken3,
    success: colors.green.accent4
  }
})