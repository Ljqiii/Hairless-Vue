import axios from "axios";
import store from "../store";
import {Message} from 'element-ui';
import event from '../plugins/event';
import AuthUtil from '../utils/AuthUtil'
import Url from '../utils/Url'


//检查token过期
function chechToken() {
    axios({
        auth: {
            username: store.state.client_id,
            password: store.state.client_secret
        },
        method: 'GET',
        url: Url.withBase("/auth/oauth/check_token"),
        params: {"token": AuthUtil.getAccessToken()}
    }).then(function (response) {

        if (response.data["error"] == null) {
            AuthUtil.toLogin(response.data["user_name"]);
            return true;
        } else {
            AuthUtil.toUnLogin();
            return false;
        }
    }).catch(function (error) {
        AuthUtil.toUnLogin();
        console.log(error);

        return false;
    });
}

//登录
function login(username, password, rememberme) {
    console.log("rememberme" + rememberme)
    axios({
        auth: {
            username: store.state.client_id,
            password: store.state.client_secret
        },
        method: 'POST',
        url: Url.withBase("/auth/oauth/token"),
        params: {
            "username": username,
            "password": password,
            "scope": store.state.scope,
            "grant_type": "password"
        }
    }).then(function (response) {
        console.log(response)
        if (response.data["error"] == null) {
            AuthUtil.setAccessToken(response.data["access_token"]);
            chechToken();
            if (rememberme == true) {
                localStorage.setItem("token", response.data["access_token"]);
            }
            event.$emit("hideauthdialog");
            Message.success("登录成功");
        } else {
            store.commit("changeIsLogin", false);
            Message.error("用户名或密码错误");
        }

    }).catch(function (error) {
        console.log(error)
    });
}

//退出登录
function logout() {
    // TODO: 后端 revoke token
    AuthUtil.toUnLogin();
}

export default {
    chechToken: chechToken,
    login: login,
    logout: logout
}