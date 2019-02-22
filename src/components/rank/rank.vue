<template>
  <div class="rank main">
    <van-nav-bar
      title="排行榜"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="search" slot="right"/>
    </van-nav-bar>
    <div
      class="van-cell van-cell--center van-cell--borderless van-cell--clickable van-contact-card van-contact-card--add"
    v-for="(item,index) in list" :key="index">
      <img class="rank-img" :src="item.imgUrl.replace('{size}', koGouSize)" />
      <div class="van-cell__value van-cell__value--alone van-contact-card__value">
        <div>{{item.rankName}}</div>
        <div>{{item.updateFrequency}}更新</div>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
  </div>
</template>
<script>
import store from "@/utils/common/store";
 import {mapState} from 'vuex'
export default {
  mounted() {},
  data() {
    return {
      list: []
    };
  },
  created() {
    let rankData=store.session.get('rankData')?store.session.get('rankData'):[];
    if(Number(rankData)===0)
      this.getRank();
    else
      this.list=rankData
  },
  computed: {
    ...mapState({
      koGouSize: state => state.koGouSize,
      count:state=>state.count
    })
  },
  mounted() {
     this.$store.commit('increment',222)
      this.$store.dispatch('minusPriceAsync', 5);
  },
  methods: {
    getRank() {
      let load=this.$loading();
      this.$http.getRank().then(res => {
        load.clear();
        let data = res.data.rank.list;
        for (let item of data) {
          this.list.push({
            rankName: item.rankname,
            id: item.id,
            imgUrl: item.imgurl,
            rankId: item.rankid,
            updateFrequency:item.update_frequency
          });
        }
        store.session.set('rankData',this.list);
        console.log(res);
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
.rank{
    .rank-img{
        width 80px;
        height auto;
        border-radius 3px;
    }
    .van-cell__value--alone{
        text-indent .48rem;
    }
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