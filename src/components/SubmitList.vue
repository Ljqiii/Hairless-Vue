<template>
    <div style="background-color: white">
        <div v-for="(item,index) in submitsWithTitle" v-bind:key="item.id"
             :style="{backgroundColor:(index%2!=0?'white':(index==0?'white':'#fafafa')),
             padding:'12px 0',display:'flex',flexDirection:'row',borderBottom:'1px solid #e8ebf3'}">
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
            <div style="flex: 1;text-align: left"
                 v-else-if="item.result!=null && item.result.indexOf('结果')>=0">
                <span>结果</span>
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
        }, computed: {
            submitsWithTitle() {
                let title = [{"id": -1, "problemid": '题号', "result": "结果", "submitedTime": "提交时间"}]
                return title.concat(this.allSubmits)
            }
        },
        components: {},
        data() {
            return {}
        },
        methods: {}
    }


</script>
