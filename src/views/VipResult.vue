<template>
    <div>

        <div style="height: 20px;"></div>
        <img :src="require('@/assets/VIPBig.svg')" style="height: 200px;"/>
        <div>
            <h2>开通成功</h2>

            <div style="line-height: normal">{{'到期时间: '+vipendtime}}</div>
            <div style="line-height: normal">{{'付款方式: '+paymethod}}</div>
            <div style="line-height: normal">{{'付款人: '+payername}}</div>
            <div style="line-height: normal">{{'付款账号邮箱: '+payeremail}}</div>

            <div></div>
            <div></div>

        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";

    export default {
        name: 'VipResult',
        components: {},
        mounted() {
            if (sessionStorage.getItem("vipbillId") == null) {
                this.$router.push("/hairnull/")
            } else {
                this.getVipbillId()
            }
        },
        data() {
            return {
                payeremail: '',
                payername: '',
                vipendtime: '',
                paymethod: ''
            }
        },
        methods: {
            getVipbillId: function () {
                var me = this;
                axios.get(Url.withBase("/api/account/resultinfo"), {
                    params: {
                        vipbillId: sessionStorage.getItem("vipbillId")
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                        me.payeremail = response.data.data.payeremail
                        me.payername = response.data.data.payername
                        me.vipendtime = response.data.data.vipendtime
                        me.paymethod = response.data.data.paymethod
                        sessionStorage.removeItem("vipbillId")
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }

</script>

<style>

</style>
