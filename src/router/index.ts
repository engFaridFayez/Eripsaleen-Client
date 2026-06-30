import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import BookingPage from '@/views/BookingPage.vue'
import LoginView from '@/views/LoginView.vue'
import PaymentView from '@/views/PaymentView.vue'
import ShowDetailsPage from '@/views/ShowDetailsPage.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import TheaterListView from '@/views/admin/TheaterCRUD/TheaterListView.vue'
import DashboardHomeView from '@/views/admin/DashboardHomeView.vue'
import TheaterCreateView from '@/views/admin/TheaterCRUD/TheaterCreateView.vue'
import TheaterEditView from '@/views/admin/TheaterCRUD/TheaterEditView.vue'
import TheaterDetailsView from '@/views/admin/TheaterCRUD/TheaterDetailsView.vue'
import ShowListView from '@/views/admin/ShowsCRUD/ShowListView.vue'
import ShowCreateView from '@/views/admin/ShowsCRUD/ShowCreateView.vue'
import ShowEditView from '@/views/admin/ShowsCRUD/ShowEditView.vue'
import EventListView from '@/views/admin/EventCRUD/EventListView.vue'
import EventCreateView from '@/views/admin/EventCRUD/EventCreateView.vue'
import EventEditView from '@/views/admin/EventCRUD/EventEditView.vue'
import EventDetailsView from '@/views/admin/EventCRUD/EventDetailsView.vue'

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
    path: "/admin",
    component: DashboardView,
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardHomeView,
      },
      {
        path: "theaters",
        name: "theaters",
        component: TheaterListView,
      },
      {
        path: "theaters/create",
        name: "theater-create",
        component: TheaterCreateView,
      },
      {
        path: "theaters/:id/edit",
        name: "theater-edit",
        component: TheaterEditView,
        props: true,
      },
      {
        path: "theaters/:id",
        name: "theater-details",
        component: TheaterDetailsView,
        props: true,
      },
      {
        path: "shows",
        name: "shows",
        component: ShowListView
      },
      {
        path:"shows/create",
        name:"show-create",
        component: ShowCreateView
      },
      {
        path: "shows/:id/edit",
        name: "show-edit",
        component:ShowEditView
      },
      {
        path: "shows/:id",
        name: "show-details",
        component: ShowDetailsPage
      },
      {
        path:"events",
        name:"events",
        component:EventListView
      },
      {
        path:"events/create",
        name:"event-create",
        component:EventCreateView
      },
      {
        path: "events/:id/edit",
        name: "event-edit",
        component:EventEditView
      },
      {
        path: "events/:id",
        name: "event-details",
        component: EventDetailsView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router