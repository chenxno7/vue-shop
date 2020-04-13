<template>
<el-container>
    <el-header>
        <my-bread :level1="'权限管理'" :level2="'角色管理'"></my-bread>
        <el-button type="primary" style="margin-top: 10px;" @click="showAddForm">添加角色</el-button>
        <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="角色名称" label-width="180">
                    <el-input v-model="form.rname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="180">
                    <el-input v-model="form.rdesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addRole(form.rname,form.rdesc)">确 定</el-button>
            </div>
        </el-dialog>
    </el-header>
    <el-main>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <span v-if="scope.row.children.length==0">该角色无权限</span>
                    <el-row v-for="(first,i) of scope.row.children" :key="i">
                        <el-col :span="4">
                            <el-tag closable type="primary" @close="deleteRight(scope.row.id,first.id)">{{first.authName}}</el-tag> &gt;
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(second,i) of first.children" :key="i" :gutter="20" class="tag">
                                <el-col :span="5">
                                    <el-tag closable type="success" @close="deleteRight(scope.row.id,second.id)">{{second.authName}}</el-tag> &gt;
                                </el-col>
                                <el-col :span="19">
                                    <el-tag closable v-for="(third,i) of second.children" :key="i" type="danger" @close="deleteRight(scope.row.id,third.id)">{{third.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="序号">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 编辑角色姓名和描述 -->
                    <el-button circle type="primary" icon="el-icon-edit" @click="showEditForm(scope.row.id,scope.row.roleName,scope.row.roleDesc)"></el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisibleRole" width="50%">
                        <el-form :model="form">
                            <el-form-item label="角色名称" label-width="180">
                                <el-input v-model="form.rname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="角色描述" label-width="180">
                                <el-input v-model="form.rdesc" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisibleRole = false">取 消</el-button>
                            <el-button type="primary" @click="editRole(currentId,form.rname,form.rdesc)">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 编辑角色权限 -->
                    <el-button circle type="success" icon="el-icon-check" @click="showRightsForm(scope.row.id)"></el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisibleRights" width="50%">
                        <el-tree :data="authData" show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="authChecked" ref="tree">
                        </el-tree>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisibleRights = false">取 消</el-button>
                            <el-button type="primary" @click="setRights">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 删除角色 -->
                    <el-button circle type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)"></el-button>
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
            tableData: [],
            form: {
                rname: '',
                rdesc: ''
            },
            dialogFormVisibleAdd: false,
            dialogVisibleRights: false,
            dialogVisibleRole:false,
            authData: [],
            authChecked:[],
            defaultProps: {
                label: 'authName',
                children: 'children'
            },
            currentId:0
        }
    },
    methods: {
        async setRights(){
            let rids=this.$refs.tree.getCheckedKeys().join(',');
            // console.log(rids)
            const res = await this.axios.post(`roles/${this.currentId}/rights`,{rids})
            // console.log(this.$refs.tree.getCheckedKeys())
            if(res.data.meta.status==200){
                this.$message({
                    type:"success",
                    message:"角色权限授予成功"
                });
                this.dialogVisibleRights=false;
                this.getRoles();
            }
            console.log(res)
        },
        async getRights(){
            const res=await this.axios.get('rights/tree');
            this.authData=res.data.data;
            console.log(res)
        },
        async editRole(id,roleName,roleDesc){
            const res=await this.axios.put(`roles/${id}`,{roleName,roleDesc});
            if(res.data.meta.status==200){
                this.$message({
                    type:"success",
                    message:'更新成功'
                });
                this.dialogVisibleRole=false;
                this.getRoles()
            }
            console.log(res)
        },
        async addRole(roleName, roleDesc) {
            const res = await this.axios.post('roles', {
                roleName,
                roleDesc
            });
            if (res.data.meta.status == 201) {
                this.$message({
                    type: "success",
                    message: '创建角色成功'
                });
                this.dialogFormVisibleAdd = false;
                this.getRoles();
            }
            console.log(res)
        },
        async deleteRight(roleId, rightId) {
            const res = await this.axios.delete(`roles/${roleId}/rights/${rightId}`);
            console.log(res)
        },
        async getRoles() {
            const res = await this.axios.get('roles');
            this.tableData = res.data.data
            console.log(res)
        },
        showAddForm() {
            this.dialogFormVisibleAdd = true
        },
        showEditForm(id,roleName, roleDesc) {
            this.currentId=id;
            this.form.rname = roleName;
            this.form.rdesc = roleDesc;
            this.dialogVisibleRole = true;
        },
        showRightsForm(id) {
            this.currentId=id;
            let arr=[];
            this.tableData.forEach(item => {
                if (item.id == id) {
                    item.children.forEach(item1=>{
                        arr.push(item1.id);
                        item1.children.forEach(item2=>{
                            arr.push(item2.id);
                            item2.children.forEach(item3=>{
                                arr.push(item3.id)
                            })
                        })
                    })
                    this.authChecked=arr;
                    // console.log(arr)
                }
            });
            this.dialogVisibleRights = true
        },
        async deleteRole(id) {
            const res = await this.axios.delete(`roles/${id}`);
            if (res.data.meta.status == 200) {
                this.$message({
                    type: 'success',
                    message: '删除角色成功'
                });
                this.getRoles()
            }
        },
    },
    mounted() {
        this.getRoles();
        this.getRights();
    }
}
</script>

<style scoped>
.tag:not(:first-child) {
    margin-top: 20px;
}

.tag:last-child {
    margin-bottom: 20px;
}
</style>
