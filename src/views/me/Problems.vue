<template>
    <div>
        <ProblemList
                :delete-btn="pathUsername==currentusername||isAdmin"
                :total="pagedata.total"
                :changepage="this.changeproblemlistpage" :currentpage="pagedata.currentpage"
                :problemlist="problemlist">
        </ProblemList>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../../utils/Url";
    import ProblemList from "../../components/ProblemList";
    import Event from "../../plugins/event";
    import store from "../../store";

    export default {
        name: 'Posts',
        components: {
            ProblemList
        },
        data() {
            return {
                problemlist: [],
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

            this.getproblemlist()
        },
        destroyed() {

        },
        methods: {
            // 获得问题列表
            getproblemlist: function (pagenum, pagecount) {
                var me = this;
                axios.get(Url.withBase("/api/problemlist"), {
                    params: {
                        category: 'all',
                        owner: me.$route.params["username"],
                        pagenum: pagenum == null ? 1 : pagenum,
                        pagecount: pagecount == null ? null : pagecount
                    }
                }).then(function (response) {
                    console.log(response)
                    me.problemlist = response.data.data.content;
                    me.pagedata = response.data.data.pageInfo;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //换页
            changeproblemlistpage: function (val) {
                this.getposts(val)
            },

        }
    }


</script>
