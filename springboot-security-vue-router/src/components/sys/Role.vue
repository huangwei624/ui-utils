<template>
    <div id='role'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin:20px 0; display: flex; align-items: center; justify-content: space-between">
            <div>
                <el-input placeholder="请输入内容" v-model="search" :style="{width: '400px !important', 'margin-right': '10px'}">
                    <template slot="append">搜索</template>
                </el-input>
                <el-button type="primary" size="medium" icon="el-icon-search">高级搜索</el-button>
            </div>
            <div>
                <el-button type="warning" size="medium" icon="el-icon-s-unfold" >导出数据</el-button>
                <el-button type="primary" size="medium" icon="el-icon-s-fold" >导入数据</el-button>
                <el-button type="success" size="medium" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加角色</el-button>
            </div>
            <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
                <el-form :model="roleadd" label-width="110px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="角色名称：" ><!-- Role_ADMIN -->
                                <el-input v-model="roleadd.name" placeholder="请输入角色英文名称" >
                                    <template slot="prepend">ROLE_</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="角色描述" ><!-- 学生，老师，管理员 -->
                                <el-input v-model="roleadd.description" placeholder="请输入角色代表的身份" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveRole">确 定 添 加</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 折叠 -->
        <el-collapse v-model="activeName" accordion @change="changeCollapse">
            <el-collapse-item :title="r.description" :name="index+','+r.id" v-for="(r,index) in roles" :key="index">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>可访问的资源</span>
                        <el-button style="float: right; padding: 3px 0;color: #ff0000;" icon="el-icon-delete"
                                    type="text" @click="deleteRole(r.id)"></el-button>
                    </div>
                    <div>
                        <el-tree
                            show-checkbox
                            accordion
                            node-key="id"
                            ref="tree"
                            :key="index"
                            :default-checked-keys="selectedMenus"
                            :data="treeMenu" :props="defaultProps">
                        </el-tree>
                        <div style="display: flex;justify-content: flex-end">
                            <el-button @click="cancelUpdate">取消修改</el-button>
                            <el-button type="primary" @click="doUpdateRoleToMenu(r.id, index)">确认修改</el-button>
                        </div>
                    </div>
                </el-card>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                search: "",
                roleadd: {
                    name: '',
                    description: ''
                },
                dialogFormVisible: false,
                roles: [{name: 'Role1', description: "管理员"},{name: 'Role2', description: "超级管理员"}],
                activeName: -1,
                defaultProps: {
                    label: 'name',
                    children: "children"
                },
                treeMenu: [{
                    id: -1,
                    name: "全部",
                    children: []
                }],
                selectedMenus: [1, 2, 3, 4, 5, 8, 9, 6, 10, 11, 12, 13, 7, 14, 15]
            }
        },
        created(){ 
            this.getRoles();
            this.getTreeMenu()
        },
        mounted(){},
        methods: {
            saveRole(){
                // security 规定权限名称必须ROLE_开头
                var role = this.roleadd;
                this.$post("/role/saveOne", {name: "ROLE_"+role.name, description: role.description}).then(res => {
                    this.dialogFormVisible = false;
                    if(res.data.status == 1){
                        this.$message({type:'success', message: "添加成功"})
                    }else{
                        this.$message({type:'error', message: "添加失败"})
                    }
                },error => {
                    this.$message({type:'error', message: "添加失败"})
                })
            },
            getRoles(){
                this.$get("/role/all").then(res => {
                    if(res.data.status == 1){
                        this.roles = res.data.data;
                    }
                },error => {
                    this.$message({type:'error', message: "角色列表加载失败！"})
                })
            },
            deleteRole(id){
                this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$get("/role/delete/"+id).then(res => {
                        if(res.data.status == 1){
                            this.$message({type:'success', message: "删除成功"})
                            this.getRoles();
                        }else{
                            this.$message({type:'error', message: "删除失败"})
                        }
                    }) 
                })
            },
            doUpdateRoleToMenu(roleId, treeIndex){
                // 先获取是那个菜单树
                var tree = this.$refs.tree[treeIndex];
                // 获取选中的菜单， selectedKeys 是一个数组，值是菜单的id
                //var parentIds = tree.getHalfCheckedKeys()
                //console.log(parentIds)
                var selectedKeys = tree.getCheckedKeys(true);
                console.log(selectedKeys)
                // 构建url
                var url = '/role/updateRoleToMenu/?roleId=' + roleId;
                selectedKeys.forEach(meunId => {
                    url += '&menuIds=' + meunId;
                })
                this.$get(url).then(res => {
                    if(res.data.status == 1){
                        this.$message({type:'success', message: "角色权限更新成功！"})
                    }
                },error => {
                    this.$message({type:'error', message: "角色权限更新失败！"})
                })
            },
            getTreeMenu(){
                this.$get("/menu/treeMenu").then(res => {
                    if(res.data.status == 1){
                        this.treeMenu[0].children = res.data.data
                    }
                },error => {
                    this.$message({type:'error', message: "菜单树加载失败！"})
                })
            },
            changeCollapse(indexAndRoleid) {
                if(indexAndRoleid != null && indexAndRoleid != ''){     // 过滤 Collapse 在折叠的时候也发送请求
                    var treeIndex = parseInt(indexAndRoleid.substring(0,1));
                    var roleId = parseInt(indexAndRoleid.substring(2));
                    console.log(treeIndex + ", " +roleId)
                    this.$get("/role/getMenuIdByRoleId?roleId="+roleId).then(res => {
                        if(res.data.status == 1){
                            console.log(res.data.data)
                            this.selectedMenus = res.data.data
                            // 强制设置，使用data中数据改变肯能出现改动失败
                            this.$refs.tree[treeIndex].setCheckedKeys(this.selectedMenus);
                        }
                    },error => {
                        this.$message({type:'error', message: "菜单树加载失败！"})
                    })
                }
            },
            cancelUpdate(){
                this.activeName = -1
            },
        },
        components: {}
    }
</script>

<style>

#role .el-input-group__append {
    width: 70px !important;
    background-color: #409EFF !important;
    color: white !important;
}
</style>