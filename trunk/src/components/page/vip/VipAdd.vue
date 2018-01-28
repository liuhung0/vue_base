<!--韩彩霞-->
<template>
  <el-container style="margin: 0 auto">
    <div style="width: 100%">
      <h2>{{$route.params.id?"编辑":"添加"}}Vip</h2>
      <hr style="background:#249CFA; height: 2px;width: 100%;border:0px;"/>
      <el-tabs type="border-card">
        <el-tab-pane label="Vip用户信息录入">
          <el-form ref="ruleForm" v-model="ruleForm" label-width="120px">
            <el-form-item  label="停车场名称">
              <el-select v-model="ruleForm.pId" filterable placeholder="请选择停车场" style="width:300px;margin-left: -55px">
                <el-option
                  v-for="item in pidList"
                  :key="item.pId"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="ruleForm.phone" style="width: 300px;margin-left: -50px"></el-input>
            </el-form-item>
            <el-form-item label="车位类型" >
              <el-radio-group v-model="ruleForm.reserve" size="medium" style="width: 300px;margin-left: -140px">
                <el-radio  label="1" >自助车位</el-radio>
                <el-radio  label="2" >预定车位</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="车牌号">
              <el-input v-model="ruleForm.carNumber" style="width:300px;margin-left: -55px"></el-input>
            </el-form-item>

            <el-form-item label="车位号">
              <el-input v-model="ruleForm.siteNumber" style="width:300px;margin-left: -55px"></el-input>
            </el-form-item>

            <el-form-item label="vip卡类型" >
              <el-radio-group v-model="ruleForm.type" size="medium" style="width: 400px">
                <el-radio  label="1" >月卡用户</el-radio>
                <el-radio  label="2" >季卡用户</el-radio>
                <el-radio  label="3" >年卡用户</el-radio>
                <el-radio  label="4" >管理费</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="会员开始时间">
              <el-col :span="11">
                <el-date-picker type="date" id="beginDate" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 300px;margin-left: 10px;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="会员结束时间">
              <el-col :span="11">
                <el-date-picker type="date" id="endDate" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 300px;margin-left: 10px;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">确认添加</el-button>
              <el-button @click="reback">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>
    </div>
  </el-container >
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          uId: sessionStorage.getItem("LOGIN_PARKING_UID"),
          token: sessionStorage.getItem("LOGIN_PARKING_TOKEN"),
          type: '',
          reserve:'',
          name: '',
          pId:'',
          phone: '',
          carNumber:'',
          siteNumber:'',
          startTime:'',
          endTime:''
        },
        pidList:[]
      }
    },
    mounted() {
      let that = this;
        that.$http.post(that.Constants().VIP_PARKING_LIST,that.ruleForm,{emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.pidList.splice(0, that.pidList.length, ...res.data.data);
          }
        }).catch(function () {
        })
    },
    methods: {
      onSubmit() {
        let that = this;
        if (that.ruleForm.startTime instanceof Date) {
          let startTime = parseInt(that.ruleForm.startTime.getTime()/1000);
          that.ruleForm.startTime = startTime;
        }
        if (that.ruleForm.endTime instanceof Date) {
          let endTime = parseInt(that.ruleForm.endTime.getTime()/1000);
          that.ruleForm.endTime = endTime;
        }
        /* that.ruleForm.user_id = sessionStorage.getItem("LOGIN_COULD_UID");*/
        this.$http.post(that.Constants().VIP_ADD, that.ruleForm,{emulateJSON: true}).then(function (res) {

          if (res.data.result) {

            that.$message.info("设备添加成功");
            this.$router.push("/console/device");
          } else {
            that.$message.error("添加失败："+res.date.message);
          }
        }).catch(function () {
          that.$message.error("网络发生异常");
        })
      },
      onSubmitMore: function () {
        if(!this.moreData.appid || this.moreData.appid==0 ||this.moreData.appid==''){
          this.$message.warning("请先选择应用");
          return;
        }
        this.$refs.excelUpload.submit();
      },
      progress(){
        this.loading=true;
      },
      success(res){
        this.loading=false;
        this.$message.success("数据导入成功!已成功导入"+res.data.data.count+"条");
        this.$router.push("/console/device");
      },
      handleChange: function () {
        var that = this;
        console.log(1);
      },
      reback: function () {
        this.$router.push("/console/device");
      }
    }
  }
</script>
<style scoped>
  .anchorBL {
    display: none
  }
  .el-form-item {
    width: 30%!important;
    margin-top: 10px;
    margin-left: 20px;
  }

  .name {
    height: 200px;
  }

  .el-form {
    margin-left: 50px;
    margin-top: 50px;
  }

  .amap-demo {
    width: 800px;
    height: 500px !important;
    border: 1px solid gray;
    overflow: hidden;
  }

</style>
