<template>
    <div class="loginform">

        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" class="registerinput" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" class="registerinput" auto-complete="off"></el-input>
            </el-form-item>

            <p class="registertext">没有账号，
                <el-button type="text" v-on:click="changeauth">注册</el-button>
            </p>

            <div class="loginbtncontainer">
                <el-checkbox v-model="rememberme">记住我</el-checkbox>
                <el-button type="primary" v-on:click="login('loginForm')">登录</el-button>
            </div>
        </el-form>


    </div>
</template>

<script>
    export default {
        name: 'LoginForm',
        props: {
            msg: String
        },
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rememberme: false
                , rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ], password: [
                        {required: true, trigger: ['blur'], message: '请输入密码'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            changeauth: function () {
                this.$emit("changeauth");
            },

            login: function (formname) {
                console.log(this.$refs[formname])
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loginbtncontainer {
        display: flex;
        flex-direction: column;
        align-items: center
    }


    .registertext {
        text-align: right;
    }

    .logininput {
        margin-bottom: 10px;
    }

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
