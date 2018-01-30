<template>
    <div class="main">
      <h2>考勤记录</h2>

      <data-table
        :confignation="dataTableConfig"
        ref="datatable">
      </data-table>
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
          actions:[],
          dataset: [],
        }

      }
    },
    methods: {}
  }
</script>
<style scoped>
  .main{
    padding:30px;
    display:block;
  }
  .main h2{
    font-size:24px;
    font-weight: 400;
    text-align: left;
    color: #666666;
    padding-bottom:60px;
    border-bottom: 1px dashed #666666;
  }
</style>
