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
                <el-button type="success" size="medium" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加角色</el-button>
            </div>
            <!-- <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
                <el-form :model="roleadd" label-width="110px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="角色名称：" >
                                <el-input v-model="roleadd.name" placeholder="请输入角色英文名称" >
                                    <template slot="prepend">ROLE_</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="角色描述" >
                                <el-input v-model="roleadd.description" placeholder="请输入角色代表的身份" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveRole">确 定 添 加</el-button>
                </div>
            </el-dialog> -->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                search:'',
                dialogFormVisible: false,
            }
        },
        created(){},
        mounted(){},
        methods: {},
        components: {}
    }
</script>

<style>
#student .el-input-group__append {
    width: 70px !important;
    background-color: #409EFF !important;
    color: white !important;
}
</style>