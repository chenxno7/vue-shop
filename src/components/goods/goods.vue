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
                <el-button type="success" @click="showFromAdd">添加商品</el-button>
                <el-dialog title="添加商品" :visible.sync="dialogFormVisibleAdd">
                    <el-form :model="form" label-position="left">
                        <el-form-item label="商品名称" required>
                            <el-input v-model="form.goods_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" required>
                            <el-input v-model="form.goods_cat" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" required>
                            <el-input v-model="form.goods_price " autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" required>
                            <el-input v-model="form.goods_number" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" required>
                            <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品介绍">
                            <el-input v-model="form.goods_introduce" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片">
                            <el-input v-model="form.pics" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品参数">
                            <el-input v-model="form.attrs" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                        <el-button type="primary" @click="addGoods">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </el-header>
    <el-main>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" width="50">
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
                <template>
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
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
            form: {},
            dialogFormVisibleAdd: false,
            tableData: [],
            total:0
        }
    },
    methods: {
        async searchGoods() {},
        showFromAdd() {
            this.dialogFormVisibleAdd = true;
        },
        async addGoods() {},
        async getGoods(query, pagenum, pagesize) {
            const res = await this.axios.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`);
            this.tableData=res.data.data.goods;
            this.total=res.data.data.total;
            console.log(res)
        }
    },
    mounted() {
        this.getGoods(this.query, this.pagenum, this.pagesize);
    }
}
</script>
