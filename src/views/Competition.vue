<template>
    <div class="home">
        <div style="height: 20px;"></div>

        <el-row>
            <el-col :span="1" style="min-height: 1px">

            </el-col>

            <el-col :span="16" style="background-color: white">
                <h2>{{competition.title}}</h2>

                <el-tag size="mini" type="info" v-if="competition.status=='end'">已结束</el-tag>
                <el-tag size="mini" type="success" v-if="competition.status=='processing'">进行中</el-tag>
                <el-tag size="mini" type="" v-if="competition.status=='unstart'">未开始</el-tag>

                <h4><span v-if="competition.startTime">开始时间:</span><span style="font-weight: normal">{{competition.startTime}}</span>
                    <span style="width: 30px;"></span>
                    <span v-if="competition.endTime">结束时间:</span> <span style="font-weight: normal">{{competition.endTime}}</span>
                </h4>


                <div style="text-align: left;padding-left: 10px;padding-right: 10px">
                    <div v-html="convertToMarkDown" style="margin-bottom: 80px;margin-right: 10px">

                    </div>
                </div>

                <el-button v-if="competition.userJoined==false" v-on:click="joincompetition">报名参加</el-button>

                <el-button type="text" v-if="competition.userJoined==true">已报名</el-button>

                <div>
                    <el-button v-if="competition.status=='processing'&&competition.userJoined==true">进入竞赛</el-button>
                </div>

                <div style="height: 50px;"></div>
            </el-col>
            <!--                右边栏-->
            <el-col style="margin-left: 30px;text-align: left" :span="6">
                <el-card class="box-card" style="width: 300px">
                    <!--                    <div slot="header" class="clearfix">-->
                    <!--                    </div>-->
                    <!--                    <el-button type="text" v-on:click="dream">参加竞赛，赢￥9999999999大奖</el-button>-->
                    <div></div>
                </el-card>

            </el-col>

            <el-col :span="1" style="min-height: 1px"></el-col>
        </el-row>


    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import CompetitionList from "../components/CompetitionList";
    import mavonEditor from "mavon-editor";

    export default {
        name: 'Competition',
        components: {
            CompetitionList
        }, computed: {
            convertToMarkDown() {
                return mavonEditor.markdownIt.render(this.competition["description"] == null ? "" : this.competition["description"])
            }

        }, mounted() {
            this.getcompetition()
        }, data() {
            return {
                competition: {},
            }
        }, methods: {
            // 获得竞赛列表
            getcompetition: function () {
                var me = this;
                axios.get(Url.withBase("/api/competition/competition/" + this.$route.params["competitionid"]), {}).then(function (response) {
                    me.competition = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            joincompetition: function () {
                var that = this;
                axios.post(Url.withBase("/api/competition/joincompetition"), {
                    competitionid: that.$route.params["competitionid"],
                }).then(function (response) {
                    console.log(response)
                    that.$message(response.data.msg);
                    that.getcompetition();
                }).catch(function (error) {
                    console.log(error)
                })

            }
        }
    }
</script>

<style scoped lang="scss">

</style>
