<template>
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.approach_picture">
      </div>
    </div>
    <div v-if="record.car_number" class="row">
      <div class="item" style="">
        <el-input style="width:160px"></el-input>
        <el-button>手工校正</el-button>
        <el-button>手动开闸</el-button>
      </div>
      <div class="item"><b class="label">入口:</b><span>{{record.approach_alleyway}}</span></div>
      <div class="item"><b class="label">门闸编号:</b><span>{{record.approach_door}}</span></div>
      <div class="item"><b class="label">摄像头编号:</b><span>{{record.approach_camera}}</span></div>
      <div class="item"><b class="label">车牌号:</b><span>{{record.car_number}}</span></div>
      <div class="item"><b class="label">进场时间:</b><span>{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
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
        record:{}
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
            that.$set(that,"record",res.data.data)
            console.log(that.record);
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
    background: #c8feed;
  }
  .img {
    width:400px;
    float:left;
    display: block;
   }
   .img .item{
     width:100%;
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
  .row .item B{
    width:100px;
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
