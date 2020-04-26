<template>
    <div>
        <div style="height: 20px;"></div>

        <el-container>
            <el-aside width="250px" style="background-color: white">
                <el-menu
                        router
                        default-active="2"
                        class="el-menu-vertical-demo"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>网站管理</span>
                        </template>
                        <el-menu-item index="./logosetting">Logo设置</el-menu-item>
                        <el-menu-item index="./logosetting">题目类别</el-menu-item>
                        <el-menu-item index="./logosetting">积分兑换物品</el-menu-item>
                        <el-menu-item index="./logosetting">-</el-menu-item>
                    </el-submenu>

                    <el-menu-item index="./problems">题目</el-menu-item>

                    <el-menu-item index="./competitions">竞赛</el-menu-item>

                    <el-menu-item index="./favorite">题目收藏</el-menu-item>

                    <el-menu-item index="./posts">帖子</el-menu-item>

                    <el-menu-item
                            v-if="currentusername==pathUsername"
                            index="./mesetting">个人设置
                    </el-menu-item>

                </el-menu>
            </el-aside>


            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'User',
        components: {},
        computed: {
            pathUsername() {
                return this.$route.params["username"];
            }, currentusername() {
                return this.$store.getters["authStore/getUserName"]
            }
        }
        ,
        data() {
            return {}
        }
        ,
        mounted() {

        }
        ,
        methods: {}
    }


</script>
