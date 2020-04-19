<template>
<el-card>
    <my-bread :level1="'订单管理'" :level2="'订单列表'"></my-bread>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="价格">
        </el-table-column>
        <el-table-column prop="order_price" label="付款状态">
            <template slot-scope="scope">
                <el-popover placement="top-start" :title="scope.row.pay_status?'已付款':'未付款'" width="200" trigger="click">
                    <el-button slot="reference">{{scope.row.order_pay?'未付款':'已付款'}}</el-button>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="order_price" label="发货状态">
            <template slot-scope="scope">
                <el-popover placement="top-start" :title="scope.row.is_send" width="200" trigger="click">
                    <el-button slot="reference">{{scope.row.is_send}}</el-button>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="下单时间">
            <template slot-scope="scope">
                <span>{{scope.row.create_time|date}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button circle type="primary" icon="el-icon-edit" @click="showEdit(scope.row.order_id)"></el-button>
                <!-- 修改订单地址 -->
                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="订单编号">
                            <el-input v-model="form.order_number" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="省市">
                            <el-cascader :options="options" clearable v-model="value"></el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input v-model="form.detailAddress" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[5, 10, 20]" :page-size.sync="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</el-card>
</template>

<script>
import options from '../../assets/js/country-level3-data'
export default {
    data() {
        return {
            tableData: [],
            pagenum: 1,
            pagesize: 5,
            total: 0,
            dialogFormVisible:false,
            form:{},
            options:options,
            value:[]
        }
    },
    methods: {
        async getData(pagenum, pagesize) {
            const res = await this.axios.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}`);
            this.tableData = res.data.data.goods;
            this.total = res.data.data.total
            console.log(res)
        },
        showEdit(id) {
            let index=this.tableData.findIndex(item=>{
                return item.order_id==id
            });
            this.form.order_number=this.tableData[index].order_number;
            this.dialogFormVisible=true
            // console.log(index)
        },
        handleSizeChange() {
            this.getData(this.pagenum, this.pagesize)
        },
        handleCurrentChange() {
            this.getData(this.pagenum, this.pagesize)
        },
    },
    mounted() {
        this.getData(this.pagenum, this.pagesize)
    }
}
</script>
