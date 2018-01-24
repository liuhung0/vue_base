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
      let that = this;
      return {
        dataTableConfig: {
          draw: 1,
          showAdd: 0,
          showDel: 0,
          showCheckBack: 0,
          serverurl: that.Constants().REST_GATE_LOG_LIST,
          title: "订单记录",
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
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
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
                if (data == 1) {
                  return "<label>免费</label>"
                }
                else if (data == 2) {
                  return "<label>VIP</label>"
                }
                else {
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
                    value: 3,
                    text: "临停"
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
