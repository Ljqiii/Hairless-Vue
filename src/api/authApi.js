import axios from "axios";
// import store from "../store";
// import {Message} from 'element-ui';
// import event from '../plugins/event';
import AuthUtil from '../utils/AuthUtil'
import Url from '../utils/Url'
import notificationApi from "./notificationApi";


//检查token过期
function chechToken() {

    loadUserInfo();


    // axios({
    //     auth: {
    //         username: store.state.client_id,
    //         password: store.state.client_secret
    //     },
    //     method: 'GET',
    //     url: Url.withBase("/api/account/pointdetails")
    // }).then(function (response) {
    //
    //     if (response.data["error"] == null) {
    //         AuthUtil.toLogin(response.data["user_name"]);
    //         return true;
    //     } else {
    //         AuthUtil.toUnLogin();
    //         return false;
    //     }
    // }).catch(function (error) {
    //     AuthUtil.toUnLogin();
    //     console.log(error);
    //
    //     return false;
    // });
}

//登录
function login(username, password, rememberme) {
    console.log("rememberme" + rememberme);

    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("remember-me", rememberme);

    window.location = "/oauth2/authorization/gateway"

    //TODO: spring cloud security 没有sso，跳转链接
}

function loadUserInfo() {

    axios.get(Url.withBase('/api/account/me'), {withCredentials: true, maxRedirects: 0})
        .then(function (response) {
            console.log(response)
            AuthUtil.toLogin(response.data.data["username"]);
            AuthUtil.setUserInfo(response.data.data["nickname"], response.data.data["isvip"], response.data.data["avatar"],response.data.data["isAdmin"])
            notificationApi.setUnreadNotificationCount(response.data.data["unReadNotificationCount"])
        }).catch(function (error) {
        console.log(error)
    })

}


function getInfo() {
    axios({
        headers: {
            Authorization: `Bearer ${AuthUtil.getAccessToken()}`
        },
        method: 'POST',
        url: Url.withBase("/api/auth/me"),
    })
}


//退出登录
// function logout() {
//     // TODO: 后端 revoke token
//     AuthUtil.toUnLogin();
//     console.log("in logout func")
//
//     axios.post(Url.withAuthBase("/logout"), null, {withCredentials: true})
//         .then(function (response) {
//             console.log(response)
//         }).catch(function (error) {
//         console.log(error)
//     })
// }

export default {
    chechToken: chechToken,
    login: login,
    // logout: logout,
    getInfo: getInfo,
    loadUserInfo: loadUserInfo
}
