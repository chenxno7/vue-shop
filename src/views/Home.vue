<template>
<el-container class="home">
    <!-- 头部 -->
    <el-header class="header">
        <span>后台管理系统</span>
        <el-button type="primary" class="btn" @click="signOut">退出</el-button>
    </el-header>
    <el-container class="content">
        <!-- 侧边导航栏 -->
        <el-aside width="300px" class="aside">
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" router active-text-color="#ffd04b">
                <!-- 用户管理 -->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="users">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户列表</span>
                      </template>
                    </el-menu-item>
                </el-submenu>
                <!-- 权限管理 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="/rights">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限列表</span>
                    </template>
                    </el-menu-item>
                    <el-menu-item index="/setrole">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>角色列表</span>
                    </template>
                    </el-menu-item>
                </el-submenu>
                <!-- 商品管理 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>分类参数</span>
                    </template>
                    </el-menu-item>
                    <el-menu-item index="">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品分类</span>
                    </template>
                    </el-menu-item>
                </el-submenu>
                <!-- 订单管理 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="/users">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单列表</span>
                    </template>
                    </el-menu-item>
                </el-submenu>
                <!-- 数据统计 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据报表</span>
                    </template>
                    </el-menu-item>
                </el-submenu>
                
            </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    data() {
        return {

        }
    },
    methods: {
        signOut() {
            localStorage.removeItem('token');
            this.$router.push('/login')
        }
    },
    beforeCreate() {
        if (!(localStorage.getItem('token') || sessionStorage.getItem('token'))) {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.header {
    background-color: #2c3e50;
    text-align: center;
    position: relative;
    height: 50px;
}

.header>span {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    color: #fff;
}

.header>.btn {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -20px;
}
.content,.aside,.home{
  height: 100%;
}
.aside{
  background-color: #545c64;
}
</style>
