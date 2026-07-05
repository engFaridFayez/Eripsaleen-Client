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
import SectionListView from '@/views/admin/SectionCRUD/SectionListView.vue'
import SecionCreateView from '@/views/admin/SectionCRUD/SecionCreateView.vue'
import SectionEditView from '@/views/admin/SectionCRUD/SectionEditView.vue'
import SectionDetailsView from '@/views/admin/SectionCRUD/SectionDetailsView.vue'
import RowListView from '@/views/admin/RowCRUD/RowListView.vue'
import RowCreateView from '@/views/admin/RowCRUD/RowCreateView.vue'
import RowEditView from '@/views/admin/RowCRUD/RowEditView.vue'
import RowDetailsView from '@/views/admin/RowCRUD/RowDetailsView.vue'
import SeatManagmentView from '@/views/admin/Seats/SeatManagmentView.vue'
import SeatCategoryManagementView from '@/views/admin/Seats/SeatCategoryManagementView.vue'
import BookingView from '@/views/admin/BookingView/BookingView.vue'
import ShowDetailsView from '@/views/admin/ShowsCRUD/ShowDetailsView.vue'
import { useAuthStore } from '@/stores/auth'

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
    name: "show-details",   // keep the public-facing name simple
    component: ShowDetailsPage   // or whatever your seat-booking/public page is
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
    name: "admin",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
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
      // Admin routes (likely already nested under /admin or similar)
      {
        path: "shows",
        name: "shows",
        component: ShowListView
      },
      {
        path: "shows/create",
        name: "show-create",
        component: ShowCreateView
      },
      {
        path: "shows/:id/edit",
        name: "show-edit",
        component: ShowEditView
      },
      {
        path: "shows/:id",
        name: "admin-show-details",   // renamed
        component: ShowDetailsView
      },
      {
        path: "events",
        name: "events",
        component: EventListView
      },
      {
        path: "events/create",
        name: "event-create",
        component: EventCreateView
      },
      {
        path: "events/:id/edit",
        name: "event-edit",
        component: EventEditView
      },
      {
        path: "events/:id",
        name: "event-details",
        component: EventDetailsView
      },
      {
        path: "sections",
        name: "sections",
        component: SectionListView
      },
      {
        path: "sections/create",
        name: "section-create",
        component: SecionCreateView
      },
      {
        path: "sections/:id/edit",
        name: "section-edit",
        component: SectionEditView
      },
      {
        path: "sections/:id",
        name: "section-details",
        component: SectionDetailsView
      },
      {
        path: "rows",
        name: "rows",
        component: RowListView
      },
      {
        path: "rows/create",
        name: "row-create",
        component: RowCreateView
      },
      {
        path: "rows/:id/edit",
        name: "row-edit",
        component: RowEditView
      },
      {
        path: "rows/:id",
        name: "row-details",
        component: RowDetailsView
      },
      {
        path: "seats",
        name: "seats",
        component: SeatManagmentView
      },
      {
        path: "/admin/theaters/:id/categories",
        name: "seat-categories",
        component: SeatCategoryManagementView
      },
      {
        path: "bookings",
        name: "bookings",
        component: BookingView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login" }
  }

  return true
})

export default router

