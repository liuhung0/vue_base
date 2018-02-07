<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}黑白名单 </h2>
    <el-form ref="reqData" v-model="reqData"  label-width="80px">


      <el-form-item label="姓名" prop="number">
        <el-input  v-model="reqData.name" ></el-input>
      </el-form-item>
      <el-form-item label="车牌号"  prop="phone">
        <el-input v-model="reqData.carNumber"  maxlength="7"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="name">
        <el-input  v-model="reqData.phone"  maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="名单类型" >
        <el-radio-group v-model="reqData.type" size="medium" style="width: 450px">
          <el-radio  label="1" >白名单</el-radio>
          <el-radio  label="2" >黑名单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="gender">
        <el-input  v-model="reqData.remark"></el-input>
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
        reqData: {
          pId:sessionStorage.getItem("LOGIN_PARKING_UID"),
          name:'',
          carNumber:'',
          phone:'',
          type: '',
          remark:'',
          id:this.$route.params.id,
        },
      }
    },
    mounted(){
      let that = this;
      that.$http.post(this.Constants().SPECIAlVEHICLE_ID, that.reqData,{emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          that.reqData = res.data.data;
        }
        else {
          that.$message.info(that.res.data.data.message);
        }
      }, function () {
        that.$message.error("网络发生错误");
      })
    },
    methods: {
      onSubmit() {
        let that = this;
        if (that.ruleForm.name.length ==0) {
          that.$message.error("请输入姓名");
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
          that.$message.error("请选择名单类型!");
          return;
        }
        if (that.ruleForm.remark.length ==0) {
          that.$message.error("请填写备注!");
          return;
        }
        this.$http.post(that.Constants().SPECIAlVEHICLE_ADD, that.reqData,{emulateJSON: true}).then(function (res) {

          if (res.data.result) {

            that.$message.info("黑白名单修改成功");
            this.$router.push("/page/specialvehicle/list");
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
