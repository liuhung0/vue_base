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
          draw: 1,
          showAdd: 0,
          showDel: 0,
          showCheckBack: 0,
          serverurl: that.Constants().REST_WORKLOG_LIST,
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
              prop: "number",
              name: "工号",
              width: "80px",
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
              prop: "name",
              name: "姓名",
              width: "160px",
              filter: {
                type: "input",
              }
            },
            {
              sortable: false,
              sort: "asc",
              prop: "start_time",
              name: "上班时间",
              width: "160px",
              render: function (data) {
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
                ;
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "end_time",
              name: "下班时间",
              width: "160px",
              render: function (data) {
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
                ;
              },
              filter: {
                type: "none",
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
