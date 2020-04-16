<template>
    <div>
        <router-view>

        </router-view>

        <h2 style="display: flex;flex-direction: row;justify-items: center;justify-content: center" v-if="this.$route.path!='/hairnull/result/'">
            <img :src="require('@/assets/VIPBig.svg')" style="height: 30px;">
            <div style="width: 10px;"></div>
            HairlessNull
        </h2>
        <div style="height: 50px;"></div>

        <div v-if="isCancel">
            <img :src="require('@/assets/cancel.svg')" style="height: 120px;"/>
            <h2>您已经取消付款</h2>
            <div style="height: 20px;"></div>
            <el-button type="primary" @click="routetoHairlessNull">重新开通</el-button>
            <div style="height: 30px;"></div>
        </div>

        <el-row v-if="isCancel==false&&this.$route.path!='/hairnull/result/'">
            <el-row>
                <el-col :span="2">
                    <div style="min-height: 1px"></div>
                </el-col>
                <el-col :span="16">
                    <div style="text-align: center;margin-bottom: 20px" v-if="isVipNow">
                        {{'HairNull过期时间: '+vipExpiredTime}}
                    </div>
                    <div style="text-align: left">
                        {{isVipNow?'续费时长：':'开通时长：'}}
                    </div>
                    <div>

                        <div style="display: flex;flex-direction: row">
                            <el-card :shadow="nMonth==1?'always':'hover'" style="width: 150px;margin: 20px"
                                     v-on:click.native="nMonth=1">

                                <el-button type="text" class="viptimebtn">1个月</el-button>

                            </el-card>

                            <el-card :shadow="nMonth==2?'always':'hover'" style="width: 150px;margin: 20px"
                                     v-on:click.native="nMonth=2">

                                <el-button type="text" class="viptimebtn">2个月</el-button>

                            </el-card>

                            <el-card :shadow="nMonth==3?'always':'hover'" style="width: 150px;margin: 20px"
                                     v-on:click.native="nMonth=3">
                                <el-button type="text" class="viptimebtn">3个月</el-button>

                            </el-card>
                        </div>
                        <div style="text-align: left">
                            支付方式：
                        </div>
                        <div style="display: flex;flex-direction: row">
                            <el-card :shadow="paymentMethod=='paypal'?'always':'hover'"
                                     style="width: 150px;margin: 20px">
                                <img :src="require('@/assets/Paypal.svg')" style="height: 15px;"/>
                            </el-card>

                            <!--                            <el-card :shadow="paymentMethod=='paypal'?'always':'hover'"-->
                            <!--                                     style="width: 150px;margin: 20px">-->
                            <!--                                <img :src="require('@/assets/alipay.svg')" style="height: 15px;"/>-->
                            <!--                            </el-card>-->

                        </div>
                    </div>
                    <div>
                        <el-button type="primary" class="title" :loading="btnloading" v-on:click="becomevip">
                            {{isVipNow?'续费':'开通'}}
                        </el-button>
                    </div>

                </el-col>
                <el-col :span="4">

                    <div class="">

                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>会员特权</span>
                            </div>
                            <div style="padding-left: 30px;text-align: left;line-height: 30px">
                                解锁Vip题目
                                <br>
                                优先判题
                                <br>

                            </div>
                        </el-card>

                    </div>
                </el-col>
                <el-col :span="2">
                    <div style="min-height: 1px"></div>
                </el-col>
            </el-row>
        </el-row>


    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import AuthUtil from "../utils/AuthUtil";
    import notificationApi from "../api/notificationApi";

    export default {
        name: 'Vip',
        components: {},
        mounted() {
            this.computeIsCancenPage();
            this.getVipstatus();
            console.log(this.$route.path)
        },
        data() {
            return {
                isVipNow: false,
                vipExpiredTime: '',
                btnloading: false,
                isCancel: false,
                paymentMethod: "paypal",
                nMonth: 1
            }
        },
        methods: {
            getVipstatus() {
                var that = this;
                axios.get(Url.withBase('/api/account/vipstatus'))
                    .then(function (response) {
                        that.isVipNow = response.data.data.vip;
                        that.vipExpiredTime = response.data.data.expiredTime;
                    }).catch(function (error) {
                    console.log(error)
                })

            },
            computeIsCancenPage() {
                if (window.location.search.indexOf("cancel=1") > 0) {
                    this.isCancel = true;
                } else {
                    this.isCancel = false;
                }
            },
            routetoHairlessNull: function () {
                this.$router.push('/hairnull')
                this.computeIsCancenPage()
            },
            becomevip() {
                this.btnloading = true;
                var that = this;
                axios.post(Url.withBase("/api/account/becomevip"), {
                        nmonth: that.nMonth,
                        payMethod: that.paymentMethod
                    }
                ).then(function (response) {
                    console.log(response);
                    if (response.data.code == '200') {
                        window.location = response.data.data.redirectUrl;
                    } else {
                        this.$message({
                            type: 'success',
                            message: response.data.msg
                        });
                    }
                }).catch(function (error) {
                })
            }
        }
    }

</script>

<style>
    .viptimebtn {
        padding: 0px !important;
    }
</style>
