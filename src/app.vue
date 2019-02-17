<template>
  <div id="app">
   <transition :name="transitionName" slot="default">
    <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(to,from);
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if(to.path===from.path)
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.child-view {
    position: absolute;
    width: 100%;
    transition: all .4s ease;
  }
.slide-left-enter, .slide-right-leave-active {
    transform: translateX(100%);
  }
.slide-left-leave-active, .slide-right-enter {
    transform: translateX(-100%);
}
</style>