import store from '../store'

function gettestText() {
    return store.state.testtext;
}

export default {
    gettestText: gettestText
};