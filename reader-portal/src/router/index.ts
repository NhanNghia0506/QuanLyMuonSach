import { createWebHistory, createRouter } from "vue-router";
import Register from "@/pages/register.vue";
import Home from "@/pages/home.vue";
import Book from "@/pages/bookdetail.vue";
import BorrowList from "@/pages/borrow_cardList.vue";
import Login from "@/pages/login.vue";
const routes = [
{
    path: "/register",
    name: "register",
    component: Register,
},
{
    path: "/login",
    name: "login",
    component: Login,
},
{
  path: "/",
  name: "home",
  component: Home,
  meta: { requiresAuth: true }
},

{
  path: "/book/:id",
  name: "bookdetail",
  component: Book,
  meta: { requiresAuth: true }
},

{
  path: "/borrows",
  name: "borrowlist",
  component: BorrowList,
  meta: { requiresAuth: true }
}


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