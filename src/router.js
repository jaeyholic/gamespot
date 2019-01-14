import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home"
import Signin from "./views/Signin"
import Dashboard from "./views/Dashboard";
import store from './Store/store'

Vue.use(Router);

const authGuard = {
  beforeEnter(to, from, next) {
    if(store.state.admin.token) {
      next()
    } else {
      next('/')
    }
  }
}

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
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      ...authGuard
    }
  ]
});
