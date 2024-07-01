import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
var token = cookies.get("token");
var isAuthenticated = typeof token === "string" && token !== "";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logged-in",
      name: "loggedIn",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoggedIn.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (!isAuthenticated && to.name !== "login") {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;
