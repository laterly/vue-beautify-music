import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    koGouSize: 400,
    count:0,
  },
  mutations: {
    increment (state) {
      state.count += 1
    },
    decrement (state) {
      state.count -= 1
    }
  }
})

export default store
