import Vuex from 'vuex';
import { stayStore } from './stay-store.js';
import { userStore } from './user-store.js';
import { orderStore } from './order-store.js';

const { createStore } = Vuex;

const storeOptions = {
    strict: true,
    state() {
        return {
            isOpen: false,
            isOrderComplete: false,
            isFilterOpen: false,
            isMustLogin: false,
            isLogInOpen: false,
        };
    },
    mutations: {
        toggleMustLogin(state, { bool }) {
            state.isMustLogin = bool;
        },
        toggleFilterModal(state, { bool }) {
            state.isFilterOpen = bool;
        },
        toggleSearch(state, { bool }) {
            state.isOpen = bool;
        },
        toggleSuccessModal(state, { bool }) {
            state.isOrderComplete = bool;
        },
        toggleLogInModal(state, { bool }) {
            state.isLogInOpen = bool;
        },
    },
    getters: {
        isMustLogin({ isMustLogin }) {
            return isMustLogin;
        },
        isFilterOpen({ isFilterOpen }) {
            return isFilterOpen;
        },
        isLogInOpen({ isLogInOpen }) {
            return isLogInOpen;
        },
        open({ isOpen }) {
            return isOpen;
        },
    },
    modules: {
        stayStore,
        userStore,
        orderStore,
    },
};

export const store = createStore(storeOptions);
