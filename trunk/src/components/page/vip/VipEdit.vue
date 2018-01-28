<!--韩彩霞-->
<template>
  <el-container style="margin: 0 auto">
    <div style="width: 100%">
      <h2>{{$route.params.id?"编辑":"添加"}}Vip</h2>
      <hr style="background:#249CFA; height: 2px;width: 100%;border:0px;"/>
      <el-tabs type="border-card">
        <el-tab-pane label="Vip用户信息编辑">
          <el-form ref="reqData" v-model="reqData" label-width="120px">
            <el-form-item  label="停车场名称">
              <el-select v-model="reqData.pid" filterable placeholder="请选择停车场" style="width:300px;margin-left: -55px">
                <el-option
                  v-for="item in pidList"
                  :key="item.pid"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="reqData.phone" style="width: 300px;margin-left: -50px"></el-input>
            </el-form-item>
            <el-form-item label="车位类型" >
              <el-radio-group v-model="reqData.reserve" size="medium" style="width: 300px;margin-left: -140px">
                <el-radio  label="1" >自助车位</el-radio>
                <el-radio  label="2" >预定车位</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="车牌号">
              <el-input v-model="reqData.carNumber" style="width:300px;margin-left: -55px"></el-input>
            </el-form-item>

            <el-form-item label="车位号">
              <el-input v-model="reqData.siteNumber" style="width:300px;margin-left: -55px"></el-input>
            </el-form-item>

            <el-form-item label="vip卡类型" >
              <el-radio-group v-model="reqData.type" size="medium" style="width: 400px">
                <el-radio  label="1" >月卡用户</el-radio>
                <el-radio  label="2" >季卡用户</el-radio>
                <el-radio  label="3" >年卡用户</el-radio>
                <el-radio  label="4" >管理费</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="会员开始时间">
              <el-col :span="11">
                <el-date-picker type="date" id="beginDate" placeholder="选择日期" v-model="reqData.startTime" style="width: 300px;margin-left: 10px;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="会员结束时间">
              <el-col :span="11">
                <el-date-picker type="date" id="endDate" placeholder="选择日期" v-model="reqData.endTime" style="width: 300px;margin-left: 10px;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmitOne">确认添加</el-button>
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
        reqData: {
          uId:sessionStorage.getItem("LOGIN_PARKING_UID"),
          pid: '',
          phone:'',
          reserve:1,
          carNumber:'',
          siteNumber:'',
          type:1,
          startTime:'',
          endTime:'',
          id:this.$route.params.id,//跨页面传id
        },
        pidList:[]
      }
    },
    mounted() {
      let that = this;
      that.$http.post(that.Constants().VIP_PARKING_LIST,that.reqData,{emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          that.pidList.splice(0, that.pidList.length, ...res.data.data);
        }
      }),
      that.$http.post(this.Constants().VIP_ID_LIST, that.reqData, {emulateJSON: true}).then(function (response) {
        that.resData = response.data;
        if (that.resData.result) {
          that.$set(that, "reqData", response.data.data);
          that.reqData.type = response.data.data.type.toString();
          that.reqData.reserve = response.data.data.reserve.toString();
        }
        else {
          that.$message.info("拉取数据异常");
        }
        // 响应成功回调
      }, function (response) {
        that.$message.info('数据交互发生错误,请联系网络管理员');
      });
    },
    methods: {
      on() {
        let that = this;
        if (that.resData.startTime instanceof Date) {
          let startTime = parseInt(that.resData.startTime.getTime()/1000);
          that.resData.startTime = startTime;
        }
        if (that.resData.endTime instanceof Date) {
          let endTime = parseInt(that.resData.endTime.getTime()/1000);
          that.resData.endTime = endTime;
        }

      },
      onSubmitOne:function(){
        let that = this;
        this.$http.post(this.Constants().VIP_ID_EDIT, this.reqData,{emulateJSON: true}).then(function (response) {
          this.resData = response.data;
          if (this.resData.result) {
            this.$message.info('修改厂商成功！');
            this.$router.push("/console/factory");
          }
          else {
            this.$message.info(that.resData.message);
          }
        });
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
