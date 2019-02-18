import './base.styl'
import rem from "./common/rem";
rem();
import Vue from "vue";
import {
  Icon,
  NavBar,
  Button,
  Cell,
  Search,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  AddressList
} from "vant";
Vue.use(Icon)
  .use(Button)
  .use(NavBar)
  .use(Cell)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem).use(AddressList);
