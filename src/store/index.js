import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    koGouSize: 400,
    count: 0,
    menuTitle: "",
    menuTitleImg: "",
    songList: {
      list: []
    },
    playerList: {
      show: false,
      list: []
    },
    player: {
      play: false,
      maxPlayerShow: false,
      nowIndex: -1,
      playListType: 1, //1：本地存储的列表 2播放songList的列表
      playMode: 1, // 1：顺序播放 2：随机播放 3：单曲循环
      nowPlaying: {
        author_name: "就是歌多",
        hash: "",
        img: "",
        lyrics: "",
        play_url: "",
        song_name: "在线音乐",
        timelength: 0,
        currentTime: 0,
        newRangeValue: 0
      }
    }
  },
  mutations: {
    loadPlayerList(state, payloa) {
      state.playerList.list = payload;
      state.player.nowIndex = 0;
      let data = state.playerList.list[0];
      state.player.nowPlaying = {
        author_name: data.author_name,
        hash: data.hash,
        img: data.img,
        lyrics: data.lyrics,
        play_url: data.play_url,
        song_name: data.song_name,
        timelength: data.timelength,
        currentTime: 0
      };
    },
    addPlayerList(state, payload) {
      state.playerList.list.push(payload);
      localStorage.setItem("playerList", JSON.stringify(state.playerList.list));
      if (state.player.nowIndex === -1) {
        state.player.nowIndex = 0;
      }
    },
    reviseNowIndex(state, payload) {
      state.player.nowIndex = payload;
    },
    songList(state, payload) {
      state.songList.list = payload;
    },
    nowPlayList(state, payload) {
      state.player.play = true;
      state.player.nowPlaying = payload;
    },
    nextPlay(state, payload) {
      state.player.nowPlaying = payload;
    },
    reviseCurrentTime(state, payload) {
      state.player.nowPlaying.currentTime = payload;
    },
    reviseRange(state, payload) {
      state.player.nowPlaying.newRangeValue = payload;
    },
    revisePlay(state, payload) {
      state.player.play = payload;
    },
    decrement(state) {
      state.count -= 1;
    },
    setMenuTitle(state, payload) {
      state.menuTitle = payload;
    },
    setMenuTitleImg(state, payload) {
      state.menuTitleImg = payload;
    },
    playListType(state, payload) {
      state.player.playListType = payload;
    }
  },
  actions: {
    //添加actions
    loadPlayerList(context, payload) {
      context.commit("loadPlayerList", payload);
    },
    minusPriceAsync(context, payload) {
      context.commit("increment", payload);
    },
    reviseCurrentTime(context, payload) {
      context.commit("reviseCurrentTime", payload);
    },
    reviseRange(context, payload) {
      context.commit("reviseRange", payload);
    },
    revisePlay(context, payload) {
      context.commit("revisePlay", payload);
    },
    nextPlay(context, payload) {
      context.commit("nextPlay", payload);
    },
    addPlayerList(context, data) {
      return new Promise((resolve, reject) => {
        context.commit("addPlayerList", data);
        resolve();
      });
    },
    reviseNowIndex(context, payload) {
      context.commit("reviseNowIndex", payload);
    },
    setMenuTitle(context, payload) {
      context.commit("setMenuTitle", payload);
    },
    setMenuTitleImg(context, payload) {
      context.commit("setMenuTitleImg", payload);
    }
  }
});

export default store
