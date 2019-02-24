<template>
  <transition name="slide-bottom">
    <div class="maxPlayer-fullScreen"  >
      <div class="maxPlayer-bg" :style="{backgroundImage: 'url('+ player.nowPlaying.img +')'}"></div>
      <div class="maxPlayer-box">
            <van-nav-bar
        :title="player.nowPlaying.song_name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="maxPlayer-top">
          <h2>{{player.nowPlaying.author_name}}</h2>
        </div>
        <div class="maxPlayer-lrc">
        <div class="wrapper song-list-scroll" ref="wrapper">
        <div class="content">
            <div>
              <ul class="maxPlayer-lrc-list">
                <li v-for="(item, index) in songLrc" :class="{act: player.nowPlaying.currentTime > item.seconds && (index === songLrc.length-1 || player.nowPlaying.currentTime < songLrc[index+1].seconds)}">{{item.lrc}}</li>
              </ul>
            </div>
        </div>
        </div>
        </div>
        <div class="maxPlayer-bottom">
          <div class="maxPlayer-rangeBox" >
            <span class="maxPlayer-rangeBox-currentTime"></span>
            
            <span class="maxPlayer-rangeBox-timelength"></span>
          </div>
          <div class="maxPlayer-btn">
            <span class="maxPlayer-btn-mode">
              <i :class="['van-icon', {
                'van-icon-exchange': player.playMode === 1,
                'van-icon-shrink': player.playMode === 2,
                'van-icon-replay': player.playMode === 3,
              }]" @click="changePlayMode"></i>
            </span>
            <span class="maxPlayer-btn-prev" >
             <van-icon name="arrow-left" @click="prev()"/>
            </span>
            <span class="maxPlayer-btn-play">
             <van-icon :name="play ? 'pause' : 'play'" @click="revisePlay()"/>
            </span>
            <span class="maxPlayer-btn-next">
              <van-icon name="arrow" @click="next()"/>
            </span>
            <span class="maxPlayer-btn-listShow">
              <!--<i class="van-icon van-icon-todo-list-o" @click="playListPopup()"></i>-->
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import Bus from '@/utils/common/bus'
  import store from '@/utils/common/store'
  export default {
    components: {
       
    },
    data () {
      return {
        lrcIndex: 0
      }
    },
    watch: {
      playerCurrentTime () {
          this.$nextTick(() => {
          if (this.$store.state.player.nowPlaying.lyrics) {
          if (document.getElementsByClassName('act').length) {
               this.scroll.scrollToElement(this.$refs.wrapper,8000,0, document.getElementsByClassName('act')[0].offsetTop)
          } else {
              this.scroll.scrollToElement(this.$refs.wrapper,1000,0,0)
          }
        }
        })
        
      }
    },
    mounted(){
    this.$nextTick(() => {
       this.scroll = new BScroll(this.$refs.wrapper, this.options)
    })
    },
    methods: {
        playListPopup(){
            Bus.$emit('playListPopup');
        },
        changePlayMode(){
            Bus.$emit('changePlayMode');
        },
        prev(){
            Bus.$emit('prev');
        },
        next(){
            Bus.$emit('next');
        },
        revisePlay () {
            Bus.$emit('revisePlay')
        },
        onClickLeft() {
            this.$router.go(-1); //返回上一层
        }
    },
    computed: {
      ...mapState({
        playerCurrentTime: state => state.player.nowPlaying.currentTime,
        player: state => state.player,
        play: state => state.player.play,
        koGouSize: state => state.koGouSize,
        playListType:state=>state.player.playListType,
        hash: state=>state.player.nowPlaying.hash
      }),
      currentTime () {
        let time = parseInt(this.$store.state.player.nowPlaying.currentTime / 1000)
        let minute = parseInt(time / 60)
        let sec = time % 60 < 10 ? '0' + time % 60 : time % 60
        return minute + ':' + sec
      },
      timelength () {
        let time = parseInt(this.$store.state.player.nowPlaying.timelength / 1000)
        let minute = parseInt(time / 60)
        let sec = time % 60 < 10 ? '0' + time % 60 : time % 60
        return minute + ':' + sec
      },
      songLrc () {
        if (this.$store.state.player.nowPlaying.lyrics) {
          let temp = this.$store.state.player.nowPlaying.lyrics.split('\r\n')
          temp = temp.splice(0, temp.length - 1)
          temp = temp.map((value) => {
            let time = value.substr(1, 5)
            let seconds = parseFloat(time.split(':')[0] * 60 + parseFloat(time.split(':')[1])) * 1000
            let lrc = value.substr(10)
            return {
              seconds,
              lrc
            }
          })
          return temp
        }
      },
    }
  }
