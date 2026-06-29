import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import BookingPage from '@/views/BookingPage.vue'
import LoginView from '@/views/LoginView.vue'
import PaymentView from '@/views/PaymentView.vue'
import ShowDetailsPage from '@/views/ShowDetailsPage.vue'
import DashboardView from '@/views/admin/DashboardView.vue'

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
    path: "/shows/:id",
    name: "show-details",
    component: ShowDetailsPage
  },
  {
    path: '/booking/:eventId',
    name: 'booking-event',
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
  {
    path:"/admin",
    name:"dashboard",
    component:DashboardView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router