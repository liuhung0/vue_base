<template>
  <div class="main">
    <h2>{{id ? "编辑" : "新增"}}管理费管理</h2>
    <el-form ref="ruleForm" :rules="ruleForm" :model="ruleForm" label-width="100px" class="addAccount">


      <el-form-item label="姓名">
        <el-input v-model="ruleForm.name"  maxlength="7" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="ruleForm.phone"  maxlength="7" style="width:300px;margin-left: -55px"></el-input>
      </el-form-item>

      <el-form-item label="续费时间">
        <el-col :span="11">
          <el-date-picker type="date" id="beginDate" placeholder="选择日期" v-model="ruleForm.startTime"
                          style="width: 300px;margin-left: 3px;" ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item  label="选择车位号" style="color: black;width: 100px;">
        <el-select v-model="ruleForm.seatId" filterable placeholder="请选择车位号" style="width:300px;margin-left: -55px">
          <el-option
            v-for="item in seatList"
            :key="item.seatId"
            :label="item.seatNumber"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车牌号">
        <el-input v-model="ruleForm.carNumber"  maxlength="7" style="width:300px;margin-left: -55px"></el-input>
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
  export default {
    components: {
    },
    name: "sub-info",
    props: ["id"],
    data() {
      return {
        ruleForm: {
          deleted: 0,
          type:4,
          id: this.id || null,
          seatId: '',
          carNumber: '',
          region: '',
          tower: '',
          element: '',
          roomNum: '',
          seatNumber:'',
          name:'',
          startTime:'',
          phone:'',
          pId: sessionStorage.getItem("LOGIN_PARKING_PID")
        },
        seatList:[],
      }
    },
    mounted() {
      let that = this;
      that.$http.post(that.Constants().VIP_GLF_SEAT_ID,that.ruleForm,{emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          that.seatList.splice(0, that.seatList.length, ...res.data.data);
        }
      }).catch(function () {
      }),
      that.$http.post(this.Constants().VIP_ID_LIST, that.ruleForm, {emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          that.ruleForm = res.data.data;
        }
        else {
          that.$message.info(res.data.data.message);
        }
      }, function () {
        that.$message.error("网络发生错误");
      })
    },
    methods: {
      onSubmit() {
        let that = this;
        if (that.ruleForm.seatId.length ==0) {
          that.$message.error("请选择车位号!");
          return;
        }
        var carnumber = /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警][A-Z][0-9,A-Z]{5}$/;
        if ((!carnumber.test(that.ruleForm.carNumber))) {
          this.$message.error('车牌号有误,请重新输入!');
          return;
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
        if (this.ruleForm.startTime instanceof Date) {
          let startTime = parseInt(this.ruleForm.startTime.getTime()/1000);
          console.log("开始时间："+startTime);
          this.ruleForm.startTime = startTime;
        }
        this.$http.post(that.Constants().VIP_ADD, that.ruleForm, {emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.$message.info("操作成功");
            that.$emit("addOK");
          } else {
            that.$message.error("添加失败：" + res.data.data.message);
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