</script>

<style lang="less">
  .maxPlayer-fullScreen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    z-index: 103;
  }
  .maxPlayer-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: transparent;
    color: #edefef;
    &.vux-header .vux-header-left .left-arrow:before{
      border-color: #fff;
    }
    .vux-header-title{
      margin: 0 40px;
      font-size: 16px;
    }
  }
  .maxPlayer-bg{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: top center;
  }
  .maxPlayer-box{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    .van-nav-bar{
        background:transparent;
        .van-icon-arrow-left,.van-nav-bar__text{
            color:#23e379;
        }
        .van-nav-bar__title{
            color:#fff;
        }
        .van-nav-bar__text:active{
            background-color:transparent;
        }
    }
    .van-hairline--bottom::after{
        border-bottom-width: 0;
    }

    .maxPlayer-top{
    //   padding-top: 46px;
      text-align: center;
      h2{
        color: #edefef;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        &:before, &:after{
          content: '';
          margin: 0 5px;
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          border-bottom:#edefef 1px solid;
        }
      }
    }
  }
  .maxPlayer-bottom{
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    padding: 0 15px;
    text-align: center;
    .maxPlayer-btn{
      height: 68px;
      left: 68px;
      span{
        display: inline-block;
        vertical-align: middle;
      }
      .maxPlayer-btn-mode{
        float: left;
        width: 38px;
        height: 38px;
        line-height: 38px;
        margin-top: 15px;
        i{
          font-size: 22px;
          color: #edefef;
        }
      }
      .maxPlayer-btn-prev{
        width: 42px;
        height: 42px;
        line-height: 38px;
        text-align: center;
        border-radius: 50%;
        margin-right: 10px;
        background: rgba(#23e379,.8);
        i{
          font-size: 20px;
          color: #ffffff;
        }
      }
      .maxPlayer-btn-play{
        width: 68px;
        height: 68px;
        line-height: 80px;
        text-align: center;
        border-radius: 50%;
        background: rgba(#23e379,.8);
        i{
          font-size: 40px;
          color: #ffffff;
          &.icon-bofangsanjiaoxing{
            margin-left: 10px;
          }
        }
      }
      .maxPlayer-btn-next{
        width: 42px;
        height: 42px;
        line-height: 38px;
        text-align: center;
        border-radius: 50%;
        margin-left: 10px;
        background: rgba(#23e379,.8);
        i{
          font-size: 20px;
          color: #ffffff;
        }
      }
      .maxPlayer-btn-listShow{
        float: right;
        width: 38px;
        height: 38px;
        line-height: 38px;
        margin-top: 15px;
        i{
          font-size: 24px;
          color: #edefef;
        }
      }
    }
  }
  .maxPlayer-rangeBox{
    padding: 5px 0;
    margin: 0 30px 14px;
    position: relative;
    .maxPlayer-rangeBox-currentTime{
      position: absolute;
      top: -4px;
      left: -40px;
      color: #ffffff;
      width: 40px;
      text-align: center;
      font-size: 12px;
    }
    .maxPlayer-rangeBox-timelength{
      position: absolute;
      top: -4px;
      right: -40px;
      color: #ffffff;
      width: 40px;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
    }
    .maxPlayer-range{
      margin: 0 !important;
      .range-bar-disabled{
        opacity:1;
      }
      .range-min,.range-max{
        display: none;
        color: #ffffff;
      }
      .range-handle{
        background-color: #fff;
        width: 15px;
        height: 15px;
        top: -6px !important;
      }
      .range-quantity{
        background-color: #5dafac;
      }
    }
  }
  .maxPlayer-lrc{
    margin: 20px 0 30px;
    overflow: hidden;
    .xs-container{
      transition: all 0.5s linear;
    }
    .song-list-scroll{
        height:60vh;
        overflow:hidden;
    }
    .maxPlayer-lrc-list{
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 24px;
      li.act{
        color: #23e379;
      }
    }
  }

  .slide-bottom-leave-active,.slide-bottom-enter-active {
    transition: all 0.5s ease;
  }
  .slide-bottom-enter,.slide-bottom-leave-to{
    transform: translateX(100%);
  }
</style>
