import { useAuthStore } from "@/store";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

/**
 * 
 * @param to 
 * @param from 
 * @param next 
 */
const authCheck = (to: any, from: any, next: any) => {
  const store = useAuthStore();
  console.log("authCheck", store.isLoggedIn);
  if (store.isLoggedIn) {
    if (to.name === "login") {
      next({ name: "Tab1" });
    } else {
      next();
    }
  } else {
    if (to.name === "login") {
      next();
    } else {
      next({ name: "login" });
    }
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
    beforeEnter: authCheck,
  },
  {
    name: "create-account",
    path: "/create-account",
    component: () => import("@/views/CreateAccountPage.vue"),
  },
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
        beforeEnter: authCheck,
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
        beforeEnter: authCheck,
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3Page.vue"),
        beforeEnter: authCheck,
      },
    ],
  },
  // { path: "*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
