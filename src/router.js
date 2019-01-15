/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import store from './Store/store'

//Components
import Home from "./views/Home"
import Signin from "./views/Signin"
import Dashboard from "./views/Dashboard";
import MainDashboard from './views/Dashboard/Main.vue'
import AddPosts from './views/Dashboard/AddPost.vue'
import PostsList from './views/Dashboard/ListPosts.vue'

Vue.use(Router);

const authGuard = {
  beforeEnter: (to, from, next) => {
    const redirect = () => {
      if(store.state.admin.token) {
        if(to.path === '/signin') {
          next('/dashboard')
        } else {
          next()
        }
      } else {
        if(to.path === '/signin') {
          next()
        } else {
          next('/')
        }
      }
    }

    if(store.state.admin.refreshLoader) {
      store.watch((state, getters) =>
        getters['admin/refreshLoader'], () => {
        redirect();
      })
    } else {
      redirect();
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
      component: Signin,
      ...authGuard
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [
        {
          path: "/",
          component: MainDashboard
        },
        {
          path: "add_posts",
          component: AddPosts
        },
        {
          path: "posts_list",
          component: PostsList
        }
      ],
      ...authGuard
    }
  ]
});
