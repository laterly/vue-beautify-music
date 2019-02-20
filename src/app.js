// Import Vue
import Vue from 'vue';
import router from "./router";
import store from "./store";
import App from "./app.vue";
import http from "./utils/common/http";
import './utils/base'
Vue.prototype.$http = http;

// Init App
new Vue({
  el: "#app",
  router,
  store,
  // Register App Component
  render: h => h(App)
});
