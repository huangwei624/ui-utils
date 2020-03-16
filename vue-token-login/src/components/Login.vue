<template>
    <div id="login">
        <div class="login-panel">
            <form class="form-horizontal" role="form">
                <p style="color:#337ab7; font-size:23px; margin-left:8px; margin-top:8px; padding-bottom:0px;">登录</p>
                <div class="form-group">
                    <label for="firstname" class="col-sm-3 control-label">用户名：</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="username" class="form-control" placeholder="请输入用户名" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-3 control-label">密码：</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="password" class="form-control" placeholder="请输入密码" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-3 control-label">验证码：</label>
                    <div class="col-sm-5">
                        <input type="text" v-model="verifyCode" class="form-control" placeholder="请输入验证码" />
                    </div>
                    <div class="col-sm-3"  style="margin-left:-30px">
                        <Sidentify :contentWidth="contentWidth" :identifyCode="identifyCode" @getVerifyCode="getVerifyCode"></Sidentify>
                    </div>
                </div>
                
                <div class="form-group" style="padding: 0 10px">
                    <div class="col-sm-6">
                        <button type="button" style="width:100%" @click="login" class="btn btn-primary">登录</button>
                    </div>
                    <div class="col-sm-6">
                        <button type="button" style="width:100%" @click="registe" class="btn btn-primary">注册</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Sidentify from '../components/utils/Sidentify.vue'
import $ from 'jquery'
export default {
    data() {
        return {
            offsetHeight:0, 
            offsetWidth:0,
            contentWidth: 95, // 验证码宽度 
            identifyCode: '', // 验证码
            username: '',
            password: '',
            verifyCode: '',
        };
    },
    created() {
        this.offsetHeight = document.body.offsetHeight; // 高度
        this.offsetWidth = document.body.offsetWidth; // 宽度
    },
    mounted() {
        var token = localStorage.getItem("token")
        if(token != null && token != ''){
            this.$router.push("/index").catch(err => {err});
            return
        }
        this.getVerifyCode();
    },
    methods: {
        login(){
            this.$http.post(this.baseHttp+"/login",{"username":this.username, "password":this.password, "verifyCode":this.verifyCode}).then(res => {
                if(res.data.status == 1) 
                {
                    var token = res.data.message;
                    localStorage.setItem("token", token)
                    this.$router.push({path:"/index"}).catch(err => {err})
                }
                else{
                    alert(res.data.message);
                }
                console.log(this.identifyCode)
            })
        },
        registe(){
            this.$router.push({path:"/registe"}).catch(err => {err})
        },
        // 获取验证码
        getVerifyCode(){
            this.$http.get(this.baseHttp+"/verifyCode").then(res => {   // 95CD0D49C0C377522BDB0CE748577E04
                if(res.data.status == 1){
                    this.identifyCode = res.data.message;
                }
            })
        },
    },
    components: {
        Sidentify
    }
};
</script>

<style>
#login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
.login-panel{
    width: 400px;
    background-color: rgb(224, 230, 224);
    border-radius: 8px;
    padding: 4px;
    box-shadow: black 0px 0px 20px 2px;
}
</style>