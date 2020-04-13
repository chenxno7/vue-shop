<template>
<el-container v-if="isShow">
    <!-- 用户组件头部 -->
    <el-header>
        <my-bread :level1="'用户管理'" :level2="'用户列表'"></my-bread>
        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="6">
                <el-input placeholder="请输入要搜索的用户名称" v-model="query" clearable class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="success" @click="showFromAdd">添加用户</el-button>
                <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
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
                        <el-form-item label="邮箱" :label-width="formLabelWidth">
                            <el-input v-model="form.email" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                        <el-button type="primary" @click="AddUser">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </el-header>
    <!-- 用户列表区域 -->
    <el-main>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="mobile" label="手机" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="switchState(scope.row.mg_state,scope.row.id)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 编辑用户 -->
                    <el-button type="primary" icon="el-icon-edit" circle @click="showFormEdit(scope.row.id)"></el-button>
                    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
                        <el-form :model="form">
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input disabled v-model="form.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" :label-width="formLabelWidth">
                                <el-input v-model="form.mobile " autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="form.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                            <el-button type="primary" @click="editUser(currentUserId)">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 角色设置 -->
                    <el-button type="success" icon="el-icon-check" circle @click="showFormSetRole(scope.row.id)"></el-button>
                    <el-dialog title="角色设定" :visible.sync="dialogFormVisibleRole">
                        <el-form :model="form">
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input v-model="currentUser" disabled autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="角色选择" :label-width="formLabelWidth">
                                <el-select v-model="currentRoleid">
                                    <el-option label="请选择" value="-1" disabled></el-option>
                                    <el-option v-for="(r,i) of roles" :key="i" :label="r.roleName" :value="r.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
                            <el-button type="primary" @click="setRole(currentUserId,currentRoleid)">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 删除用户 -->
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[5, 10, 20]" :page-size.sync="pagesize" layout="sizes, prev, pager, next" :total="total">
        </el-pagination>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            query: '',
            pagenum: 1,
            pagesize: 5,
            total: 10,
            dialogFormVisibleEdit: false,
            dialogFormVisibleRole: false,
            dialogFormVisibleAdd: false,
            form: {
                username: '',
                mobile: '',
                email: '',
                roleid:''
            },
            formLabelWidth: '120px',
            currentUser:"",
            currentUserId:'',
            currentRoleid:'',
            roles:[],
            isShow:true
        }
    },
    mounted() {
        this.getList(this.query,this.pagenum, this.pagesize);
        this.getRoles();
    },
    methods: {
        reload(){
            this.isShow=false;
            this.$nextTick(()=>{
                this.isShow=true
            })
        },
        async editUser(id){
            // console.log(this.form)
            const res=await this.axios.put(`users/${id}`,this.form);
            this.dialogFormVisibleEdit=false;
            if(res.data.meta.status==200){
                this.$message({
                    type:'success',
                    message:"更新成功"
                });
                this.getList(this.query,this.pagenum,this.pagesize)
            }
            // console.log(res)
        },
        async setRole(id,rid){
            // rid=parseInt(rid)
            const res=await this.axios.put(`users/${id}/role`,{rid});
            if(res.data.meta.status==200){
                this.$message({
                    type:"success",
                    message:'设置角色成功'
                });
                this.dialogFormVisibleRole=false;
            }
            // console.log(res)
        },
        searchUser(){
            this.getList(this.query,this.pagenum,this.pagesize);  
        },
        async getRoles(){
            const res = await this.axios.get('roles');
            this.roles=res.data.data
            // res.data.data.forEach(item=>this.roles.push({id:item.id,roleName:item.roleName}))
            // console.log(this.roles)
        },
        async switchState(type, id) {
            const res = await this.axios.put(`users/${id}/state/${type}`);
            console.log(res)
        },
        async getList(query,pagenum, pagesize) {
            const res = await this.axios.get(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`);
            this.tableData = res.data.data.users;
            this.total = res.data.data.total
            console.log(res)
        },
        async deleteUser(id) {
            try {
                await this.$confirm('此用户将永久删除，是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await this.axios.delete(`users/${id}`);
                this.reload();
                // await this.getList(this.pagenum, this.pagesize)
                // console.log(deleteRes)
                this.$message({
                    type: "success",
                    message: "删除成功"
                });
            } catch {
                this.$message({
                    type: "info",
                    message: "已取消"
                })
            }
        },
        showFormEdit(id) {
            this.currentUserId=id;
            this.tableData.forEach(item=>{
                if(item.id==id){
                    this.form.username=item.username;
                    this.form.mobile=item.mobile;
                    this.form.email=item.email;
                }
            })
            this.dialogFormVisibleEdit = true
        },
        showFormSetRole(id) {
            this.currentUserId=id
            this.axios.get(`users/${id}`).then(res=>{
                this.currentRoleid=res.data.data.rid;
                this.currentUser=res.data.data.username
                console.log(res)
            })
            this.dialogFormVisibleRole = true
        },
        showFromAdd() {
            for (var key in this.form) {
                this.form[key] = ''
            }
            this.dialogFormVisibleAdd = true;
        },
        async AddUser() {
            const res = await this.axios.post('users', this.form);
            this.dialogFormVisibleAdd = false;
            // this.getList(this.pagenum, this.pagesize);
            this.reload()
        },
        handleSizeChange() {
            // console.log(this.pagesize)
            this.getList(this.query,this.pagenum, this.pagesize)
        },
        handleCurrentChange() {
            this.getList(this.query,this.pagenum, this.pagesize)
        }
    }
}
</script>
