<template>
    <el-card>
        <my-bread :level1="'数据统计'" :level2="'数据报表'"></my-bread>
        <el-card id="charts"></el-card>
    </el-card>
</template>

<script>
const echarts=require('echarts')
export default {
    data(){
        return {
            data:{}
        }
    },
    methods:{
        async getData(){
            const res=await this.axios.get('reports/type/1')
            this.data=res.data.data
            // console.log(res)
        },
        init(){
            let report=echarts.init(document.getElementById('charts'));
            console.log(this.data)
            report.setOption(this.data)
        }
    },
    mounted(){
        this.getData();
    },
    watch:{
        data(){
            this.init()
        }
    }
}
</script>
<style scoped>
#charts{
    height: 500px;
    margin-top: 50px;
}
</style>