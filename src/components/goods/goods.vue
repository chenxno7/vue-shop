<template>
<el-container>
    <el-header>
        <my-bread :level1="'商品管理'" :level2="'商品列表'"></my-bread>
        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="6">
                <el-input placeholder="请输入要搜索的商品内容" v-model="query" clearable class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="success" @click="toAdd">添加商品</el-button>
            </el-col>
        </el-row>
    </el-header>
    <el-main>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" width="50">
                <template slot-scope="scope">
                    <span>{{-(scope.row.goods_id-total)+1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="360">
            </el-table-column>
            <el-table-column prop="goods_price" width="100" label="商品价格（元）">
            </el-table-column>
            <el-table-column prop="goods_weight" width="100" label="商品重量">
            </el-table-column>
            <el-table-column label="日期">
                <template slot-scope="scope">
                    <span>{{scope.row.add_time|date}} </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="showEdit(scope.row.goods_id)"></el-button>
                    <el-dialog title="商品信息" :visible.sync="dialogFormVisibleEdit">
                        <el-form :model="form">
                            <el-form-item label="商品名称">
                                <el-input v-model="form.goods_name"></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格(元)">
                                <el-input v-model="form.goods_price"></el-input>
                            </el-form-item>
                            <el-form-item label="商品重量">
                                <el-input v-model="form.goods_weight"></el-input>
                            </el-form-item>
                            <el-form-item label="商品数量">
                                <el-input v-model="form.goods_number"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                            <el-button type="primary" @click="editGoods(currentId)">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteGoods(scope.row.goods_id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[10, 20, 30, 40]" :page-size.sync="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 10,
            tableData: [],
            total: 0,
            form: {
                goods_name:"",
                goods_price:"",
                goods_number:"",
                goods_weight:""
            },
            dialogFormVisibleEdit:false,
            currentId:0
        }
    },
    methods: {
        async searchGoods() {},
        toAdd() {
            this.$router.push('/goodsadd')
        },
        async getGoods(query, pagenum, pagesize) {
            const res = await this.axios.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`);
            this.tableData = res.data.data.goods;
            this.total = res.data.data.total;
            console.log(res)
        },
        handleSizeChange() {
            this.getGoods(this.query, this.pagenum, this.pagesize)
        },
        handleCurrentChange() {
            this.getGoods(this.query, this.pagenum, this.pagesize)
        },
        deleteGoods(id) {
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.delete(`goods/${id}`).then(res => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            // const res = await this.axios.delete(`goods/${id}`);
            // console.log(res)
        },
        async showEdit(id){
            const res=await this.axios.get(`goods/${id}`);
            this.form.goods_name=res.data.data.goods_name;
            this.form.goods_number=res.data.data.goods_number;
            this.form.goods_weight=res.data.data.goods_weight;
            this.form.goods_price=res.data.data.goods_price;
            this.currentId=res.data.data.goods_id;
            // console.log(res)
            this.dialogFormVisibleEdit=true;
        },
        async editGoods(id){
            const res=await this.axios.put(`goods/${id}`,this.form);
            this.$message({
                type:'info',
                message:'接口异常'
            });
            this.dialogFormVisibleEdit=false;
            console.log(res)
        }
    },
    mounted() {
        this.getGoods(this.query, this.pagenum, this.pagesize);
    }
}
</script>
