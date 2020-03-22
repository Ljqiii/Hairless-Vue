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

                <el-button type="text" size="big" v-if="islogin==false" v-on:click="showlogin">登录</el-button>

                <el-avatar size="small" v-else>{{username}}</el-avatar>
            </el-col>
            <el-col :span="1"></el-col>
        </el-row>
        <div class="jianbian"></div>
    </div>
</template>

<script>

    import Event from '../plugins/event.js';

    export default {
        name: 'NavBar',
        props: {
            msg: String
        },
        data() {
            return {
                searchinput: '',
                testtext: this.$store.state.testtext,
                islogin: this.$store.state.islogin,
                username: this.$store.state.username,
                avatar_url: this.$store.state.avatar_url
            }
        },
        mounted() {

        },
        methods: {
            routeto: function (e) {
                console.log(e)
                this.$router.push("/")
            }, showlogin: function () {
                console.log("show login")
                Event.$emit("showauth");
            }, search: function () {

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
