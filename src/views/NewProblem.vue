<template>
    <div :style="{height:contentheightcompute+'px',display:'flex',flexDirection:'column'}" ref="newproblemcontent">
        <div style="height: 20px;"></div>
        <el-row style="height: 0;flex: 1;">
            <el-col :span="1" style="min-height: 1px"></el-col>
            <el-col :span="3" style="height: 100%;">

                <div style="height: 100%;display: flex;flex-direction: column;border-right: 1px solid #d8d8d8">


                    <div style="height: 25%;"></div>

                    <el-steps direction="vertical" :active="currentstep" finish-status="process">
                        <el-step description="该题目基本信息">

                            <template slot="icon">
                                <img :src="require('@/assets/edit.svg')" style="height: 15px;"/>
                            </template>
                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(0)">基本信息</el-button>
                            </template>

                        </el-step>

                        <el-step description="题目详细描述">

                            <template slot="icon">
                                <img :src="require('@/assets/threedivider.svg')" style="height: 15px;"/>
                            </template>
                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(1)">题目描述</el-button>
                            </template>

                        </el-step>

                        <el-step description="编写初始化代码(不提供调试功能)">

                            <template slot="icon">
                                <img :src="require('@/assets/code.svg')" style="height: 15px;"/>
                            </template>

                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(2)">初始化代码</el-button>
                            </template>


                        </el-step>
                        <el-step description="该题目详细题解">

                            <template slot="icon">
                                A
                            </template>


                            <template slot="title">
                                <el-button type="text" v-on:click="switchstep(3)">题解</el-button>
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
                                <el-form-item label="题目标题">
                                    <el-input v-model="basicinfoForm.title"
                                              auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="Docker 镜像">
                                    <el-input v-model="basicinfoForm.dockerImage"
                                              auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="Docker 启动命令">
                                    <el-input v-model="basicinfoForm.cmd"
                                              auto-complete="off"></el-input>
                                </el-form-item>


                                <el-form-item label="Docker 缓存目录">
                                    <el-input v-model="basicinfoForm.dockerCacheDir"
                                              auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="Docker 内存限制">
                                    <el-input v-model="basicinfoForm.memoryLimit"
                                              auto-complete="off">
                                        <template slot="append">MB</template>
                                    </el-input>
                                </el-form-item>
                                <div style="height: 1px;"></div>

                                <el-divider></el-divider>

                                <el-form-item label="vip题目">
                                    <el-checkbox v-model="basicinfoForm.onlyVip"
                                                 auto-complete="off"></el-checkbox>
                                </el-form-item>

                                <el-form-item label="难易程度">
                                    <el-select v-model="basicinfoForm.complexity" placeholder="请选择">
                                        <el-option
                                                v-for="item in [{name:'简单',value:'easy'},{name:'中等',value:'medium'},{name:'困难',value:'hard'}]"
                                                :key="item.value"
                                                :label="item.name"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
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
                <!--                初始化代码-->
                <div v-if="currentstep==2" style="height: 100%;display: flex;flex-direction: column">
                    <h3 style="text-align: center">初始化代码</h3>
                    <ProblemCodeContent :codetree="basicinfoForm.initCode instanceof Object?basicinfoForm.initCode:null"
                                        style="flex: 1;height: 0;"></ProblemCodeContent>
                    <div style="height: 40px;"></div>

                </div>
                <!--                题解-->
                <div v-if="currentstep==3" style="height: 100%;display: flex;flex-direction: column">
                    <h3 style="text-align: center">题解</h3>
                    <mavon-editor style="height: 0;flex: 1" v-model="basicinfoForm.answer"></mavon-editor>
                    <div style="height: 40px;"></div>
                </div>
                <!--                完成-->
                <div v-if="currentstep==4"
                     style="height: 100%;display: flex;flex-direction: column;text-align: center;justify-content: center">
                    <div>
                        <div> 请仔细检查是否有错误，无错误后点击提交按钮</div>
                        <div style="height: 25px;"></div>

                        <el-button type="primary" v-on:click="submmitNewProblem">提交</el-button>
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
        name: 'NewProblem',
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
                basicinfoForm: {
                    title: '',
                    complexity: 'easy',
                    onlyVip: false,
                    description: '',
                    dockerImage: "",
                    initCode: {},
                    memoryLimit: "",
                    dockerCacheDir: "",
                    lang: "",
                    cmd: "",
                    answer: ''
                },
                currentstep: 0,
                contentheight: 0
            }
        }, mounted() {
            var me = this;
            this.contentheight = window.innerHeight - this.$refs.newproblemcontent.getBoundingClientRect().y - 1;
            window.addEventListener("resize", () => {
                me.contentheight = window.innerHeight - me.$refs.newproblemcontent.getBoundingClientRect().y - 1;
            })

            this.problemtemple()
        },
        methods: {
            //题目模板
            problemtemple(lang) {
                var me = this;
                axios.get(Url.withBase("/api/problemtemple"), {
                    params: {
                        lang: lang
                    }
                }).then(function (response) {
                    console.log(response)
                    me.basicinfoForm.dockerImage = response.data.data.dockerImage;
                    me.basicinfoForm.initCode = JSON.parse(response.data.data.initcode)['problemCodeFileItems'];
                    me.basicinfoForm.dockerCacheDir = response.data.data.dockerCacheDir;
                    me.basicinfoForm.lang = lang;
                    me.basicinfoForm.cmd = response.data.data.cmd;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            switchstep(step) {
                this.currentstep = step;
                console.log(typeof this.basicinfoForm.initCode)
                console.log(typeof this.basicinfoForm.initCode == "object")

            },
            submmitNewProblem() {
                var that = this;
                axios.post(Url.withBase("/api/newproblem"), {
                    title: that.basicinfoForm.title,
                    complexity: that.basicinfoForm.complexity,
                    onlyVip: that.basicinfoForm.onlyVip,
                    description: that.basicinfoForm.description,
                    dockerImage: that.basicinfoForm.dockerImage,
                    initCode: {problemCodeFileItems: that.basicinfoForm.initCode},
                    memoryLimit: that.basicinfoForm.memoryLimit,
                    dockerCacheDir: that.basicinfoForm.dockerCacheDir,
                    lang: "java1.8/maven",//暂时只支持java1.8
                    cmd: that.basicinfoForm.cmd
                }).then(function (response) {
                    that.$router.push("/problem/" + response.data.data.problemid);
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                    this.$message("异常，请检查");
                })
            },
            testbtn() {
                console.log(this.$route.path)
            },

        }
    };
</script>
