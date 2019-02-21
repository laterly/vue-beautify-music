<template>
  <div class="minPlayer">
    <!-- {{player}} -->
    <audio :src="player.nowPlaying.play_url" :autoplay="play" id="audioPlay" @timeupdate="change()"></audio>
    <div class="minPlayer-img">
      <img v-if="player.nowPlaying.img" :style="{ transform : 'rotate(' + rotate + 'deg)' }" :src="player.nowPlaying.img" alt="">
      <img v-if="!player.nowPlaying.img" src="@/assets/player/songImg.png" alt="">
    </div>
    <div class="minPlayer-rangeBox">
      <van-slider class="minPlayer-range" v-model="player.nowPlaying.newRangeValue" :max="player.nowPlaying.timelength" @change="onChange" />
    </div>
    <div class="minPlayer-ct">
      <div class="title">{{player.nowPlaying.song_name}}</div>
      <div class="desc">{{player.nowPlaying.author_name}}</div>
      <div class="minPlayer-ct-btn">
        <i :class="['van-icon', play ? 'van-icon-pause-circle-o' : 'van-icon-play-circle-o']" @click="revisePlay()"></i>
        <i class="van-icon van-icon-upgrade" @click="next"></i>
        <i class="van-icon van-icon-todo-list-o"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState} from 'vuex'
  import store from '@/utils/common/store'
  export default {
    watch: {
      play () {
        if (this.play) {
          document.getElementById('audioPlay').play()
          let that = this
          this.timer = setInterval(function () {
            if (that.rotate >= 360) {
              that.rotate = 0
            }
            that.rotate++
          }, 20)
        } else {
          document.getElementById('audioPlay').pause()
          clearInterval(this.timer)
        }
      },
      nowIndex () {
        if (this.nowIndex !== -1) {
          this.nowIndexReviseSong()
        }
      },
      range(){
        console.log();
      }
    },
    data () {
      return {
        rotate: 0,
        timer: '',
        value:0
      }
    },
    created(){
      console.log(this.$store.state);
    },
    computed: {
      ...mapState({
        player: state => state.player,
        play: state => state.player.play,
        nowIndex: state => state.player.nowIndex,
        koGouSize: state => state.koGouSize,
        count:state=>state.count
      })
    },
    methods: {
      change () {
        let newTime=parseInt(document.getElementById('audioPlay').currentTime * 1000);
        let per=100;
        let songTimeLength=this.$store.state.player.nowPlaying.timelength;
        let newRange=parseInt(newTime*100/songTimeLength);
        this.$store.dispatch('reviseCurrentTime',document.getElementById('audioPlay').currentTime*1000);
        this.$store.dispatch('reviseRange',newRange);
        if(newRange==100){
          this.$store.dispatch('revisePlay',false);
          //循环下首歌
          this.next();
        }
          
      },
      onChange () {
        //  if (this.play) {
          // let e = event || window.event;
          // console.log(e);
          let site = this.$store.state.player.nowPlaying.newRangeValue / 100 * this.player.nowPlaying.timelength;
          this.$store.dispatch('reviseCurrentTime',document.getElementById('audioPlay').currentTime*1000);
          document.getElementById('audioPlay').currentTime = site / 1000;
        // }
       
      },
      revisePlay(){
        if(this.$store.state.player.nowPlaying.song_name=='在线音乐')
          return;
        if(this.$store.state.player.nowPlaying.newRangeValue===100){
          this.$store.dispatch('reviseRange',0);
          this.$store.dispatch('reviseCurrentTime',0);
          document.getElementById('audioPlay').currentTime=0;
        }
          this.$store.dispatch('revisePlay',!this.$store.state.player.play);
      },
      next(){
        let nowHash=this.$store.state.player.nowPlaying.hash;
        let newPlayList=store.local.get('localPlayList')?store.local.get('localPlayList'):[];
        if(!newPlayList.length===0){
          this.$toast('播放队列没有歌曲，请先播放几首歌曲后再操作');
          return;
        }
        let data=newPlayList;
        let len=data.length;
        for(let i=0;i<len;i++){
          if(data[i].hash===nowHash&&len===1){
             this.$toast('播放队列没有歌曲，请先播放几首歌曲后再操作');
             return;
          }else if(data[i].hash===nowHash&&i!=len-1){
             this.$store.commit('nowPlayList',data[i+1]);
             return;
          }else if(data[i].hash===nowHash&&i===len-1){
             this.$store.commit('nowPlayList',data[0]);
             return;
          }
        }
        this.$store.commit('nowPlayList',data[0]);
      }
    }
  }
</script>

<style lang="less">
  .minPlayer{
    font-size:14px;
    height: 55px;
    padding: 0 10px 0 80px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 -2px 2px #e9e9e9;
    background-color: #ffffff;
    .minPlayer-img{
      float: left;
      width: 60px;
      height: 60px;
      margin-left: -70px;
      margin-top: -10px;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 10px #999;
      }
    }
    .minPlayer-ct{
      position: relative;
      margin-top: 3px;
      padding-right: 118px;
      .title{
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .desc{
        font-size: 12px;
        line-height: 18px;
        color: #ababab;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .minPlayer-ct-btn{
        position: absolute;
        right: 0;
        top: 5px;
        i{
          display: inline-block;
          vertical-align: middle;
          font-size: 26px;
          width:36px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #555555;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          &.van-icon-upgrade{
            display: inline-block;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
  .minPlayer-rangeBox{
    padding-top: 8px;
  }
  .van-slider__bar{
    background-color: #23e379!important;
  }
  .minPlayer-range{
    .van-slider__button{
      width: 8px;
      height: 8px;
    }
    margin: 0 !important;
    .range-bar-disabled{
      opacity:1;
    }
    .range-min,.range-max{
      display: none;
    }
    .range-handle{
      background-color: #51ccff;
      width: 8px;
      height: 8px;
      top: -3px !important;
    }
    .range-quantity{
      background-color: #51ccff;
    }
  }
</style>
