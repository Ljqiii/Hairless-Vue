<template>
    <div id="app">
        <AuthContainer></AuthContainer>
        <el-container>
            <el-header>
                <NavBar></NavBar>
            </el-header>
            <router-view></router-view>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>

    </div>
</template>

<script>
    import AuthContainer from "./components/auth/AuthContainer";
    import Footer from "./components/Footer";
    import NavBar from './components/NavBar'
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            AuthContainer,
            HelloWorld,
            NavBar,
            Footer
        }
    }
</script>

<style>
    #app {
        background-color: #f8f8f8;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    /*去掉el-header的padding*/
    .el-header{
        padding: 0px !important;
    }
    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }


</style>
