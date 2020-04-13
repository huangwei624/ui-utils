<template>
    <div id='student'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>学生管理</el-breadcrumb-item>
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
                <el-button type="success" size="medium" icon="el-icon-circle-plus-outline" @click="userDialogFormVisible = true">添加用户</el-button>
            </div>
            <el-dialog title="添加角色" :visible.sync="userDialogFormVisible">
                <el-form :model="user" label-width="110px">
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="用户名：" >
                                <el-input v-model="user.username" placeholder="请输入用户名" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码：" >
                                <el-input v-model="user.password" placeholder="请输入密码" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="角色：" >
                                <el-select v-model="user.roleId" placeholder="请选择用户角色">
                                    <el-option :label="item.description" :value="item.id" v-for="(item, index) in roles" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="userDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveUser">确 定 添 加</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table :data="users" style="width: 100%" max-height="480px" border stripe size="small">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column fixed prop="id" class-name="hidden" label="ID" width="200"> </el-table-column>
            <el-table-column fixed prop="username" label="用户名" width="200"> </el-table-column>
            <el-table-column prop="roles[0].description" label="角色" width="200"> </el-table-column>
            <el-table-column prop="isLock" label="账号是否被锁定" width="200"> 
                <template slot-scope="scope">
                    <div v-text="scope.row.nonLock == true? '未锁定':'已锁定'"></div>
                </template> 
            </el-table-column>
            <el-table-column prop="isExpired" label="账号是否已过期" width="200"> 
                <template slot-scope="scope">
                    <div v-text="scope.row.nonExpired == true? '未过期':'已过期'"></div>
                </template> 
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="updateUserDialogForm(scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                search:'',
                userDialogFormVisible: false,
                user: {
                    username: '',
                    password: "",
                    roleId: ""
                },
                roles: '',
                users: [],
            }
        },
        created(){
            this.getAllRoles();
            this.getAllUsers();
        },
        mounted(){},
        methods: {
            saveUser(){
                this.$post("/user/save", this.user).then(res => {
                    var status = res.data.status;
                    if(status == 1){
                        this.userDialogFormVisible = false;
                        this.$message({type:'success', message: "添加成功"})
                        this.getAllUsers();
                    }else(
                        this.$message({type:'error', message: res.data.message})
                    )
                },error => {
                    this.$message({type:'error', message: "添加失败"})
                })
            },
            getAllRoles(){
                this.$get("/role/all").then(res => {
                    if(res.data.status ==1 ){
                        this.roles = res.data.data;
                    }
                })
            },
            getAllUsers(){
                this.$get("/user/all").then(res => {
                    if(res.data.status == 1){
                        this.users = res.data.data;
                    }
                })
            },
            updateUserDialogForm(user){
                console.log(user)
            },
            deleteUser(id){

            }
        },
        components: {}
    }
</script>

<style>
#student .el-input-group__append {
    width: 70px !important;
    background-color: #409EFF !important;
    color: white !important;
}
.hidden{
    /* display: none; */
}
</style>