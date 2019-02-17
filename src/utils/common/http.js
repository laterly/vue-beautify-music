import axios from "axios";
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "";

//http request 拦截器

export default {
  /* 获取新歌 */
  getNewSongs() {
    return axios.get("/m/?json=true");
  },

  /* 获取排行榜 */
  getRank() {
    return axios.get("/m/rank/list&json=true");
  },

  /* 获取排行榜下歌曲列表 */
  getRankSongList(par) {
    return axios.get("/m/rank/info/", { params: par });
  },

  /* 获取歌单列表 */
  getSongMenu(par) {
    return axios.get("/m/plist/index&json=true", { params: par });
  },

  /* 获取歌单歌曲列表详情 */
  getSongMenuDetails(par) {
    return axios.get("/m/plist/list/" + par + "?json=true");
  },

  /* 获取歌手分类 */
  getSingerClassify() {
    return axios.get("/m/singer/class&json=true");
  },

  /* 获取歌手分类下面的歌手列表 */
  getSingerList(par) {
    return axios.get(
      "/m/singer/list/" + par.classid + "?json=true&page=" + par.page
    );
  },

  /* 歌手信息 */
  getSingerInfo(par) {
    return axios.get(
      "/m/singer/info/" + par.singerid + "?json=true&page=" + par.page
    );
  },

  /* 热门搜索列表 */
  getHotSearch() {
    return axios.get("/aproxy/api/v3/search/hot?format=json&plat=0&count=30");
  },

  /* 音乐搜索 */
  getSongSearch(par) {
    return axios.get("/aproxy/api/v3/search/song", { params: par });
  },

  /* 音乐详情 */
  getSongDetails(par) {
    return axios.get("/www/yy/index.php?r=play/getdata", { params: par });
  }
};