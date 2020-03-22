export default {
    namespaced: true,
    state: {
        testAuthTest: "sadf",
        avatarUrl: '',
        userName: '',
        isVip: false,
    },
    getters: {
        // eslint-disable-next-line no-unused-vars
        getUserName(state, getters, rootState, rootGetters) {
            return state.userName;
        }, gettestAuthTest(state) {
            return state.testAuthTest;
        }, isVip(state) {
            return state.isVip;
        }
    },
    mutations: {
        changeUserName(state, payload) {
            state.userName = payload;
        }, changeIsVip(state, payload) {
            state.isVip = payload;
        }, changetestAuthTest(state, payload) {
            state.testAuthTest = payload;
        }
    }
}
