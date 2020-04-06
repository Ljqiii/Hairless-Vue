<template>
    <div class="about">
        <h1>{{this.$route.params["problemid"]}}</h1>
        <el-row>
            <el-col :span="8" style="padding-left: 10px">
                <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
                    <el-tab-pane label="题目描述" name="description">
                        <span slot="label"><i class="el-icon-date"></i> 题目描述</span>
                        <ProblemDescription v-bind:problem="problemobjecttest"></ProblemDescription>
                    </el-tab-pane>
                    <el-tab-pane label="讨论" name="discuss">讨论</el-tab-pane>
                    <el-tab-pane label="提交记录" name="submit">提交记录</el-tab-pane>
                    <el-tab-pane label="题解" name="answer">题解</el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="16" style="background: azure">sdf</el-col>
        </el-row>


    </div>
</template>

<script>
    import ProblemDescription from "./problemcontet/ProblemDescription";

    export default {
        name: 'Problem',
        components: {ProblemDescription},
        computed: {
            problemobjecttest() {
                return {
                    id: 1,
                    title: "dfg",
                    complexity: "easy",
                    islike: true,
                    like: 777,
                    description: "# 题目描述\n ## sdf",
                    initcode: "initcode",
                    sumbitedcount: 7754,
                    acceptance: "455%"
                }
            }
        },
        data() {
            return {
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
            }
        }
    }


</script>