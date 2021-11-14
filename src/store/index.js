import Vue from 'vue'
import Vuex from 'vuex'
import { generatorDynamicRouter, constantRouterMap } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    addRouters: state => state.addRouters
  },
  state: {
    token: null,
    fullName: '',
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setFullName(state, name) {
      state.fullName = name
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        generatorDynamicRouter(data).then(routers => {
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  },
  modules: {}
})
