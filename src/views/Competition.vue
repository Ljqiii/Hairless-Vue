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
                    <span style="width: 30px;"></span>
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

                    <div>
                        <el-button v-if="competition.status=='processing'&&competition.userJoined==true">进入竞赛
                        </el-button>
                    </div>

                    <div style="height: 50px;"></div>
                </div>

                <!--题目列表-->

                <div v-if="currentcompetitionpanel=='problemset'">

                    <div v-if="competition.status=='processing'||competition.status=='end'">
                        <div style="height: 30px;"></div>
                        <ProblemList
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

                <div v-if="currentcompetitionpanel=='leaderboard'">

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


    export default {
        name: 'Competition',
        components: {
            CompetitionList,
            ProblemList
        }, computed: {
            convertToMarkDown() {
                return mavonEditor.markdownIt.render(this.competition["description"] == null ? "" : this.competition["description"])
            }

        }, mounted() {
            this.getcompetition()
        }, data() {
            return {
                competitionproblemset: [],
                competitionproblempagedata: {},
                currentcompetitionpanel: "description",
                activename: "description",
                passwordVisible: false,
                password: null,
                competition: {},
            }
        }, methods: {
            handleClick(tab, event) {
                this.currentcompetitionpanel = tab.name
                if (tab.name == "problemset" || this.competitionproblemset) {
                    this.getcompetitionproblemset()
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
