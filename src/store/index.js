import { houseService } from "../services/house-service.js";
import Vuex from "vuex";

const { createStore } = Vuex;

const storeOptions = {
  strict: true,
  state() {
    return {
        houses: houseService.query(),
    }
  },
  mutations: {

  },
  getters: {
    houses(state){
        return state.houses
    }
  },
  actions: {

  },
  modules: {},
};

export const store = createStore(storeOptions);
