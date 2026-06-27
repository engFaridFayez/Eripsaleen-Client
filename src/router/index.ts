import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import BookingPage from '@/views/BookingPage.vue'
import LoginView from '@/views/LoginView.vue'
import PaymentView from '@/views/PaymentView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/booking',
    name: 'booking',
    component: BookingPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: "/payment/:eventId",
    name: "payment",
    component: PaymentView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router