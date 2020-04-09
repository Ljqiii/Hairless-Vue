<template>
    <div ref="problemcontent">
        <!--        <h1>{{this.$route.params["problemid"]}}</h1>-->
        <el-row>
            <el-col :span="7"
                    :style="{height:problemstyleheight+ 'px',paddingLeft:'15px',backgroundColor:'white',borderRight:'1px solid #E0E3EA'}">
                <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
                    <el-tab-pane label="题目描述" name="description">
                        <span slot="label"><i class="el-icon-date"></i> 题目描述</span>
                        <ProblemDescription v-bind:problem="problem"></ProblemDescription>
                    </el-tab-pane>
                    <el-tab-pane label="讨论" name="discuss">讨论</el-tab-pane>
                    <el-tab-pane label="提交记录" name="submit">提交记录</el-tab-pane>
                    <el-tab-pane label="题解" name="answer">题解</el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="17" ref="problemdescriptioncontent" style=""
                    :style="{height:(problemstyleheight-(resultWindowVisable?resultWindowHeight:0)-54) + 'px'}">
                <ProblemCodeContent :codetree="problem.initProblemCode"></ProblemCodeContent>

                <div :style="{height:resultWindowHeight+'px'}" v-if="resultWindowVisable">
                    sdafds
                </div>

                <div :style="{height: '53px',display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',borderTop: '1px solid #E0E3EA',backgroundColor: 'white'}">

                    <div>

                        <el-button size="medium" type="text"
                                   style="margin-right: 20px;padding-left: 20px;padding-right: 11px;"
                                   v-on:click="resultWindowVisable=!resultWindowVisable">
                            执行结果
                        </el-button>

                    </div>
                    <div>
                        <el-button icon="el-icon-caret-right" size="medium" type="primary"
                                   style="margin-right: 20px;padding-left: 7px;padding-right: 11px;"
                                   v-on:click="null">
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

    export default {
        name: 'Problem',
        components: {
            ProblemDescription,
            ProblemCodeContent,
            vueCustomScrollbar
        },
        mounted() {
            var me = this;
            this.problemcontentheight = window.innerHeight - this.$refs.problemcontent.getBoundingClientRect().y;
            this.getProblem();
            window.addEventListener("resize", () => {
                me.problemcontentheight = window.innerHeight - me.$refs.problemcontent.getBoundingClientRect().y;
            })
        },
        computed: {
            problemstyleheight() {
                let a = this.problemcontentheight;
                return a;
            }
        },
        data() {
            return {
                resultWindowVisable: false,
                resultWindowHeight: 270,
                problemcontentheight: 0,
                problem: {},
                tabActiveName: "description",//tab标签的默认
                input: 'weqrtewa'
            }
        },
        methods: {
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
                let me = this;
                axios.get(Url.withBase('/api/problem/' + this.$route.params["problemid"]), {})
                    .then(function (response) {
                        console.log(response)
                        me.problem = response.data.data;
                        AuthUtil;
                    }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }


</script>

<style scoped lang="scss">

</style>
