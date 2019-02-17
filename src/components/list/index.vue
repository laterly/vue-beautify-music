<template>
    <div class="index">
     <van-button type="default">默认按钮</van-button>list
    </div>
</template>
<script>
import http from '@/utils/common/http.js'
export default {
  name: "index",
  mounted() {},
  data() {
    return {
      sarchValue: "", //搜索的关键字
    };
  },
  created() {
     http.getSingerClassify().then((res) => {
        console.log(res);
      })
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>
<style lang="stylus" scoped>
.index-search {
  height: 1rem;
}
.swipe-box {
  height: 3.66rem;
  img {
    height: 3.66rem;
  }
}
.index-tab{
  height .5rem;
}
</style>