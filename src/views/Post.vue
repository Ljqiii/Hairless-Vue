<template>
    <div>
        <el-row>
            <el-col :span="1" style="min-height: 1px"></el-col>
            <el-col :span="16">
                <div style="height: 30px;"></div>
                <div style="">

                    <div style="background-color: white;padding-left: 20px;padding-right: 20px;padding-top: 1px">


                        <div style="text-align: left">
                            <h2>{{post.title}}</h2>
                        </div>

                        <div style="display: flex;flex-direction: row;margin-top: 20px">
                            <div style="margin-right: 15px">
                                <el-avatar size="medium" v-if="post.avatarUrl"
                                           v-bind:src="post.avatarUrl" class="postuserAvatar"></el-avatar>
                                <el-avatar size="medium" v-else class="postuserAvatar">{{post.username}}</el-avatar>
                            </div>

                            <div style="display: flex;flex-direction: column;text-align: left;justify-content: space-between">
                                <div style="height: 2px;"></div>
                                <div style="font-weight: bold">
                            <span style="padding-right: 10px;cursor:pointer"
                                  v-on:click="redirectToUser(post.userNickName)">{{post.userNickName}}</span></div>
                                <div style="font-size: 13px">

                                    <span>{{post.createTime}}</span>
                                </div>
                                <div style="height: 2px;"></div>
                            </div>
                        </div>
                        <div style="height: 1px;background-color: #DCDFE6;margin-top: 15px"></div>


                        <div style="text-align: left">
                            <div v-html="convertToMarkDown" style="margin-bottom: 0px;margin-right: 10px"></div>
                            <div style="height: 30px;"></div>


                        </div>
                    </div>

                    <div style="height: 20px;"></div>
                    <!--                    评论-->
                    <div style="background-color: white;">

                        <PostCommentList :postcommentlist="postcommentlist"
                                         :pagedata="postcommentpagedata" :changepage="getpostComment"></PostCommentList>

                        <div style="height: 20px;"></div>
                        <div style="margin-right: 20px;margin-left: 20px;padding-top: 20px;padding-bottom: 20px">
                            <el-input
                                    :rows="3"
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="commentcontent"
                                    maxlength="300"
                                    show-word-limit></el-input>
                            <div style="display: flex;justify-content: flex-end;padding-top: 10px">

                                <el-button type="primary" v-on:click="newComment">回帖</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <div style="height: 28px;"></div>

            <el-col :span="6" style="margin-left: 30px">


            </el-col>
            <el-col :span="1" style="min-height: 1px"></el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import mavonEditor from "mavon-editor";
    import PostCommentList from "../components/PostCommentList";


    export default {
        name: 'Post',
        components: {
            PostCommentList
        },
        mounted() {
            this.getpost()
            this.getpostComment()
        },
        computed: {
            convertToMarkDown() {
                return mavonEditor.markdownIt.render(this.post["content"] == null ? '' : this.post["content"])
            },
            postid() {
                return this.$route.params["postid"]
            }
        },
        data() {
            return {
                postcommentlist: [],
                postcommentpagedata: {},
                commentcontent: "",
                post: []
            }
        },
        methods: {
            redirectToUser(username) {
                this.$router.push("/u/" + username + "/")
            },
            getpostComment(page) {
                var that = this;
                axios.get(Url.withBase("/api/forum/comments"), {
                    params: {
                        pagenum: page,
                        postId: that.$route.params["postid"]
                    }
                }).then(function (response) {
                    console.log(response.data.data)
                    that.postcommentlist = response.data.data.content;
                    that.postcommentpagedata = response.data.data.pageInfo;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            newComment(){
                var that = this;
                axios.post(Url.withBase("/api/forum/puscomment"), {
                    postId: that.$route.params["postid"],
                    commentId: null,
                    postCommentContent: that.commentcontent
                }).then(function (response) {
                    if(response.data.code==200){
                        that.getpostComment()
                        that.commentcontent=""
                    }
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                })
            },
            getpost() {
                var me = this;
                axios.get(Url.withBase("/api/forum/posts"), {
                    params: {
                        postId: me.$route.params["postid"]
                    }
                }).then(function (response) {
                    me.post = response.data.data.content[0];

                }).catch(function (error) {
                    console.log(error)
                })

            },
            testckick() {
                console.log(23423);
                this.input = "dsfa"
            }
        }
    }


</script>
