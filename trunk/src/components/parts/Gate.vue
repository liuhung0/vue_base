<template>
    <div class="gate">

      <div><b>出入口:</b>{{doorway.name}}</div>
      <div><b>门闸编号</b>{{doorway.doorCode}}</div>
      <div><b>摄像头编号</b>{{doorway.cameraCode}}</div>
      <div><b>摄像头编号</b>{{doorway.cameraCode}}</div>
      <div>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516619827841&di=9420eae12f3b5cdc288563b04da354cc&imgtype=0&src=http%3A%2F%2Fphoto.iautos.cn%2Fcarupload%2Fphoto%2F2015%2F0501%2F15%2F20150501151705920907.jpg">
      </div>
      <div><b>出入口:</b>{{doorway.name}}</div>
      <div><b>门闸编号</b>{{doorway.doorCode}}</div>
      <div><b>摄像头编号</b>{{doorway.cameraCode}}</div>
      <div><b>摄像头编号</b>{{doorway.cameraCode}}</div>
      <div>
        <data-table
          :confignation="config"
          @addObjHandler="addObjHandler"
          @delObjHandler="delObjHandler"
          ref="datatable">
        </data-table>
      </div>



    </div>
</template>
<script type="text/ecmascript-6">
    import DataTable from "../ui/cub/DataTable";
    export default {
      components: {DataTable},
      props: [],
      data(){
        let that = this;
        return{
          doorway:{
            id:1,
            name:"西入口",
            doorCode:"Ko1103",
            cameraCode:"camera1103",
            pid:67
          },
          last:{
            doorid:1,
            car_number:"甘A-33992",
            money:12.32,
            type:(Math.random()*1000)/2%2==0?1:2
          },
          dataTableConfig:{
            draw: 1,
            showAdd: 0,
            showDel: 0,
            showCheckBack: 0,
            serverurl:that.Constants().REST_GATE_LOG_LIST,
            title: "出入记录",
            key: "id",
            pagenation: {
              page: 1,
              rows: 10,
              num: 0,
            },
            columns: [
              {
                sortable: false,
                sort: "desc",
                prop: "id",
                name: "dateline",
                width: "160px",
                render: function (data) {
                  return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");;
                },
                filter: {
                  type: "none",
                },
              },
              {
                sortable: false,
                sort: "asc",
                prop: "car_number",
                name: "车牌号",
                width: "80px",
                render: function (data) {
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
                prop: "type",
                name: "停泊类型",
                width: "160px",
                render: function (data) {
                  if(data==1){
                    return "<label>免费</label>"
                  }
                  else if(data==2){
                    return "<label>VIP</label>"
                  }
                  else
                  {
                    return "<label>临停</label>"
                  }
                },
                filter: {
                  type: "select",
                  data: [
                    {
                      value: 1,
                      text: "免费"
                    },
                    {
                      value: 2,
                      text: "VIP"
                    },
                    {
                      value:3,
                      text:"临停"
                    }
                  ]
                },
              },
              {
                sortable: false,
                sort: "asc",
                prop: "address",
                name: "值班人员",
                width: "160px",
                render: function (data) {
                  return "<span>" + data + "</span>";
                },
                filter: {
                  type: "none",
                },
              },
            ],
            actions: [
              {
                name: "详情",
                show(){
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
      method:{
        addObjHandler(){
          console.log("触发添加事件");
        },
        delObjHandler(){
          console.log("触发删除事件");
        }
      }
    }
</script>
