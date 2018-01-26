<template>
  <div class="on">
    <div class="main">
      <data-table
        :confignation="dataTableConfig"
        ref="datatable">
      </data-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import DataTable from "../../ui/cub/DataTable";

  export default {
    props: [],
    components: {
      DataTable,
    },
    data() {
      let that=this;
      return {
        dataTableConfig: {
          draw: 1,
          showAdd: 0,
          showDel: 0,
          showCheckBack: 0,
          serverurl: that.Constants().REST_GATE_LOG_LIST,
          title: "财务收入统计表",
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
              width: "180px",
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
              width: "200px",
              render: function (data) {
                return "<B>" + data + "</B>"
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
              width: "200px",
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
              width: '200px',
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
              prop: "payment",
              name: "支付方式",
              width: '180px',
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
    methods: {}
  }
</script>
<style>
  .on {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    overflow: auto;
    min-height: 100vh;
  }

  .main {
    display: flex;
    flex-flow: row nowrap;
    align-content: flex-start;
  }

  main:nth-child(0) {
    border-left: 0px;
  }
</style>
