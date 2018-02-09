<template>
  <div class="main">
    <h2>财务收入统计表</h2>
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
  import DataTable from '@/components/ui/cub/DataTable3'
  export default {
    components: {
      DataTable},
    data() {
      let that = this;
      return {
        config: {
          draw: 1,
          hi:1,
          j:1,
          showAdd: 1,
          fanhui:2,
          serverurl:that.Constants().FINANCE_LIST,
          title: "业主管理/财务收入统计表",
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
              prop: "charge_standard",
              name: "车类型",
              width: "160px",
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>临时车</label>"
                }
                if (data == 2) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>月租车</label>"
                }
                if (data == 3) {
                  return "<label style='color: #1AC45D;padding:2px 10px;display: inline-block;'>免费车</label>"
                }
                else
                  return "-";
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
                  },
                ]
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "total_time",
              name: "停车时长",
              width: "160px",
              render: function (data) {
                if(data)
                return "<B>" + data + "</B>"
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
              prop: "cope_with",
              name: "应付金额",
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
              prop: "real_income",
              name: "实收金额",
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
                else
                  return "-";
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

      addObjHandler:function (evt) {

        var wb =XLSX.utils.table_to_book(document.getElementById('out-table'));

        var wbout =XLSX.write(wb,{bookType:'xlsx',type:'binary'});

        saveAs(new Blob([this.s2ab(wbout)],{type: 'application/octet-stream'}), "sheetjs.xlsx");

      },
      s2ab:function (s) {
        if(typeof ArrayBuffer !== 'undefined'){
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for(var i=0; i!=s.length;++i) view[i] =s.charCodeAt(i) & 0xFF;
          return buf;
        }else{
          var buf = new Array(s.length);
          for(var i=0; i!=s.length;++i) view[i] =s.charCodeAt(i) & 0xFF;
          return buf;
        }
      },
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
