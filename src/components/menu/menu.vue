<template>
    <div class="menu">
        <van-nav-bar title="音乐歌单" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="search" slot="right"/>
        </van-nav-bar>
        
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
.menu {
    .van-nav-bar {
        .van-icon {
            color: #23e379;
        }
    }
    .van-nav-bar__text {
        color: #23e379;
    }
    
}
</style>