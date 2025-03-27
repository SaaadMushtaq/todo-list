import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: "/login" });
  } else if ((to.path === "/login" || to.path === "/signup") && isLoggedIn) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
