import Vue from "vue";
import Vuex from "vuex";

//Store Modules
import admin from "./Modules/admin";
import posts from "./Modules/posts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    posts
  }
});
