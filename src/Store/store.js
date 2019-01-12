import Vue from "vue";
import Vuex from "vuex";

//Store Modules
import admin from "./Modules/admin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin
  }
});
