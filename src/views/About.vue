<template>
    <div class="about">
        <h1>This is an about page</h1>
        <FileTree></FileTree>
        <!--        <mavon-editor v-model="dsafg"></mavon-editor>-->

    </div>
</template>


<script>
    import NavBar from "../components/NavBar";
    import HelloWorld from '@/components/HelloWorld.vue'
    import testjs from "./testjs";
    import FileTree from "../components/problem/FileTree";

    export default {
        name: 'Home',
        components: {
            FileTree,
            testjs,
            NavBar,
            HelloWorld
        }, computed: {
            testText() {
                return testjs.gettestText()
            }
        }, mounted() {
            // this.socket = new ScokJs('http://localhost:7084/ws')
            // this.stompClient = Stomp.over(this.socket);
            // var that = this;
            // this.stompClient.connect({}, function (frame) {
            //     console.log(frame);
            //
            //     that.stompClient.subscribe("/topic/say", function (message) {
            //         console.log(message);
            //     })
            // })


        }, data() {
            return {
                text: this.$store.getters["authStore/gettestAuthTest"]
            }
        }, methods: {
            sendwsdata: function () {

                this.stompClient.send("/app/r", {}, JSON.stringify({'name': name}));

            }

        }
    }
</script>
