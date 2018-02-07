<template>
  <div class="main">
    <h2>{{id ? "编辑" : "新增"}}租户管理</h2>
    <el-form ref="ruleForm" :rules="ruleForm" :model="ruleForm" label-width="100px" class="addAccount">

      <el-form-item label="姓名">
        <el-input v-model="ruleForm.name" maxlength="5" style="width: 300px;margin-left: -50px"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="ruleForm.phone" maxlength="11" style="width: 300px;margin-left: -50px"></el-input>
      </el-form-item>

      <el-form-item label="车位类型">
        <el-radio-group v-model="ruleForm.reserve" size="medium" style="width: 300px;margin-left: -140px">
          <el-radio label="1">自助车位</el-radio>
          <el-radio label="2">预定车位</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="车牌号">
        <el-input v-model="ruleForm.carNumber" maxlength="7" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>


      <el-form-item label="vip卡类型">
        <el-radio-group v-model="ruleForm.type" size="medium" style="width: 400px">
          <el-radio label="1">月卡用户</el-radio>
          <el-radio label="2">季卡用户</el-radio>
          <el-radio label="3">年卡用户</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="会员开始时间">
        <el-col :span="11">
          <el-date-picker type="date" id="beginDate" placeholder="选择日期" v-model="ruleForm.startTime"
                          style="width: 300px;margin-left: 10px;" ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="会员结束时间">
        <el-col :span="11">
          <el-date-picker type="date" id="endDate" placeholder="选择日期" v-model="ruleForm.endTime"
                          style="width: 300px;margin-left: 10px;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="区号">
        <el-input v-model="ruleForm.region" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>

      <el-form-item label="楼号">
        <el-input v-model="ruleForm.tower" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>

      <el-form-item label="单元">
        <el-input v-model="ruleForm.element" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>

      <el-form-item label="房间号">
        <el-input v-model="ruleForm.roomNum" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">保 &nbsp;&nbsp;存</el-button>
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
      ElRadio
    },
    name: "sub-info",
    props: ["id"],
    data() {
      return {
        ruleForm: {
          platform:2,
          deleted: 0,
          id: this.id || null,
          name: '',
          phone: '',
          reserve: '',
          carNumber: '',
          type: '',
          startTime: new Date(),
          endTime: new Date(),
          region: '',
          tower: '',
          element: '',
          roomNum: '',
          pId: sessionStorage.getItem("LOGIN_PARKING_PID")
        },
      }
    },
    mounted() {
      let that = this;
      that.$http.post(this.Constants().VIP_ID_LIST, that.ruleForm, {emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          console.log(res.data);
          that.ruleForm = res.data.data;
          that.ruleForm.type = res.data.data.type.toString();
          that.ruleForm.reserve = res.data.data.reserve.toString();
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
          that.$message.error("姓名长度必须在1~5个汉字!");
          return;
        }
        var phone = /^1(3|4|5|7|8)\d{9}$/;
        if ((!phone.test(that.ruleForm.phone))) {
          this.$message.error('请输入正确的手机号!');
          return;
        }
        var carnumber = /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警][A-Z][0-9,A-Z]{5}$/;
        if ((!carnumber.test(that.ruleForm.carNumber))) {
          this.$message.error('车牌号有误,请重新输入!');
          return;
        }
        var beginDate=$("#beginDate").val();
        var endDate=$("#endDate").val();
        var d1 = new Date(beginDate.replace(/\-/g, "\/"));
        var d2 = new Date(endDate.replace(/\-/g, "\/"));

        if(beginDate!=""&&endDate!=""&&d1 >=d2)
        {
          that.$message.error("开始时间不能大于结束时间!");
          return false;
        }
        if (that.ruleForm.region.length ==0) {
          that.$message.error("请输入区号!");
          return;
        }
        if (that.ruleForm.tower.length ==0) {
          that.$message.error("请输入楼号!");
          return;
        }

        if (that.ruleForm.element.length ==0) {
          that.$message.error("请输入单元!");
          return;
        }
        if (that.ruleForm.roomNum.length ==0) {
          that.$message.error("请输入房间号!");
          return;
        }

        this.ruleForm.startTime = new Date(this.ruleForm.startTime);
        this.ruleForm.endTime = new Date(this.ruleForm.endTime);
        if (this.ruleForm.startTime instanceof Date) {
          let startTime = parseInt(this.ruleForm.startTime.getTime()/1000);
          console.log("开始时间："+startTime);
          this.ruleForm.startTime = startTime;
        }
        if (this.ruleForm.endTime instanceof Date) {
          let endTime  = parseInt(this.ruleForm.endTime.getTime()/1000);
          console.log("结束时间："+endTime);
          this.ruleForm.endTime = endTime;
        }
        this.$http.post(that.Constants().VIP_ADD, that.ruleForm, {emulateJSON: true}).then(function (res) {

          if (res.data.result) {
            that.$message.info("黑白名单添加成功");
            that.$emit("addOK");
          } else {
            that.$message.error("添加失败：" + res.date.message);
          }
        }).catch(function () {
          that.$message.error("网络发生异常");
        })
      }
    }
  }
</script>

<style scoped>
  .main {
    padding: 20px 60px;
    background: #3D4E66;
    border-radius: 4px;
  }

  .main h2 {
    color: #fff;
    font-weight: 300;
    padding-left: 20px;
    border-left: 4px solid #49a9ff;
    text-align: left;
  }

  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
</style>
<style>
  .addAccount .el-form-item__content {
    width: 360px;
  }

  .addAccount .el-form-item__label {
    color: #fff;
  }

  .addAccount .selec {
    width: 300px;
    margin-right: 15%;

  }

  .addAccount .selec .el-select-dropdown__item span {
    color: #444 !important;
  }

  .addAccount .el-select-dropdown__item.hover {
    color: #444;
  }

  .addAccount .radio {
    margin-left: -240px;
  }

  .addAccount .radio2 {
    margin-left: -207px;
  }

  .xing .el-radio__label {
    color: #fff;
  }
</style>
