<template>
    <div>
        <el-row>

            <el-col :span="1" style="min-height: 1px"></el-col>
            <el-col :span="16">
                <div style="height: 30px;"></div>

                <div style="background-color: white">
                    <div style="display: flex;flex-direction: row;justify-items: center;justify-content: flex-end;">
                        <el-button size="small" type="primary" icon="el-icon-s-promotion"
                                   style="margin-top: 12px;margin-right: 17px" v-on:click="routeto('/newpost')">发布帖子
                        </el-button>
                    </div>

                    <!--                    帖子topic-->
                    <div style=" display: flex;flex-direction: row;justify-content: flex-start;margin-left: 20px;flex-wrap: wrap">
                        <el-button v-for="item in posttopiclist" v-bind:key="item.id" type="text"
                                   v-on:click="changetopic(item.id)">
                            <div :style="{backgroundColor: currenttopicid==item.id?'#d8d8d8':'',padding: '3px'}">
                                {{item.name}}
                            </div>
                        </el-button>
                    </div>
                </div>

                <div style="height: 5px;"></div>

                <PostList :postlist="postlist" :pagedata="pagedata" :changepage="changeproblemlistpage"></PostList>


            </el-col>
            <div style="height: 28px;"></div>

            <el-col :span="6" style="margin-left: 30px">

                <el-card class="box-card" style="width: 300px">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold">热帖</span>
                    </div>
                </el-card>


            </el-col>
            <el-col :span="1" style="min-height: 1px"></el-col>
        </el-row>


    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import PostList from "../components/PostList";

    export default {
        name: 'Discuss',
        components: {PostList},
        mounted() {
            this.getposttopic()
            this.getposts()
        },
        data() {
            return {
                currenttopicid: -1,
                posttopiclist: [{"id": -1, "name": "全部"}],
                postlist: [],
                pagedata: {},
            }
        },
        methods: {

            routeto: function (direction) {
                this.$router.push(direction)
            },
            getposttopic() {
                var that = this;
                axios.get(Url.withBase('/api/forum/posttopiclist'), {withCredentials: true, maxRedirects: 0})
                    .then(function (response) {
                        that.posttopiclist = that.posttopiclist.concat(response.data.data);
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            getposts(page, topicid) {
                var that = this;
                axios.get(Url.withBase('/api/forum/posts'), {
                    params: {
                        pagenum: page,
                        posttopicid: topicid
                    }
                })
                    .then(function (response) {
                        that.postlist = response.data.data.content;
                        that.pagedata = response.data.data.pageInfo;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            changeproblemlistpage: function (val) {
                this.getposts(val)
            },
            changetopic: function (topicid) {
                this.currenttopicid = topicid;
                if (topicid == -1) topicid = null
                this.getposts(0, topicid)
            }
        }
    }

</script>
