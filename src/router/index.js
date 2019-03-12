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
//歌单详情
const MenuDetail = () => import("../components/menuDetail/menuDetail");
//排行榜详情
const RankDetail = () => import("../components/rankDetail/rankDetail");
//歌手
const Singer = () => import("../components/singer/singer");
//歌词播放器
const LyricsPlayer = () => import("../components/Moudle/lyricsPlayer/lyricsPlayer");
const List = () => import("../components/list/index");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Index,
      name: "index"
    },
    {
      path: "/search",
      component: Search,
      name: "search"
    },
    {
      path: "/latest",
      component: Latest,
      name: "latest"
    },
    {
      path: "/rank",
      component: Rank,
      name: "rank"
    },
    {
      path: "/menu",
      component: Menu,
      name: "menu"
    },
    {
      path: "/menuDetail",
      component: MenuDetail,
      name: "menuDetail"
    },
    {
      path: "/rankDetail",
      component: RankDetail,
      name: "rankDetail"
    },
    {
      path: "/singer",
      component: Singer,
      name: "singer"
    },
    {
      path: "/lyricsPlayer",
      component: LyricsPlayer,
      name: "lyricsPlayer"
    },
    {
      path: "/list",
      component: List,
      name: "list"
    }
  ]
});
