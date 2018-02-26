<template>
  <div class="main">
    <h2>黑白名单-批量导入</h2>
    <el-form ref="ruleForm" v-model="ruleForm"  label-width="80px" class="heibai">

      <el-form-item label="批量导入" style="width:100px;margin-top: 10%">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action=Constants().SPECIAlVEHICLE_FILE_UPLOAD
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          name="upfile"
        >
          <el-button slot="trigger" type="primary">选取文件</el-button>
          <el-button  type="success" @click="onSubmit">保存</el-button>
          <a class="el-button" @click="expObjHandler">下载Excel表格模板</a>
        </el-upload>

      </el-form-item>

    </el-form>

  </div>

</template>
<script>

  export default {
    components: {
    },
    name: "sub-info",
    props:["id"],
    data() {
      return {

      }
    },
    mounted(){

    },
    methods: {
      expObjHandler:function(){
        let that = this;
        window.open(
          that.Constants().SPECIAlVEHICLE_EXL
        );
      },
      onSubmit() {
        let that = this;
        this.$refs.upload.submit();
        that.$message.info("操作成功");
        that.$emit("addOK");
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>
  .main{
    padding:20px 60px;
    background: #3D4E66;
    border-radius: 4px;
  }
  .main h2{
    color: #fff;
    font-weight: 300;
    padding-left:20px;
    border-left:4px solid #49a9ff;
    text-align: left;
  }
  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
</style>
<style>
  .heibai  .el-form-item__content{
    width: 360px;
  }
  .heibai .el-form-item__label{
    color:#fff;
  }
  .heibai .selec{
    width:300px;
    margin-right: 15%;

  }
  .heibai .selec .el-select-dropdown__item span{
    color: #444 !important;
  }
  .heibai .el-select-dropdown__item.hover{
    color: #444;
  }
  .heibai .radio{
    margin-left: -240px;
  }
  .heibai .radio2{
    margin-left: -207px;
  }
  .heibai .radio {
    margin-left: -190px;
  }
  .heibai .dan .el-radio__label {
    color: #fff;
  }
  .heibai .nameList .el-form-item__label{
    color: #fff;
  }
</style>
