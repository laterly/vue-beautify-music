<template>
  <div class="music-room">
    <div class="swiper-banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in slides" :key="index">
          <img :src="item.imgUrl">
        </swiper-slide>
         <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="nav">
      <ul class="flex-row">
        <li @click="goLink('/latest')">
          <div class="link-icon linkc">
            <img src="@/assets/index/song.png" alt>
          </div>
          <div class="link-des">最新歌曲</div>
        </li>
        <li @click="goLink('/menu')">
          <div class="link-icon linkc">
            <img src="@/assets/index/menu.png" alt>
          </div>
          <div class="link-des">音乐歌单</div>
        </li>
        <li @click="goLink('/rank')">
          <div class="link-icon linkc">
            <img src="@/assets/index/rank.png" alt>
          </div>
          <div class="link-des">榜单</div>
        </li>
        <li @click="goLink('/singer')">
          <div class="link-icon linkc">
            <img src="@/assets/index/singer.png" alt>
          </div>
          <div class="link-des">歌手</div>
        </li>
      </ul>
    </div>
    <div class="swiper-big-box clearfix">
      <div class="swiper-box">
        <div class="title">推荐歌单</div>
        <div class="recommend">
            <div class="recommend-ul clearfix">
              <div class="recommend-li rel" v-for="(item, index) in songData[0]" :key="index" @click="openMenu(item.specialid)">
                <div class="recommend-box rel">
                  <img v-lazy="item.imgUrl.replace('{size}', koGouSize)" />
                  <div class="recommend-desc abs"><van-icon name="audio" /><span>{{item.playCount}}</span></div>
                </div>
                <div class="text">{{item.specialName}}</div>
              </div>
            </div>
        </div>
      </div>
      <div class="swiper-box">
        <div class="title">推荐合辑</div>
        <div class="recommend">
            <div class="recommend-ul clearfix">
              <div class="recommend-li rel" v-for="(item, index) in songData[1]" :key="index" @click="openMenu(item.specialid)">
                <div class="recommend-box rel">
                  <img v-lazy="item.imgUrl.replace('{size}', koGouSize)" />
                  <div class="recommend-desc abs"><van-icon name="audio" /><span>{{item.playCount}}</span></div>
                </div>
                <div class="text">{{item.specialName}}</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import store from "@/utils/common/store";
