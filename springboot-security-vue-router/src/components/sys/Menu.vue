<template>
    <div id='menu'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin:20px 0; display: flex; justify-content: space-between">
            <div>
                <el-input placeholder="请输入内容" v-model="search" :style="{width: '400px !important', 'margin-right': '10px'}">
                    <template slot="append">搜索</template>
                </el-input>
                <el-button type="primary" size="medium" icon="el-icon-search">高级搜索</el-button>
            </div>
            <div>
                <el-button type="warning" size="medium" icon="el-icon-s-unfold" >导出数据</el-button>
                <el-button type="primary" size="medium" icon="el-icon-s-fold" >导入数据</el-button>
                <el-button type="success" size="medium" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加菜单</el-button>
            </div>
            <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
                <el-form :model="menuadd" label-width="110px">
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="菜单名称：" >
                                <el-input v-model="menuadd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单路径地址：" >
                                <el-input v-model="menuadd.path" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="菜单组件名：" >
                                <el-input v-model="menuadd.component" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单图标类：" >
                                <el-input v-model="menuadd.iconClz" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="父菜单：" >
                                <el-select v-model="menuadd.parentId" placeholder="请选择父菜单">
                                    <el-option label="无" value="0"></el-option>
                                    <el-option :label="item.name" :value="item.id" v-for="(item, index) in parentMeun" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否可操作：" >
                                <el-select v-model="menuadd.isEnable" placeholder="请选择是否可操作">
                                    <el-option label="可操作" value="true"></el-option>
                                    <el-option label="不可操作" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="是否可缓存：" >
                                <el-select v-model="menuadd.meta.keepAlive" placeholder="请选择是否可缓存">
                                    <el-option label="可缓存" value="true"></el-option>
                                    <el-option label="不可缓存" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否需要认证：" >
                                <el-select v-model="menuadd.meta.requireAuth" placeholder="请选择是否需要认证">
                                    <el-option label="需要认证" value="true"></el-option>
                                    <el-option label="不需要认证" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveMenu">确 定 添 加</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="480px" border stripe size="small" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column fixed prop="id" label="ID" width="100"> </el-table-column>
            <el-table-column fixed prop="name" label="菜单名称" width="150"> </el-table-column>
            <el-table-column prop="path" label="路径" width="150"> </el-table-column>
            <el-table-column prop="component" label="组件" width="150"> </el-table-column>
            <el-table-column prop="iconClz" label="图标类" width="200"> </el-table-column>
            <el-table-column prop="parentName" label="父菜单" width="150"> </el-table-column>
            <el-table-column prop="isEnable" label="是否可操作" width="150">
                <template slot-scope="scope">
                    <div v-text="scope.row.isEnable == true? '可操作':'不可操作'"></div>
                </template>
            </el-table-column>
            <el-table-column prop="meta.keepAlive" label="是否支持缓存" width="150">
                 <template slot-scope="scope">
                    <div v-text="scope.row.meta.keepAlive == true? '支持缓存':'不支持缓存'"></div>
                </template>    
            </el-table-column>
            <el-table-column prop="meta.requireAuth" label="是否需要认证" width="150">
                <template slot-scope="scope">
                    <div v-text="scope.row.meta.requireAuth == true? '需要认证':'不需要认证'"></div>
                </template> 
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="updateDialogForm(scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini" @click="delMenu(scope.row)">删除</el-button>
                </template>
                
            </el-table-column>
        </el-table>
        <el-dialog title="更新菜单" :visible.sync="updateDialogFormVisible">
            <el-form :model="menuupdate" label-width="110px">
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="菜单名称：" >
                            <el-input v-model="menuupdate.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单路径地址：" >
                            <el-input v-model="menuupdate.path" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="菜单组件名：" >
                            <el-input v-model="menuupdate.component" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单图标类：" >
                            <el-input v-model="menuupdate.iconClz" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="父菜单：" prop="parentId">
                            <el-select v-model="menuupdate.parentId" placeholder="请选择父菜单">
                                <el-option label="无" :value="0" selected></el-option>
                                <el-option :label="item.name" :value="item.id" v-for="(item, index) in parentMeun" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否可操作：" >
                            <el-select v-model="menuupdate.isEnable" placeholder="请选择是否可操作">
                                <el-option label="可操作" :value="true"></el-option>
                                <el-option label="不可操作" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="是否可缓存：" >
                            <el-select v-model="menuupdate.meta.keepAlive" placeholder="请选择是否可缓存">
                                <el-option label="可缓存" :value="true"></el-option>
                                <el-option label="不可缓存" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需要认证：" >
                            <el-select v-model="menuupdate.meta.requireAuth" placeholder="请选择是否需要认证">
                                <el-option label="需要认证" :value="true"></el-option>
                                <el-option label="不需要认证" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateMenu">确 定 更新</el-button>
            </div>
        </el-dialog>
        <!-- <div style="display: flex; justify-content: flex-end; margin-top:15px">
            <el-pagination
                background
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tableData: [],
                search: '',
                dialogFormVisible: false,   // 添加菜单弹框
                updateDialogFormVisible: false,  // 修改
                menuadd: {  // 添加菜单
                    id: 2,
                    name: "学生留言",
                    path: "/learn/comment",
                    component: "Comment",
                    iconClz: "io class",
                    parentId: 1,
                    parentName: "学生学习",
                    isEnable: '',
                    meta: {
                        keepAlive: '',
                        requireAuth: '',
                    },
                },
                menuupdate: {
                    id: 2,
                    name: "学生留言",
                    path: "/learn/comment",
                    component: "Comment",
                    iconClz: "io class",
                    parentId: 1,
                    parentName: "学生学习",
                    isEnable: '',
                    meta: {
                        keepAlive: '',
                        requireAuth: '',
                    },
                },  // 修改菜单
                parentMeun: '',
            }
        },
        created(){ },
        mounted(){
            this.getMeuns();
            this.getParentMenu();
        },
        methods: {
            getMeuns(){
                this.$get("/menu/list").then(res => {
                    if(res.data.status == 1){
                        console.log(res.data.data)
                        this.tableData = res.data.data;
                    }
                });
            },
            getParentMenu(){
                this.$get("/menu/parentMenu").then(res => {
                    if(res.data.status == 1){
                        this.parentMeun = res.data.data;
                    }
                })
            },
            saveMenu(){
                this.dialogFormVisible = false;
                this.$post("/menu/save", this.menuadd).then(res => {
                    if(res.data.status == 1){
                        this.$message({type:'success', message: "添加成功"})
                        this.getMeuns();
                    }
                })
            },
            updateDialogForm(row){
                this.updateDialogFormVisible =true;
                this.menuupdate = row;
            },
            updateMenu(){
                this.$post("/menu/update", this.menuupdate).then(res => {
                    if(res.data.status == 1){
                        this.updateDialogFormVisible = false;
                        this.$message({type:'success', message: "更新成功"})
                        this.getMeuns();
                    }
                })
            },
            delMenu(row){
                var id = row.id;
                this.$confirm('此操作将删除该菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$get("/menu/delete/"+id).then(res => {
                        if(res.data.status == 1){
                            this.$message({type:'success', message: "删除成功"})
                            this.getMeuns();
                        }else{
                            this.$message({type:'success', message: "删除失败"})
                        }
                    }) 
                })
            },
            handleSelectionChange(val){
                // 多选事件
                console.log(val)
            }
        },
        components: {}
    }
</script>

<style>
#menu .el-input-group__append {
    width: 70px !important;
    background-color: #409EFF !important;
    color: white !important;
}
</style>