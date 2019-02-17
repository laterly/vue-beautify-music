<template>
    <div class="index">
     <van-button type="default">默认按钮</van-button><router-link to="/list"  slot="left">
            <h1 class="logo-box">
              酷狗
            </h1>
          </router-link>
    </div>
</template>
<script>
export default {
  name: "index",
  mounted() {},
  data() {
    return {
      sarchValue: "", //搜索的关键字
    };
  },
  created() {},
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