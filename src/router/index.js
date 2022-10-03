import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Layout from '../layout/Layout.vue'
import Register from '../views/Register.vue'
import Editor from '../views/Editor.vue'
import User from '../views/User.vue'
import Order from '../views/Order.vue'
import Info from '../views/Info.vue'
import Home from '../views/Home.vue'
import FrontLayout from '../layout/FrontLayout.vue'
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
        path: '/info',
        name: 'Info',
        component: Info
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
    redirect: "/front/homepage",
    component: FrontLayout,
    children: [
      {
        path: 'homepage',
        name: 'HomePage',      
        component:() => import('../views/front/Home.vue')
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () =>import('../views/front/Goods.vue')
      },
      {
        path: 'myorder',
        name: 'MyOrder',
        component: () =>import('../views/front/MyOrder.vue')
      },
      {
        path: 'myinfo',
        name: 'MyInfo',
        component: () =>import('../views/front/MyInfo.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
