import store from '../store'

function toUnLogin() {
    localStorage.setItem("token", "");//删除LocalStorage中的token
    store.commit("authStore/changeToken", "");//删除Vuex中token
    store.commit("changeIsLogin", false);//登录状态改为未登录
    store.commit("changeIsLogin", false);

}

function toLogin(username) {
    store.commit("authStore/changeUserName", username);
    store.commit("changeIsLogin", true);
}

function getAccessToken() {
    return store.getters["authStore/getToken"]
}

function setAccessToken(accessToken) {
    store.commit("authStore/changeToken", accessToken);

}

export default {
    toUnLogin: toUnLogin,
    toLogin: toLogin,
    getAccessToken: getAccessToken,
    setAccessToken: setAccessToken
}