import { createWebHistory, createRouter } from "vue-router";
import Book from "@/pages/book.vue";
import Publisher from "@/pages/publisher.vue";
import Login from "@/pages/login.vue";
import Borrows from "@/pages/borrow_cardList.vue";
import Staffs from "@/pages/staffs.vue";
const routes = [
    {
        path: "/books",
        name: "books",
        component: Book,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/publisher",
        name: "publisher",
        component: Publisher,
        meta: { requiresAuth: true }
    },
    {
        path: "/borrows",
        name: "borrows",
        component: Borrows,
        meta: { requiresAuth: true }
    },
    {
        path: "/publisher",
        name: "publisher",
        component: Publisher,
        meta: { requiresAuth: true }
    },
    {
        path: "/staffs",
        name: "staffs",
        component: Staffs,
        meta: { requiresAuth: true }
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  console.log('Router Guard:', token)

  if (to.meta.requiresAuth && !token) {
    // Nếu chưa đăng nhập → chuyển về trang login
    return next({ name: 'login' })
  }

  next()
})

export default router;