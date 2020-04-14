<template>
    <div>
        <el-tabs @tab-click="handleClick">
            <el-tab-pane v-for="item in favoritefolderlist" v-bind:key="item.id" :label="item.name">
            </el-tab-pane>

            <ProblemList
                    :total="total"
                    :changepage="this.changeproblemlistpage" :currentpage="currentpage"
                    :problemlist="problemlist">
            </ProblemList>
        </el-tabs>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../../utils/Url";
    import ProblemList from "../../components/ProblemList";


    export default {
        name: 'Favorite',
        components: {
            ProblemList
        },
        data() {
            return {
                problemlist: [],
                currentpage: null,
                total: 0,
                currentFavoriteFolderId: -1,
                favoritefolderlist: []
            }
        }, computed: {
            pathUsername() {
                return this.$route.params["username"];
            }
        },
        mounted() {
            this.getFavoriteFolderList()
            this.getFavoriteproblemlist(1, null, this.pathUsername, this.currentFavoriteFolderId)
        },
        methods: {
            //换页
            changeproblemlistpage: function (val) {
                this.getFavoriteproblemlist(1, null, this.pathUsername, this.currentFavoriteFolderId)
            },
            handleClick: function (e) {
                console.log(e)
                this.currentFavoriteFolderId = this.favoritefolderlist[e.index].id
                this.getFavoriteproblemlist(1, null, this.pathUsername, this.currentFavoriteFolderId)

            },
            // 获得收藏夹的问题列表
            getFavoriteproblemlist: function (pagenum, pagecount, username, favoritefolderid) {
                var me = this;
                axios.get(Url.withBase("/api/favoritefolderproblems"), {
                    params: {
                        username: username,
                        favoritefolderid: favoritefolderid,
                        pagenum: pagenum == null ? 1 : pagenum,
                        pagecount: pagecount == null ? null : pagecount
                    }
                }).then(function (response) {
                    console.log(response)
                    me.problemlist = response.data.data.content;
                    me.currentpage = response.data.data.pageInfo['pageNum']
                    me.total = response.data.data.pageInfo['total']
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //获得收藏夹列表
            getFavoriteFolderList: function () {
                var me = this;
                axios.get(Url.withBase("/api/favoritefolderlist"), {
                    params: {
                        username: this.$route.params["username"]
                    }
                }).then(function (response) {
                    me.favoritefolderlist = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            }

        }
    }


</script>
