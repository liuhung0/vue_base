<!--韩彩霞-->
<template>
  <div class="main">
    <h2>管理费列表</h2>
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
                return data;
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
                return data;
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
                return data;
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
                return data;
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
                return data;
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
                return data;
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
                return data;
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
