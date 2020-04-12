<template>
    <div id="home">
        <el-container>
            <el-header height="60px">
                <div style="display:flex; justify-content: space-between; align-items: center; height: 100%;">
                    <div class="title"><img src="./assets/logo.png" width="30px" height="30px" style="margin-right: 15px"/>SpringBoot-vue-Router</div>
                    <div class="user-info">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link" style="color: black">
                                {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside :width="asideWidth" ref="aside">
                    <i :class="collapseIconClass" :style="collapseIconStyle" @click="setCollapse"></i>
                    <el-menu
                        ref="menu"
                        :collapse="isCollapse"
                        default-active="1-1"
                        unique-opened
                        router
                        class="el-menu-vertical-demo"
                        background-color="#545c64">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-reading"></i>
                                <span>学生学习</span>
                            </template>
                            <el-menu-item index="1-1" :route="'/learn/comment'">学生留言</el-menu-item>
                            <el-menu-item index="1-2" :route="'/learn/material'">资料下载</el-menu-item>
                            <el-menu-item index="1-3" :route="'/learn/communi'">师生互动</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="2-1" :route="'/user/student'">学生管理</el-menu-item>
                            <el-menu-item index="2-2" :route="'/user/teacher'">教师管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-chat-line-square"></i>
                                <span>信息管理</span>
                            </template>
                            <el-menu-item index="3-1" :route="'/info/commentM'">留言管理</el-menu-item>
                            <el-menu-item index="3-2" :route="'/info/materialM'">资料管理</el-menu-item>
                            <el-menu-item index="3-3" :route="'/info/notify'">通知管理</el-menu-item>
                            <el-menu-item index="3-4" :route="'/info/dataTable'">数据分析</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-s-tools"></i>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item index="4-1" :route="'/sys/role'">角色管理</el-menu-item>
                            <el-menu-item index="4-2" :route="'/sys/menu'">菜单管理</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div style="overflow-y:auto; height:100%;">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                isCollapse: false,
                asideWidth: "206px",
                collapseIconClass: 'el-icon-s-fold nav-collapse',
                collapseIconStyle: {left: '176px'}
            };
        },
        created() {
            this.getUsername()
        },
        mounted() { },
        methods: {
            getUsername(){
                var userinfo = window.sessionStorage.getItem("user");
                this.username = userinfo !=null || userinfo != undefined ? JSON.parse(userinfo).username : '未登录';
            },
            handleCommand(command){
                if(command == 'logout'){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$get("/doLogout").then(res => {
                            if(res.data.status == 1){
                                window.sessionStorage.removeItem("user");
                                this.$router.push("/")
                            }
                        })  
                    })
                }
            },
            setCollapse(){
                this.isCollapse = !this.isCollapse;
                if(this.isCollapse){
                    this.asideWidth = "65px"
                    this.collapseIconClass = 'el-icon-s-unfold nav-collapse'
                    this.collapseIconStyle = {left: '35px'}
                }else{
                    this.asideWidth = "206px"
                    this.collapseIconClass = 'el-icon-s-fold nav-collapse'
                    this.collapseIconStyle = {left: '176px'}
                }
            }
        },
        components: {}
    };
</script>

<style>
#home {
    height: 100%;
    width: 100%;
}
.el-header{
    background-color: #536e88;
}
.el-aside {
    background-color: #d3dce6;
    height: 100%;
    width: 100%;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
}

.el-container {
    height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.el-icon-location{
    margin-left: -5px;
}

.el-menu-item{
    padding-left: 5px;
}

.el-menu{
    width: 205px;
}

.el-submenu__title {
    background-color: rgb(72, 78, 84) !important;
}

.title{
    display: flex;
    align-items: center;
}

.nav-collapse{
    font-size: 30px;
    position:absolute;
    bottom: 0px;
    /* left: 176px; */
}
</style>