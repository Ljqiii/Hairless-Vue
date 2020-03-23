<template>
    <div class="authcontainer">
        <el-dialog title="欢迎来到HairLess" :visible.sync="authVisible" width="30%" :before-close="handleClose" center>
            <span></span>
            <LoginForm v-if="showlogin" @changeauth="changeauth" ref="LoginForm"></LoginForm>
            <RegisterForm v-if="showregister" @changeauth="changeauth"></RegisterForm>
        </el-dialog>
    </div>
</template>

<script>
    import Event from '../../plugins/event.js';
    import LoginForm from "./LoginForm";
    import RegisterForm from './RegisterForm';
    import authapi from "../../api/authapi";

    export default {
        name: 'AuthContainer',
        components: {RegisterForm, LoginForm},
        props: {
            msg: String
        }, mounted() {
            authapi.chechToken();
            var me = this;
            Event.$on("showauthdialog", function () {
                me.authVisible = true;
            });
            Event.$on("hideauthdialog", function () {
                me.authVisible = false;
                me.$refs.LoginForm.loginForm.username="";
                me.$refs.LoginForm.loginForm.password="";
            })
        },
        data() {
            return {
                showlogin: true,
                authVisible: false,
                showregister: false
            }
        }, methods: {
            changeauth: function () {
                this.showlogin = !this.showlogin;
                this.showregister = !this.showregister
            },
            handleClose: function (done) {
                console.log(done)
                this.showregister = false;
                this.showlogin = true;
                done();
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
