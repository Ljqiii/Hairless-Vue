import store from '../store'

function toUnLogin() {
    localStorage.setItem("token", "");//删除LocalStorage中的token
    store.commit("authStore/changeToken", "");//删除Vuex中token
    store.commit("changeIsLogin", false);//登录状态改为未登录
    store.commit("changeIsLogin", false);
    store.commit("authStore/changeIsVip", false);
}

function toLogin(username) {
    store.commit("authStore/changeUserName", username);
    store.commit("changeIsLogin", true);
}

function setUserInfo(nickName, isVip, avatarUrl, isAdmin, isTeacher) {
    store.commit("authStore/changeNickName", nickName);
    store.commit("authStore/changeIsVip", isVip);
    store.commit("authStore/changeIsAdmin", isAdmin);
    store.commit("authStore/changeIsTeacher", isTeacher);
    store.commit("authStore/changeAvatarUrl", avatarUrl);
}

function getAccessToken() {
    return store.getters["authStore/getToken"]
}

function setAccessToken(accessToken) {
    store.commit("authStore/changeToken", accessToken);
    sessionStorage.setItem("client_secret", accessToken);
}

function isVip() {
    return store.getters["authStore/isVip"] == null ? false : store.getters["authStore/isVip"];
}

function isAdmin() {
    return store.getters["authStore/isAdmin"] == null ? false : store.getters["authStore/isAdmin"];
}

function isTeacher() {
    return store.getters["authStore/isTeacher"] == null ? false : store.getters["authStore/isTeacher"];
}

export default {
    toUnLogin: toUnLogin,
    toLogin: toLogin,
    getAccessToken: getAccessToken,
    setAccessToken: setAccessToken,
    setUserInfo: setUserInfo,
    isVip: isVip,
    isAdmin: isAdmin
}
