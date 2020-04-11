<template>
  <div id='app'>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    created(){},
    mounted(){},
    methods: {},
    components: {}
  }
</script>

<style>
    #app{
      height: 100%;
      width: 100%;
    }

    /* 解决element-ui 表格 表头错位的问题 */
    .el-table--border th.gutter:last-of-type {
      display: block !important;
      width: 17px !important;
    }
</style>