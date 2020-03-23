import axios from "axios";
import store from "../store";
import {Message} from 'element-ui';
import event from '../plugins/event';


//检查token过期
function chechToken() {
    axios({
        auth: {
            username: store.state.client_id,
            password: store.state.client_secret
        },
        method: 'GET',
        url: store.state.baseurl + "/auth/oauth/check_token",
        params: {"token": store.getters["authStore/getToken"]}
    }).then(function (response) {

        if (response.data["error"] == null) {
            store.commit("authStore/changeUserName", response.data["user_name"]);
            store.commit("changeIsLogin", true);

            return true;
        } else {
            store.commit("changeIsLogin", false);

            return false;
        }
    }).catch(function (error) {
        store.commit("changeIsLogin", false);
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
        url: store.state.baseurl + "/auth/oauth/token",
        params: {
            "username": username,
            "password": password,
            "scope": store.state.scope,
            "grant_type": "password"
        }
    }).then(function (response) {
        console.log(response)
        if (response.data["error"] == null) {
            store.commit("authStore/changeToken", response.data["access_token"]);
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
    localStorage.setItem("token", "");//删除LocalStorage中的token
    store.commit("authStore/changeToken", "");//删除Vuex中token
    store.commit("changeIsLogin", false);//登录状态改为未登录
}

export default {
    chechToken: chechToken,
    login: login,
    logout: logout
}