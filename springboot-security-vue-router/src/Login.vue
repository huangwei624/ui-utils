<template>
    <div id='login'>
        <div class="login-panel">
            <p style="text-align:center; font-size:22px; font-weight:blod">登录表单</p>
            <el-form ref="loginForm" :model="form">
                <el-form-item>
                    <el-input v-model="form.username" placeholder="请输入用户名" @keyup.enter.native="login"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.verifyCode"  placeholder="请输入验证码" @keyup.enter.native="login">
                        <template slot="append">
                            <div style="background-color: white; margin-bottom: -2px; padding-left: 3px">
                                <img  height="30px" width="80px" @click="getVerifyCode" :src="verifyCodeUrl" />
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-checkbox label="记住登陆" v-model="form.remeberMe"></el-checkbox>
                <span style="color: red; margin-left: 30px; display: none">{{errorMsg}}</span>
                <el-form-item>
                    <el-button type="primary" style="width: 100%; margin-top: 20px" @click="login">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                form: {
                    username: "admin",
                    password: "123456",
                    verifyCode: "",
                },
                verifyCodeUrl: this.$appConfig.base_url+"/verifyCode?time="+new Date(),
                errorMsg: "",   // 登录错误信息
            }
        },
        created(){
            this.getVerifyCode()
        },
        mounted(){},
        methods: {
            login(){
                this.$post("/login", this.$qs.stringify(this.form)).then(res => {
                    console.log(res)
                    var status = res.data.status;
                    if(status == 1){
                        this.$message({type:'success', message: "登录成功"})
                        window.sessionStorage.setItem("user", JSON.stringify(res.data.data.principal))
                        var path = this.$route.query.redirect;
                        path == null || path == undefined ? this.$router.push("/home") : this.$router.push(path)
                    }else(
                        this.$message({type:'error', message: res.data.message})
                    )
                },error => {
                    this.$message({type:'error', message: "登录失败"})
                })
            },
            getVerifyCode(){
                this.verifyCodeUrl = this.$appConfig.base_url+"/verifyCode?time="+new Date()
            }
        },
        components: {}
    }
</script>

<style>
    #login{
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.815);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-panel{
        width: 350px;
        padding: 10px 40px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 0px 20px 3px black;
    }
    .el-input-group__append {
        padding: 0px !important;
        margin: 0px !important;
    }
</style>