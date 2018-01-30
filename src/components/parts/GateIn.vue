<template>
  <div class="gate">
    <div class="img">
      <div class="item">
        <img  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516619827841&di=9420eae12f3b5cdc288563b04da354cc&imgtype=0&src=http%3A%2F%2Fphoto.iautos.cn%2Fcarupload%2Fphoto%2F2015%2F0501%2F15%2F20150501151705920907.jpg">
      </div>
    </div>
    <div class="row">
      <div class="item" style="">
        <el-input style="width:160px"></el-input>
        <el-button>手工校正</el-button>
        <el-button>手动开闸</el-button>
      </div>
      <div class="item"><b class="label">出入口:</b><span>{{doorway.name}}</span></div>
      <div class="item"><b class="label">门闸编号:</b><span>{{doorway.doorCode}}</span></div>
      <div class="item"><b class="label">摄像头编号:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item"><b class="label">进场时间:</b><span>{{doorway.cameraCode}}</span></div>
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
        },
        last: {
          doorid: 1,
          car_number: "甘A-33992",
          money: 12.32,
          type: (Math.random() * 1000) / 2 % 2 == 0 ? 1 : 2
        },
      }
    },
    methods: {
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
