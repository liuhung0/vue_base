<template>
  <div style="padding: 20px;">
    <div id="show" style="color: red;font-size: 20px;font-weight:bold;">

    </div>
    <P></P>
    <div>

    </div>
    <data-table id="out-table"
                :confignation="config"
                @addObjHandler="addObjHandler"
                ref="datatable">
    </data-table>
  </div>
</template>
<script>
  import DataTable from '@/components/ui/cub/DataTable2'
  export default {
    components: {
      DataTable},
    data() {
      let that = this;
      return {
        reqData: {
        //  pId:80
        },
        config: {
          draw: 1,
          showAdd: 1,
          he:1,
          serverurl:that.Constants().ORDER_LIST,
          title: "订单明细",
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
              prop: "carNumber",
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
              prop: "fromTime",
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
              sort: "desc",
              prop: "toTime",
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
              prop: "payPrice",
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
              prop: "payType",
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
            {
              sortable: false,
              sort: "desc",
              prop: "sluice_state",
              name: "开闸方式",
              width: '160px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #e64242;padding:2px 10px;display: inline-block;'>免费开闸</label>"
                }
                if (data == 2) {
                  return "<label style='color: #FFEC8B;padding:2px 16px;display: inline-block;'>收费开闸</label>"
                }
                if (data == 3) {
                  return "<label style='color: #1AC45D;padding:2px 16px;display: inline-block;'>正常开闸</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "免费开闸"
                  },
                  {
                    value: 2,
                    text: "收费开闸"
                  },
                  {
                    value: 3,
                    text: "正常开闸"
                  }
                ]
              },
            },
          ],
          dataset: [],
        }

      }
    },
    methods: {

      //获取当期时间并显示
      getCurrtentTime :function () {
        setInterval(function() {
          // 程序计时的月从0开始取值后+1
          var show = document.getElementById("show");
          var time = new Date();
          var year =  time.getFullYear();
          var m = time.getMonth() + 1;
          var d = time.getDate();
          var h = time.getHours();
          var min =  time.getMinutes();
          var s = time.getSeconds();
          var currentTime;
          if(s<10){
            currentTime = year+"-"+m+"-"+d+" "+h+":"+min+":0"+s;
          } else{
            currentTime = year+"-"+m+"-"+d+" "+h+":"+min+":"+s;
          }
          show.innerHTML = currentTime;
        }, 1000 );
      },
      addObjHandler(){
        let that = this;

        console.log(that.reqData);
        this.$http.get(that.Constants().EXCEL,that.reqData,{emulateJSON: true}).then(function (res) {
          console.log(res.data);
          if (res.data.result) {

            that.$message.info("下载文件成功！请去桌面查看！");
          } else {
            that.$message.error("下载文件失败！"+res.date.message);
          }
        }).catch(function () {
          that.$message.error("网络发生异常");
        })
      }
    }
  }
</script>
<style>

</style>


