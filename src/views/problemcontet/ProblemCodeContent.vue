<template>
    <div style="height: 100%;">

        <el-row style="height: 100%;">
            <!--            代码树-->
            <el-col :span="5" style="height: 100%;background-color: white;">
                <vue-custom-scrollbar style="height: 100%;" data-name="scrollbar">
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
                                   style="height: 12px;margin-right: 5px "/>
                              <img :src="require('@/assets/folder.svg')" v-if="node.data.type=='folder'"
                                   style="height: 12px;margin-right: 5px "/>


                              <span v-if="node.data.editing==null||node.data.editing==false">{{ node.label}}</span>
                              <input v-if="node.data.editing==true" v-model="node.label" @blur="node.data.editing=false"
                                     autofocus/>

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
                </vue-custom-scrollbar>
            </el-col>
            <!--            编辑器-->
            <el-col :span="19" style="height: 100%;display: flex;flex-direction: column;border-left: 1px solid #E0E3EA">

                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" class="eltab"
                         style="background-color: white">
                    <el-tab-pane
                            v-for="(item, index) in opendTabs"
                            :key="item.filename"
                            :label="item.filename"
                            :name="item.filename"
                    >
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>

                <codemirror v-model="currentFile.content" :options="cmOptions" style="text-align: left;"
                            class="CodeMirror"/>

            </el-col>

        </el-row>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import {codemirror} from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'


    export default {
        props: {
            codetree: Array
        },
        name: 'ProblemCodeContent',
        components: {
            codemirror,
            vueCustomScrollbar
        }, computed: {
            codemirror() {
                return this.$refs.cmEditor.codemirror
            }
        },
        data() {
            return {
                currentFile: {content: ""},
                currentTabName: '',
                opendTabs: [],
                editableTabsValue: '2',
                editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content'
                }],

                code: 'import com.demo.util.MyType;\n' +
                    'import com.demo.util.MyInterface;\n' +
                    '\n' +
                    'public enum Enum {\n' +
                    '  VAL1, VAL2, VAL3\n' +
                    '}\n' +
                    '\n' +
                    'public class Class<T, V> implements MyInterface {\n' +
                    '  public static final MyType<T, V> member;\n' +
                    '  \n' +
                    '  private class InnerClass {\n' +
                    '    public int zero() {\n' +
                    '      return 0;\n' +
                    '    }\n' +
                    '  }\n' +
                    '\n' +
                    '  @Override\n' +
                    '  public MyType method() {\n' +
                    '    return member;\n' +
                    '  }\n' +
                    '\n' +
                    '  public void method2(MyType<T, V> value) {\n' +
                    '    method();\n' +
                    '    value.method3();\n' +
                    '    member = value;\n' +
                    '  }\n' +
                    '}\n',
                cmOptions: {
                    tabSize: 4,
                    mode: 'text/java',
                    theme: 'paraiso-light',
                    lineNumbers: true,
                    line: true,
                },
                defaultProps: {
                    children: 'children',
                    label: 'filename'
                },
                input: 'weqrtewa'
            }
        },
        methods: {
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
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

                this.currentFile = data;

                if (data.type == 'file' && this.opendTabs.indexOf(data) == -1) {
                    this.opendTabs.push(data)
                }

                // console.log("codetree: ");
                // console.log(this.codetree);
            }
        }
    }

</script>

<style lang="scss">
    .CodeMirror {
        flex: 1;
        height: 100%;
    }

    .eltab {
        .el-tabs__header {
            margin: 0px;
        }

        .el-tabs__item {
            height: 30px;
            line-height: 30px;
        }
    }
</style>

