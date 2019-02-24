<template>
<div>
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
        <i class="van-icon van-icon-todo-list-o" @click="playListPopup"></i>
      </div>
    </div>
  </div>
   <van-popup v-model="show" position="bottom" :overlay="true" :lock-scroll="true">
      <div class="van-nav-bar van-hairline--bottom" style="z-index: 1;">
        <div class="van-nav-bar__left"  @click="changePlayMode">
          <i class="van-icon van-nav-bar__arrow" :class="playModeList[playModeNum-1].icon"></i>
          <span class="van-nav-bar__text">{{playModeList[playModeNum-1].name}}<span>(共{{totalSong}}首)</span></span>
        </div>
      </div>
      <div style="height:6rem;overflow:auto">
       <div
        class="van-cell van-cell--clickable van-address-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="van-cell__value van-cell__value--alone van-address-item__value" @click="getSongDetails(item)">
          <div class="van-radio">
            <div class="van-radio__box">
              <div class="rank-des" v-if="play&&item.hash===hash"><van-icon name="music-o" :style="{ transform : 'rotate(' + rotate + 'deg)' }"/></div>
              <div class="rank-des" v-else>{{index+1}}</div>
            </div>
            <span class="van-radio__label">
              <div class="van-address-item__name">{{item.filename}}</div>
            </span>
          </div>
        </div>
        <i class="van-icon van-address-item__edit van-icon-delete" style="color:#7d7e80" @click="delPlayList(item.hash)"></i>
      </div>
      </div>
    </van-popup>
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
        value:0,
        show:false,
        list:[],
        totalSong:0,
        playModeList:[{
            id:1,
            icon:'van-icon-exchange',
            name:'顺序播放'
          },
          {
            id:2,
            icon:'van-icon-shrink main-color',
            name:'随机播放'
          },
          {
            id:3,
            icon:'van-icon-replay main-color',
            name:'单曲循环'
          },
        ],
        playModeNum:-1
      }
    },
    created(){
      this.getPlayMode();
    },
    computed: {
      ...mapState({
        player: state => state.player,
        play: state => state.player.play,
        nowIndex: state => state.player.nowIndex,
        koGouSize: state => state.koGouSize,
        count:state=>state.count,
        playLisytType:state=>state.player.playLisytType,
        hash: state=>state.player.nowPlaying.hash
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
          //循环下首歌
          this.$store.dispatch('revisePlay',false);
          let playMode=store.local.get('playMode');
          if(playMode===1){
            this.next();
          }else if(playMode===2){
            //随机播放
            this.next();
          }else if(playMode===3){
            //单曲循环
            this.replay();
          }
        }
          
      },
      onChange () {
          let site = this.$store.state.player.nowPlaying.newRangeValue / 100 * this.player.nowPlaying.timelength;
          this.$store.dispatch('reviseCurrentTime',document.getElementById('audioPlay').currentTime*1000);
          document.getElementById('audioPlay').currentTime = site / 1000;
      },
      replay(){
          this.$store.dispatch('reviseRange',0);
          this.$store.dispatch('reviseCurrentTime',0);
          document.getElementById('audioPlay').currentTime=0;
          this.$store.dispatch('revisePlay',true);
          document.getElementById('audioPlay').play();
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
      delPlay(){
       this.$store.commit('nowPlayList',{
        author_name: '就是歌多',
        hash: '',
        img: '',
        lyrics: '',
        play_url: '',
        song_name: '在线音乐',
        timelength: 0,
        currentTime: 0,
        newRangeValue:0
      });
      this.$store.dispatch('revisePlay',false);
      },
      next(){
        let nowHash=this.$store.state.player.nowPlaying.hash;
        let newPlayList=store.local.get('localPlayList')?store.local.get('localPlayList'):[];
        if(newPlayList.length===0){
          this.$toast('播放队列没有歌曲，请先播放几首歌曲后再操作');
          return;
        }
        let data=newPlayList;
        let len=data.length;
        if(!nowHash){
          this.songDetails(data[0].hash)
          return;
        }
        if(this.playModeNum===2){
          let randomNum=Math.round(Math.random()*len);
          this.songDetails(data[randomNum].hash);
          return;
        }
        for(let i=0;i<len;i++){
          if(data[i].hash===nowHash&&len===1){
             this.$toast('播放队列没有歌曲，请先播放几首歌曲后再操作');
             return;
          }else if(data[i].hash===nowHash&&i!=len-1){
             this.songDetails(data[i+1].hash)
             return;
          }else if(data[i].hash===nowHash&&i===len-1){
             this.songDetails(data[0].hash)
             return;
          }
        }
        this.$store.commit('nowPlayList',data[0]);
      },
      getPlayList(){
        this.list=[];
        let type=this.$store.state.player.playLisytType
        switch(type)
        {
          case 1:
            let data=store.local.get('localPlayList')?store.local.get('localPlayList'):[];
            this.list=data;
            this.totalSong=data.length;
            break;
          case 2:
          
            break;
          default:
         
        }
      },
      delPlayList(hash){
        this.list = this.list.filter((obj)=> {
            if(hash===this.$store.state.player.nowPlaying.hash){
              this.delPlay();
            }
						return hash !== obj.hash;
				});
        this.totalSong=this.list.length;
        store.local.set('localPlayList',this.list);
      },
      playListPopup(){
        this.show=true;
        this.getPlayList();
      },
      songDetails(hash){
        let detail=[];
        this.$http.getSongDetails({
          hash: hash
        }).then((res) => {
          detail={
            hash: res.data.data.hash,
            author_name: res.data.data.author_name,
            song_name: res.data.data.song_name,
            img: res.data.data.img,
            play_url: res.data.data.play_url,
            timelength: res.data.data.timelength,
            lyrics: res.data.data.lyrics,
            currentTime:0,
            newRangeValue:0
          }
          this.$store.commit('nowPlayList',detail);
        });
      },
      getSongDetails (item) {
        if(item.hash===this.$store.state.player.nowPlaying.hash){
             this.$store.dispatch('revisePlay',!this.$store.state.player.play);
             return;
        }
        this.$http.getSongDetails({
          hash: item.hash
        }).then((res) => {
          this.addPlayerList={
            hash: res.data.data.hash,
            author_name: res.data.data.author_name,
            song_name: res.data.data.song_name,
            img: res.data.data.img,
            play_url: res.data.data.play_url,
            timelength: res.data.data.timelength,
            lyrics: res.data.data.lyrics,
            currentTime:0,
            newRangeValue:0
          }
          this.$store.commit('nowPlayList',this.addPlayerList);
          let newPlayList=store.local.get('localPlayList')?store.local.get('localPlayList'):[];
          let hashArr=[];
          for(let item of newPlayList){
            hashArr.push(item.hash);
          }
          if(!hashArr.includes(res.data.data.hash)){
              newPlayList.push(item);
          }
          store.local.set('localPlayList',newPlayList)
        })
      },
      getPlayMode(){
        let playMode=store.local.get('playMode');
        this.playModeNum=playMode;
      },
      changePlayMode(){
        let i=this.playModeNum+1;
        if(i>3){
          i=1;
        }
        this.playModeNum=i;
        store.local.set('playMode',i);
        this.$toast(this.playModeList[i-1].name);
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
          &.van-icon-play-circle-o{
            color: #23e379;
          }
          &.van-icon-pause-circle-o{
             color: #23e379;
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
.van-popup{
  .van-icon-exchange {
    color: #333!important;
  }
  .van-nav-bar__text {
    color: #333;
    span{
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
  .van-popup{
    overflow: inherit;
  }
  .van-radio__box{
    top: 50%;
    left: 0;
    height: 16px;
    position: absolute;
    line-height: 16px;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
    .rank-des{
      display: inline-block;
      .van-icon-music-o{
        color: #23e379;
      }
    }
  }
}
</style>
