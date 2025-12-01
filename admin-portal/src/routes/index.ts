import { createWebHistory, createRouter } from "vue-router";
import Book from "@/pages/book.vue";
import Publisher from "@/pages/publisher.vue";
import Login from "@/pages/login.vue";
const routes = [
    {
        path: "/books",
        name: "books",
        component: Book,
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
    },
    
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // Nếu chưa đăng nhập → chuyển về trang login
    return next({ name: 'login' })
  }

  next()
})

export default router;