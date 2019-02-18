import Vue from "vue";
import Router from "vue-router";
// 全加载
// import Index from '../components/Index'
// 懒加载
//首页
const Index = () => import("../components/index/index");
//搜索页
const Search = () => import("../components/search/search");
//最新歌曲
const Latest = () => import("../components/latestSong/latestSong");
//排行榜
const Rank = () => import("../components/rank/rank");
//歌单
const Menu = () => import("../components/menu/menu");

const List = () => import("../components/list/index");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Index
    },
    {
      path: "/search",
      component: Search
    },
     {
       path: "/latest",
       component: Latest
     },
     {
      path: "/rank",
      component: Rank
    },
    {
      path: "/menu",
      component: Menu
    },
    {
      path: "/list",
      component: List
    }
  ]
});
