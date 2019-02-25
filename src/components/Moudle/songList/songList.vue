<template>
    <div class="latest-song main">
        <div class="van-cell van-cell--clickable van-address-item" v-for="(item, index) in list" :key="index" @click="getSongDetails(item)" :list="listData">
          <div class="van-cell__value van-cell__value--alone van-address-item__value">
            <div class="van-radio">
                <div class="van-radio__icon van-radio__icon--round">
                    <div class="rank-des">{{index+1}}</div>
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
  props: {
    list:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      listData: [],
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
        let data=this.list;
        this.$store.commit('songList',data);
        for(let i=0;i<data.length;i++){
            this.list.push({
                filename:data[i].filename,
                remark:data[i].remark,
                hash:data[i].hash
            });
        }
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
          console.log(this.addPlayerList);
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
    .van-nav-bar__text {
        color: #23e379;
    }
    .van-address-item{
        padding: 10px 15px;
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