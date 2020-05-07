<template>
    <div ref="problemcontent">
        <!--        <h1>{{this.$route.params["problemid"]}}</h1>-->
        <el-row>
            <el-col :span="7"
                    :style="{height:problemstyleheight+ 'px',paddingLeft:'15px',backgroundColor:'white',borderRight:'1px solid #E0E3EA'}">
                <el-tabs v-model="tabActiveName" @tab-click="handleTabClick"
                         style="height: 100%;display: flex;flex-direction: column">
                    <el-tab-pane label="题目描述" name="description">
                        <span slot="label"><i class="el-icon-tickets"></i> 题目描述</span>
                        <ProblemDescription v-bind:problem="problem"></ProblemDescription>
                    </el-tab-pane>
                    <el-tab-pane label="讨论" name="discuss">
                        <span slot="label" v-on:click="this.getAllSubmit"><i
                                class="el-icon-chat-line-round"></i> 讨论</span>


                    </el-tab-pane>

                    <el-tab-pane label="提交记录" name="submit" style="height: 100%;width: 100%;"
                                 v-on:click="this.getAllSubmit">
                        <span slot="label" v-on:click="this.getAllSubmit"><i class="el-icon-pie-chart"></i> 提交记录</span>
                        <vue-custom-scrollbar style="height: 100%;flex: 1;text-align: left;padding-left: 10px;"
                                              settings="maxScrollbarLength: 60">
                            <div style="display: flex;flex-direction: column;width: 95%">
                                <div style="line-height: normal;display: flex;flex-direction: row;border-bottom: 1px solid #e8ebf3;height: 35px;line-height: 35px;margin-top: 2px">
                                    <div style="flex: 1">
                                        日期
                                    </div>
                                    <div style="flex: 1">
                                        结果
                                    </div>
                                </div>

                                <SubmitList :all-submits="allSubmits">

                                </SubmitList>

                                <div style="height: 30px;"></div>
                            </div>
                        </vue-custom-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="题解" name="answer">
                        <span slot="label"><i class="el-icon-document-checked"></i> 题解</span>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="17" ref="problemdescriptioncontent" style=""
                    :style="{height:(problemstyleheight-(resultWindowVisable?resultWindowHeight:0)-54) + 'px'}">
                <ProblemCodeContent :codetree="problem.initProblemCode"></ProblemCodeContent>

                <!--                结果窗口-->
                <div :style="{height:resultWindowHeight+'px'}" v-if="resultWindowVisable"
                     style="display: flex;flex-direction: column;">

                    <div style="height: 1px;background-color: #d8d8d8;width: 100%"></div>

                    <div style="width: 100%;display: flex;flex-direction: row; flex: 1;height: 0;">
                        <vue-custom-scrollbar style="height: 100%;width: 250px;text-align: left"
                                              settings="maxScrollbarLength: 60">
                            <div style="height: 15px;"></div>
                            <el-timeline>
                                <el-timeline-item
                                        v-for="(activity, index) in steps"
                                        :key="index">
                                    {{activity.event}}
                                </el-timeline-item>
                            </el-timeline>
                        </vue-custom-scrollbar>
                        <div style="background-color:white;flex: 1;height: 100%;text-align: left;display: flex;flex-direction: column">
                            <vue-custom-scrollbar style="height: 0;flex: 1;text-align: left;padding-left: 10px;"
                                                  settings="maxScrollbarLength: 60">
                                <div style="height: 10px;"></div>
                                <div v-for="(log, index) in logs"
                                     :key="index" style="font-family:JetBrainsMono;font-size:15px;line-height: normal ">
                                    {{log}}
                                </div>
                            </vue-custom-scrollbar>
                        </div>
                    </div>


                </div>


                <div :style="{height: '53px',display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',borderTop: '1px solid #E0E3EA',backgroundColor: 'white'}">

                    <div>

                        <el-button size="medium" type="text"
                                   style="margin-right: 20px;padding-left: 20px;padding-right: 11px;"
                                   v-on:click="resultWindowVisable=!resultWindowVisable">
                            <span style="display: flex;flex-direction: row;align-items: center">
                                <span>执行结果</span>
                                <img :src="require('@/assets/arrowdown.svg')"
                                     style="width: 17px;height: 17px;vertical-align: center"
                                     v-if="resultWindowVisable==false"/>
                                <img :src="require('@/assets/arrowup.svg')"
                                     style="width: 17px;height: 17px;vertical-align: center"
                                     v-if="resultWindowVisable==true"/>
                            </span>
                        </el-button>

                    </div>
                    <div>
                        <el-button icon="el-icon-caret-right" size="medium" type="primary"
                                   style="margin-right: 20px;padding-left: 7px;padding-right: 11px;"
                                   v-on:click="submitProblem">
                            提交执行
                        </el-button>
                    </div>
                </div>

            </el-col>
        </el-row>


    </div>
