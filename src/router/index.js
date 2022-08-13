import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Layout from '../layout/Layout.vue'
const routes = [
  {
    path: '/',
    redirect: "/home",
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'HomeView',
        component: HomeView
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
