<template>
<el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名">
    </el-table-column>
    <el-table-column prop="mobile" label="手机" width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column label="状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
            <!-- 编辑用户 -->
            <el-button type="primary" icon="el-icon-edit" circle @click="showFormEdit(scope.row.id)"></el-button>
            <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
                <el-form :model="form">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" :label-width="formLabelWidth">
                        <el-input v-model="form.mobile " autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" :label-width="formLabelWidth">
                        <el-input v-model="form.address" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 角色设置 -->
            <el-button type="success" icon="el-icon-check" circle @click="showFormSetRole(scope.row.id)"></el-button>
            <el-dialog title="角色设定" :visible.sync="dialogFormVisibleRole">
                <el-form :model="form">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色选择" :label-width="formLabelWidth">
                        <el-select v-model="form.region" >
                            <el-option label="请选择" value="-1" disabled></el-option>
                            <el-option label="超级管理员" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisibleRole = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 删除用户 -->
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.id)"></el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                    id: 1,
                    username: 'kobe',
                    mobile: '13798233857',
                    address: "深圳"
                },
                {
                    id: 2,
                    username: 'james',
                    mobile: '13798233857',
                    address: "上海"
                },
                {
                    id: 3,
                    username: 'kd',
                    mobile: '13798233857',
                    address: "广州"
                },
                {
                    id: 4,
                    username: 'ai',
                    mobile: '13798233857',
                    address: "北京"
                },
            ],
            pagenum: 1,
            pagesize: 5,
            dialogFormVisibleEdit: false,
            dialogFormVisibleRole: false,
            form: {
                username: 'kobe',
                mobile: '13798233857',
                address: "深圳"
            },
            formLabelWidth:'120px'
        }
    },
    mounted() {
        // this.getList(this.pagenum,this.pagesize)
    },
    methods: {
        async getList(pagenum, pagesize) {
            const res = await this.axios.get('/users', {
                params: {
                    pagenum,
                    pagesize
                }
            });
            console.log(res)
        },
        deleteUser(id) {
            let i = 0;
            this.tableData.forEach((item, index) => {
                if (item.id == id) i = index;
            });
            this.tableData.splice(i, 1)
        },
        showFormEdit(id) {
            this.tableData.forEach((item, index) => {
                if (item.id == id) {
                    for (var key in this.form) {
                        this.form[key] = item[key]
                    }
                }
            });
            this.dialogFormVisibleEdit = true
        },
        showFormSetRole(id) {
            this.tableData.forEach((item, index) => {
                if (item.id == id) {
                    this.form.username=item.username
                }
            });
            this.dialogFormVisibleRole = true
        }
    }
}
</script>