</template>

<script>
    import ProblemDescription from "./problemcontet/ProblemDescription";
    import axios from "axios";
    import Url from "../utils/Url";
    import AuthUtil from "../utils/AuthUtil";
    import ProblemCodeContent from "./problemcontet/ProblemCodeContent";
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import ScokJs from "sockjs-client";
    import Stomp from "stompjs";
    import SubmitList from "../components/SubmitList";

    export default {
        name: 'Problem',
        components: {
            SubmitList,
            ProblemDescription,
            ProblemCodeContent,
            vueCustomScrollbar
        },
        mounted() {
            var me = this;
            this.problemcontentheight = window.innerHeight - this.$refs.problemcontent.getBoundingClientRect().y - 1;
            this.getProblem();
            window.addEventListener("resize", this.windowsresizeHandler)
            this.connectWs()
        },
        destroyed() {
            window.removeEventListener("resize", this.windowsresizeHandler);
        },
        computed: {
            problemstyleheight() {
                let a = this.problemcontentheight;
                return a;
            }
        },
        data() {
            return {
                allSubmits: [],
                steps: [],
                logs: [],
                stepList: [{id: 1, content: "sdf"}, {id: 2, content: "ssdfadf"}],
                submitids: [],
                resultWindowVisable: false,
                resultWindowHeight: 270,
                problemcontentheight: 0,
                problem: {},
                tabActiveName: "description",//tab标签的默认
                input: 'weqrtewa'
            }
        },
        methods: {
            windowsresizeHandler() {
                var me = this;
                me.problemcontentheight = window.innerHeight - me.$refs.problemcontent.getBoundingClientRect().y - 1;
            },
            connectWs: function () {
                let that = this;
                this.socket = new ScokJs(Url.withBase("/ws/dockerjudge"))
                this.stompClient = Stomp.over(this.socket);
                this.stompClient.connect({}, function (frame) {
                    console.log(frame);
                    that.stompClient.subscribe("/user/queue/judgestep", function (message) {
                        that.addJudgeStep(message)
                    })

                    that.stompClient.subscribe("/user/queue/judgeresultlogs", function (message) {
                        that.addJudgeLogs(message);
                    })

                })
            },
            clearResults: function () {
                this.steps = [];
                this.logs = [];
            },
            //添加step
            addJudgeStep(message) {
                console.log(message);
                var body = JSON.parse(message.body);
                this.steps.push(body);
            },
            //添加日志
            addJudgeLogs(message) {
                var body = JSON.parse(message.body);
                var log = body.oneLineLog
                var submitId = body.submitId
                this.logs.push(log);
            },
            //提交问题
            submitProblem() {
                this.clearResults();
                var that = this;
                let data = {
                    competitionId: this.$route.params["competitionid"] != null ? parseInt(this.$route.params["competitionid"]) : null,
                    problemId: this.problem.id,
                    problemCode: {problemCodeFileItems: this.problem.initProblemCode}
                }
                axios.post(Url.withBase("/api/judge/submit"), data
                ).then(function (response) {
                    that.resultWindowVisable = true;
                    that.submitids.push(response.data.data.submitid)
                }).catch(function (error) {
                    console.log(error)
                })
            },

            handleTabClick(tab, event) {
                console.log(tab, event)
            }
            ,
            testckick() {
                console.log(23423);
                this.input = "dsfa"
            },
            //get问题
            getProblem() {
                //TODO:如果是竞赛，另一个获取题目的url，为了验证是否有加入竞赛
                let me = this;
                axios.get(Url.withBase('/api/problem/' + this.$route.params["problemid"]), {})
                    .then(function (response) {
                        console.log(response)
                        me.problem = response.data.data;
                        AuthUtil;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            //获得所有提交记录
            getAllSubmit() {
                let me = this;

                axios.get(Url.withBase('/api/getallsubmit/'), {
                    params: {
                        problemid: this.$route.params["problemid"]
                    }
                }).then(function (response) {
                    console.log(response)
                    me.allSubmits = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            }

        }
    }


</script>

<style scoped lang="scss">
    @font-face {
        font-family: "JetBrainsMono";
        src: url("~@/assets/font/JetBrainsMono/JetBrainsMono-Regular.woff");
        font-weight: normal;
        font-style: normal;
    }

</style>

<style>

    .el-tabs__content {
        display: flex;
        flex: 1;
    }

    .el-timeline {
        padding-inline-start: 30px;
    }
</style>
