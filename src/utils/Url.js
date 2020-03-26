import store from '../store'

function withBase(url) {
    if (url.indexOf('/') === 0) {
        return store.state.baseurl + url
    } else {
        return store.state.baseurl + '/' + url
    }
}

export default {
    withBase: withBase
}