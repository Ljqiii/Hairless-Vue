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

<!--          文件，文件夹图标-->
          <img :src="require('@/assets/file.svg')" v-if="node.data.type=='file'"
               style="height: 12px;margin-right: 3px "/>
          <img :src="require('@/assets/folder.svg')" v-if="node.data.type=='folder'"
               style="height: 12px;margin-right: 3px "/>


          <span v-if="node.data.editing==null||node.data.editing==false">{{ node.label}}</span>
          <input v-if="node.data.editing==true" v-model="node.label" @blur="node.data.editing=false" autofocus/>

        <span v-if="node.data.type=='folder'">
          <el-button
                  type="text"
                  size="mini"
                  @click="() => appendFile(data)">
            +File
          </el-button>
            <el-button
                    type="text"
                    size="mini"
                    @click="() => appendFolder(data)">
            +Folder
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            -
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
                defaultProps: {
                    children: 'children',
                    label: 'filename'
                },
                input: 'weqrtewa'
            }
        },
        methods: {
            appendFolder(data) {
                data.children.push({
                    type: "folder",
                    path: "/src/main/com",
                    filename: "newFolder",
                    content: 'null',
                    editing: true,
                    children: []
                })
            },
            appendFile(data) {
                data.children.push({
                    type: "file",
                    path: "/src/main/com",
                    filename: "newFile",
                    content: 'null',
                    editing: true
                })
            },
            handleNodeClick(data) {
                console.log("data: ");
                console.log(data);
                console.log("codetree: ");
                console.log(this.codetree);
            }
        }
    }

</script>