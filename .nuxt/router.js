import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _d5e3e332 = () => import('..\\pages\\pricing.vue' /* webpackChunkName: "pages_pricing" */).then(m => m.default || m)
const _7d5986d6 = () => import('..\\pages\\new-member.vue' /* webpackChunkName: "pages_new-member" */).then(m => m.default || m)
const _4161fa6c = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */).then(m => m.default || m)
const _1f3161b9 = () => import('..\\pages\\prices.vue' /* webpackChunkName: "pages_prices" */).then(m => m.default || m)
const _15a75fb3 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)
const _387e5a66 = () => import('..\\pages\\_memberId\\index.vue' /* webpackChunkName: "pages__memberId_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/gym_nuxt/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/pricing",
			component: _d5e3e332,
			name: "pricing"
		},
		{
			path: "/new-member",
			component: _7d5986d6,
			name: "new-member"
		},
		{
			path: "/login",
			component: _4161fa6c,
			name: "login"
		},
		{
			path: "/prices",
			component: _1f3161b9,
			name: "prices"
		},
		{
			path: "/",
			component: _15a75fb3,
			name: "index"
		},
		{
			path: "/:memberId",
			component: _387e5a66,
			name: "memberId"
		}
    ],
    
    
    fallback: false
  })
}
