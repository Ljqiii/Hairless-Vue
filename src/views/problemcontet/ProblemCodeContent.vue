<template>
    <div>


        <el-tree
                @node-click="handleNodeClick"
                :data="codetree"
                node-key="id"
                :props="defaultProps"
                default-expand-all
                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
<!--        <span>{{ node.label }}</span>-->
          <img :src="require('@/assets/file.svg')" v-if="node.data.type=='file'" style="height: 12px;margin-right: 3px "/>
          <img :src="require('@/assets/folder.svg')" v-if="node.data.type=='folder'" style="height: 12px;margin-right: 3px "/>
        <span>{{ node.label}}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
            Append
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
        </el-tree>
    </div>
</template>

<script>
    export default {
        props: {
            codetree: Array
        },
        name: 'ProblemCodeContent',
        components: {},
        data() {
            return {
                data: [
                    {
                        label: '一级 1',
                        children: [{
                            label: '二级 1-1',
                            children: [{
                                label: '三级 1-1-1'
                            }, {
                                label: '三级 1-1-2'
                            }]
                        }]
                    }, {
                        label: '一级 2',
                        children: [{
                            label: '二级 2-1'
                        }, {
                            label: '二级 2-2'
                        }]
                    }, {
                        label: '一级 3',
                        children: [{
                            label: '二级 3-1'
                        }, {
                            label: '二级 3-2'
                        }]
                    }],
                codetreetest: [
                    {
                        "type": "file",
                        "path": "/",
                        filename: "file",
                        "content": null,
                        "children": [
                            {
                                "type": null,
                                "path": "/a",
                                "filename": null,
                                "content": null,
                                "children": null
                            }
                        ]
                    },
                    {
                        "type": "file",
                        "path": "/",
                        "filename": "file",
                        "content": null,
                        "children": null
                    }
                ]
                ,

                defaultProps: {
                    children: 'children',
                    label: 'filename'
                },
                input: 'weqrtewa'
            }
        },
        methods: {

            test(n) {
                console.log(n)
                return "sadf"
            },
            handleNodeClick(data){
                data.filename ="sdfads"
                console.log(data)
            }
        }
    }


</script>