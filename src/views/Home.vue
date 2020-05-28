<template>
    <div class="home">
        <el-main>
            <div style="height: 20px;"></div>
            <el-row :gutter="20">
                <el-col :span="8" style="min-height: 1px">
                    <div class="grid-content bg-purple" style="margin-left: 60px">
                        <div style="height: 50px"></div>
                        <h1>一个全新的在线编程平台</h1>
                        <div>Hairless让你在线练习Java编程，在线运行。帮你提高编程技能</div>
                        <div style="height: 30px;"></div>
                        <div>
                            <el-button type="primary" v-on:click="showlogin">注册账号</el-button>
                            <el-button type="primary" v-on:click="start">开始练习</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" style="min-height: 1px">
                    <div class="" style="background-color: #f8f8f8">
                        <img :src="require('@/assets/Docker_Java.png')"
                             style="height: 360px;width: 696px;margin-left: 100px;margin-right: 60px"/>
                    </div>
                </el-col>
            </el-row>

            <div style="height: 20px"></div>

            <!--                <p>{{this.$store.getters["authStore/gettestAuthTest"]}}</p>-->
            <!--                <button v-on:click="changeaa">s</button>-->
            <!--                <button v-on:click="sendwsdata">sendws</button>-->
            <!--                <button v-on:click="connectWs">connectws</button>-->
        </el-main>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import HelloWorld from '@/components/HelloWorld.vue'
    import testjs from "./testjs";
    import Stomp from 'stompjs';
    import ScokJs from 'sockjs-client';
    import Event from "../plugins/event";
    import authapi from "../api/authApi";

    export default {
        name: 'Home',
        components: {
            testjs,
            NavBar,
            HelloWorld
        }, computed: {
            islogin() {
                return this.$store.getters.getIsLogin;
            },
            testText() {
                return testjs.gettestText()
            }
        }, mounted() {
            let redirectpath = sessionStorage.getItem("pathBeforeLogin")
            if (redirectpath != null && redirectpath != '/') {
                sessionStorage.removeItem("pathBeforeLogin");
                this.$router.push(redirectpath)
            }

            // this.connectWs();

        }, data() {
            return {
                text: this.$store.getters["authStore/gettestAuthTest"]
            }
        }, methods: {
            start: function () {
                if (this.islogin == true) {
                    this.$router.push("/problemset")
                } else {
                    sessionStorage.setItem("pathBeforeLogin", "/problemset/all")
                    authapi.login()
                }
            },
            showlogin: function () {
                Event.$emit("showauthdialog");
            },
            connectWs: function () {
                this.socket = new ScokJs('http://hairless.ljqiii.xyz:7082/ws/dockerjudge')
                this.stompClient = Stomp.over(this.socket);
                var that = this;
                this.stompClient.connect({}, function (frame) {
                    console.log(frame);

                    that.stompClient.subscribe("/topic/say", function (message) {
                        console.log(message);
                    })

                    that.stompClient.subscribe("/user/queue/judgeresult", function (message) {
                        console.log("from user")
                        console.log(message);
                    })

                })
            },

            sendwsdata: function () {

                this.stompClient.send("/app/r", {}, JSON.stringify({'name': name}));

            },


            changeaa: function () {
                console.log(this)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });


                this.$store.commit("authStore/changetestAuthTest", "sasdafdsfdf");
            }
        }
    }
</script>

<style scoped lang="scss">


</style>
