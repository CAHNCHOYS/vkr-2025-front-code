import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../stores/auth";
import "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { layout: "Main" },
    },
    {
      path: "/my-tests",
      name: "my-tests",
      component: () => import("../views/TeacherTests.vue"),
      meta: { layout: "Main", isLoginRequired: true },
    },

    {
      path: "/create-test",
      name: "create-test",
      component: () => import("../views/CreateTestView.vue"),
      meta: { layout: "Main", isLoginRequired: true },
    },
    {
      path: "/tests/:teacherId/:testId",
      name: "single-test",
      component: () => import("../views/StudentTest.vue"),
      meta: { layout: "Login" },
    },
    {
      path: "/results/:testId",
      name: "test-result",
      component: () => import("../views/TestResultsView.vue"),
      meta: { layout: "Main" },
    },
    {
      path: "/tests/edit/:id",
      name: "edit-test",
      component: () => import("../views/TeacherTestEdit.vue"),
      meta: { layout: "Main", isLoginRequired: true },
    },
    {
      path: "/teacher-subjects",
      name: "teacher-subjects",
      component: () => import("../views/TeacherSubjects.vue"),
      meta: { layout: "Main", isLoginRequired: true },
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: { layout: "Login" },
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { layout: "Login" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
      meta: { layout: "Main" },
    },
  ],
});

router.beforeEach(async (to, from) => {
  console.log(to.name, from.name);
  const authStore = useAuthStore();
  if (!from.name) {
    await authStore.verifyUserToken();
  }

  if (to.meta.isLoginRequired && !authStore.isTeacherLoggedIn) {
    return {
      name: "login",
      params: {
        ...from.params,
      },
      query: {
        isLoginRequired: "true",
        redirectedFrom: to.name as string,
      },
    };
  }
});

// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module "vue-router" {
  interface RouteMeta {
    // is optional
    layout?: string;
    // must be declared by every route
  }
}

export default router;
