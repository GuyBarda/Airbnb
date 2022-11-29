import Vuex from "vuex";
import {houseStore } from './house-store.js'
import {reviewStore } from './review-store.js'
import {userStore } from './user-store.js'

const { createStore } = Vuex;

const storeOptions = {
  strict: true,
  state() {
    return {
    }
  },
  mutations: {

  },
  getters: {

  },
  actions: {

  },
  modules: {
    houseStore,
    reviewStore,
    userStore
  },
};

export const store = createStore(storeOptions);
