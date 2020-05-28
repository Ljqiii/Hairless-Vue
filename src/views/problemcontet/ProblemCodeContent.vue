<template>
    <div style="height: 100%;">

        <el-row style="height: 100%;">
            <!--            代码树-->
            <el-col :span="5" style="height: 100%;background-color: white;">
                <vue-custom-scrollbar style="height: 100%;" data-name="scrollbar">
                    <div style="height: 1px;background-color: #E0E3EA"></div>
                    <el-tree
                            @node-click="handleNodeClick"
                            :data="codetree"
                            node-key="id"
                            :props="defaultProps"
                            default-expand-all
                            :expand-on-click-node="false">
                          <span class="custom-tree-node" slot-scope="{ node, data }" style="text-align: left">

                    <!--          文件，文件夹图标-->
                              <img :src="require('@/assets/file.svg')"
                                   v-if="node.data.type=='file'"
                                   style="height: 12px;margin-right: 5px"/>
                              <img :src="require('@/assets/folder.svg')" v-if="node.data.type=='folder'"
                                   style="height: 12px;margin-right: 5px"/>
                              <span v-if="node.data.editing==null||node.data.editing==false">
                                  {{node.label}}
                                  <img :src="require('@/assets/lock.svg')" style="height: 15px"
                                       v-if="node.data.readOnly&&enableReadOnly"/>
                              </span>



                              <el-input v-if="node.data.editing==true" v-model="node.data.filename"
                                        class="newinput"
                                        @blur="node.data.editing=false" @keyup.enter.native="node.data.editing=false"/>

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
                         style="background-color: white" @tab-click="handleClick">
                    <el-tab-pane
                            v-for="(item, index) in opendTabs"
                            :key="item.path+item.filename"
                            :label="item.filename"
                            :name="item.path+item.filename">

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

    //mode
    import 'codemirror/mode/clike/clike.js'


    //theme
    import 'codemirror/theme/idea.css'

    // foldGutter
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/fold/brace-fold.js'
    import 'codemirror/addon/fold/comment-fold.js'
    import 'codemirror/addon/fold/foldcode.js'
    import 'codemirror/addon/fold/foldgutter.js'
    import 'codemirror/addon/fold/indent-fold.js'
    import 'codemirror/addon/fold/markdown-fold.js'
    import 'codemirror/addon/fold/xml-fold.js'


    export default {
        props: {
            codetree: Array,
            createMode: {
                type: Boolean,
                default: false
            },
            enableReadOnly: {
                type: Boolean,
                default: true
            }
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
                keyFile: {},
                elTabPaneReadOnly: {},
                currentFile: {content: ""},
                currentTabName: '',
                opendTabs: [],
                editableTabsValue: '',
                editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content'
                }],
                cmOptions: {
                    readOnly: false,
                    tabSize: 4,
                    mode: 'text/x-java',
                    theme: 'idea',
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
            handleClick(tab, event) {
                this.editableTabsValue = tab.name;
                this.currentFile = this.keyFile[tab.name];

                if (this.enableReadOnly) {
                    this.cmOptions.readOnly = this.elTabPaneReadOnly[tab.name] == null ? false : this.elTabPaneReadOnly[tab.name];
                }
            },
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
                console.log(data.path + data.filename + '/')
                data.children.push({
                    type: "folder",
                    path: data.path + data.filename + '/',
                    filename: "newFolder",
                    content: null,
                    editing: true,
                    readOnly: false,
                    children: []
                })
            },
            appendFile(data) {
                console.log(data.path + data.filename + '/')
                data.children.push({
                    type: "file",
                    path: data.path + data.filename + '/',
                    filename: "newFile",
                    content: '',
                    readOnly: false,
                    editing: true
                })
            },
            handleNodeClick(data) {

                if (data.type == 'file') {
                    this.currentFile = data;
                    this.enableReadOnly ? this.cmOptions.readOnly = data.readOnly : null;

                    if (this.opendTabs.indexOf(data) == -1) {
                        let k = data.path + data.filename
                        let v = data.readOnly
                        this.elTabPaneReadOnly[k] = v;

                        if (this.opendTabs.indexOf(data) == -1) {
                            this.opendTabs.push(data)
                        }
                    }
                    this.editableTabsValue = data.path + data.filename;
                    this.keyFile[data.path + data.filename] = data;
                }
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

    .el-tree > .el-tree-node {
        min-width: 100%;
        display: inline-block;
    }

    .newinput input {
        line-height: 23px !important;
        height: 23px !important;
        padding: 0px 7px;
        width: 120px !important;;
    }
</style>

