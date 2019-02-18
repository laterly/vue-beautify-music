<template>
    <div class="latest-song">
        <van-nav-bar title="最新歌曲" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="search" slot="right"/>
        </van-nav-bar>
        <div class="van-cell van-cell--clickable van-address-item" v-for="(item, index) in songListData" :key="index">
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
            <i class="van-icon van-icon-play-circle-o van-address-item__play"></i>
            <i class="van-icon van-icon-arrow van-address-item__edit"></i>
        </div>
    </div>
</template>
<script>
import store from '@/utils/common/store'
export default {
  mounted() {},
  data() {
    return {
      songListData: [] 
    };
  },
  created() {
      this.getNewSong();
  },
  mounted() {},
  methods: {
    getNewSong(){
        let data=store.session.get('newSong');
        console.log('newSong',data);
        for(let i=0;i<data.length;i++){
            let color='';
            if(i==0)
                color='#e80000'
            if(i==1)
                color='#ff7200'
            if(i==2)
                color='#ffae00'
            this.songListData.push({
                filename:data[i].filename,
                remark:data[i].remark,
                hash:data[i].hash,
                backgroundColor:color
            });
        }
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
        color #ccc;
        font-size:12px;
    }
     .rank-des.active{
        color:#fff;
    }
}
</style>