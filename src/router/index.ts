import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "vuefire";
import index from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: index,
      meta: { isProtected: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/authenticationView",
      name: "AuthenticationView",
      component: () => import("../views/AuthenticationView.vue"),
      meta: { isProtected: true },
    },
    {
      path: "/firestore",
      name: "Firestore",
      component: () => import("../views/FirestoreView.vue"),
      meta: { isProtected: true },
    },
    {
      path: "/pinia",
      name: "Pinia",
      component: () => import("../views/PiniaView.vue"),
      meta: { isProtected: true },
    },
    {
      path: "/pinia-firestore",
      name: "PiniaFirestore",
      component: () => import("../views/PiniaFirestoreView.vue"),
      meta: { isProtected: true },
    },
  ],
});

async function authGuard(to: any) {
  const user = await getCurrentUser();
  if (to.meta.isProtected && !user) {
    return "/login";
  }
}

router.beforeEach(authGuard);

export default router;
