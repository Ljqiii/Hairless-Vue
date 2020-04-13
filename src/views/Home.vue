<template>
    <div class="home">
        <el-main>
            <p>{{this.$store.getters["authStore/gettestAuthTest"]}}</p>
            <button v-on:click="changeaa">s</button>
            <button v-on:click="sendwsdata">sendws</button>
            <button v-on:click="connectWs">connectws</button>
        </el-main>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import HelloWorld from '@/components/HelloWorld.vue'
    import testjs from "./testjs";
    import Stomp from 'stompjs';
    import ScokJs from 'sockjs-client';

    export default {
        name: 'Home',
        components: {
            testjs,
            NavBar,
            HelloWorld
        }, computed: {
            testText() {
                return testjs.gettestText()
            }
        }, mounted() {

            this.connectWs();

        }, data() {
            return {
                text: this.$store.getters["authStore/gettestAuthTest"]
            }
        }, methods: {
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
