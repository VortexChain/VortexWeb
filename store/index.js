import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const strict = false

export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {},
  async nuxtClientInit({ commit }, { req }) {},
}
