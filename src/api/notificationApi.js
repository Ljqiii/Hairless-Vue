// import axios from "axios";
import store from "../store";

// import Url from "../utils/Url";


function setUnreadNotificationCount(count) {
    store.commit("changeUnreadNotificationCount", count);
}

function getUnreadNotificationCount() {
    return store.getters.getUnreadNotificationCount()
}

export default {
    getUnreadNotificationCount: getUnreadNotificationCount,
    setUnreadNotificationCount: setUnreadNotificationCount
}