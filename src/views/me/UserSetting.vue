<template>
    <div style="text-align: left">
        <h4>修改密码</h4>
        <el-form :model="loginForm"  ref="loginForm" label-width="70px" style="width: 300px;">
            <el-form-item label="新密码" prop="password">
                <el-input v-model="loginForm.newpassword" class="registerinput" auto-complete="off"
                          show-password></el-input>
            </el-form-item>

            <el-form-item label="在输一遍" prop="password">
                <el-input v-model="loginForm.repatednewpassword" class="registerinput" auto-complete="off"
                          show-password></el-input>
            </el-form-item>

            <el-button type="primary" v-on:click="cahngepasswd">修改</el-button>
        </el-form>

        <el-divider></el-divider>

    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../../utils/Url";

    export default {
        name: 'UserSetting',
        components: {},
        computed: {
            pathUsername() {
                return this.$route.params["username"];
            }, currentusername() {
                return this.$store.getters["authStore/getUserName"]
            }
        },
        data() {
            return {
                loginForm: {
                    newpassword: "",
                    repatednewpassword: ""
                }
            }
        }
        ,
        mounted() {

        }
        ,
        methods: {
            cahngepasswd() {
                var that = this;
                axios.post(Url.withBase("/api/account/changepassword"), {
                    newpassword: that.loginForm.newpassword,
                    repatednewpassword: that.loginForm.repatednewpassword
                }).then(function (response) {
                    that.$message(response.data.msg);
                    that.loginForm.repatednewpassword = '';
                    that.loginForm.newpassword = '';
                }).catch(function (error) {
                    console.log(error)
                })
            }

        }
    }


</script>
