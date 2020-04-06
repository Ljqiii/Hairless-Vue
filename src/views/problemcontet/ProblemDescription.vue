<template>
    <div style="margin-top: 7px">
        <div style="display: flex;justify-content: flex-start;font-weight: bold;font-size: 20px;margin-bottom: 7px">
            # {{problem["id"]}}
            <span style="font-weight: normal;margin-left: 7px">{{problem["title"]}}</span>
        </div>

        <div style="display: flex;justify-content: flex-start;font-size: 15px">
            难度
            <span style="font-weight: normal;margin-left: 7px">{{problem["complexity"]|convertComplexity}}</span>

            <span style="margin-left: 15px">
                <i class="el-icon-star-on" v-if="problem['islike']==true"></i>
                <i class="el-icon-star-off" v-if="problem['islike']==false"></i>
            </span>

            <span style="margin-left: 7px">
                {{problem["like"]}}
            </span>

            <span style="margin-left: 17px">
                提交次数
            </span>

            <span style="margin-left: 7px">
                {{problem["sumbitedcount"]}}
            </span>

            <span style="margin-left: 17px">
                正确率
            </span>

            <span style="margin-left: 7px">
                {{problem["acceptance"]}}
            </span>

        </div>
        <el-divider></el-divider>

<!--        内容-->
        <div v-html="convertToMarkDown" style="text-align: left">

        </div>
    </div>
</template>

<script>
    import mavonEditor from "mavon-editor";

    export default {
        name: 'ProblemDescription',
        components: {},
        props: {
            problem: Object
        },
        computed: {
            convertToMarkDown() {
                return mavonEditor.markdownIt.render("# dsa")
            }
        },
        data() {
            return {
                input: ''
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
        methods: {

            testckick() {
                console.log(23423);
                this.input = "dsfa"
            }
        }
    }


</script>