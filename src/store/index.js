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
        client_secret: sessionStorage.getItem("client_secret"),
        scope: "ui",
        testtext: "sdaf",
        islogin: false,

        unreadNotificationCount: 0
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
        }, getIsLogin(state) {
            return state.islogin;
        }, getUnreadNotificationCount(state) {
            return state.unreadNotificationCount;
        }
    },
    mutations: {
        changetestText(state, payload) {
            state.testtext = payload;
        }, changeIsLogin(state, payload) {
            state.islogin = payload;
        }, changeUnreadNotificationCount(state, payload) {
            state.unreadNotificationCount = payload;
        }
    },
    actions: {}
})
