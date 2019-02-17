import './base.styl'
import "./common/rem";
import Vue from "vue";
import { NavBar, Button, Cell, Search, Tab, Tabs } from "vant";
Vue.use(Button)
  .use(NavBar)
  .use(Search)
  .use(Tab)
  .use(Tabs);
