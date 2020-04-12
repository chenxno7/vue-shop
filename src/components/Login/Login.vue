<template>
<div class="login">
    <el-form class="form" label-position="top" label-width="80px" :model="formData">
        <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-button class="btn" type="primary" @click="login">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data(){
        return {
            formData:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        async login(){
            // console.log(this.formData)
            const res=await this.axios.post('login',this.formData);
            if(res.data.meta.status==200){
                this.$message({
                    message:'登录成功',
                    type:'success'
                })
                this.$router.push('/')
            }
            // console.log(res)
        }
    }
}
</script>

<style scoped>
.login {
    height: 100%;
    background-color: #2c3e50;
    position: relative;
}
.form{
    width: 400px;
    height: 350px;
    padding: 20px;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin-top: -175px;
    margin-left: -200px;
    background-color: #fff;
}
.btn{
    width: 100%;
    margin-top: 20px;
}
</style>
