<template>
    <div>
        <el-button @click="loadFile">btn</el-button>
    </div>
</template>

<script>
    import JSZip from 'jszip';
    import axios from "axios";

    export default {
        name: 'FileTree',
        props: {
            msg: String
        }, methods: {
            loadFile: function () {
                var me = this;
                axios.get("http://hairless.ljqiii.xyz:7082/api/getdemofile", {
                    responseType: "blob"
                }).then(function (response) {
                    console.log(response)
                    let zipJs = new JSZip()
                    zipJs.loadAsync(response.data).then(function (files) {
                        let path = me.findRoot(files)+"/"
                        me.createTree(files.files, path, path, zipJs)
                            .then(function (tree) {
                                console.log(tree)
                            }).catch(function (err) {
                                console.log(err)
                        })
                    })
                });
            },
            findRoot: function (zip) {
                const root = Object.keys(zip.files).filter(filename => {
                    const pathArray = filename.split('/')
                    if (zip.files[filename].dir && pathArray.length === 2) {
                        return true
                    }
                    return false
                })[0]
                return root.substring(0, root.length - 1)
            },
            createTree: function (files, path, fileName, zip) {
                return new Promise(resolve => {
                    const recursive = (pfiles, ppath, pfileName, pzip, pdepth) => {
                        const type = pfiles[ppath].dir ? 'folder' : 'file'
                        const item = {
                            type,
                            filename: pfileName,
                            path: `/${ppath}`,
                            hidden: pdepth === 1 && type === 'folder' ? true : null,
                        }
                        if (type === 'folder') {
                            const children = []
                            pzip.folder(ppath).forEach((relativePath, file) => {
                                const pathArray = relativePath.split('/')
                                if (pathArray.length === 1 || (file.dir && pathArray.length === 2)) {
                                    children.push(
                                        recursive(
                                            pfiles,
                                            ppath + relativePath,
                                            relativePath,
                                            pzip,
                                            pdepth + 1
                                        )
                                    )
                                }
                            })
                            item.children = children.sort((a, b) => (a.path > b.path ? 1 : -1))
                            item.filename = pfileName.substring(0, pfileName.length - 1)
                        } else {
                            item.language = this.getLanguage(item.filename)
                            if (item.language) {
                                pfiles[ppath].async('string').then(content => {
                                    item.content = content
                                })
                            }
                        }
                        return item
                    }
                    const tree = recursive(files, path, fileName, zip, 0)
                    const selected = tree.children.find(
                        item =>
                            ['pom.xml', 'build.gradle', 'build.gradle.kts'].indexOf(item.filename) >
                            -1
                    )
                    if (selected) {
                        files[selected.path.substring(1)].async('string').then(content => {
                            selected.content = content
                            resolve({tree, selected})
                        })
                    } else {
                        resolve({tree, selected: null})
                    }
                })
            },
            getLanguage: function (file) {
                if (!file.includes(`.`)) {
                    return null
                }
                const extension = file.split(`.`).pop();
                let FILE_EXTENSION = {
                    js: 'javascript',
                    md: 'markdown',
                    kt: 'kotlin',
                    kts: 'kotlin',
                    gradle: 'groovy',
                    gitignore: 'git',
                    java: 'java',
                    xml: 'xml',
                    properties: 'properties',
                    groovy: 'groovy',
                }
                return FILE_EXTENSION[extension];
            }
        }
    }
</script>


<style scoped>


</style>
