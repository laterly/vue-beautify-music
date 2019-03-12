<template>
  <div class="menu-detail fullScreen menu">
    <!-- <div class="vux-bg-blur" :style="'background:url('+info.imgUrl+') no-repeat center center'"></div> -->
    <img :src="info.imgUrl" class="vux-bg-blur">
    <div class="menu-box rel">
      <van-nav-bar
        :title="menuTitle"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="abs"
      ></van-nav-bar>
      <div class="van-card" style="margin-top:0;">
        <div class="van-card__header">
          <a class="van-card__thumb rel">
            <div class="thumb-img rel">
              <img :src="info.imgUrl" class="van-card__img">
            </div>
          </a>
          <div class="van-card__content rel">
            <div class="van-card__desc van-ellipsis"><span v-show="info.publishtime">更新频率:</span>{{info.publishtime}}</div>
            <div class="van-card__bottom">
              <div class="van-card__price">
                <span v-show="dateTime!='Invalid Date'">上次更新时间:</span>
                <span v-show="dateTime!='Invalid Date'">{{dateTime}}</span>
              </div>
              <!-- <div class="van-card__num">
                <van-tag
                  round
                  plain
                  type="success"
                  v-for="(item,index) in info.tags"
                  :key="index"
                >{{item.tagname}}</van-tag>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="song-list-menu">
      <div class="van-nav-bar van-hairline--bottom" style="z-index: 1;">
        <div class="van-nav-bar__left" @click="playAll">
          <i class="van-icon van-icon-play-circle-o van-nav-bar__arrow"></i>
          <span class="van-nav-bar__text">播放全部<span>(共{{totalSong}}首)</span></span>
        </div>
      </div>
      <div class="wrapper song-list-scroll" ref="wrapper">
      <div class="content">
      <div
        class="van-cell van-cell--clickable van-address-item"
        v-for="(item, index) in list"
        :key="index"
        @click="getSongDetails(item)"
      >
        <div class="van-cell__value van-cell__value--alone van-address-item__value">
          <div class="van-radio">
            <div class="van-radio__icon van-radio__icon--round">
              <div class="rank-des">{{index+1}}</div>
            </div>
            <span class="van-radio__label">
              <div class="van-address-item__name">{{item.filename}}</div>
              <div class="van-address-item__address">{{item.remark}}</div>
            </span>
          </div>
        </div>
        <i
          :class="['van-icon van-address-item__edit', play&&item.hash===hash ? 'van-icon-pause-circle-o' : 'van-icon-play-circle-o']"
        ></i>
      </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import store from "@/utils/common/store";
