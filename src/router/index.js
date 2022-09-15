import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Layout from '../layout/Layout.vue'
import Register from '../views/Register.vue'
import Editor from '../views/Editor.vue'
import User from '../views/User.vue'
import Order from '../views/Order.vue'
import MyInfo from '../views/MyInfo.vue'
import Home from '../views/Home.vue'
import FrontHeader from '../components/FrontHeader.vue'
const routes = [
  {
    path: '/',
    redirect: "/home",
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'homeView',
        name: 'HomeView',
        component: HomeView
      },
      {
        path: '/registertemp',
        name: 'Editoor',
        component: Editor
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/myinfo',
        name: 'MyInfo',
        component: MyInfo
      }
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
  {
    path: '/front',
    name: 'front',
    component: FrontHeader
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
