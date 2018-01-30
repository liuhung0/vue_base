<template>
  <div class="on">
    <div class="main" style="margin-left: 20%;margin-top: 50px">
      <data-table
        :confignation="dataTableConfig"
        ref="datatable">
      </data-table>
    </div>
  </div>
</template>

<script>
  import DataTable from "../../ui/cub/DataTable";
  export default {
    components: {
      DataTable},
    props: [],
    data() {
      let that = this;
      return {
        dataTableConfig: {
          hi:1,
          serverurl: that.Constants().REST_USER_QUERYWORK_LIST,
          title: "考勤记录",
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
              prop: "suId",
              name: "打卡账户",
              width: "160px",
              render: function (data) {
                return "<B>" + data + "</B>"
              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "startTime",
              name: "上班打卡时间",
              width: "200px",
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
              prop: "endTime",
              name: "下班打卡时间",
              width: "200px",
              render: function (data) {
                if(data == null){
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>还未打卡</label>"
                }
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "status",
              name: "打卡状态",
              width: '100px',
              render: function (data) {
                if (data == 2 || data == 3) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>正常</label>"
                }
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>不正常</label>"
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 2 || 3,
                    text: "正常"
                  },
                  {
                    value: !2 || !3,
                    text: "不正常"
                  },
                ]
              },
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
