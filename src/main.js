import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Components
import button from "./components/UI/button";

Vue.component("button", button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
