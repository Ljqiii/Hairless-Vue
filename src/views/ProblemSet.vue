<template>
    <div class="home">


        <el-main>
            <el-row>
                <el-col :span="1" style="min-height: 1px">

                </el-col>

                <el-col :span="16">

                    <div style="display: flex;flex-direction: column;justify-content: flex-start">

                        <!--                        显示当前分类-->
                        <h2 style="text-align: left">
                            <i class="el-icon-menu" style="padding-right: 2px"></i>
                            分类-{{currentcategoryname==null?'Loading':currentcategoryname}}
                        </h2>

                        <!--                        显示所有分类-->
                        <div style="display: flex;flex-direction: row;margin-bottom: 10px">
                            <div v-for="item in categorylist" v-bind:key="item.id">
                                <el-button plain style="margin-right: 10px" type="warning"
                                           v-on:click="changecategory(item.symbol,item.name)">{{item.name}}
                                </el-button>
                            </div>
                        </div>
                        <!--                        显示题目跳转-->
                        <div style="display: flex;flex-direction: row">
                            <!--                            <el-input style="max-width: 300px;margin-right: 10px" v-model="input"-->
                            <!--                                      placeholder="请输入题目号或标题"></el-input>-->

                        </div>
                        <!--                        显示题目-->
                        <el-divider></el-divider>

                        <el-table
                                @row-click="redirectToProbvlem"
                                :data="problemlist"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    label=""
                                    width="90">
                                <template v-slot="scope">
                                    <i style="padding-left: 20px" class="el-icon-check"
                                       v-if="scope.row.isResolve==true"></i>
                                    <i style="padding-left: 20px" class="el-icon-close"
                                       v-if="scope.row.isResolve==false"></i>

                                </template>
                            </el-table-column>

                            <!--                            vip-->
                            <el-table-column
                                    width="30">
                                <template slot-scope="scope">
                                    <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
                                        <img :src="require('@/assets/vip.svg')" style="width: 17px;"
                                             v-if="scope.row.onlyVip==true"/>
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="id"
                                    label="#"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    label="标题"
                                    width="280">
                                <template slot-scope="scope">
                                    <strong> {{convertComplexity(scope.row.title)}} </strong>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="难度">
                                <template slot-scope="scope">
                                    {{convertComplexity(scope.row.complexity)}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="discusscount"
                                    label="讨论">
                            </el-table-column>

                        </el-table>
                        <!--            显示页数-->
                        <el-pagination
                                background
                                style="margin-top: 15px"
                                layout="prev, pager, next"
                                :current-page="currentpage"
                                :total="total"
                                :page-size="20"

                                @current-change="changeproblemlistpage"
                        >

                        </el-pagination>


                    </div>

                </el-col>
                <!--                右边栏-->
                <el-col style="margin-left: 30px" :span="6">
                    <!--排行榜            -->
                    <el-card class="box-card" style="width: 300px">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bold">解题排行榜</span>
                        </div>
                        <div v-for="item in correctleaderboard" :key="item.id">


                            <div style="display: flex;justify-content:space-between ;flex-direction: row;align-items: center;margin-bottom: 10px"
                                 type="text" class="el-dropdown-link">
                                <div style="display: flex;flex-direction: row;align-items: center;margin-left: 10px">
                                    <el-avatar size="small" v-if="item.avatar"
                                               v-bind:src="item.avatar"></el-avatar>
                                    <el-avatar size="small" v-else>{{item.username}}</el-avatar>
                                    <div style="margin-left: 12px">{{item.username}}</div>

                                </div>
                                <div style="margin-right: 15px">{{item.successCount}}</div>
                            </div>
                        </div>
                    </el-card>

                    <!--正确率            -->
                    <el-card class="box-card" style="width: 300px;margin-top: 30px;">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bold">正确率</span>
                        </div>

                        <ECharts style="margin-top: -30px" :options="orgOptions" :auto-resize="false"></ECharts>


                    </el-card>


                </el-col>

                <el-col :span="1" style="min-height: 1px"></el-col>
            </el-row>


        </el-main>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import ECharts from 'vue-echarts'
    import echarts from 'echarts'
    import AuthUtil from '../utils/AuthUtil'

    export default {
        name: 'ProblemSet',
        components: {
            ECharts,
            echarts
        }, computed: {
            convertComplexity() {
                return function (complexity) {
                    if (complexity == "easy") {
                        return '简单'
                    } else if (complexity == "hard") {
                        return '困难'
                    } else if (complexity == "medium") {
                        return '中等'
                    } else {
                        return complexity
                    }
                }
            }

        }, mounted() {
            this.getAccuracyDate();
            this.getcurrentcategory();
            this.getcategorylist();
            this.getproblemlist();
            this.getcorrectleaderboard();
        }, data() {
            return {
                currentcategoryname: '',
                categorylist: [],
                problemlist: [],
                currentpage: null,
                total: 0,
                correctleaderboard: [],
                orgOptions: {
                    tooltip: {
                        formatter: function (params) {
                            return '<span style="font-size:13px">' + params.name + ": " + params.value + '</span>';
                        },
                    }, legend: {
                        orient: "horizontal",
                        x: "center",
                        y: "bottom",
                        data: ["正确", "错误"]
                    },
                    series:
                        [{
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 0, name: '正确'},
                                {value: 0, name: '错误'}
                            ],
                            color: ['#ff7f50', '#87cefa'],
                            type: 'pie'
                        }]
                }
            }
        }, methods: {
            //获得当前分类名称
            getcurrentcategory: function () {
                var me = this;
                axios.get(Url.withBase("/api/getcategoryname"), {
                    params: {symbol: this.$route.params["category"]}
                }).then(function (response) {
                    console.log(response)
                    me.currentcategoryname = response.data.data
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //获得分类列表
            getcategorylist: function (pagenum, pagecount) {
                var me = this;
                axios.get(Url.withBase("/api/categorylist"), {
                    params: {
                        symbol: this.$route.params["category"],
                        pagenum: pagenum == null ? 1 : pagenum,
                        pagecount: pagecount == null ? null : pagecount,
                        withproblemcount: false
                    }
                }).then(function (response) {
                    console.log(response)
                    response.data.data.content.unshift({id: 0, symbol: "all", name: "所有", problemcount: null});
                    me.categorylist = response.data.data.content;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            // 获得问题列表
            getproblemlist: function (pagenum, pagecount, categorysymbol) {
                var me = this;
                axios.get(Url.withBase("/api/problemlist"), {
                    params: {
                        category: categorysymbol == null ? this.$route.params["category"] : categorysymbol,
                        pagenum: pagenum == null ? 1 : pagenum,
                        pagecount: pagecount == null ? null : pagecount
                    }
                }).then(function (response) {
                    console.log(response)
                    me.problemlist = response.data.data.content;
                    me.currentpage = response.data.data.pageInfo['pageNum']
                    me.total = response.data.data.pageInfo['total']
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //切换分类并充值问题列表
            changecategory: function (symbol, name) {
                this.currentcategoryname = name;
                this.$router.push(symbol)
                this.getproblemlist(1, null, symbol)
            },
            //跳转到问题页面
            redirectToProbvlem: function (row) {
                let vipOnly = row.onlyVip;
                if (!vipOnly) {
                    this.$router.push("/problem/" + row.id)
                } else if (vipOnly && AuthUtil.isVip()) {
                    this.$router.push("/problem/" + row.id)
                } else {
                    this.$message({
                        message: '仅Vip可以查看此题目',
                        type: 'warning'
                    });
                }

            },
            //换页
            changeproblemlistpage: function (val) {
                this.getproblemlist(val, null, this.$route.params["category"])
            },
            //排行榜
            getcorrectleaderboard: function () {
                var me = this;
                axios.get(Url.withBase("/api/correctleaderboard"), {}).then(function (response) {
                    console.log(response)
                    me.correctleaderboard = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //正确率
            getAccuracyDate: function () {
                var me = this;
                axios.get(Url.withBase("/api/accuracy"), {}).then(function (response) {
                    console.log(response)
                    me.orgOptions.series[0].data = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-pager li {
        background: none !important;
    }

    .echarts {
        width: 260px;
        height: 300px;
    }

</style>