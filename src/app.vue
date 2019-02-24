<template>
  <div id="app">
   <transition :name="transitionName" slot="default">
    <router-view class="child-view"></router-view>
    </transition>
    <player style="position:fixed;left:0;bottom:0;width:100%;z-index:102;" slot="bottom"></player>
  </div>
</template>

<script>
import player from '@/components/Moudle/player/player'
  export default {
    components: {
      player
    },
    name: 'app',
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/')[1].length;
        const fromDepth = from.path.split('/')[1].length;
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