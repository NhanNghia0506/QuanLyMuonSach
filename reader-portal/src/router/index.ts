import { createWebHistory, createRouter } from "vue-router";
import Register from "@/pages/register.vue";
import Home from "@/pages/home.vue";
import Book from "@/pages/bookdetail.vue";
import BorrowList from "@/pages/borrow_cardList.vue";
const routes = [
{
    path: "/register",
    name: "register",
    component: Register,
},
{
  path: "/",
  name: "home",
  component: Home
},

{
  path: "/book/:id",
  name: "bookdetail",
  component: Book
},

{
  path: "/borrows",
  name: "borrowlist",
  component: BorrowList
}


];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;