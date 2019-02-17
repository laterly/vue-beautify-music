<template>
    <div class="music-room">
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in slides" :key="index"><img :src="item" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="nav">
      <ul class="flex-row">
        <li>
          <div class="link-icon linkc">
              <img src="@/assets/index/song.png" alt="" class="img-responsive">
          </div>
          <div class="link-des">最新歌曲</div>
        </li>
        <li>
          <div class="link-icon linkc">
              <img src="@/assets/index/menu.png" alt="" class="img-responsive">
          </div>
          <div class="link-des">音乐歌单</div>
        </li>
        <li>
          <div class="link-icon linkc">
              <img src="@/assets/index/rank.png" alt="" class="img-responsive">
          </div>
          <div class="link-des">排行榜</div>
        </li>
      </ul>
    </div>
    <div class="swiper-big-box">
      <div class="swiper-box">
        <div class="title">
          推荐歌单
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
     components: {
      swiper,
      swiperSlide
    },
  data() {
    return {
      slides: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
      ],
      swiperOption: {
        loop:true,
        initialSlide :1,
        autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        },
        autoplayDisableOnInteraction : false,
        slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        centeredSlides: true//<span style="color:rgb(68,68,68);font-family:'microsoft yahei';font-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
      }
    }
  },
  created() {
    //  http.getSingerClassify().then((res) => {
    //     console.log(res);
    //   })
  },
  mounted() {
         
  },
  methods: {
    
  }
};
</script>
<style lang="stylus" scoped>
.swiper{
    width 100%;
    height: 4.8rem;
    overflow: hidden;
    margin-top:.24rem;
    .swiper-slide{
      width: 80%;
      height: 4.8rem;
      img{
          display: block;
          margin: 0 auto;
          margin-top: 3.5%;
          // width: 90.625%;
          width: 100%;
          height: 90.625%;
          vertical-align: middle;
          -webkit-transition: all 1s ease 0s;
          -moz-transition: all 1s ease 0s;
          -ms-transition: all 1s ease 0s;
          -o-transition: all 1s ease 0s;
          transition: all 1s ease 0s;
        }
      }
      .swiper-slide-active{
         img{
            margin-top: 0;
            width: 100%;
            height: 100%;
            }
        }
}
.nav{
  margin-top:.64rem;
  ul{
    margin:0 .5rem;
    li{
      width:33%;
      height:auto;
      .link-icon {
        margin: 0 auto;
      }
      .linkc {
        width: 1.04rem;
        height: .96rem;
      }
      .link-des {
        text-align: center;
        font-size:.48rem;
        margin-top:.18rem;
      }
    }
  }
}
.swiper-box{
  .title{
    font-size:.72rem;
    height:1.9rem;
    line-height:2rem;
    text-indent:.48rem;
    font-weight:bold;
  }
}
</style>