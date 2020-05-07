<template>
    <div>
        <div v-for="item in allSubmits" v-bind:key="item.id"
             style="line-height: normal;display: flex;flex-direction: row;border-bottom: 1px solid #e8ebf3;height: 35px;line-height: 35px;margin-top: 2px">

            <div v-if="showProblemId" style="flex: 1;font-size: 14px">
                {{item.problemid}}
            </div>
            <div style="flex: 1;font-size: 14px">
                {{item.submitedTime}}
            </div>
            <div style="flex: 1;text-align: left"
                 v-if="item.result!=null && item.result.indexOf('success')>=0">
                <span> <i class="el-icon-check"></i></span>
            </div>
            <div v-else style="flex: 1;text-align: left">
                <span> <i class="el-icon-close"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SubmitList',
        props: {
            showProblemId: {
                type: Boolean,
                default: false
            },
            allSubmits: Array
        },
        components: {},
        data() {
            return {}
        },
        methods: {}
    }


</script>
