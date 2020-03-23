<template>
    <div class="home">
        <el-main>
            <p>{{this.$store.getters["authStore/gettestAuthTest"]}}</p>
            <button v-on:click="changeaa">s</button>
        </el-main>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import HelloWorld from '@/components/HelloWorld.vue'
    import testjs from "./testjs";

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

        }, data() {
            return {
                text: this.$store.getters["authStore/gettestAuthTest"]
            }
        }, methods: {
            changeaa: function () {
                console.log(this)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });

                // axios.get("http://localhost:8080/img/logo.82b9c7a5.png").then(function (response) {
                //     console.log(response);
                // })

                this.$store.commit("authStore/changetestAuthTest", "sasdafdsfdf");
            }
        }
    }
</script>

<style scoped lang="scss">


</style>