import date from "@/utils/common/date";
export default {
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, this.options);
      console.log(this.scroll);
    });
  },
  data() {
    return {
      info: [],
      totalSong: 0,
      dateTime: 0,
      list: [],
      page: 0,
      options: {
        click: true,
        taps: true
      }
    };
  },
  created() {
    if(this.$route.query.rankid)
    this.getSong();
    else
    this.gerSingerSong();
  },
  methods: {
    playAll() {
      store.local.set("playSongList", this.list);
      this.$store.commit("playListType", 2);
      this.getSongDetails(this.list[0]);
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getSong() {
      let load = this.$loading();
      console.log(this.$route.query.rankid);
      this.$http
        .getRankSongList({
          rankid: this.$route.query.rankid,
          json: true,
          page: this.page
        })
        .then(res => {
          console.log(res);
          load.clear();
          let list = res.data.info;
          this.info = {
            imgUrl: list.imgurl.replace("{size}", this.$store.state.koGouSize),
            specialname: list.rankname,
            publishtime: list.update_frequency
          };
          this.$store.dispatch("setMenuTitle", this.info.specialname);
          let data = res.data.songs.list;
          this.totalSong = data.length;
          this.dateTime = date.formatDate(res.data.songs.timestamp);
          for (let i = 0; i < data.length; i++) {
            this.list.push({
              filename: data[i].filename,
              remark: data[i].remark,
              hash: data[i].hash
            });
          }
        });
    },
    gerSingerSong(){
      let load = this.$loading();
      console.log(this.$route.query.rankid);
      this.$http
        .getSingerInfo( this.$route.query)
        .then(res => {
          console.log(res);
          console.log(res);
          load.clear();
          let list = res.data.info;
          this.info = {
            imgUrl: list.imgurl.replace("{size}", this.$store.state.koGouSize),
            
          };
          this.$store.dispatch("setMenuTitle", this.info.specialname);
          let data = res.data.songs.list;
          this.totalSong = data.length;
          this.dateTime = date.formatDate(res.data.songs.timestamp);
          for (let i = 0; i < data.length; i++) {
            this.list.push({
              filename: data[i].filename,
              remark: data[i].remark,
              hash: data[i].hash
            });
          }
        });
    },
    getSongDetails(item) {
      if (item.hash === this.$store.state.player.nowPlaying.hash) {
        this.$store.dispatch("revisePlay", !this.$store.state.player.play);
        return;
      }
      this.$http
        .getSongDetails({
          hash: item.hash
        })
        .then(res => {
          this.addPlayerList = {
            hash: res.data.data.hash,
            author_name: res.data.data.author_name,
            song_name: res.data.data.song_name,
            img: res.data.data.img,
            play_url: res.data.data.play_url,
            timelength: res.data.data.timelength,
            lyrics: res.data.data.lyrics,
            currentTime: 0,
            newRangeValue: 0
          };
          console.log(this.addPlayerList);
          this.$store.commit("nowPlayList", this.addPlayerList);
          let newPlayList = store.local.get("localPlayList")
            ? store.local.get("localPlayList")
            : [];
          let hashArr = [];
          for (let item of newPlayList) {
            hashArr.push(item.hash);
          }
          if (!hashArr.includes(res.data.data.hash)) {
            newPlayList.push(item);
          }
          store.local.set("localPlayList", newPlayList);
        });
    }
  },
  computed: {
    ...mapState({
      koGouSize: state => state.koGouSize,
      menuTitle: state => state.menuTitle,
      songListData: state => state.songList.list,
      playerList: state => state.playerList.list,
      player: state => state.player.player,
      play: state => state.player.play,
      hash: state => state.player.nowPlaying.hash
    })
  }
};
</script>

<style lang="less">
.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.menu-box {
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .van-nav-bar__title {
    color: #f5f5f5;
  }
  .van-nav-bar {
    .van-ellipsis {
      overflow: inherit;
    }
    .van-icon {
      color: #23e379;
    }
    width: 100%;
    left: 0;
    top: 0;
    background-color: transparent;
  }
  .van-nav-bar__text {
    color: #23e379;
  }
}
.menu-detail {
  .vux-bg-blur {
    z-index: -2;
    opacity: 1;
    position: absolute;
    display: block;
    max-height: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 5rem;
    -webkit-transition: opacity linear 0.8s;
    transition: opacity linear 0.8s;
    filter: blur(6px);
    background-size: cover !important;
  }
  .menu-box {
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    .van-nav-bar__text:active {
      background-color: transparent;
    }
    .van-card {
      background-color: transparent;
      z-index: 2;
      .van-card__content {
        padding-left: 0.48rem;
      }
      .van-card__title {
        font-size: 14px;
      }
      .van-card__desc {
        padding-top: 0.18rem;
        color: #f5f5f5;
      }
      .van-card__price {
        color: #f5f5f5;
        font-weight: normal;
      }
      .van-tag {
        margin-right: 0.1rem;
      }
      .van-card__num {
        float: inherit;
        margin-top: 0.2rem;
      }
      .thumb-img {
        width: 2.8rem;
        height: auto;
        border-radius: 4px;
        z-index: 2;
        img {
          border-radius: 4px;
        }
      }
      .van-card__thumb:after {
        content: "";
        position: absolute;
        width: 2.78rem;
        height: 2.78rem;
        margin-right: 0.48rem;
        border: 1px #23e379 solid;
        transform: rotate(5deg);
        border-radius: 4px;
        background: rgba(#23e379, 0.2);
        transform-origin: right bottom;
        left: -2px;
        top: 0px;
      }
    }
  }
}
.song-list-menu {
  .van-nav-bar__arrow {
    color: #23e379;
  }
  .van-nav-bar__text {
    color: #333;
    span {
      color: #7d7e80;
      font-size: 12px;
    }
  }
  .van-address-item {
    padding: 10px 15px;
  }
  .van-address-item__edit {
    color: #23e379;
  }
  .song-list-scroll {
    height: 52vh;
    overflow: hidden;
  }
}
</style>
