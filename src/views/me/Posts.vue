<template>
    <div>
        <PostList :delete-btn="pathUsername==currentusername||isAdmin" :postlist="postlist" :pagedata="pagedata"
                  :changepage="changeproblemlistpage"></PostList>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../../utils/Url";
    import PostList from "../../components/PostList";
    import Event from "../../plugins/event";
    import store from "../../store";

    export default {
        name: 'Posts',
        components: {
            PostList
        },
        data() {
            return {
                problemlist: [],
                postlist: [],
                pagedata: {},

            }
        }, computed: {
            isAdmin() {
                return store.getters["authStore/isAdmin"];
            },
            pathUsername() {
                return this.$route.params["username"];
            }, currentusername() {
                return this.$store.getters["authStore/getUserName"]
            }
        },
        mounted() {
            var that = this;
            Event.$on("refreshpost", function () {
                that.getposts(that.pagedata.pageNum);
            })
            this.getposts()
        },
        destroyed() {

        },
        methods: {
            //帖子
            getposts(page) {
                var that = this;
                axios.get(Url.withBase('/api/forum/posts'), {
                    params: {
                        username: that.$route.params["username"],
                        pagenum: page
                    }
                }).then(function (response) {
                    that.postlist = response.data.data.content;
                    that.pagedata = response.data.data.pageInfo;
                }).catch(function (error) {
                    console.log(error)
                })
            },

            //换页
            changeproblemlistpage: function (val) {
                this.getposts(val)
            },

            handleClick: function (e) {
                this.currentFavoriteFolderId = this.favoritefolderlist[e.index].id
                this.getFavoriteproblemlist(1, null, this.pathUsername, this.currentFavoriteFolderId)

            },
        }
    }


</script>
