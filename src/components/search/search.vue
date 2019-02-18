<template>
    <div class="search">
        <form action="/">
        <van-search
            autofocus="autofocus"
            v-model="sarchValue"
            placeholder="你想听什么?"
            show-action
            @search="onSearch"
            @cancel="onCancel"
        />
        </form>
        <div class="search-recommend">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="大家都在搜" name="1">
              <ul class="recommend-btn flex-row">
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
                <li class="flex-center">热门搜索</li>
              </ul>
            </van-collapse-item>
            <van-collapse-item title="搜索历史" name="2">
              <div class="des-btn"></div>
            </van-collapse-item>
          </van-collapse>
        </div>
    </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {
      sarchValue: "", //搜索的关键字
      activeNames:['1']
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSearch() {},
    onCancel() {
      console.log("111");
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="stylus" scoped>

.search-recommend {
  .van-collapse-item__content{
  }
  .recommend-btn{
    li{
      padding 4px 10px 4px 10px;
      background-color rgb(242, 242, 242);
      border-radius 4px;
      margin-right:.4rem;
      color:rgba(0,0,0,.7);
      margin-top .1rem;
    }
  }
}
</style>