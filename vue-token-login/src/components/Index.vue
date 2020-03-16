<template>
    <div id="index">
        <button class="btn btn-success" type="button" @click="list">获取信息</button>

        <button class="btn btn-danger col-sm-offset-1" type="button" @click="logout" >注销登录</button>
    </div>
</template>

<script>
export default {
    methods:{
        list(){
            this.$http.get(this.baseHttp+"/list").then(success =>{
                if(success.data.status == 1){
                    alert(success.data.message)
                }else{
                    alert(success.data.message)
                }
            })
        },
        logout(){
            localStorage.setItem("token", '')
            this.$router.push("/login")
        }
    }
};
</script>

<style>
#index{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>