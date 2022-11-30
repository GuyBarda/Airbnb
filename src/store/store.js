import Vuex from 'vuex';
import { houseStore } from './house-store.js';
import { reviewStore } from './review-store.js';
import { userStore } from './user-store.js';
import { orderStore } from './order-store.js';

const { createStore } = Vuex;

const storeOptions = {
    strict: true,
    state() {
        return {
            isOpen: false,
        };
    },
    mutations: {
        toggleSearch(state) {
            state.isOpen = !state.isOpen;
        },
    },
    getters: {
        open({ isOpen }) {
            return isOpen;
        },
    },
    actions: {},
    modules: {
        houseStore,
        reviewStore,
        userStore,
        orderStore,
    },
};

export const store = createStore(storeOptions);
