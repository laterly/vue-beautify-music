<template>
    <div class="tab main flex1">
      <van-tabs v-model="active" animated>
        <van-tab v-for="(item,index) in tabs" :title="item.name" :key="index">
           <my v-if="active===0"></my>
           <music-room v-if="active===1"></music-room>
           <active v-if="active===2"></active>
        </van-tab>
      </van-tabs>
    </div>
</template>
<script>
import http from "@/utils/common/http.js";
import musicRoom from "@/components/Moudle/musicRoom/musicRoom";
import my from "@/components/Moudle/my/my";
import active from "@/components/Moudle/active/active";
export default {
  components: {
    musicRoom,
    my,
    active
  },
  data() {
    return {
      active: 1,
      tabs: [
        {
          name: "我的",
          active: 0
        },
        {
          name: "音乐室",
          active: 1
        },
        {
          name: "动态",
          active: 2
        }
      ] //搜索的关键字
    };
  },
  created() {
    //  http.getSingerClassify().then((res) => {
    //     console.log(res);
    //   })
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
</style>