<template>
  <div class="main">
    <h2>出入明细</h2>
    <div class="guanli">
      <data-table id="out-table"
                  :confignation="config"
                  @addObjHandler="addObjHandler"
                  ref="datatable">
      </data-table>
    </div>
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
        config: {
          draw: 1,
          j:2,
          A:1,
          showAdd: 1,
          serverurl:that.Constants().PARKING_EXIT,
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
                if(data)
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
                else
                  return "-";
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
                if(data)
                return "<img src='" + data + "' width='120px'/>";
                else
                  return "-";
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
                if(data)
                return "<span>" + data + "</span>";
                else
                  return "-";
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
                if(data)
                return "<img src='" + data + "' width='120px'/>";
                else
                  return "-";
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
                if(data)
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
                else
                  return "-";
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
                if(data)
                return "<span>" + data + "</span>";
                else
                  return "-";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "ParkingTime",
              name: "停车时长",
              width: '80px',
              render: function (data) {
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return "-";
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
                  return "<label style='color: #FF3030;padding:2px 10px;display: inline-block;'>月卡用户</label>"
                }
                if (data == 2) {
                  return "<label style='color: #FFC125;padding:2px 10px;display: inline-block;'>季卡用户</label>"
                }
                if (data == 3) {
                  return "<label style='color: #FFF68F;padding:2px 10px;display: inline-block;'>年卡用户</label>"
                }
                if (data == 4) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>管理费</label>"
                }
                if (data == 5) {
                  return "<label style='color: #98F5FF;padding:2px 10px;display: inline-block;'>临时</label>"
                }
                if (data == 6) {
                  return "<label style='color: #87CEFF;padding:2px 10px;display: inline-block;'>免费</label>"
                }
                else
                  return "-";
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "月卡用户"
                  },
                  {
                    value: 2,
                    text: "季卡用户"
                  },
                  {
                    value: 3,
                    text: "年卡用户"
                  },
                  {
                    value: 4,
                    text: "管理费"
                  },
                  {
                    value: 5,
                    text: "临时"
                  },
                  {
                    value: 6,
                    text: "免费"
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
                  return "<label style='color: #FF3030;padding:2px 10px;display: inline-block;'>微信</label>"
                }
                if (data == 2) {
                  return "<label style='color: #FFC125;padding:2px 16px;display: inline-block;'>支付宝</label>"
                }
                if (data == 3) {
                  return "<label style='color: #FFF68F;padding:2px 10px;display: inline-block;'>万支付</label>"
                }
                if (data == 4) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>现金</label>"
                }
                if (data == 5) {
                  return "<label style='color: #98F5FF;padding:2px 10px;display: inline-block;'>余额</label>"
                }
                if (data == 6) {
                  return "<label style='color: #87CEFF;padding:2px 10px;display: inline-block;'>其他</label>"
                }
                if (data == 7) {
                  return "<label style='color: #8968CD;padding:2px 10px;display: inline-block;'>小程序</label>"
                }
                else
                  return "-";
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "微信"
                  },
                  {
                    value: 2,
                    text: "支付宝"
                  },
                  {
                    value: 3,
                    text: "万支付"
                  },
                  {
                    value: 4,
                    text: "现金"
                  },
                  {
                    value: 5,
                    text: "余额"
                  },
                  {
                    value: 6,
                    text: "其他"
                  },
                  {
                    value: 7,
                    text: "小程序"
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
<style scoped>
  .main{
    display:block;
  }
  .guanli{
    padding: 30px;
  }
  .main h2{
    font-size: 18px;
    color: #fff;
    line-height: 58px;
    font-weight: 300;
    text-align: left;
    padding-left: 20px;
    background: #1D242E;
    box-shadow: 0 2px 6px 0 rgba(46,46,46,0.50);
    -webkit-margin-before: 0em;
  }
</style>


