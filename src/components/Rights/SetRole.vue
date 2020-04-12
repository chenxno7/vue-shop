<template>
<el-container>
    <el-header>
        <my-bread :level1="'权限管理'" :level2="'角色管理'"></my-bread>
        <el-button type="primary" style="margin-top: 10px;" @click="showAddForm">添加用户</el-button>
        <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="角色名称" :label-width="180">
                    <el-input v-model="form.rname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="180">
                    <el-input v-model="form.rdesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-header>
    <el-main>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <span>{{scope.row.rname}}-暂未分配权限 </span>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="序号">
            </el-table-column>
            <el-table-column prop="rname" label="角色名称">
            </el-table-column>
            <el-table-column prop="rdesc" label="角色描述">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button circle type="primary" icon="el-icon-edit" @click="showEditForm(scope.row.id)"></el-button>
                    <el-button circle type="success" icon="el-icon-check" @click="showRightsForm(scope.row.id)"></el-button>
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
            tableData:[
                {id:1,rname:"超级管理员",rdesc:"技术负责人"},
                {id:2,rname:"测试角色",rdesc:"测试角色"},
                {id:3,rname:"测试角色2",rdesc:"测试角色2"},
                {id:4,rname:"普通用户",rdesc:"普通用户"},
            ],
            form: {
                rname: '',
                rdesc: ''
            },
            dialogFormVisibleAdd: false
        }
    },
    methods: {
        showAddForm() {
            this.dialogFormVisibleAdd = true
        },
        showEditForm(id){

        },
        showRightsForm(id){

        },
        deleteRole(id){

        },
    }
}
</script>
