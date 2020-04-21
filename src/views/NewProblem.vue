<template>
    <div :style="{height:contentheightcompute+'px',display:'flex',flexDirection:'column'}" ref="newproblemcontent">
        <div style="height: 20px;"></div>
        <el-row style="height: 0;flex: 1;">
            <el-col :span="1" style="min-height: 1px"></el-col>
            <el-col :span="3" style="height: 100%;display: flex;flex-direction: column;border-right: 1px solid white">
                <div style="height: 25%;"></div>

                <el-steps direction="vertical" :active="stepactive" finish-status="process">
                    <el-step description="该题目基本信息">

                        <template slot="icon">
                            <img :src="require('@/assets/edit.svg')" style="height: 15px;"/>
                        </template>
                        <template slot="title">
                            <el-button type="text" v-on:click="stepactive=0">基本信息</el-button>
                        </template>

                    </el-step>

                    <el-step description="题目详细描述">

                        <template slot="icon">
                            <img :src="require('@/assets/threedivider.svg')" style="height: 15px;"/>
                        </template>
                        <template slot="title">
                            <el-button type="text" v-on:click="stepactive=1">题目描述</el-button>
                        </template>

                    </el-step>

                    <el-step description="编写初始化代码(不提供调试功能)">

                        <template slot="icon">
                            <img :src="require('@/assets/code.svg')" style="height: 15px;"/>
                        </template>

                        <template slot="title">
                            <el-button type="text" v-on:click="stepactive=2">初始化代码</el-button>
                        </template>


                    </el-step>
                    <el-step description="该题目详细题解">

                        <template slot="icon">
                            A
                        </template>


                        <template slot="title">
                            <el-button type="text" v-on:click="stepactive=3">题解</el-button>
                        </template>


                    </el-step>
                </el-steps>


                <div style="height: 25%;"></div>
            </el-col>
            <el-col :span="19" style="background-color: white;">
                sdf
            </el-col>
            <el-col :span="1" style="min-height: 1px"></el-col>
        </el-row>


    </div>
</template>
<script>

    export default {
        name: 'NewProblem',
        components: {},
        computed: {
            contentheightcompute() {
                let a = this.contentheight;
                return a;
            }
        },
        data() {
            return {
                stepactive:0,
                contentheight: 0
            }
        }, mounted() {
            var me = this;
            this.contentheight = window.innerHeight - this.$refs.newproblemcontent.getBoundingClientRect().y - 1;
            window.addEventListener("resize", () => {
                me.contentheight = window.innerHeight - me.$refs.newproblemcontent.getBoundingClientRect().y - 1;
            })

        },
        methods: {
            testbtn() {
                console.log(this.$route.path)
            },

        }
    };
</script>
