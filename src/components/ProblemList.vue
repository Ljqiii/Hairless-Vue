<template>
    <div>

        <div style="display: flex;flex-direction: column;justify-content: flex-start">


            <el-table
                    @row-click="redirectToProbvlem"
                    :data="problemlist"
                    stripe
                    style="width: 100%">
                <el-table-column
                        label=""
                        width="90">
                    <template v-slot="scope">
                        <i style="padding-left: 20px" class="el-icon-check"
                           v-if="scope.row.isResolve==true"></i>
                        <i style="padding-left: 20px" class="el-icon-close"
                           v-if="scope.row.isResolve==false"></i>

                    </template>
                </el-table-column>

                <!--                            vip-->
                <el-table-column
                        width="30">
                    <template slot-scope="scope">
                        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
                            <img :src="require('@/assets/vip.svg')" style="width: 17px;"
                                 v-if="scope.row.onlyVip==true"/>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="id"
                        label="#"
                        width="180">
                </el-table-column>

                <el-table-column
                        label="标题"
                        width="280">
                    <template slot-scope="scope">
                        <strong> {{convertComplexity(scope.row.title)}} </strong>
                    </template>
                </el-table-column>
                <el-table-column
                        label="难度">
                    <template slot-scope="scope">
                        {{convertComplexity(scope.row.complexity)}}
                    </template>
                </el-table-column>

                <el-table-column
                        label="正确率">
                    <template slot-scope="scope">
                        {{convertComplexity(scope.row.acceptance)}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="discusscount"
                        label="讨论">
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
    import AuthUtil from "../utils/AuthUtil";

    export default {
        props: {
            currentpage: Number,
            total: Number,
            problemlist: Array,
            changepage: Function
        },
        name: 'ProblemList',
        computed: {
            convertComplexity() {
                return function (complexity) {
                    if (complexity == "easy") {
                        return '简单'
                    } else if (complexity == "hard") {
                        return '困难'
                    } else if (complexity == "medium") {
                        return '中等'
                    } else {
                        return complexity
                    }
                }
            }
        },
        components: {},
        data() {
            return {}
        },
        methods: {
            //跳转到问题页面
            redirectToProbvlem: function (row) {
                let vipOnly = row.onlyVip;
                if (!vipOnly) {
                    this.$router.push("/problem/" + row.id)
                } else if (vipOnly && AuthUtil.isVip()) {
                    this.$router.push("/problem/" + row.id)
                } else {
                    this.$message({
                        message: '仅Vip可以查看此题目',
                        type: 'warning'
                    });
                }
            }
        }
    }


</script>
