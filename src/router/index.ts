import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Public
const HomePage = () => import("@/views/HomePage.vue");
const BookingPage = () => import("@/views/BookingPage.vue");
const LoginView = () => import("@/views/LoginView.vue");
const PaymentView = () => import("@/views/PaymentView.vue");
const ShowDetailsPage = () => import("@/views/ShowDetailsPage.vue");
const NotFoundPage = () => import("@/views/NotFound.vue");

// Admin
const DashboardView = () => import("@/views/admin/DashboardView.vue");
const DashboardHomeView = () => import("@/views/admin/DashboardHomeView.vue");

const TheaterListView = () => import("@/views/admin/TheaterCRUD/TheaterListView.vue");
const TheaterCreateView = () => import("@/views/admin/TheaterCRUD/TheaterCreateView.vue");
const TheaterEditView = () => import("@/views/admin/TheaterCRUD/TheaterEditView.vue");
const TheaterDetailsView = () => import("@/views/admin/TheaterCRUD/TheaterDetailsView.vue");

const ShowListView = () => import("@/views/admin/ShowsCRUD/ShowListView.vue");
const ShowCreateView = () => import("@/views/admin/ShowsCRUD/ShowCreateView.vue");
const ShowEditView = () => import("@/views/admin/ShowsCRUD/ShowEditView.vue");
const ShowDetailsView = () => import("@/views/admin/ShowsCRUD/ShowDetailsView.vue");

const EventListView = () => import("@/views/admin/EventCRUD/EventListView.vue");
const EventCreateView = () => import("@/views/admin/EventCRUD/EventCreateView.vue");
const EventEditView = () => import("@/views/admin/EventCRUD/EventEditView.vue");
const EventDetailsView = () => import("@/views/admin/EventCRUD/EventDetailsView.vue");

const SectionListView = () => import("@/views/admin/SectionCRUD/SectionListView.vue");
const SecionCreateView = () => import("@/views/admin/SectionCRUD/SecionCreateView.vue");
const SectionEditView = () => import("@/views/admin/SectionCRUD/SectionEditView.vue");
const SectionDetailsView = () => import("@/views/admin/SectionCRUD/SectionDetailsView.vue");

const RowListView = () => import("@/views/admin/RowCRUD/RowListView.vue");
const RowCreateView = () => import("@/views/admin/RowCRUD/RowCreateView.vue");
const RowEditView = () => import("@/views/admin/RowCRUD/RowEditView.vue");
const RowDetailsView = () => import("@/views/admin/RowCRUD/RowDetailsView.vue");

const SeatManagmentView = () => import("@/views/admin/Seats/SeatManagmentView.vue");
const SeatCategoryManagementView = () => import("@/views/admin/Seats/SeatCategoryManagementView.vue");

const BookingView = () => import("@/views/admin/BookingView/BookingView.vue");
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: "كورال اريبصالين | Eripsaleen Choir",
    }
  },
  {
    path: '/booking',
    name: 'booking',
    component: BookingPage,
    meta: {
      title: 'حجز المقاعد | Eripsaleen Choir'
    }
  },
  {
    path: "/shows/:id",
    name: "show-details",   // keep the public-facing name simple
    component: ShowDetailsPage,   // or whatever your seat-booking/public page is
    meta: {
      title: 'تفاصيل الحفل | Eripsaleen Choir'
    }
  },
  {
    path: '/booking/:eventId',
    name: 'booking-event',
    component: BookingPage,
    meta: {
      title: 'حجز المقاعد | Eripsaleen Choir'
    }
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
  },
  {
    // catch-all — must stay LAST in the array
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: {
      title: "الصفحة غير موجودة | Eripsaleen Choir"
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Dead-end at 404 instead of redirecting to /login,
    // so unauthenticated visitors can't tell /admin exists.
    return { name: "not-found" }
  }

  return true
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || "Eripsaleen Choir";
});

export default router