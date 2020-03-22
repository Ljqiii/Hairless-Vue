<template>
    <div class="about">
        <h1>Test page</h1>
        <i class="el-icon-edit"></i>
        <el-input v-model="input" placeholder="请输入内容"></el-input>

        <el-button type="primary" @click="testckick">主要按钮</el-button>


    </div>
</template>

<script>
    export default {
        name: 'Test',
        components: {},
        data() {
            return {
                input: 'weqrtewa'
            }
        },
        methods: {
            testckick() {
                console.log(23423);
                this.input = "dsfa"
            }
        }
    }


</script>