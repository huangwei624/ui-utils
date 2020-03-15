<template>
    <div id="registe">
        <div class="login-panel">
            <form class="form-horizontal" role="form">
                <p style="color:#337ab7; font-size:23px; margin-left:8px; margin-top:8px; padding-bottom:0px;">注册</p>
                <div class="form-group">
                    <label for="firstname" class="col-sm-3 control-label">用户名：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="firstname" placeholder="请输入用户名" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-3 control-label">密码：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="lastname" placeholder="请输入密码" />
                    </div>
                </div>
                
                <div class="form-group" style="padding: 0 10px">
                    <div class="col-sm-12">
                        <button type="submit" style="width:100%" class="btn btn-primary">注册</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            offsetHeight:0, 
            offsetWidth:0,
        };
    },
    created() {
        this.offsetHeight = document.body.offsetHeight; // 高度
        this.offsetWidth = document.body.offsetWidth; // 宽度
    },
    mounted() {},
    methods: {
     
    }
};
</script>

<style scoped>
#registe{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
.login-panel{
    width: 400px;
    width: 400px;
    background-color: rgb(224, 230, 224);
    border-radius: 8px;
    padding: 4px;
    box-shadow: black 0px 0px 20px 2px;
}
</style>