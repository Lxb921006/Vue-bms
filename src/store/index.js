import Vue from 'vue'
import Vuex from 'vuex'
import addRouters from './permission'
import userDetail from './userdetail'
import runningProcess from './process'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    addRouters,
    userDetail,
    runningProcess,
  },
})
