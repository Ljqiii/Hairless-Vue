<template>
    <div :style="{margintosh: '7px',display:'flex',flexDirection: 'column',height: problemdescriptioncontentstyle}"
         ref="problemdescriptioncontent">

        <div style="display: flex;justify-content: flex-start;font-weight: bold;font-size: 20px;margin-bottom: 7px">
            #{{problem["id"]}}
            <span style="font-weight: normal;margin-left: 7px">{{problem["title"]}}</span>
        </div>

        <div style="display: flex;justify-content: flex-start;font-size: 15px;align-items: center">
            难度
            <span style="font-weight: normal;margin-left: 7px">{{problem["complexity"]|convertComplexity}}</span>

            <span style="margin-left: 15px">
                <el-button type="text" v-on:click="favorite">
                    <i class="el-icon-star-on" v-if="currentUserLike" style="font-size: 17px"></i>
                    <i class="el-icon-star-off" v-if="currentUserLike==false" style="font-size: 17px"></i>
                </el-button>
            </span>

            <span style="margin-left: 7px">
                {{problemlikecount}}
            </span>

            <span style="margin-left: 17px">
                提交次数
            </span>

            <span style="margin-left: 7px">
                {{problem["sumbitedCount"]}}
            </span>

            <span style="margin-left: 17px">
                正确率
            </span>

            <span style="margin-left: 7px">
                {{problem["acceptance"]}}
            </span>

        </div>
        <div style="background-color: #DCDFE6;margin: 1px 0px;height: 1px;"></div>

        <!--        内容-->
        <div></div>

        <vue-custom-scrollbar :style="{}" settings="maxScrollbarLength: 60">
            <div v-html="convertToMarkDown" style="margin-bottom: 80px;margin-right: 10px">

            </div>
        </vue-custom-scrollbar>


        <!--        收藏弹窗-->
        <el-dialog
                title="添加到收藏夹"
                :visible.sync="favoriteDialogVisible"
                width="30%"
                center>


            <el-checkbox-group v-model="favoriteFolderCheckList"
                               style="display: flex;flex-direction: column;justify-content: flex-start">
                <div v-for="item in favoritefolderlist" :key="item.id" style="margin-bottom: 12px">

                    <el-checkbox :label="item.id==null?null:item.id"
                                 :checked="currentProblemFavoriteFolderLists.indexOf(item.id)!=-1 ">
                        {{item.name}}
                        <span v-if="!item.isPublic" style="color: #a5a5a5">[私密]</span>
                    </el-checkbox>

                </div>

            </el-checkbox-group>

            <div v-if="newfavoritefolderbtnVisable">
                <el-button type="text" v-on:click="showNewfavoritefolder"><i class="el-icon-plus"></i> 新建收藏夹</el-button>
            </div>
            <div style="display: flex;flex-direction: row;align-items: center" v-if="newfavoritefolderVisable">
                <el-input v-model="newfavoritefolderbtnInput" placeholder="收藏夹名称" size="small" style="width: 120px;"
                          class="newfavoritefolderinput"></el-input>
                <div style="width: 13px;"></div>
                <el-checkbox v-model="newfavoritefolderbtnSecert" size="medium">私密</el-checkbox>
                <div style="width: 13px;"></div>

                <el-button size="medium" type="text" v-on:click="newfavoritefolder">确定</el-button>
                <el-button size="medium" type="text" v-on:click="hideNewfavoritefolder">
                    <i class="el-icon-close"></i>
                </el-button>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changefavorite">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mavonEditor from "mavon-editor";
    import axios from "axios";
    import Url from "../../utils/Url";
    import vueCustomScrollbar from 'vue-custom-scrollbar'

    export default {
        name: 'ProblemDescription',
        components: {
            vueCustomScrollbar
        },
        mounted() {
            this.problemdescriptioncontentheight = window.innerHeight - 50 - this.$refs.problemdescriptioncontent.getBoundingClientRect().y;
            var me = this;

            window.addEventListener("resize", this.windowsresizeHandler);
        },
        props: {
            problem: Object
        },
        watch: {},
        computed: {
            problemdescriptioncontentstyle() {
                let a = this.problemdescriptioncontentheight + "px";
                return a;
            },
            problemlikecount() {
                return this.problem["favoriteCount"]
            },
            currentUserLike() {
                return this.problem['like']
            },
            convertToMarkDown() {
                return mavonEditor.markdownIt.render(this.problem["description"] == null ? "" : this.problem["description"])
            },
            currentProblemFavoriteFolderLists() {
                return this.problemFavoriteFolderLists
            }

        },
        data() {
            return {
                newfavoritefolderbtnInput: "",
                newfavoritefolderbtnSecert: false,
                newfavoritefolderbtnVisable: true,
                newfavoritefolderVisable: false,
                problemdescriptioncontentheight: 0,
                problemFavoriteFolderLists: [],
                favoriteFolderCheckList: [],
                favoritefolderlist: [],
                favoriteDialogVisible: false,
                islike: this.problem['like'],
                input: '',
                problemCode: this.problem["initProblemCode"]
            }
        }, filters: {
            convertComplexity: function (value) {
                if (value == 'easy') {
                    return "简单";
                } else if (value == 'hard') {
                    return "困难";
                } else if (value == 'medium') {
                    return "中等";
                } else {
                    return value
                }
            }
        },
        destroyed() {
            window.removeEventListener('resize',this.windowsresizeHandler)
        },
        methods: {
            windowsresizeHandler() {
                var me = this;
                me.problemdescriptioncontentheight = window.innerHeight - me.$refs.problemdescriptioncontent.getBoundingClientRect().y;
            },
            //新收藏夹
            newfavoritefolder() {
                var that = this;
                let isPublic = !that.newfavoritefolderbtnSecert

                axios.post(Url.withBase("/api/newfavoritefolder"), {
                        folderName: that.newfavoritefolderbtnInput,
                        isPublic: isPublic
                    }
                ).then(function (response) {
                    that.getFavoriteFolderList();
                    that.hideNewfavoritefolder();
                    that.newfavoritefolderbtnInput = "";
                    that.newfavoritefolderbtnSecert = false;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //显示新建收藏夹input
            showNewfavoritefolder() {
                this.newfavoritefolderbtnVisable = false;
                this.newfavoritefolderVisable = true;
            },
            //隐藏新建收藏夹input
            hideNewfavoritefolder() {
                this.newfavoritefolderbtnVisable = true;
                this.newfavoritefolderVisable = false;
            },
            refreshHeight() {
                this.problemdescriptioncontentheight = window.innerHeight - this.$refs.problemdescriptioncontent.getBoundingClientRect().y;
            }, //收藏确定按钮
            changefavorite() {
                var me = this;
                this.favoriteDialogVisible = false;
                if (this.problem['like'] && (this.favoriteFolderCheckList == 0)) {
                    this.problem.favoriteCount = this.problem.favoriteCount - 1;
                }

                if (!this.problem['like'] && (this.favoriteFolderCheckList != 0)) {
                    this.problem.favoriteCount = this.problem.favoriteCount + 1;
                }

                this.favoriteFolderCheckList == 0 ? this.problem['like'] = false : this.problem['like'] = true;
                axios.post(Url.withBase("/api/favoriteproblem"), {
                        problemid: me.problem["id"],
                        favoriteFolderList: me.favoriteFolderCheckList
                    },
                    {
                        withCredentials: true
                    }
                ).then(function (response) {
                    response
                }).catch(function (error) {
                    console.log(error)
                })
            },
            getFavoriteFolderList() {
                var me = this;
                axios.get(Url.withBase("/api/favoritefolderlist"), {}).then(function (response) {
                    me.favoritefolderlist = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            //收藏按钮
            favorite() {
                var me = this;
                this.favoriteDialogVisible = !this.favoriteDialogVisible;

                //问题在哪个收藏夹
                axios.get(Url.withBase("/api/problemfavoritefolderlist"), {
                    params: {
                        problemid: me.problem["id"]
                    }
                }).then(function (response) {
                    me.problemFavoriteFolderLists = response.data.data;
                }).catch(function (error) {
                    console.log(error)
                })

                //收藏夹列表
                this.getFavoriteFolderList()
            }
        }
    }


</script>

<style>

    .newfavoritefolderinput input {

        border-radius: 3px;
        height: 25px !important;
        line-height: 25px !important;
    }
</style>
