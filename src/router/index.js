import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from "src/router/routes";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";
import { useUpdatePassword } from "@vueauth/supabase";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// export default route(function (/* { state, ssrContext } */) {

export default route(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  const router = useRouter();
  const { supabase } = useSupabase();
  const { updatePassword } = useAuthUser();
  Router.beforeEach((to) => {
    const { isSignedIn } = useAuthUser();

    if (to.hash.includes("type=recovery") && to.name !== "updatePassword") {
      const accessToken = to.hash.split("&")[0];
      const token = accessToken.replace("#access_token=", "");

      return { name: "updatePassword", query: { token } };
    }
    if (
      !isSignedIn &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes("fromEmail")
    ) {
      return { name: "signin" };
    }
  });

  return Router;
});
