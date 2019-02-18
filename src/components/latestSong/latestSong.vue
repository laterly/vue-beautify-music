<template>
    <div class="latest-song">
        <van-nav-bar title="最新歌曲" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="search" slot="right"/>
        </van-nav-bar>
        <div class="van-cell van-cell--clickable van-address-item">
          <div class="van-cell__value van-cell__value--alone van-address-item__value">
            <div class="van-radio">
                <div class="van-radio__icon van-radio__icon--round">
                    <div class="rank-des">1</div>
                </div>
                <span class="van-radio__label">
                <div class="van-address-item__name">
                    歌名
                </div>
                <div class="van-address-item__address">
                    歌曲描述
                </div>
                </span>
                </div>
            </div>
            <i class="van-icon van-icon-play-circle-o van-address-item__play"></i>
            <i class="van-icon van-icon-arrow van-address-item__edit"></i>
        </div>
        <div class="van-cell van-cell--clickable van-address-item">
          <div class="van-cell__value van-cell__value--alone van-address-item__value">
            <div class="van-radio">
                <div class="van-radio__icon van-radio__icon--round">
                    <div class="rank-des">1</div>
                </div>
                <span class="van-radio__label">
                <div class="van-address-item__name">
                    歌名
                </div>
                <div class="van-address-item__address">
                    歌曲描述
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
export default {
  mounted() {},
  data() {
    return {
      sarchValue: "" //搜索的关键字
    };
  },
  created() {},
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
.latest-song {
    .van-nav-bar {
        .van-icon {
            color: #23e379;
        }
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
        width 12px;
        height 12px;
        line-height 12px;
        border-radius 100%;
        border 1px #ccc solid;
        text-align center;
        color #ccc;
        font-size:12px;
    }
}
</style>