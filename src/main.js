import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./Store/store";
import VueResource from "vue-resource";
import Vuelidate from "vuelidate";

//VueMaterial
import { MdCard } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";

//Components
import Button from "./components/UI/button";

Vue.component("app-button", Button);

//VueResource
Vue.use(VueResource);
Vue.http.options.root = ""

//Vuelidate
Vue.use(Vuelidate);

//Material
Vue.use(MdCard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
