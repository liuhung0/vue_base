<template>
  <!--入场-->
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.approach_picture">
      </div>
    </div>
    <div class="enter">
      <div class="enter_top">
        <span>入口:{{record.approach_alleyway}}</span>
        <span>门闸编号:{{record.approach_door}}</span>
        <span>摄像头编号:{{record.approach_camera}}</span>
      </div>
      <div v-if="record.car_number" class="row">
        <div class="item">
          <b class="label">车牌号:</b><span class="sp">{{record.car_number}}</span>
          <el-form class="number">
            <el-form-item>
              <el-input placeholder="手动矫正车牌号" class="gaizheng"></el-input>
              <el-button class="sure">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="item"><b class="label">进场时间:</b><span class="sp">{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
        <div class="item"><b class="label">出场时间:</b><span class="sp">{{record.car_number}}</span></div>
        <div class="item"><b class="label">收费金额:</b><span class="sp">{{record.car_number}}</span></div>
        <div class="item"><b class="label">停泊类型:</b><span class="sp">{{record.car_number}}</span></div>
      </div>
    </div>
    <el-button  @click="GateIn" class="startGate">手动开闸</el-button>
      <!--<div class="link">-->
        <!--<a> 更多记录</a>-->
      <!--</div>-->
    <!--<div v-if="!record.car_number">暂无记录</div>-->
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
          passageway:"A通道",
          enter_time:"2018-2-2 19:32:02",
          car_number:"甘A·216S7",
          terminal_number:"SXT-001"
        }


      }
    },
    mounted(){
      this.getRecord(this.doorId);
    },
    methods: {
      getRecord(doorId){
        let that = this;
        that.$http.post(that.Constants().REST_RECORD_IN_FIRST,{id:doorId},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.$set(that,"record",res.data.data);
            that.$set(that,"pid",that.record.p_id);
            that.$set(that,"passageway",that.record.approach_alleyway);
            that.$set(that,"car_number",that.record.car_number);
            that.$set(that,"terminal_number",that.record.approach_door);
            console.log(that.car_number);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
      },
      GateIn :function () {
        let that = this;
        that.$http.post(that.Constants().REST_MENZHA_SAVE,that.params,{emulateJSON: true}).then(function(res){
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
  .sp{
    color: #fff;
  }
</style>
