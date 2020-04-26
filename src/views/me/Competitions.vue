<template>
    <div>
        <div v-if="(isAdmin||isTeacher)&&pathUsername==currentusername"
             style="display: flex;flex-direction: row;justify-items: center;justify-content: flex-end;margin-bottom: 10px">
            <el-button size="small" type="primary" icon="el-icon-s-promotion"
                       style="margin-top: 12px;margin-right: 17px" v-on:click="routeto('/newcompetition')">新竞赛
            </el-button>
        </div>

        <CompetitionList :delete-btn="pathUsername==currentusername||isAdmin" :currentpage="pagedata.currentpage"
                         :total="pagedata.total" :competitionlist="competitionlist"
                         :changepage="changeproblemlistpage"></CompetitionList>
    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../../utils/Url";
    import CompetitionList from "../../components/CompetitionList";
    import store from "../../store";

    export default {
        name: 'Competitions',
        components: {
            CompetitionList
        },
        data() {
            return {
                competitionlist: [],
                postlist: [],
                pagedata: {},

            }
        }, computed: {
            isAdmin() {
                return store.getters["authStore/isAdmin"];
            },
            isTeacher() {
                return store.getters["authStore/isTeacher"];
            },
            pathUsername() {
                return this.$route.params["username"];
            }, currentusername() {
                return this.$store.getters["authStore/getUserName"]
            }
        },
        mounted() {
            var that = this;
            this.getcompetitionlist();
        },
        destroyed() {

        },
        methods: {
            routeto: function (direction) {
                this.$router.push(direction)
            },
            // 获得竞赛列表
            getcompetitionlist: function (pagenum, pagecount) {
                var me = this;
                axios.get(Url.withBase("/api/competition/competitions"), {
                    params: {
                        owner: this.$route.params["username"],
                        pagenum: pagenum == null ? 1 : pagenum,
                        pagecount: pagecount == null ? null : pagecount
                    }
                }).then(function (response) {
                    me.competitionlist = response.data.data.content;
                    me.pagedata = response.data.data.pageInfo;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //换页
            changeproblemlistpage: function (val) {
                this.getcompetitionlist(val)
            },
        }
    }


</script>
