import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import About from '../views/About.vue'
import CoOp from '../views/CoOp.vue'
import Help from '../views/Help.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/about',
    name: 'About',
    meta: { title: 'About' },
    component: About,
  },
  {
    path: '/help',
    name: 'Help',
    meta: { title: 'Help' },
    component: Help,
  },
  {
    path: '/co-op',
    name: 'CoOp',
    meta: { title: 'Co-Op' },
    component: CoOp,
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { title: 'Settings' },
    component: Settings,
  },
]

const router = new VueRouter({
  routes
})

export default router
