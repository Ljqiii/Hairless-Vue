<template>

    <div class="navbar">
        <el-row style="display: flex;align-items: center">
            <el-col :span="1"></el-col>
            <el-col :span="10"
                    class="logocol">
                <img :src="require('@/assets/logo.png')" class="logoimg"/>

                <el-button type="text" class="title" v-on:click="routeto('/')">Hairless</el-button>

                <el-button class="tabitem" type="text" v-on:click="routeto('/')">首页</el-button>
                <el-button class="tabitem" type="text">题库</el-button>
                <el-button class="tabitem" type="text">讨论区</el-button>
                <el-button class="tabitem" type="text">竞赛</el-button>
                <el-button class="tabitem" type="text">会员</el-button>
            </el-col>
            <el-col :span="6" style="" class="searchcol">
                <el-input class="searchinput" v-model="searchinput" placeholder="请输入内容" size="medium"
                          style="width: 250px;">
                    <el-button slot="append" icon="el-icon-search" v-on:click="search" class=""></el-button>

                </el-input>

            </el-col>

            <el-col :span="7" class="userinfocol">
                <!--未登录-->
                <el-button style="width: 90px;" type="text" size="big" v-if="islogin==false" v-on:click="showlogin">登录
                </el-button>

                <!--已登录-->

                <i class="el-icon-message-solid" style="font-size: 25px" v-if="islogin==true&&unreadNotificationNount==0"></i>

                <el-badge :value="unreadNotificationNount" :max="99" class="item"  v-if="islogin==true&&unreadNotificationNount!=0">
                    <i class="el-icon-message-solid" style="font-size: 25px"></i>
                </el-badge>

                <el-dropdown @command="handleCommand">

                    <el-button style="width: 90px;" type="text" class="el-dropdown-link">
                        <el-avatar size="small" v-if="avatar_url&&islogin==true"
                                   v-bind:src="avatar_url"></el-avatar>
                        <el-avatar size="small" v-else-if="islogin==true">{{username}}</el-avatar>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item command="logout" divided icon="el">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>


            </el-col>
            <el-col :span="1"></el-col>
        </el-row>
        <div class="jianbian"></div>
    </div>
</template>

<script>

    import Event from '../plugins/event.js';
    import authapi from "../api/authApi";

    export default {
        name: 'NavBar',
        props: {
            msg: String
        },
        computed: {
            islogin() {
                return this.$store.getters.getIsLogin;
            }, username() {
                return this.$store.getters["authStore/getUserName"]
            }, avatar_url() {
                return this.$store.getters["authStore/getAvatarUrl"]
            }, unreadNotificationNount() {
                return this.$store.getters.getUnreadNotificationCount;
            }
        },
        data() {
            return {
                searchinput: '',
                testtext: this.$store.state.testtext
            }
        },
        mounted() {

        },
        methods: {
            routeto: function (direction) {
                this.$router.push(direction)
            }, showlogin: function () {
                Event.$emit("showauthdialog");
            }, search: function () {

            }, handleCommand(command) {
                //退出登录
                if (command == "logout") {
                    authapi.logout();
                    this.$message("退出登录");
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .jianbian {

    }

    .navbar {
        background-color: #ffffff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    .logocol {
        display: flex;
        justify-content: flex-start;
        align-items: center;

    }

    .userinfocol {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .searchcol {
        display: flex;
        justify-content: flex-end;
        align-items: center
    }

    .searchinput {
        margin-right: 10px;
    }

    .logoimg {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .title {
        font-size: 25px;
        margin-right: 20px;
    }

    .tabitem {
        margin-right: 10px;
        margin-left: 10px;
    }


</style>
