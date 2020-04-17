<template>
<el-container>
    <el-header>
        <my-bread :level1="'商品管理'" :level2="'分类参数'"></my-bread>
        <el-alert class="alert" title="只允许第三级分类设置参数" type="error"></el-alert>
        
    </el-header>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            options: []
        }
    }
}
</script>

<style scoped>
.alert {
    margin-top: 20px;
}
</style>
