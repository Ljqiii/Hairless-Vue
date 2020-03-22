import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './authStore'
import searchStore from "./searchStore";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        authStore: authStore,
        searchStore: searchStore
    },
    state: {
        testtext: "sdaf",
        islogin: false,
    },
    getters: {
        gettestText(state) {
            return state.testtext;
        }
    },
    mutations: {
        changetestText(state, payload) {
            state.testtext = payload;
        }
    },
    actions: {}
})
