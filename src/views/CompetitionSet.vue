<template>
    <div class="home">
        <div style="height: 20px;"></div>

        <el-row>
            <el-col :span="1" style="min-height: 1px">

            </el-col>

            <el-col :span="16">
                <CompetitionList
                        :total="total"
                        :changepage="this.changecompetitionlistpage" :currentpage="currentpage"
                        :competitionlist="competitions">
                </CompetitionList>
            </el-col>
            <!--                右边栏-->
            <el-col style="margin-left: 30px;text-align: left" :span="6">
                <el-card class="box-card" style="width: 300px">
                    <!--                    <div slot="header" class="clearfix">-->
                    <!--                    </div>-->
                    <el-button type="text" v-on:click="dream">参加竞赛，赢￥9999999999大奖</el-button>
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

    export default {
        name: 'CompetitionSet',
        components: {
            CompetitionList
        }, computed: {}, mounted() {
            this.getcompetitionlist()
        }, data() {
            return {
                competitions: [],
                currentpage: null,
                total: 0,
            }
        }, methods: {
            // 获得竞赛列表
            getcompetitionlist: function (pagenum, pagecount) {
                var me = this;
                axios.get(Url.withBase("/api/competition/competitions"), {
                    params: {
                        pagenum: pagenum == null ? 1 : pagenum,
                        pagecount: pagecount == null ? null : pagecount
                    }
                }).then(function (response) {
                    me.competitions = response.data.data.content;
                    me.currentpage = response.data.data.pageInfo['pageNum']
                    me.total = response.data.data.pageInfo['total']
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //换页
            changecompetitionlistpage: function (val) {
                this.getcompetitionlist(val, null, this.$route.params["category"])
            },
            dream() {
                setInterval(this.$message("提示你，梦醒了"), 1000);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
