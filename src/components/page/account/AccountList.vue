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
          title: "账户管理",
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
              width: "180px",
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
              width: "180px",
              filter: {
                type: "input",
              }
            },
            {
              sortable: false,
              sort: "asc",
              prop: "identity_card",
              name: "身份证号",
              width: "260px",
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
              prop: "phone",
              name: "手机号",
              width: "180px",
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
              prop: "role",
              name: "角色",
              width: "180px",
              render: function (data) {
                if (data == 1) {
                  return "<label>岗亭操作员</label>"
                }
                else if (data == 2) {
                  return "<label>停车场巡检员</label>"
                }
                else if (data == 3){
                  return "<label>PDA</label>"
                }
                else if (data == 4){
                  return "<label>财务</label>"
                }

              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "岗亭操作员"
                  },
                  {
                    value: 2,
                    text: "停车场巡检员"
                  },
                  {
                    value: 3,
                    text: "PDA"
                  }
                  ,
                  {
                    value: 4,
                    text: "财务"
                  }
                ]
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "status",
              name: "状态",
              width: "160px",
              render: function (data) {
                if (data == 1) {
                  return "<label>启用</label>"
                }
                else if (data == 2) {
                  return "<label>停用</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "启用"
                  },
                  {
                    value: 2,
                    text: "停用"
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
