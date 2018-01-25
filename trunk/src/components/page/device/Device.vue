<template>
  <div class="box">
    <h1>设备管理</h1>
    <div class="types">
      <div  :key="index" class="type" v-for="(t,index) in typeList">
        <div class="number">{{t.count}}</div>
        <img :src="t.icon" class="img"/>
        <div class="name">{{t.name}}</div>
      </div>
    </div>
    <div class="datatable">
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
    components: {DataTable},
    props: [],
    data() {
      let that =this;
      return {
        typeList: [
          {
            id: 1,
            name: "摄像头",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516807771484&di=d1ba57a19f71aa807badd65f241cf807&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01119a590ad87ba801214550c14cef.jpg%40900w_1l_2o_100sh.jpg",
            count: 4
          },
          {
            id: 1,
            name: "门闸",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516807771484&di=d1ba57a19f71aa807badd65f241cf807&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01119a590ad87ba801214550c14cef.jpg%40900w_1l_2o_100sh.jpg",
            count: 4
          },
          {
            id: 1,
            name: "超声波",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516807771484&di=d1ba57a19f71aa807badd65f241cf807&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01119a590ad87ba801214550c14cef.jpg%40900w_1l_2o_100sh.jpg",
            count: 4
          },
          {
            id: 1,
            name: "地锁",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516807771484&di=d1ba57a19f71aa807badd65f241cf807&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01119a590ad87ba801214550c14cef.jpg%40900w_1l_2o_100sh.jpg",
            count: 4
          }
        ],
        dataTableConfig: {
          draw: 1,
          showAdd: 0,
          showDel: 0,
          showCheckBack: 0,
          serverurl: that.Constants().REST_WORKLOG_LIST,
          title: "设备管理",
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
              prop: "role",
              name: "角色",
              width: "160px",
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
 .box{
   display:flex;
   flex:0 0 100%;
   flex-flow: row wrap;
 }
  .box h1{
    flex: 0 0 100%;
  }
  .box .types{
    display: flex;
    flex:0 0 100%;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .box .types .type{
    flex:0 0 20%;
    display:block;
    position: relative;
    border:1px solid #48ace6;
    padding:4px;
    margin:4px;
    border-radius: 20px;
    background:#5e7382;
  }
  .box .types .type .number{
    position: absolute;
    right:10px;
    background:#ff00ff;
    padding:4px 10px;
    border-radius: 50%;
    color:#fff;

  }
 .box .types .type .img{
    width:120px;
 }

</style>
