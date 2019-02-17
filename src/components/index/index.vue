<template>
  <div class="index flex-column height-percent-100">
      <header-top></header-top>
      <tabs-top></tabs-top>
  </div>
</template>
<script>
import headerTop from '@/components/Moudle/headerTop/headerTop'
import tabsTop from '@/components/Moudle/tabsTop/tabsTop'
export default {
  components: {
    headerTop,
    tabsTop
  },
  mounted() {},
  data() {
    return {
      sarchValue: "111", //搜索的关键字
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

</style>