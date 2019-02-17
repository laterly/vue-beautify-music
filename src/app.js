// Import Vue
import Vue from 'vue';

// Import App Component
import App from './app.vue';
//定义全局变量
import router from "./router";

// Init F7 Vue Plugin
import { Button, Cell } from "vant";
Vue.use(Button);
import './utils/base'
// Init App
new Vue({
  el: "#app",
  router,
  // Register App Component
  render: h => h(App)
});
