<template>
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.exit_picture">
      </div>
    </div>
    <div v-if="record.car_number" class="row">
      <div class="item">
        <el-input style="width:200px"></el-input>
        <el-button>手工校正</el-button>
        <el-button @click="GateOut">收费开闸</el-button>
        <el-button @click="FreeOut">免费开闸</el-button>
      </div>
      <div class="item item2"><b class="label">入口:</b><span>{{record.approach_alleyway}}</span></div>
      <div class="item item2"><b class="label">入口门闸编号:</b><span>{{record.approach_door}}</span></div>
      <div class="item item2"><b class="label">入口摄像头编号:</b><span>{{record.approach_camera}}</span></div>
      <div class="item item2"><b class="label">车牌号:</b><span>{{record.car_number}}</span></div>
      <div class="item item2"><b class="label">进场时间:</b><span>{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
      <div class="item item2"><b class="label">出口:</b><span>{{record.exit_alleyway}}</span></div>
      <div class="item item2"><b class="label">出口门闸编号:</b><span>{{record.exit_door}}</span></div>
      <div class="item item2"><b class="label">出口摄像头编号:</b><span>{{record.exit_camera}}</span></div>
      <div class="item item2"><b class="label">出场时间:</b><span>{{new Date(record.exit_time*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
      <div class="item item2"><b class="label">应付金额:</b><span>{{record.cope_with}}</span></div>
      <div class="item item2"><b class="label">实收金额:</b><span>{{record.real_income}}</span></div>
      <div class="item item2"><b class="label">支付方式:</b><span>{{record.payment}}</span></div>
      <div class="item item2"><b class="label">停车时长:</b><span>{{record.parkTimes}}</span></div>
      <div class="link">
        <a> 更多记录</a>
      </div>
    </div>
    <div v-if="!record.car_number">暂无记录</div>
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
  .gate {
    display: block;
    margin:20px;
    border:1px solid #ccc;
    padding:20px;
    width:92%;
    overflow: hidden;
    background: #fed4d9;
  }
  .img {
    width:400px;
    float:left;
    display: block;
  }
  .img .item{
    margin:4px;
    text-align: left;
  }
  .img .item img{
    max-width: 392px;
  }
  .row{
    float:right;
    display: block;
    padding: 0 20px;
    width:760px;
  }
  .row .item{
    width:100%;
    float:left;
    display: block;
    text-align: left;
    line-height: 36px;
    border-bottom:1px dashed #ccc;padding-bottom: 10px;
  }
  .row .item2{
    width:50%;
  }
  .row .item2 B{
    width:140px;
    float:left;
    display: block;
    text-align: left;
  }
  .row .link{
    clear: both;
    float:right;
    margin-top:30px;
  }


</style>
