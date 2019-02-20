<template>
    <div class="latest-song main">
        <van-nav-bar title="最新歌曲" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="search" slot="right"/>
        </van-nav-bar>
        <div class="van-cell van-cell--clickable van-address-item" v-for="(item, index) in list" :key="index" @click="getSongDetails(item.hash)">
          <div class="van-cell__value van-cell__value--alone van-address-item__value">
            <div class="van-radio">
                <div class="van-radio__icon van-radio__icon--round">
                    <div class="rank-des" :class="index<=2?'active':''" :style="'background:'+item.backgroundColor">{{index+1}}</div>
                </div>
                <span class="van-radio__label">
                <div class="van-address-item__name">
                    {{item.filename}}
                </div>
                <div class="van-address-item__address">
                    {{item.remark}}
                </div>
                </span>
                </div>
            </div>
             <i :class="['van-icon van-address-item__edit', play&&item.hash===hash ? 'van-icon-pause-circle-o' : 'van-icon-play-circle-o']" ></i>
        </div>
    </div>
</template>
<script>
import store from '@/utils/common/store'
import {mapState, mapActions} from 'vuex'
export default {
  mounted() {},
  data() {
    return {
      list: [],
      addPlayerList:{}
    };
  },
  created() {
      this.getNewSong();
  },
   computed: {
      ...mapState({
        songListData: state => state.songList.list,
        playerList: state => state.playerList.list,
        player: state => state.player.player,
        play: state => state.player.play,
        hash: state=>state.player.nowPlaying.hash,
      })
    },
  mounted() {},
  methods: {
    getNewSong(){
        let data=store.session.get('newSong');
       this.$store.commit('songList',data);
        for(let i=0;i<data.length;i++){
            let color='';
            if(i==0)
                color='#e80000'
            if(i==1)
                color='#ff7200'
            if(i==2)
                color='#ffae00'
            this.list.push({
                filename:data[i].filename,
                remark:data[i].remark,
                hash:data[i].hash,
                backgroundColor:color
            });
        }
    },
     getSongDetails (hash) {
        if(hash===this.$store.state.player.nowPlaying.hash){
             this.$store.dispatch('revisePlay',!this.$store.state.player.play);
             return;
        }
        this.$http.getSongDetails({
          hash: hash
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
              newPlayList.push(this.addPlayerList);
          }
          store.local.set('localPlayList',newPlayList)
        })
      },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onClickRight() {
      this.$router.push({ path: "/search" });
    }
  }
};
</script>
<style lang="stylus" scoped>
.latest-song {
    .van-nav-bar {
        .van-icon {
            color: #23e379;
        }
    }
    .van-address-item__value{
        padding-right: 60px;
    }
    .van-nav-bar__text {
        color: #23e379;
    }
    .van-address-item__play{
        position: absolute;
        top: 50%;
        right: 60px;
        font-size 16px;
        -webkit-transform: translate(0,-50%);
        transform: translate(0,-50%);    
    }
    .van-address-item__edit{
        font-size 16px;
    }
    .rank-des{
        width 16px;
        height 16px;
        line-height 16px;
        border-radius 100%;
        text-align center;
        color #333;
        font-size:12px;
    }
     .rank-des.active{
        color:#fff;
    }
    .van-address-item__edit{
        color:#23e379;
    }
}
</style>