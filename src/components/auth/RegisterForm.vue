<template>
    <div class="registerform">

        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" class="registerinput" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="registerForm.nickname" class="registerinput" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email" class="registerinput" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" class="registerinput"
                          auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="repeatpassword">
                <el-input type="password" v-model="registerForm.repeatpassword" class="registerinput"
                          auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="注册角色">

                <el-select placeholder="请选择" v-model="registerrole" style="width: 100%;">
                    <el-option label="正常用户" :value="'NORMALUSER'"></el-option>
                    <el-option label="教师" :value="'TEACHER'"></el-option>
                </el-select>


            </el-form-item>

            <div class="registercontainer">
                <p class="registertext">已有账号，点击
                    <el-button type="text" v-on:click="changeauth">登录</el-button>
                </p>
                <el-button type="primary" v-on:click="register('registerForm')">注册</el-button>
            </div>

        </el-form>


        <form :action="loginurl" method="post" ref="loginformhidden">
            <el-input type="hidden" name="username" :value="registerForm.username"/>
            <el-input type="hidden" name="password" :value="registerForm.password"/>
        </form>


    </div>
</template>

<script>


    import axios from "axios";
    import Url from "../../utils/Url";
    import authapi from "../../api/authApi";

    export default {
        name: 'RegisterForm',
        props: {
            msg: String
        },
        computed: {
            loginurl() {
                return Url.withAuthBase("/login")
            }
        },
        data() {
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.repeatpassword !== '') {
                        this.$refs.registerForm.validateField('repeatpassword');
                    }
                    callback();
                }
            };
            var validateRepatedPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                registerrole: 'NORMALUSER',
                registerForm: {
                    username: "",
                    nickname: "",
                    email: "",
                    password: "",
                    repeatpassword: ""
                }, rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ], nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ], email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', min: 3, message: '邮箱格式不正确', trigger: 'blur'}
                    ], password: [
                        {required: true, trigger: ['blur', 'change'], validator: validatePassword},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ], repeatpassword: [
                        {required: true, trigger: ['blur', 'change'], validator: validateRepatedPassword},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        }, methods: {
            changeauth: function () {
                authapi.login()
                // this.$emit("changeauth");
            },
            register: function (formname) {
                var that = this;
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        axios.post(Url.withAuthBase("/register"), {
                            username: that.registerForm.username,
                            nickname: that.registerForm.nickname,
                            password: that.registerForm.password,
                            email: that.registerForm.email,
                            role: that.registerrole
                        }).then(function (response) {
                            if (response.data.code != 200) {
                                that.$message({
                                    type: 'success',
                                    message: response.data.msg
                                });
                            } else {
                                that.$refs.loginformhidden.submit();
                            }
                            console.log(response)
                        }).catch(function (error) {
                            console.log(error)
                        })
                    } else {
                        return false;
                    }
                });
            }
        },


    }
</script>

<style scoped>
    .registerinput {
        /*margin-bottom: 10px;*/

    }

    .registercontainer {
        display: flex;
        flex-direction: column;
        align-items: center
    }


</style>
