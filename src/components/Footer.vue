<template>
    <div class="navbar">
        <el-footer>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="12">
                    Hairless 2020
                </el-col>

                <el-col :span="12">
                    <router-link class="routerlink" to="/help"> 帮助中心</router-link>
                    |
                    <router-link class="routerlink" to="/about"> 关于我们</router-link>
                </el-col>
            </el-row>

        </el-footer>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .routerlink {
        margin-right: 5px;
        margin-left: 5px;
    }
</style>
