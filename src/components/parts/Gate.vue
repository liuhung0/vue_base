<template>
  <div class="gate">
  <div class="row img">
      <div class="item">
        <img  style="width:400px;height:240px;border:1px dashed #ddd;border-radius: 4px;"src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516619827841&di=9420eae12f3b5cdc288563b04da354cc&imgtype=0&src=http%3A%2F%2Fphoto.iautos.cn%2Fcarupload%2Fphoto%2F2015%2F0501%2F15%2F20150501151705920907.jpg">
      </div>
      <div class="item">
        <el-input style="width:200px"></el-input><el-button>手工校正</el-button><el-button>手动开闸</el-button>
      </div>
    </div>

    <div class="row">
      <div class="item"><b class="label">出入口:</b><span>{{doorway.name}}</span></div>
      <div class="item"><b class="label">门闸编号:</b><span>{{doorway.doorCode}}</span></div>
      <div class="item"><b class="label">摄像头编号:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item"><b class="label">摄像头编号:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item"><b class="label">出入口:</b><span>{{doorway.name}}</span></div>
      <div class="item"><b class="label">门闸编号:</b><span>{{doorway.doorCode}}</span></div>
      <div class="item"><b class="label">摄像头编号:</b><span>{{doorway.cameraCode}}</span></div>
      <div class="item"><b class="label">摄像头编号:</b><span>{{doorway.cameraCode}}</span></div>
    </div>
    <div class="table" >
      <data-table id="out-table"
                  :confignation="config"
                  @addObjHandler="addObjHandler"
                  ref="datatable">
      </data-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import DataTable from '@/components/ui/cub/DataTable2'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {
      ElButton,
      DataTable},
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
        config: {
          j:2,
          v:1,
          f:1,
          draw: 1,
          showAdd: 0,
          showDel: 0,
          showCheckBack: 0,
          serverurl: that.Constants().PARKING_EXIT,
          title: "出入明细",
          key: "id",
          pagenation: {
            page: 1,
            rows: 10,
            num: 0,
          },
          columns: [
            {
              sortable: false,
              sort: "asc",
              prop: "car_number",
              name: "车牌号",
              width: "120px",
              render: function (data) {
                console.log(data);
                return "<B>" + data + "</B>"
              },
              filter: {
                type: "input",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "approach_time",
              name: "进场时间",
              width: "160px",
              render: function (data) {
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "approach_picture",
              name: "进场图片",
              width: "120px",
              render: function (data) {
                return "<img src='" + data + "' width='120px'/>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "approach_alleyway",
              name: "入场通道",
              width: "160px",
              render: function (data) {
                return "<span>" + data + "</span>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "exit_picture",
              name: "出场图片",
              width: '120px',
              render: function (data) {
                return "<img src='" + data + "' width='120px'/>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "exit_time",
              name: "出场时间",
              width: '160px',
              render: function (data) {
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "exit_alleyway",
              name: "出场通道",
              width: '80px',
              render: function (data) {
                return "<span>" + data + "</span>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "cope_with",
              name: "应付金额",
              width: '80px',
              render: function (data) {
                return "<span>" + data + "</span>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "real_income",
              name: "实收金额",
              width: '80px',
              render: function (data) {
                return "<span>" + data + "</span>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "vehicle_type",
              name: "车辆类型",
              width: '160px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>临时车</label>"
                }
                if (data == 2) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>月租车</label>"
                }
                if (data == 3) {
                  return "<label style='color: #e64242;padding:2px 10px;display: inline-block;'>免费车</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "临时车"
                  },
                  {
                    value: 2,
                    text: "月租车"
                  },
                  {
                    value: 3,
                    text: "免费车"
                  }
                ]
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "payment",
              name: "支付方式",
              width: '160px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>支付宝</label>"
                }
                if (data == 2) {
                  return "<label style='color: #1AC45D;padding:2px 16px;display: inline-block;'>微信</label>"
                }
                if (data == 3) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>现金</label>"
                }
                if (data == 4) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>一卡通</label>"
                }
                if (data == 5) {
                  return "<label style='color: #e64242;padding:2px 10px;display: inline-block;'>免费</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "支付宝"
                  },
                  {
                    value: 2,
                    text: "微信"
                  },
                  {
                    value: 3,
                    text: "现金"
                  },
                  {
                    value: 4,
                    text: "一卡通"
                  },
                  {
                    value: 5,
                    text: "免费"
                  }
                ]
              },
            },
          ],
          actions: [
            {
              name: "详情",
              show() {
                return true;
              },
              btnClass: "btn-main",
              handler: function (id) {
                that.$message.info("打开详情页面");
              }
            },
          ],
          dataset: [],
        }
      }
    },
    methods: {
      addObjHandler() {
        console.log("触发添加事件");
      },
      delObjHandler() {
        console.log("触发删除事件");
      }
    }
  }
</script>
<style>
  .gate {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding:20px;
    border-bottom:4px dashed #5e7382;
    margin-left: -1px;
  }
  .row{
   flex:1;
    display:flex;
    flex-flow:row wrap;
    justify-content: flex-start;
  }
  .img {
     flex:2;
     display:flex;
   }
   .img .item{
     flex:1;
   }
  .row .item{

    display:flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 50%;
    margin-top: 2%;
  }
  .item .label,.item span{
    flex: 1;
    text-align: left;
  }
  .table {
    flex: 4;
    display:block;
    margin-top: 2%;
    align-content: start;
    justify-content: left;
  }

</style>
