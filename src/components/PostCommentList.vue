<template>
    <div>
        <div style="display: flex;flex-direction: column;justify-content: flex-start;padding-left: 15px;padding-right: 15px">


            <div v-for="item in postcommentlist"
                 :key="item.id" style="display: flex;flex-direction:column;">

                <div style="display: flex;flex-direction: row;margin-top: 20px">
                    <div style="margin-right: 15px">
                        <el-avatar size="medium" v-if="item.avatarUrl"
                                   v-bind:src="item.avatarUrl"></el-avatar>
                        <el-avatar size="medium" v-else>{{item.username}}</el-avatar>
                    </div>

                    <div style="display: flex;flex-direction: column;text-align: left;justify-content: space-between">
                        <div style="height: 2px;"></div>

                        <div style="font-size: 13px">
                            <span style="padding-right: 10px;cursor:pointer"
                                  v-on:click="redirectToUser(item.userNickName)">{{item.userNickName}}</span>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div style="font-weight: normal">
                            {{item.content}}
                        </div>
                        <div style="height: 2px;"></div>
                    </div>
                </div>
                <div style="height: 1px;background-color: #DCDFE6;margin-top: 15px"></div>
            </div>

            <div v-if="postcommentlist.length==0">
                <div style="height: 30px;"></div>
                暂无评论
                <div style="height: 0px;"></div>
            </div>

            <!--            显示页数-->

            <div style="display: flex;justify-content: flex-end" v-if="postcommentlist.length!=0">
                <el-pagination
                        background
                        style="margin-top: 15px"
                        layout="prev, pager, next"
                        :current-page="pagedata.pageNum"
                        :total="pagedata.total"
                        :page-size="pagedata.pageSize"
                        @current-change="changepage">
                </el-pagination>
            </div>


        </div>


    </div>
</template>

<script>
    export default {
        name: 'PostCommentList',
        props: {
            changepage: Function,
            postcommentlist: Array,
            pagedata: Object
        },
        components: {},
        data() {
            return {
                input: 'weqrtewa'
            }
        },
        methods: {
            redirectToPost() {
                console.log(23423);
                this.input = "dsfa"
            },
            redirectToUser(username) {
                this.$router.push("/u/" + username + "/")
            }
        }
    }


</script>


<style>

</style>