import array from "@/utils/common/array";
import numberUnit from "@/utils/common/number";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      slides: [],
      slides1: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg"
      ],
      swiperOption: {
        loop: true,
        initialSlide: 1,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        },
        autoplayDisableOnInteraction: false,
        centerInsufficientSlides: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: "auto", //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        centeredSlides: true //<span style="color:rgb(68,68,68);font-family:'microsoft yahei';font-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
      },
      songData: []
    };
  },
  created() {
    let bannerData = store.session.get("banner")
      ? store.session.get("banner")
      : [];
    if (Number(bannerData) === 0) this.getBanner();
    else this.slides = bannerData;

    let songData = store.session.get("songData")
      ? store.session.get("songData")
      : [];
    if (Number(songData) === 0) {
      this.getSong();
    } else {
      this.songData = songData;
    }

    this.setPlayMode();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    count() {
      return this.$store.state.count;
    },
    ...mapState({
      koGouSize: state => state.koGouSize
    })
  },
  mounted() {},
  methods: {
    setPlayMode() {
      let playMode = store.local.get("playMode")
        ? store.local.get("playMode")
        : 1;
      store.local.set("playMode", playMode);
    },
    openMenu(specialid) {
      this.$router.push({
        path: "/menuDetail",
        query: { specialid: specialid }
      });
    },
    getBanner() {
      let load = this.$loading();
      this.$http.getNewSongs().then(res => {
        load.clear();
        store.session.set("newSong", res.data.data);
        let data = res.data.banner;
        for (let i = 0; i < data.length; i++) {
          this.slides.push({
            id: data[i].id,
            imgUrl: data[i].imgurl,
            title: data[i].title
          });
        }
        store.session.set("banner", this.slides);
        this.swiper.update();
        this.swiper.slideNext();
        // if (data.length >= 3) this.swiper.slideNext();
      });
    },
    goLink(link) {
      this.$router.push({ path: `${link}` });
    },
    getSong() {
      let load = this.$loading();
      this.$http
        .getSongMenu({
          page: 0
        })
        .then(res => {
          load.clear();
          let data = res.data.plist.list.info;
          for (let i = 0; i < data.length; i++) {
            this.songData.push({
              suid: data[i].suid,
              imgUrl: data[i].imgurl,
              playCount: numberUnit.convert(data[i].playcount),
              specialName: data[i].specialname,
              specialid: data[i].specialid
            });
          }
          this.songData = array.splitArrary(this.songData, 6);
          store.session.set("songData", this.songData);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.swiper-banner {
  width: 100%;
  height: auto;
  overflow: hidden;

  .swiper-slide:first-child {
    padding-left: 0;
  }

  .swiper-slide:last-child {
    padding-right: 10px;
  }

  .swiper-slide {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    width: 85%;
    height: auto;

    img {
      border-radius: 4px;
      display: block;
      margin: 0 auto;
      margin-top: 3.5%;
      // width: 90.625%;
      width: 100%;
      height: auto;
      vertical-align: middle;
      -webkit-transition: all 1s ease 0s;
      -moz-transition: all 1s ease 0s;
      -ms-transition: all 1s ease 0s;
      -o-transition: all 1s ease 0s;
      transition: all 1s ease 0s;
    }
  }

  .swiper-slide-active {
    img {
      width: 100%;
      height: auto;
    }
  }

  .swiper-pagination-bullet {
    width: 16px;
    height: 2px;
    background: #23e379;
  }
}

.nav {
  margin-top: 0.2rem;

  // padding-bottom: 0.45rem;
  ul {
    // margin: 0 0.5rem;

    li {
      width: 25%;
      height: auto;

      .link-icon {
        margin: 0 auto;
        img{
          height: .8rem;
          width auto;
        }
      }

      .linkc {
        width: 30px;
        height: auto;
      }

      .link-des {
        text-align: center;
        font-size: 14px;
      }
    }
  }
}

.swiper-big-box {
  .title {
    font-size: 0.52rem;
    padding-top: 0.4rem;
    font-weight: bold;
    text-indent: 0.48rem;
  }

  .recommend {
    height: auto;

    .recommend-ul {
      width: 100%;
      padding-top: 0.28rem;
      padding-left: 0.48rem;

      .swiper-slide:last-child {
        padding-right: 0.48rem;
      }

      .recommend-li:after {
        content: '';
        position: absolute;
        width: 2.8rem;
        height: 2.8rem;
        margin-right: 0.48rem;
        border: 1px #23e379 solid;
        transform: rotate(5deg);
        border-radius: 4px;
        background: rgba(#23e379, 0.2);
        transform-origin: right bottom;
        left: -3px;
        top: -1px;
      }

      .recommend-li {
        height: auto;
        width: 2.78rem;
        margin-top: 0.48rem;
        float: left;
        margin-right: 0.62rem;

        .recommend-box {
          z-index: 2;
          width: 2.78rem;
          height: 2.78rem;
          border-radius: 4px;

          img {
            width: 2.78rem;
            height: 100%;
            border-radius: 4px;
          }

          .recommend-desc {
            color: #fff;
            width: 100%;
            height: 100%;
            line-height: 4.8rem;
            vertical: middle;
            bottom: 0;
            border-radius: 3px;
            font-size: 12px;
            // background rgba(0,0,0,.01);
            // box-shadow:inset 0px 15px 15px -15px rgba(0,0,0,1),
            // inset 0px -15px 15px -15px rgba(0,0,0,1);
            left: 0;
            text-indent: 0.06rem;

            span {
              display: inline-block;
              height: 50px;
              line-height: 50px;
              padding-bottom: 5px;
            }
          }
        }

        .text {
          overflow: hidden;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          display: -webkit-box;
          display: box;
          font-size: 14px;
          color: #333;
          height: 1.1rem;
          padding-top: 0.1rem;
          line-height: 0.55rem;
        }
      }

      .recommend-li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>