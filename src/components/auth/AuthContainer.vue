<template>
    <div class="authcontainer">
        <el-dialog title="欢迎来到HairLess" :visible.sync="authVisible" width="30%" :before-close="handleClose" center>
            <span></span>
            <LoginForm v-if="showlogin" @changeauth="changeauth"></LoginForm>
            <RegisterForm v-if="showregister" @changeauth="changeauth"></RegisterForm>
        </el-dialog>
    </div>
</template>

<script>
    import Event from '../../plugins/event.js';
    import LoginForm from "./LoginForm";
    import RegisterForm from './RegisterForm'

    export default {
        name: 'AuthContainer',
        components: {RegisterForm, LoginForm},
        props: {
            msg: String
        }, mounted() {
            var me = this;
            Event.$on("showauth", function () {
                console.log("showauth")
                me.authVisible = true;
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
