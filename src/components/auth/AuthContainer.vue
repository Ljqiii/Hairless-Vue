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
    import authapi from "../../api/authApi";
    // import axios from "axios";

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
            Event.$on("loginsuccess", function () {
               me.hideForm();
            });

            Event.$on("loginsuccess", function () {
                console.log("login success")
            })

        },
        data() {
            return {
                showlogin: false,
                authVisible: false,
                showregister: true
            }
        }, methods: {
            hideForm:function(){
                this.authVisible = false;
                this.$refs.LoginForm.loginForm.username = "";
                this.$refs.LoginForm.loginForm.password = "";
            },
            changeauth: function () {
                this.showlogin = !this.showlogin;
                this.showregister = !this.showregister
            },
            handleClose: function (done) {
                console.log(done)
                this.showregister = true;
                this.showlogin = false;
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
