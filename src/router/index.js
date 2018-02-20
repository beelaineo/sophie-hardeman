import Vue from 'vue'
import Router from 'vue-router'

const landing = () => import('@/views/landing')
const collection = () => import('@/views/collection')
const about = () => import('@/views/about')
const hardemanTV = () => import('@/views/hardeman-tv')
const sale = () => import('@/views/sale')
const diary = () => import('@/views/diary')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landing
    },
    {
      path: '/collection/:slug',
      name: 'collection',
      component: collection
    },
    {
      path: '/about/:slug',
      name: 'about',
      component: about
    },
    {
      path: '/sale/:slug',
      name: 'sale',
      component: sale
    },
    {
      path: '/hardeman-tv/:slug',
      name: 'hardeman tv',
      component: hardemanTV
    },
    {
      path: '/diary/:slug',
      name: 'diary',
      component: diary
    }
  ]
})
