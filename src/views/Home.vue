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

    export default {
        name: 'Home',
        components: {
            NavBar,
            HelloWorld
        }, mounted() {

        }, data() {
            return {
                text: this.$store.getters["authStore/gettestAuthTest"]
            }
        },methods:{
            changeaa: function(){
                this.$store.commit("authStore/changetestAuthTest","sasdafdsfdf");
            }
        }
    }
</script>

<style scoped lang="scss">


</style>