<!--韩彩霞-->
<template>
  <div style="padding: 20px;">
    <data-table
      :confignation="dataTableConfig"
      @addObjHandler="addObjHandler"
      @delObjHandler="delObjHandler"
      ref="datatable">
    </data-table>
  </div>
</template>
<script>
  import DataTable from '@/components/ui/cub/DataTable'
  export default {
    components: {
      DataTable},
    data() {
      let that = this;
      return {
        dataTableConfig: {
          serverurl:that.Constants().VIP_MANAGE,
          title: "租户管理",
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
              prop: "villageName",
              name: "小区名称",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "region",
              name: "所属区域",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "tower",
              name: "楼号(栋)",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "element",
              name: "单元",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "roomNum",
              name: "房间号",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "carNumber",
              name: "车牌号",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "seatNumber",
              name: "车位号",
              width: "80px",
              render: function (data) {

              },
              filter: {
                type: "none",
              },
              filterData: ""
            }
          ],
            actions: [

               ],
          dataset: [],
        }
      }
    },
    methods: {

    }
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
