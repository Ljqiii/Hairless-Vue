export default {
    namespaced: true,
    state: {
        testAuthTest: "sadf",
        avatarUrl: '',
        userName: '',
        nickName: '',
        isVip: false,
        isAdmin: false,
        token: localStorage.getItem("token")
    },
    getters: {
        // eslint-disable-next-line no-unused-vars
        getUserName(state, getters, rootState, rootGetters) {
            return state.userName;
        }, gettestAuthTest(state) {
            return state.testAuthTest;
        }, isVip(state) {
            return state.isVip;
        }, isAdmin(state) {
            return state.isAdmin;
        }, getToken(state) {
            return state.token;
        }, getAvatarUrl(state) {
            return state.avatarUrl;
        }
    },
    mutations: {
        changeUserName(state, payload) {
            state.userName = payload;
        }, changeNickName(state, payload) {
            state.nickName = payload;
        }, changeIsVip(state, payload) {
            state.isVip = payload;
        }, changeIsAdmin(state, payload) {
            state.isAdmin = payload;
        }, changetestAuthTest(state, payload) {
            state.testAuthTest = payload;
        }, changeToken(state, payload) {
            state.token = payload;
        }, changeAvatarUrl(state, payload) {
            state.avatarUrl = payload;
        }
    }
}
