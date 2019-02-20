<template>
    <div class="header">
      <div class="van-nav-bar" style="z-index: 1;">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-wap-nav van-nav-bar__arrow"></i>
        </div>
        <router-link to="/Search"  slot="left">
        <div class="van-nav-bar__title van-ellipsis">
         <div class="van-cell van-cell--borderless van-field">
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input type="search" placeholder="你想听什么？" class="van-field__control" disabled>
              </div>
            </div>
            <div class="van-field__right-icon">
              <i class="van-icon van-icon-search"></i>
            </div>
         </div>
        </div>
        </router-link>
        <div class="van-nav-bar__right">
        <i class="van-icon van-icon-comment-o"></i>
        </div>
      </div>
    </div>
</template>
<script>

export default {
};
</script>
<style lang="stylus" scoped>
.header{
  height:1.25rem;
  .van-nav-bar{
    height: inherit;
  }
  .van-nav-bar__text,.van-nav-bar .van-icon{
    color:#000;
  }
  .van-nav-bar .van-nav-bar__arrow,.van-nav-bar .van-nav-bar__right{
    font-size:.6rem;
  }
  .van-cell{
    margin: 10px 0;
    padding:0 0;
    background-color: #f8f8f8;
    border-radius:40px;
  }
  .van-field__control{
    text-indent:.42rem;
    color: #323233;
    font-size:14px;
    font-weight normal;
  }
  .van-field__clear, .van-field__right-icon{
    margin-right:.1rem;
  }
}
</style>