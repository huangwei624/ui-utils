<template>
    <div id='login'>
        <div class="login-panel">
            <p style="text-align:center; font-size:22px; font-weight:blod">登录表单</p>
            <el-form ref="loginForm" :model="form">
                <el-form-item>
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.verifyCode"  placeholder="请输入验证码">
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
                    username: "",
                    password: "",
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
                
                this.$http.post(this.$appConfig.base_url+"/login", this.$qs.stringify(this.form)).then(res => {
                    console.log(res)
                    alert(res)
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