<template>
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.exit_picture">
      </div>
    </div>
    <div class="enter">
        <div class="enter_top">
          <span>出口:{{record.approach_alleyway}}</span>
          <span>门闸编号:{{record.approach_door}}</span>
          <span>摄像头编号:{{record.approach_camera}}</span>
        </div>
      <!--<div v-if="record.car_number" class="row">-->
        <!--<div class="item item2"><b class="label">车牌号:</b><span>{{record.car_number}}</span></div>-->
        <!--<div class="item item2"><b class="label">进场时间:</b><span>{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>-->
        <!--<div class="item item2"><b class="label">出口:</b><span>{{record.exit_alleyway}}</span></div>-->
        <!--<div class="item item2"><b class="label">出口门闸编号:</b><span>{{record.exit_door}}</span></div>-->
        <!--<div class="item item2"><b class="label">出口摄像头编号:</b><span>{{record.exit_camera}}</span></div>-->
        <!--<div class="item item2"><b class="label">出场时间:</b><span>{{new Date(record.exit_time*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>-->
        <!--<div class="item item2"><b class="label">应收金额:</b><span>{{record.cope_with}}</span></div>-->
        <!--<div class="item item2"><b class="label">实收金额:</b><span>{{record.real_income}}</span></div>-->
        <!--<div class="item item2"><b class="label">支付方式:</b><span>{{record.payment}}</span></div>-->
      <!--</div>-->
      <div v-if="record.car_number" class="row">
        <div class="item">
          <b class="label">车牌号:</b><span>{{record.car_number}}</span>
          <el-form class="number">
            <el-form-item>
              <el-input placeholder="手动矫正车牌号"></el-input>
              <el-button class="sure">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="item item2"><b class="label">进场时间:</b><span>{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
        <div class="item item2"><b class="label">出场时间:</b><span>{{record.car_number}}</span></div>
        <div class="item item2"><b class="label">停泊类型:</b><span>{{record.car_nuber}}</span></div>
        <div class="item item2"><b class="label">收费金额:</b><span>{{record.car_nummber}}</span></div>
        <div class="item item2"><b class="label">应收金额:</b><span>{{record.cope_with}}</span></div>
        <div class="item item2"><b class="label">实收金额:</b><span>{{record.real_income}}</span></div>
        <div class="item item2"><b class="label">支付方式:</b><span>{{record.payment}}</span></div>
      </div>
        <el-button @click="GateOut">收费开闸</el-button>
        <el-button @click="FreeOut">免费开闸</el-button>
      <div v-if="!record.car_number">暂无记录</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    components: {
    },
    props: ["doorId"],
    data() {
      let that = this;
      return {
        record:{},
        params:{
          pid:67,
          passageway:"B通道",
          exit_time:"2018-2-2 23:32:02",
          car_number:"甘A·216S7",
          terminal_number:"SXT-002"
        }
      }
    },
    mounted(){
      this.getRecord(this.doorId);
    },
    methods: {
      getRecord(doorId){
        let that = this;
        that.$http.post(that.Constants().REST_RECORD_OUT_FIRST,{id:doorId},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.$set(that,"record",res.data.data)
            console.log(that.record);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
      },
      //门闸手动收费操作
      GateOut :function () {
        let that = this;
        that.$http.post(that.Constants().REST_MENZHA_OUT,that.params,{emulateJSON: true}).then(function(res){
          if(res.data.result ==true){
            that.$set(that,"record",res.data.data);
            console.log("接受"+that.record);
          }else{
            that.$message.error(res.data.message);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
      },
      //门闸出厂免费操作
      FreeOut :function () {
        let that = this;
        that.$http.post(that.Constants().REST_MENZHA_FREE,that.params,{emulateJSON: true}).then(function(res){
          if(res.data.result ==true){
            that.$set(that,"record",res.data.data);
            console.log("接受"+that.record);
          }else{
            that.$message.error(res.data.message);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/GateIn.css";
</style>
