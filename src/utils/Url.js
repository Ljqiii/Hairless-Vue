import store from '../store'

function withBase(url) {
    if (url.indexOf('/') === 0) {
        return store.state.baseurl + url
    } else {
        return store.state.baseurl + '/' + url
    }
}

function withAuthBase(url) {
    if (url.indexOf('/') === 0) {
        return store.state.authbaseurl + url
    } else {
        return store.state.authbaseurl + '/' + url
    }
}

export default {
    withBase: withBase,
    withAuthBase:withAuthBase
}