import axios from "axios";
// import store from "../store";
import AuthUtil from '../utils/AuthUtil'
import Url from "../utils/Url";


function getUnreadNotificationCount() {
    axios({
        method: 'GET',
        url: Url.withBase("/"),
        params: {"token": AuthUtil.getAccessToken()}
    }).then()

}

export default {
    getUnreadNotificationCount: getUnreadNotificationCount
}