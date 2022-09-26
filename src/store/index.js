import Vue from 'vue'
import Vuex from 'vuex'
import addRouters from './permission'
import userDetail from './userdetail'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  modules: {
    addRouters,
    userDetail,
  },
})
