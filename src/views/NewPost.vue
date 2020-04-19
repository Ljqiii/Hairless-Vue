<template>
    <div style="margin-left: 15px;margin-right: 15px">


        <div style="margin-bottom: 30px;margin-top: 20px;display: flex;flex-direction: row;justify-content: center">

            <el-select v-model="posttopicid" placeholder="选择话题">
                <el-option
                        v-for="item in posttopiclist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <div style="width: 20px;"></div>
            <el-input
                    placeholder="请输标题"
                    v-model="posttitle">
            </el-input>
            <div style="width: 30px;"></div>
            <el-button type="text" v-on:click="back">取消</el-button>
            <div style="width:35px;"></div>
            <el-button type="primary" v-on:click="newpost">发布</el-button>
        </div>
        <mavon-editor v-model="postcontent"></mavon-editor>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";

    export default {
        name: 'Discuss',
        components: {},
        data() {
            return {
                posttopicid: null,
                posttopiclist: [],
                postcontent: "",
                posttitle: ""
            }
        },
        mounted() {
            this.getposttopic()
        },
        methods: {
            getposttopic() {
                var that = this;
                axios.get(Url.withBase('/api/forum/posttopiclist'), {withCredentials: true, maxRedirects: 0})
                    .then(function (response) {
                        that.posttopiclist = that.posttopiclist.concat(response.data.data);
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            back() {
                this.$router.back()
            },
            newpost() {
                var that = this;
                axios.post(Url.withBase("/api/forum/pushpost"), {
                    postTopic: that.posttopicid,
                    postTitle: that.posttitle,
                    postContent: that.postcontent
                }).then(function (response) {
                    that.$router.push("/post/" + response.data.data.postid);
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }


</script>
