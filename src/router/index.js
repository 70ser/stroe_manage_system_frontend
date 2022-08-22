import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Layout from '../layout/Layout.vue'
import Register from '../views/Register.vue'
import Editor from '../views/Editor.vue'
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
      },
      {
        path: '/registertemp',
        name: 'Editoor',
        component: Editor
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
