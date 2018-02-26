<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}黑白名单 </h2>
    <el-form ref="ruleForm" v-model="ruleForm"  label-width="80px" class="heibai">
      <el-form-item label="姓名" prop="name" class="nameList">
        <el-input  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="carNumber" class="nameList" >
        <el-input v-model="ruleForm.carNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" class="nameList">
        <el-input  v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="类型"  class="nameList">
        <el-radio-group v-model="ruleForm.type" size="medium" class="radio">
          <el-radio  label="1" class="dan">白名单</el-radio>
          <el-radio  label="2" class="dan">黑名单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark" class="nameList">
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
        piid:sessionStorage.getItem("LOGIN_PARKING_PID"),
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
      expObjHandler:function(){
        let that = this;
        window.open(
          that.Constants().SPECIAlVEHICLE_EXL
        );
      },
      onSubmit() {
        let that = this;
        if (that.ruleForm.name.length ==0) {
          that.$message.error("请输入姓名!");
          return;
        }
        var carnumber = /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警][A-Z][0-9,A-Z]{5}$/;
        if ((!carnumber.test(that.ruleForm.carNumber))) {
          this.$message.error('车牌号有误,请重新输入!');
          return;
        }
        var phone = /^1(3|4|5|7|8)\d{9}$/;
        if ((!phone.test(that.ruleForm.phone))) {
          this.$message.error('请输入正确的手机号!');
          return;
        }

        if (that.ruleForm.type.length ==0) {
          that.$message.error("请选择类型!");
          return;
        }
        if (that.ruleForm.remark.length ==0) {
          that.$message.error("请输入备注信息!");
          return;
        }
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
  .heibai .dan .el-radio__label {
    color: #fff;
  }
  .heibai .nameList .el-form-item__label{
    color: #fff;
  }
</style>
