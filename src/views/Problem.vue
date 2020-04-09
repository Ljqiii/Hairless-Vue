<template>
    <div ref="problemcontent">
        <!--        <h1>{{this.$route.params["problemid"]}}</h1>-->
        <el-row>
            <el-col :span="7" :style="{height:problemstyleheight,paddingLeft:'15px',backgroundColor:'white'}">
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
            <el-col :span="17" ref="problemdescriptioncontent" style="background-color: azure"
                    :style="{height:problemstyleheight}">
                    <ProblemCodeContent :codetree="problem.initProblemCode"></ProblemCodeContent>
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
                let a = this.problemcontentheight + "px";
                return a;
            }
        },
        data() {
            return {
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