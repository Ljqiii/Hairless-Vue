<template>
    <div :style="{height:contentheightcompute+'px',display:'flex',flexDirection:'column'}" ref="newproblemcontent">
        <div style="height: 20px;"></div>
        <el-row style="height: 0;flex: 1;">
            <el-col :span="1" style="min-height: 1px"></el-col>
            <el-col :span="3" style="height: 100%;">

                <div style="height: 100%;display: flex;flex-direction: column;border-right: 1px solid #d8d8d8">


                    <div style="height: 25%;"></div>

                    <el-steps direction="vertical" :active="currentstep" finish-status="process">
                        <el-step description="该竞赛基本信息">

                            <template slot="icon">
                                <img :src="require('@/assets/edit.svg')" style="height: 15px;"/>
                            </template>
                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(0)">基本信息</el-button>
                            </template>

                        </el-step>

                        <el-step description="竞赛详细描述">

                            <template slot="icon">
                                <img :src="require('@/assets/threedivider.svg')" style="height: 15px;"/>
                            </template>
                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(1)">竞赛介绍</el-button>
                            </template>

                        </el-step>

                        <el-step description="题目选择">

                            <template slot="icon">
                                <img :src="require('@/assets/code.svg')" style="height: 15px;"/>
                            </template>

                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(2)">题目选择</el-button>
                            </template>


                        </el-step>

                        <el-step description="完成">

                            <template slot="icon">
                                <img :src="require('@/assets/ok.svg')" style="height: 15px;"/>
                            </template>

                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(4)">完成</el-button>
                            </template>


                        </el-step>
                    </el-steps>


                    <div style="height: 25%;"></div>
                </div>
            </el-col>
            <el-col :span="19" style="background-color: white;text-align: left;height: 100%;">
                <!--                基本信息-->
                <div v-if="currentstep==0" style="height: 100%">
                    <vue-custom-scrollbar :style="{}" settings="maxScrollbarLength: 60" style="height: 100%">
                        <div style="width: 70%;height: 100%;">
                            <h3 style="text-align: center">基本信息</h3>
                            <!--                            TODO: 表单检查-->
                            <el-form :model="basicinfoForm" status-icon ref="basicinfoForm" label-width="150px">
                                <el-form-item label="竞赛标题">
                                    <el-input v-model="basicinfoForm.title"
                                              auto-complete="off"></el-input>
                                </el-form-item>


                                <div style="height: 1px;"></div>

                                <el-divider></el-divider>

                                <el-form-item label="比赛时间">
                                    <el-date-picker
                                            v-model="daterange"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>

                                </el-form-item>


                                <el-form-item label="公开">
                                    <el-checkbox v-model="basicinfoForm.public"
                                                 auto-complete="off"></el-checkbox>
                                </el-form-item>

                                <el-form-item label="密码" v-if="!basicinfoForm.public">
                                    <el-input v-model="basicinfoForm.password"
                                              auto-complete="off"></el-input>
                                </el-form-item>


                            </el-form>

                        </div>
                    </vue-custom-scrollbar>


                </div>
                <!--                题目描述-->
                <div v-if="currentstep==1" style="height: 100%;display: flex;flex-direction: column">
                    <h3 style="text-align: center">题目描述</h3>
                    <mavon-editor style="height: 0;flex: 1" v-model="basicinfoForm.description"></mavon-editor>
                    <div style="height: 40px;"></div>

                </div>
                <!--                题目选择-->
                <div v-if="currentstep==2" style="height: 100%;display: flex;flex-direction: column">
                    <h3 style="text-align: center">题目选择</h3>
                    <div style="margin-left: 20px">


                        <div style="margin-bottom: 10px"
                             :key="item.id"
                             v-for="(item,index) in problemIds">

                            <span style="font-weight: bold">
                                <i>#</i>
                            {{(index+1)}}
                            </span>

                            <el-tag class="competitionproblemitem"
                                    type="info"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(item)">
                                {{problemsid_title[item]}}
                            </el-tag>

                        </div>


                        <div style="height: 10px;"></div>


                        <el-input
                                v-if="inputVisible"
                                placeholder="请输入题目编号"
                                class="input-new-tag"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm">
                        </el-input>


                        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加题目</el-button>

                    </div>


                </div>
                <!--                完成-->
                <div v-if="currentstep==4"
                     style="height: 100%;display: flex;flex-direction: column;text-align: center;justify-content: center">
                    <div>
                        <div> 请仔细检查是否有错误，无错误后点击提交按钮</div>
                        <div style="height: 25px;"></div>

                        <el-button type="primary" v-on:click="submmitNewCompetition">提交</el-button>
                    </div>

                </div>


            </el-col>
            <el-col :span="1" style="min-height: 1px"></el-col>
        </el-row>


    </div>
</template>
<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import axios from "axios";
    import Url from "../utils/Url";
    import ProblemCodeContent from "./problemcontet/ProblemCodeContent";

    export default {
        name: 'NewCompetition',
        components: {
            ProblemCodeContent,
            vueCustomScrollbar
        },
        computed: {
            contentheightcompute() {
                let a = this.contentheight;
                return a;
            }
        },
        data() {
            return {
                problemsid_title: {},
                problemIds: [],
                inputVisible: false,
                inputValue: '',
                daterange: [new Date(), new Date()],
                basicinfoForm: {
                    title: '',
                    password: '',
                    public: true,
                    description: '',
                },
                currentstep: 0,
                contentheight: 0,
            }
        }, mounted() {
            var me = this;
            this.contentheight = window.innerHeight - this.$refs.newproblemcontent.getBoundingClientRect().y - 1;
            window.addEventListener("resize", this.windowsresizeHandler)
        }, destroyed() {
            window.removeEventListener("resize", this.windowsresizeHandler)
        },
        methods: {
            handleClose(tag) {
                this.problemIds.splice(this.problemIds.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.addItem(inputValue)
                    // this.problemIds.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //添加问题
            addItem(problemid) {
                let me = this;
                axios.get(Url.withBase('/api/problemtitle/' + problemid), {})
                    .then(function (response) {
                        if (response.data.code != 200) {
                            me.$message(response.data.msg);
                        } else {
                            me.problemIds.push(response.data.data.id);
                            me.problemsid_title[response.data.data.id] = response.data.data.title;
                        }
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            windowsresizeHandler() {
                var me = this;
                me.contentheight = window.innerHeight - me.$refs.newproblemcontent.getBoundingClientRect().y - 1;
            },

            switchstep(step) {
                this.currentstep = step;
                console.log(typeof this.basicinfoForm.initCode)
                console.log(typeof this.basicinfoForm.initCode == "object")
            },
            submmitNewCompetition() {
                var that = this;
                axios.post(Url.withBase("/api/competition/pushcompetition"), {
                    title: that.basicinfoForm.title,
                    description: that.basicinfoForm.description,
                    startTime: that.daterange[0],
                    endTime: that.daterange[1],
                    isPublic: that.basicinfoForm.public,
                    password: that.basicinfoForm.password,
                    problemIds: that.problemIds
                }).then(function (response) {
                    that.$router.push("/competition/" + response.data.data.competitionid);
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                    this.$message("异常，请检查");
                })
            }
        }
    };
</script>

<style>
    .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        vertical-align: bottom;
    }

    .competitionproblemitem {

    }
</style>
