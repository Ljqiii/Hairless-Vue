<template>
    <div>

        <div style="display: flex;flex-direction: column;justify-content: flex-start">

            <el-table
                    @row-click="redirectToCompetition"
                    :data="competitionlist"
                    stripe

                    style="width: 100%;cursor: pointer">

                <el-table-column
                        label=""
                        width="100">
                    <template slot-scope="scope">
                        <span style="padding-left: 13px" v-if="scope.row.userJoined">已参加</span>
                    </template>
                </el-table-column>


                <el-table-column
                        label="标题"
                        width="280">
                    <template slot-scope="scope">
                        <strong style="cursor: pointer"> {{scope.row.title}} </strong>
                    </template>
                </el-table-column>


                <el-table-column
                        label="创建人"
                        width="120">
                    <template slot-scope="scope">
                        <strong style="cursor: pointer"> {{scope.row.createUserNickName}} </strong>
                    </template>
                </el-table-column>

                <el-table-column
                        label="开始时间"
                        width="150"
                >
                    <template slot-scope="scope">
                        <strong style="cursor: pointer"> {{scope.row.startTime}} </strong>
                    </template>
                </el-table-column>
                <el-table-column
                        label="公开"
                        width="90">
                    <template slot-scope="scope">
                        <strong style="cursor: pointer"> {{scope.row.isPublic?'公开':'密码'}} </strong>
                    </template>
                </el-table-column>


                <el-table-column
                        label="状态"
                >
                    <template v-slot="scope">

                        <el-tag size="mini" style="cursor: pointer" type="info" v-if="scope.row.status=='end'">已结束
                        </el-tag>
                        <el-tag size="mini" style="cursor: pointer" type="success"
                                v-if="scope.row.status=='processing'">进行中
                        </el-tag>
                        <el-tag size="mini" style="cursor: pointer" type="" v-if="scope.row.status=='unstart'">未开始
                        </el-tag>

                    </template>
                </el-table-column>


            </el-table>
            <!--            显示页数-->
            <el-pagination
                    background
                    style="margin-top: 15px"
                    layout="prev, pager, next"
                    :current-page="currentpage"
                    :total="total"
                    :page-size="20"
                    @current-change="changepage"
            >

            </el-pagination>


        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import ECharts from 'vue-echarts'
    import echarts from 'echarts'
    import AuthUtil from '../utils/AuthUtil'

    export default {
        name: 'CompetitionList',
        components: {},
        props: {
            currentpage: Number,
            total: Number,
            competitionlist: Array,
            changepage: Function
        },
        computed: {},
        mounted() {

        }, data() {
            return {}
        }, methods: {
            redirectToCompetition(row) {
                this.$router.push("/competition/" + row.id)
            },
            redirectToUser(username) {
                this.$router.push("/u/" + username + "/")
            }

        }
    }
</script>

<style scoped lang="scss">

</style>
