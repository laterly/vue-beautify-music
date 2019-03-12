<template>
  <div class="rank main">
    <van-nav-bar
      title="歌手"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="search" slot="right"/>
    </van-nav-bar>
    <div
      class="van-cell van-cell--center van-cell--borderless van-cell--clickable van-contact-card van-contact-card--add"
    v-for="(item,index) in list" :key="index" @click="goToRankList(item)">
      <img class="rank-img" :src="item.imgUrl.replace('{size}', koGouSize)" />
      <div class="van-cell__value van-cell__value--alone van-contact-card__value">
        <div>{{item.singerName}}</div>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
  </div>
</template>
<script>
import store from "@/utils/common/store";
import { mapState } from "vuex";
export default {
  mounted() {},
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getRank();
  },
  computed: {
    ...mapState({
      koGouSize: state => state.koGouSize,
      count: state => state.count
    })
  },
  mounted() {},
  methods: {
    goToRankList(item) {
      this.$router.push({
        path: "/rankDetail",
        query: { singerid: item.singerId,page:0 }
      });
    },
    getRank() {
      let load = this.$loading();
      this.$http.getSingerList(this.$route.query).then(res => {
        load.clear();
        console.log(res);
        let data = res.data.singers.list.info;
        for (let item of data) {
          this.list.push({
            singerName: item.singername,
            imgUrl: item.imgurl,
            singerId: item.singerid,
          });
        }
      });
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
.rank {
  .rank-img {
    width: 80px;
    height: auto;
    border-radius: 3px;
  }

  .van-cell__value--alone {
    text-indent: 0.48rem;
  }

  .van-nav-bar {
    .van-icon {
      color: #23e379;
    }
  }

  .van-nav-bar__text {
    color: #23e379;
  }

  .van-cell__right-icon {
    color: #23e379;
  }
}
</style>