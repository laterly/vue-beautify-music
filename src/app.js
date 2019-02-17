// Import Vue
import Vue from 'vue';

// Import App Component
import App from './app.vue';
import router from "./router";
// Init F7 Vue Plugin

// Init App
new Vue({
  el: "#app",
  router,
  // Register App Component
  render: h => h(App)
});
