import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import LoginPage from "../pages/Login.vue";
import SignupPage from "../pages/Signup.vue";

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
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupPage,
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
  } else if ((to.name === "login" || to.name === "signup") && isLoggedIn) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
