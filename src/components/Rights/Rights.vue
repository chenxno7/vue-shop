<template>
    <el-container>
        <el-header>
            <my-bread :level1="'权限管理'" :level2="'权限列表'"></my-bread>
        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号">
                <template slot-scope="scope">
                    <span>{{scope.row.id-100}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="authName" label="权限名称">
            </el-table-column>
            <el-table-column prop="path" label="路径">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <span>{{scope.row.level|setLevel}}</span>
                </template>
            </el-table-column>
        </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            tableData:[]
        }
    },
    mounted(){
        this.getRightsList()
    },
    methods:{
        async getRightsList(){
            const res = await this.axios.get('rights/list');
            this.tableData=res.data.data
            console.log(res)
        }
    }
}
</script>