<template>
  <div class="gate">
    <div class="img">
      <div class="item">
        <img  style="width:400px;height:240px;border:1px dashed #ddd;border-radius: 4px;"src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516619827841&di=9420eae12f3b5cdc288563b04da354cc&imgtype=0&src=http%3A%2F%2Fphoto.iautos.cn%2Fcarupload%2Fphoto%2F2015%2F0501%2F15%2F20150501151705920907.jpg">
      </div>

    </div>
    <div class="row">
      <div class="item">
        <el-input style="width:200px"></el-input>
        <el-button>手工校正</el-button>
        <el-button>收费开闸</el-button>
        <el-button>免费开闸</el-button>
      </div>
      <div class="item item2"><b class="label">出入口:</b><span>{{doorway.name}}</span></div>
      <div class="item item2"><b class="label">门闸编号:</b><span>{{doorway.doorCode}}</span></div>
      <div class="item item2"><b class="label">摄像头编号:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">车辆类型:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">进场时间:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">出场时间:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">车牌号:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">应付金额:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">实收金额:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item item2"><b class="label">支付方式:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="link">
        <a> 更多记录</a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    components: {
      },
    props: [],
    data() {
      let that = this;
      return {
        doorway: {
          id: 1,
          name: "西入口",
          doorCode: "Ko1103",
          cameraCode: "camera1103",
          pid: 67
        }
      }
    },
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
    width:560px;
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
