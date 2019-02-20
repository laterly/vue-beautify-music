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
  AddressList,
  Toast,
  Slider 
} from "vant";
Vue.use(Icon)
  .use(Button)
  .use(NavBar)
  .use(Cell)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem)
  .use(AddressList)
  .use(Toast)
  .use(Slider);
function loading(text){ 
 return Toast.loading({
   duration: 0, // 持续展示 toast
   forbidClick: true, // 禁用背景点击
   message: text || "请稍后..."
 });
}
let toast = {
  msg: (text) => {
    Toast(text);
  },
  success: (text) => {
    Toast.success(text);
  },
  fail: (text) => {
    Toast.fail(text);
  }
};

Vue.prototype.$loading = loading;
Vue.$toast = toast;

