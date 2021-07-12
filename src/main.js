import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/global.css";
import axios from "./plugin/axios";
import moment from "./moments/moment";
import "./filter/index"
import "./filter/filterTwo"
import "./filter/filterThree"
import './plugins/element.js'
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
