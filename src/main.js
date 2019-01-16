import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./Store/store";
import VueResource from "vue-resource";
import Vuelidate from "vuelidate";
import wysiwyg from 'vue-wysiwyg'

//VueMaterial
import { MdCard, MdContent, MdButton, MdDialog, MdTable, MdDialogConfirm } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";


//Components
import Button from "./components/UI/button";

Vue.component("app-button", Button);

//VueResource
Vue.use(VueResource);
Vue.http.options.root = "https://gamespot-54f0d.firebaseio.com/";

//Vuelidate
Vue.use(Vuelidate);

//Material
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdTable);
Vue.use(MdDialogConfirm);

//WYSIWYG
Vue.use(wysiwyg,{});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
