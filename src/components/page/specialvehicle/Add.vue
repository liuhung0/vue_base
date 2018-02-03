<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}黑白名单 </h2>
    <el-form ref="ruleForm" v-model="ruleForm"  label-width="80px">


      <el-form-item label="姓名" prop="number">
        <el-input  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="phone">
        <el-input v-model="ruleForm.carNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="name">
        <el-input  v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" >
        <el-radio-group v-model="ruleForm.type" size="medium" style="width: 450px">
          <el-radio  label="1" >白名单</el-radio>
          <el-radio  label="2" >黑名单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="gender">
        <el-input  v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保 &nbsp;&nbsp;&nbsp;&nbsp; 存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import ElRadio from "../../../../node_modules/element-ui/packages/radio/src/radio.vue";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";

  export default {
    components: {
      ElCheckbox,
      ElFormItem,
      ElRadio},
    name: "sub-info",
    props:["id"],
    data() {
      return {
        ruleForm: {
          pId: sessionStorage.getItem("LOGIN_PARKING_PID"),
          name:'',
          carNumber:'',
          phone:'',
          type: '',
          remark:'',
        },
      }
    },
    mounted(){
      let that = this;
      console.log(that.id);
      if(that.form.id&&that.form.id>0){
        that.getInfo();
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
    /*background:#fff;*/
    border-radius: 10px;
  }
  .main h2{
    font-size:24px;
    font-weight: 400;
    color:#828282;
    padding-top:20px;
    padding-bottom: 20px;
    text-align:left;
    border-bottom:1px dashed #ccc;
  }
  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
</style>
