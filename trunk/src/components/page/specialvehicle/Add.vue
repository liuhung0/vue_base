<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}黑白名单 </h2>
    <el-form ref="ruleForm" v-model="ruleForm"  label-width="80px" class="heibai">
      <el-form-item label="姓名" prop="number" class="nameList">
        <el-input  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="phone" class="nameList" >
        <el-input v-model="ruleForm.carNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="name" class="nameList">
        <el-input  v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="类型"  class="nameList">
        <el-radio-group v-model="ruleForm.type" size="medium" class="radio">
          <el-radio  label="1" class="dan">白名单</el-radio>
          <el-radio  label="2" class="dan">黑名单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="gender" class="nameList">
        <el-input  v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保 &nbsp;&nbsp;&nbsp;&nbsp; 存</el-button>
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
        ruleForm: {
          id:this.id || null,
          pId: sessionStorage.getItem("LOGIN_PARKING_PID"),
          name:'',
          carNumber:'',
          phone:'',
          type: '',
          remark:'',
          deleted:0,
        },
      }
    },
    mounted(){
      let that = this;
      if(that.ruleForm.id&&that.ruleForm.id>0){
        that.$http.post(this.Constants().SPECIAlVEHICLE_ID, that.ruleForm,{emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.ruleForm = res.data.data;
            that.ruleForm.type = res.data.data.type.toString();
          }
          else {
            that.$message.info(that.res.data.data.message);
          }
        }, function () {
          that.$message.error("网络发生错误");
        })
      }
    },
    methods: {
      onSubmit() {
        let that = this;
        this.$http.post(that.Constants().SPECIAlVEHICLE_ADD, that.ruleForm,{emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.$message.info("黑白名单添加成功");
            that.$emit("addOK");
          } else {
            that.$message.error("添加失败："+res.date.message);
          }
        }).catch(function () {
          that.$message.error("网络发生异常");
        })
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
  .dan .el-radio__label {
    color: #fff;
  }
  .nameList .el-form-item__label{
    color: #fff;
  }
</style>
