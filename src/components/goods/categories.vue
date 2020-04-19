<template>
<el-card>
    <my-bread :level1="'商品管理'" :level2="'商品分类'"></my-bread>
    <el-button @click="dialogFormVisible=true" class="btn">添加分类</el-button>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.cat_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类层级" :label-width="formLabelWidth">
                {{value}}
                <el-cascader v-model="value" :options="options" :props="props"></el-cascader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCat">确 定</el-button>
        </div>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
        <el-tree-grid prop="cat_name" label="分类名称" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" childKey="children">
        </el-tree-grid>
        <el-table-column label="层级">
            <template slot-scope="scope">
                <span>{{scope.row.cat_level==0?'一级':scope.row.cat_level==1?'二级':'三级'}} </span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <!-- <el-button type="primary" circle icon="el-icon-edit"></el-button> -->
                <el-button type="danger" circle icon="el-icon-delete" @click="deleteCat(scope.row.cat_id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
var ElTreeGrid = require("element-tree-grid")
export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                cat_name: ''
            },
            formLabelWidth: '80px',
            props: {
                value: 'cat_id',
                label: 'cat_name',
                checkStrictly: true
            },
            options: [],
            value: [],
            tableData: []
        }
    },
    components: {
        ElTreeGrid
    },
    methods: {
        deleteCat(id) {
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.delete(`categories/${id}`).then(res => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getAllCat();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            // console.log(id)
        },
        async addCat() {
            if (this.value.length == 0) {
                this.form.cat_level = 0;
                this.form.cat_pid = 0;
            } else if (this.value.length == 1) {
                this.form.cat_level = 1;
                this.form.cat_pid = this.value[0]
                // console.log('添加二级')
            } else {
                this.form.cat_level = 2;
                this.form.cat_pid = this.value[1]
                // console.log('添加三级')
            }
            const res = await this.axios.post(`categories`, this.form)
            if (res.data.meta.msg == '创建成功') {
                this.$message({
                    type: 'success',
                    message: '创建分类成功'
                });
                this.getAllCat();
                this.dialogFormVisible = false
            }
            // console.log(res)
        },
        async getCat() {
            const res = await this.axios.get(`categories?type=${2}`);
            this.options = res.data.data;
            // console.log(res)
        },
        getAllCat() {
            this.axios.get(`categories`).then(res => {
                this.tableData = res.data.data;
                // console.log(this.tableData)
            })
        }
    },
    mounted() {
        this.getCat();
        this.getAllCat();
    }
}
</script>

<style scoped>
.btn {
    margin-top: 20px;
}
</style>
