<template>
    <div>
        <div style="height: 10px;"></div>
        <el-row>
            <el-col :span="1" style="min-height: 1px">

            </el-col>


            <el-col :span="22">

                <h2 style="margin-bottom: 5px">{{competition.title}}</h2>

                <el-tag size="mini" type="info" v-if="competition.status=='end'">已结束</el-tag>
                <el-tag size="mini" type="success" v-if="competition.status=='processing'">进行中</el-tag>
                <el-tag size="mini" type="" v-if="competition.status=='unstart'">未开始</el-tag>

                <h4>
                    <span v-if="competition.startTime">开始时间:</span><span style="font-weight: normal">{{competition.startTime}}</span>
                    <div style="width: 20px;height: 1px;display: inline-block"></div>
                    <span v-if="competition.endTime">结束时间:</span> <span
                        style="font-weight: normal">{{competition.endTime}}</span>
                </h4>
                <el-tabs class="competitionpanel" v-model="activename" @tab-click="handleClick">
                    <el-tab-pane label="介绍" name="description"></el-tab-pane>
                    <el-tab-pane label="题目" name="problemset"></el-tab-pane>
                    <el-tab-pane label="提交" name="submitset"></el-tab-pane>
                    <el-tab-pane label="排名" name="leaderboard"></el-tab-pane>
                </el-tabs>

                <!--介绍-->
                <div v-if="currentcompetitionpanel=='description'" style="">

                    <div style="text-align: left;padding-left: 10px;padding-right: 10px">
                        <div v-html="convertToMarkDown" style="margin-bottom: 80px;margin-right: 10px">

                        </div>
                    </div>

                    <el-button v-if="competition.userJoined==false&& competition.status=='unstart'"
                               v-on:click="joincompetitionbtn">报名参加
                    </el-button>

                    <el-button disabled
                               v-if="(competition.status=='end'||competition.status=='processing')&&competition.userJoined==false">
                        比赛进行中或已结束
                    </el-button>


                    <el-button type="text" v-if="competition.userJoined==true">已报名</el-button>

                    <!--                    <div>-->
                    <!--                        <el-button v-if="competition.status=='processing'&&competition.userJoined==true">进入竞赛-->
                    <!--                        </el-button>-->
                    <!--                    </div>-->

                    <div style="height: 50px;"></div>
                </div>

                <!--题目列表-->

                <div v-if="currentcompetitionpanel=='problemset'">

                    <div v-if="competition.status=='processing'||competition.status=='end'">
                        <div style="height: 30px;"></div>
                        <ProblemList
                                :redirectfunc="redirectToCompetitionProblem"
                                :showviptag="false"
                                :showproblemid="false"
                                :pagenavigator="false"
                                :total="competitionproblempagedata.total"
                                :changepage="this.changeproblemlistpage"
                                :currentpage="competitionproblempagedata.currentpage"
                                :problemlist="competitionproblemset">
                        </ProblemList>

                    </div>
                    <div v-else>
                        竞赛未开始
                    </div>
                    <div style="height: 30px;"></div>

                </div>
                <!--                提交记录-->
                <div v-if="currentcompetitionpanel=='submitset'">
                    <div style="height: 30px;"></div>
                    <SubmitList :all-submits="allSubmits" :show-problem-id="true">

                    </SubmitList>
                    <div style="height: 50px;"></div>

                </div>
                <!--排行榜-->
                <div v-if="currentcompetitionpanel=='leaderboard'">
                    <div style="text-align: right;margin-top: 15px;margin-bottom: 10px;margin-right: 10px">
                        <i class="el-icon-warning-outline"></i>
                        数据更新频率：1min，请手动刷新
                    </div>
                    <el-table
                            :data="leaderboardtablecontentjson"
                            style="width: 100%">

                        <el-table-column
                                v-for="item in leaderboardtablemetajson" :key="item.dataprop"
                                :prop="item.dataprop" :label="item.columnName">
                            <template slot-scope="scope">
                                <div :style="{height:'100%',display:'flex',justifyContent:'flex-start',alignItems:'center',
                                backgroundColor: calcTableItemSuccessFail(scope,item.dataprop)==true?'#CCFF90':( calcTableItemSuccessFail(scope,item.dataprop)==false?'#ff8a80':'')}">


                                    <el-popover
                                            placement="top-start"
                                            trigger="hover"
                                            content="第一个人解决此问题"
                                            :style="{height:'100%',display:'flex',justifyContent:'flex-start',alignItems:'center'}">
                                        <div slot="reference"
                                             :style="{height:'100%',display:'flex',justifyContent:'flex-start',alignItems:'center'}">
                                            <img :src="require('@/assets/firstblood.svg')" style="width: 17px;"
                                                 v-if="calcTableItemFirstBlood(scope,item.dataprop)"/>
                                        </div>
                                    </el-popover>


                                    {{convertToTableItem(scope,item.dataprop)}}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="height: 50px"></div>
                </div>


            </el-col>

            <el-col :span="1" style="min-height: 1px"></el-col>
        </el-row>

        <!--非公开竞赛输入密码-->
        <el-dialog
                title="输入密码"
                :visible.sync="passwordVisible"
                width="30%">
            <el-form>
                <el-input type="password" v-model="password" placeholder="请输入内容" size="medium"></el-input>
            </el-form>

            <span slot="footer">
                <el-button @click="passwordVisible = false">取 消</el-button>
                <el-button type="primary" @click="passwordokbtn">确 定</el-button>
            </span>

        </el-dialog>


    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import CompetitionList from "../components/CompetitionList";
    import mavonEditor from "mavon-editor";
    import ProblemList from "../components/ProblemList";
    import SubmitList from "../components/SubmitList";

    export default {
        name: 'Competition',
        components: {
            CompetitionList,
            ProblemList,
            SubmitList
        }, computed: {
            convertToMarkDown() {
                return mavonEditor.markdownIt.render(this.competition["description"] == null ? "" : this.competition["description"])
            }

        }, mounted() {
            this.getcompetition()
        }, data() {
            return {
                leaderboardtablecontentjson: [],
                leaderboardtablemetajson: [],
                allSubmits: [],
                competitionproblemset: [],
                competitionproblempagedata: {},
                currentcompetitionpanel: "description",
                activename: "description",
                passwordVisible: false,
                password: null,
                competition: {},
            }
        }, methods: {
            //排行榜表格的每一项数据内容
            convertToTableItem(data, dataprop) {
                if (dataprop.indexOf("_costTime") >= 0) {
                    if (data.row.leaderBoardItemProblems[dataprop] == null) {
                        return ""
                    }
                    return (data.row.leaderBoardItemProblems[dataprop]["timeCost"] != null ? data.row.leaderBoardItemProblems[dataprop]["timeCost"] : "")
                        + (((data.row.leaderBoardItemProblems[dataprop]["waTimes"] != null) && (data.row.leaderBoardItemProblems[dataprop]["waTimes"] != 0)) ? (" (-" + data.row.leaderBoardItemProblems[dataprop]["waTimes"] + ")") : "")
                } else {
                    return data.row[dataprop];
                }
            },
            //计算题目是否是第一个解出来的
            calcTableItemFirstBlood(data, dataprop) {
                if (dataprop.indexOf("_costTime") >= 0) {
                    if (data.row.leaderBoardItemProblems[dataprop] == null) {
                        return false
                    }
                    return (data.row.leaderBoardItemProblems[dataprop]["firstBlood"] != null) && (data.row.leaderBoardItemProblems[dataprop]["firstBlood"] != false)
                } else {
                    return false;
                }
            },

            //计算题目是否是第一个解出来的
            calcTableItemSuccessFail(data, dataprop) {
                if (dataprop.indexOf("_costTime") >= 0) {
                    if (data.row.leaderBoardItemProblems[dataprop] == null) {
                        return null
                    } else if (data.row.leaderBoardItemProblems[dataprop]["success"] == true) {
                        return true;
                    } else if (data.row.leaderBoardItemProblems[dataprop]["waTimes"] != null && data.row.leaderBoardItemProblems[dataprop]["waTimes"] >= 1) {
                        return false;
                    }
                } else {
                    return null;
                }
            },
            // 获得排行榜
            getCompetitionLeaderBoard: function () {
                var me = this;
                axios.get(Url.withBase("/api/competition/getLeaderBoard"), {
                    params: {
                        competitionId: this.$route.params["competitionid"]
                    }
                }).then(function (response) {
                    me.leaderboardtablecontentjson = response.data.data.tablecontentjson;
                    me.leaderboardtablemetajson = response.data.data.tablemetajson;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //获得竞赛的所有提交记录
            getAllSubmit() {
                let me = this;
                axios.get(Url.withBase('/api/competition/submitsset/'), {
                    params: {
                        competitionid: this.$route.params["competitionid"]
                    }
                }).then(function (response) {
                    console.log(response)
                    me.allSubmits = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //竞赛那一列的点击事件
            handleClick(tab, event) {
                this.currentcompetitionpanel = tab.name
                if (tab.name == "problemset" && this.competitionproblemset == 0) {
                    this.getcompetitionproblemset()
                } else if (tab.name == 'submitset') {
                    this.getAllSubmit()
                } else if (tab.name == 'leaderboard') {
                    this.getCompetitionLeaderBoard()
                }
            },
            // 获得竞赛
            getcompetition: function () {
                var me = this;
                axios.get(Url.withBase("/api/competition/competition/" + this.$route.params["competitionid"]), {}).then(function (response) {
                    me.competition = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //参加btn
            joincompetitionbtn: function () {
                if (this.competition.isPublic || this.password != null) {
                    this.joincompetition();
                    this.password = null;
                } else {
                    this.passwordVisible = true;
                }
            },
            //参加按钮
            passwordokbtn: function () {
                this.passwordVisible = false;
                if (this.password == '') {
                    this.password == null
                } else {
                    this.joincompetition();
                }

            },
            //post,加入竞赛
            joincompetition: function () {
                var that = this;
                axios.post(Url.withBase("/api/competition/joincompetition"), {
                    competitionid: that.$route.params["competitionid"],
                    password: that.password
                }).then(function (response) {
                    console.log(response)
                    if (response.data.code == 200) {
                        that.$message("报名成功");
                    } else {
                        that.$message(response.data.msg);
                    }
                    that.getcompetition();
                }).catch(function (error) {
                    console.log(error)
                })

            },
            // 获得竞赛问题列表
            getcompetitionproblemset: function (pagenum) {
                if (this.competitionproblemset.length != 0) {
                    return;
                }
                var me = this;
                axios.get(Url.withBase("/api/competition/problemset"), {
                    params: {
                        pagenum: pagenum == null ? 1 : pagenum,
                        competitionid: me.$route.params["competitionid"]
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                        me.competitionproblemset = response.data.data.content;
                        me.competitionproblempagedata = response.data.data.pageInfo
                    } else {
                        this.$message(response.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            changeproblemlistpage: function (val) {
                this.getcompetitionproblemset(val)
            },
            //跳转到problem
            redirectToCompetitionProblem: function (problemid) {
                this.$router.push("/competition/" + this.$route.params["competitionid"] + "/problem/" + problemid)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

<style>
    .competitionpanel .el-tabs__header {
        margin-bottom: 0px !important;
    }
</style>
