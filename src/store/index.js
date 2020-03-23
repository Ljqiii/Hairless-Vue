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
        baseurl: "http://127.0.0.1:7082/api",
        client_id: "browser",
        client_secret: "",
        scope:"ui",
        testtext: "sdaf",
        islogin: false,
    },
    getters: {
        getBaseurl(state) {
            return state.baseurl;
        }, gettestText(state) {
            return state.testtext;
        }, getClientId(state) {
            return state.client_id;
        }, getClientSecret(state) {
            return state.client_secret;
        },getIsLogin(state) {
            return state.islogin;
        }
    },
    mutations: {
        changetestText(state, payload) {
            state.testtext = payload;
        },changeIsLogin(state, payload) {
            console.log("changeIsLogin"+payload)
            state.islogin = payload;
        }
    },
    actions: {}
})
