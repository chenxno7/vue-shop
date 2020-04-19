<template>
<el-card>
    <my-bread :level1="'商品管理'" :level2="'商品添加'" style="margin:20px 0;"></my-bread>
    <el-alert style="margin:20px 0;" title="添加商品" type="success"></el-alert>
    <el-steps :space="200" :active="Number(step)" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs @tab-click="tabsChange" v-model="step" tab-position="left" style="margin-top:20px;">
        <el-tab-pane name="1" label="基本信息">
            <el-form label-position="left" label-width="80px" :model="goodsform">
                <el-form-item label="商品名称">
                    <el-input v-model="goodsform.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格（元）">
                    <el-input v-model="goodsform.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="goodsform.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="goodsform.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    {{cat_value}}
                    <el-cascader :props="props" v-model="cat_value" :options="options"></el-cascader>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
            <el-alert title="该分类参数为空" v-if="attrParams.length==0" type="info">
            </el-alert>
            <el-form>
                <el-form-item v-for="(item,i) of attrParams" :key="i" :label="item.attr_name">
                    <el-checkbox-group v-model="item.attr_vals">
                        <el-checkbox border :label="item2" v-for="(item2,i) of item.attr_vals" :key="i"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
            <el-form label-position="top" label-width="80px" style="height:100%;">
                <el-form-item :label="item.attr_name" v-for="(item,i) of attronly" :key="i">
                    <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
            <el-upload class="upload-demo" action="http://127.0.0.1:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" list-type="picture" :headers="headers">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="addGoods">添加商品</el-button>
                    <quill-editor class="editor" v-model="goodsform.goods_introduce"></quill-editor>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
    data() {
        return {
            step: '1',
            goodsform: {
                goods_name:"",
                goods_price:"",
                goods_cat:"",
                goods_number:"",
                goods_weight:"",
                goods_introduce:"",
                pics:[],
                attrs:[]
            },
            cat_value: [],
            options: [],
            props: {
                label: 'cat_name',
                value: 'cat_id'
            },
            attrParams: [],
            attronly: [],
            checkList: [],
            fileList:[],
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }
    },
    methods: {
        handlePreview(file){},
        handleRemove(file){
            let index=this.goodsform.pics.findIndex(item=>item.pic==file.response.data.tmp_path)
            this.goodsform.pics.splice(index,1)
            console.log(this.goodsform)
        },
        handleSuccess(file){
            this.goodsform.pics.push({
                pic:file.data.tmp_path
            })
            console.log(this.goodsform)
        },
        async tabsChange() {
            if (this.step == '2') {
                if (this.cat_value.length != 3) {
                    this.$message({
                        message: "商品分类未选择！",
                        type: "warning"
                    });
                } else {
                    const res = await this.axios.get(`categories/${this.cat_value[2]}/attributes?sel=many`);
                    this.attrParams = res.data.data;
                    if (res.data.data.length > 0) {
                        this.attrParams.forEach(item => {
                            item.attr_vals = item.attr_vals.split(',')
                        })
                    }
                    // console.log(this.attrParams)
                    console.log(res)
                }
            } else if (this.step == "3") {
                if (this.cat_value.length != 3) {
                    this.$message({
                        message: "商品分类未选择！",
                        type: "warning"
                    });
                } else {
                    const res = await this.axios.get(`categories/${this.cat_value[2]}/attributes?sel=only`);
                    this.attronly = res.data.data
                    console.log(res)
                }
            }
        },
        async getCat() {
            const res = await this.axios.get('categories');
            this.options = res.data.data
            console.log(res)
        },
        async addGoods(){
            this.goodsform.goods_cat=this.cat_value.join(',');
            let arr1=this.attrParams.map(item=>{
                return {attr_id:item.attr_id,attr_value:item.attr_vals}
            })
            let arr2=this.attronly.map(item=>{
                return {attr_id:item.attr_id,attr_value:item.attr_vals}
            })
            this.goodsform.attrs=[...arr1,...arr2];
            const res = await this.axios.post(`goods`,this.goodsform);
            if(res.data.meta.status=='201'){
                this.$message({
                    type:'success',
                    message:"添加商品成功"
                });
                this.$router.push('/goods')
            }
            console.log(res)
        }
    },
    mounted() {
        this.getCat();
    },
    components:{quillEditor}
}
</script>

<style scoped>
.editor{
    height: 400px !important;
}
</style>
