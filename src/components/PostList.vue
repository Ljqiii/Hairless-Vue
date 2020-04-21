<template>
    <div>
        <div style="display: flex;flex-direction: column;justify-content: flex-start;padding-left: 15px;padding-right: 15px">

            <div v-for="item in postlist"
                 :key="item.id" style="display: flex;flex-direction:column;">

                <div style="display: flex;flex-direction: row;margin-top: 20px">
                    <div style="margin-right: 15px">
                        <el-avatar size="large" v-if="item.avatarUrl"
                                   v-bind:src="item.avatarUrl" class="postuserAvatar"></el-avatar>
                        <el-avatar size="large" v-else class="postuserAvatar">{{item.username}}</el-avatar>
                    </div>

                    <div style="display: flex;flex-direction: column;text-align: left;justify-content: space-between">
                        <div style="height: 2px;"></div>
                        <div style="font-weight: bold;cursor:pointer " v-on:click="redirectToPost(item.id)">
                            {{item.title}}
                        </div>
                        <div style="font-size: 13px">
                            <span style="padding-right: 10px;cursor:pointer"
                                  v-on:click="redirectToUser(item.userNickName)">{{item.userNickName}}</span>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div style="height: 2px;"></div>
                    </div>
                </div>
                <div style="height: 1px;background-color: #DCDFE6;margin-top: 15px"></div>
            </div>

            <div v-if="postlist.length==0">
                <div style="height: 30px;"></div>
                无内容
                <div style="height: 20px;"></div>

            </div>


            <!--            显示页数-->
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
</template>

<script>
    export default {
        name: 'PostList',
        props: {
            changepage: Function,
            postlist: Array,
            pagedata: Object
        },
        components: {},
        data() {
            return {
                input: 'weqrtewa'
            }
        },
        methods: {
            redirectToPost(postid) {
                this.$router.push("/post/"+postid);
            },
            redirectToUser(username) {
                this.$router.push("/u/" + username + "/")
            }
        }
    }


</script>


<style>
    .postuserAvatar {
        width: 45px !important;
        height: 45px !important;
        line-height: 45px !important;
        font-size: 17px !important;
    }
</style>
