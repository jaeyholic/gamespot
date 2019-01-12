import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home"
import Signin from "./views/Signin"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    }
  ]
});
