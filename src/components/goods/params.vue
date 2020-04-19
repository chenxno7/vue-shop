<template>
<el-card>
    <my-bread :level1="'商品管理'" :level2="'分类参数'"></my-bread>
    <el-alert class="alert" title="只允许第三级分类设置参数" type="error"></el-alert>
    <el-form class="selectForm">
        <el-form-item label="商品分类">
            <el-cascader v-model="value" :options="options" :props="props"></el-cascader>
        </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
            <!-- <el-button>设置动态参数</el-button> -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-tag :key="i" v-for="(attr_val,i) in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row.attr_id,attr_val,scope.row.attr_name)">
                            {{attr_val}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="addAttr_val(scope.row.attr_id,scope.row.attr_name)" @blur="addAttr_val(scope.row.attr_id,scope.row.attr_name)">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="属性名称" prop="attr_name">
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" circle icon="el-icon-edit"></el-button>
                        <el-button type="danger" circle icon="el-icon-delete" @click="deleteParams(curId,scope.row.attr_id)"></el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="second">
            <!-- <el-button>设置静态参数</el-button> -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="属性名称" prop="attr_name">
                </el-table-column>
                <el-table-column label="属性值" prop="attr_name">
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" circle icon="el-icon-edit"></el-button>
                        <el-button type="danger" circle icon="el-icon-delete" @click="deleteParams(curId,scope.row.attr_id)"></el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            value: [],
            options: [],
            props: {
                value: 'cat_id',
                label: 'cat_name'
            },
            activeName: 'first',
            tableData: [],
            curId: '',
            curAttrId: '',
            inputVisible: false,
            inputValue: '',
            putData: {}
        }
    },
    methods: {
        async getParams(sel) {
            const res = await this.axios.get(`categories/${this.value[2]}/attributes?sel=${sel}`)
            this.tableData = res.data.data;
            if (this.activeName == 'first') {
                this.tableData.forEach(item => {
                    item.attr_vals = item.attr_vals.split(',')
                })
                console.log(this.tableData)
            }
            // console.log(res)
        },
        async getCategories() {
            const res = await this.axios.get(`categories`);
            this.options = res.data.data;
            // console.log(res)
        },
        handleClick() {
            if (this.value.length == 3) {
                this.curId = this.value[2];
                if (this.activeName == "first") {
                    this.getParams('many');
                } else {
                    this.getParams('only')
                }
            } else {
                this.$message({
                    type: "warning",
                    message: "三级分类未选择"
                });
                return
            }
        },
        async deleteParams(id, attr_id) {
            // console.log(id, attr_id)
        },
        async addAttr_val(attr_id,attr_name) {
            if (this.inputValue == '') {
                this.inputVisible = false;
                return;
            }
            this.tableData.forEach(item => {
                if (item.attr_id == attr_id) {
                    item.attr_vals.push(this.inputValue);
                    this.putData = {
                        attr_name,
                        attr_vals: item.attr_vals.join(','),
                        attr_sel: 'many'
                    };
                    this.axios.put(`categories/${this.curId}/attributes/${attr_id}`, this.putData).then(res=>{console.log(res)})
                    console.log(this.putData)
                }
            })
            this.inputVisible = false;
            this.inputValue = '';
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleClose(attr_id, attr_val, attr_name) {
            this.tableData.forEach(item => {
                if (item.attr_id == attr_id) {
                    let index = item.attr_vals.findIndex(item2 => item2 == attr_val);
                    console.log(index)
                    item.attr_vals.splice(index, 1)
                    this.putData = {
                        attr_name,
                        attr_vals: item.attr_vals.join(','),
                        attr_sel: 'many'
                    };
                    this.axios.put(`categories/${this.curId}/attributes/${attr_id}`, this.putData).then(res=>{console.log(res)})
                    
                }
            });

        }
    },
    mounted() {
        this.getCategories();
    },
    watch: {
        value() {
            this.handleClick()
        }
    }
}
</script>

<style scoped>
.alert,
.selectForm {
    margin-top: 20px;
}

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
