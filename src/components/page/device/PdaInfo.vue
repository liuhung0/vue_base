<template>
    <div class="box">
      <h1>PDA详情</h1>
      <div class="info">
        <div class="imgs">
          <div class="item imgs">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516798084548&di=0a24c867473e46684ca2a64da030d631&imgtype=0&src=http%3A%2F%2Fwww.sgsoft.cc%2Fuploads%2Fallimg%2F141216%2F1-141216121T1U2.jpg"/>
          </div>
        </div>
        <div class="labels">
          <div class="label">
            <Label>编号</Label>
            <span>{{pda.id}}</span>
          </div>
          <div class="label">
            <Label>型号</Label>
            <span>{{pda.code}}</span>
          </div>
          <div class="label">
            <Label>品牌</Label>
            <span>{{pda.brand}}</span>
          </div>
          <div class="label">
            <Label>CPU</Label>
            <span>{{pda.cpu}}</span>
          </div>
          <div class="label">
            <Label>RAM</Label>
            <span>{{pda.ram}}</span>
          </div>
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
      name: "pda-info",
      data(){
        let that = this;
        return {
          pda:{
            id:1,
            code:"ZE-1033",
            brand:"中兴",
            cpu:"high_234u",
            ram:"3GB",
          },
          dataTableConfig: {
            draw: 1,
            showAdd: 0,
            showDel: 0,
            showCheckBack: 0,
            serverurl: that.Constants().REST_WORKLOG_LIST,
            title: "绑定人员",
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
      }
    }
</script>
<style scoped>
 .box{
   flex: 0 0 100%;
   display: flex;
   flex-flow: row wrap;
   padding:10px;

 }
  .info{
    display:flex;
    flex:0 0 100%;
    flex-flow: row nowrap;
    align-items: flex-start;

  }
  .info .imgs{
    flex: 0 0 230px;
  }
  .info .imgs img {
    width:200px;
  }
  .info .labels{
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: row wrap;
    padding:10px;
  }
  .info .labels .label{
    flex: 0 0 100%;
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    padding:4px;
  }
 .info .labels .label label{
   padding:0 14px;
   flex: 0 0 120px;
   font-weight:600;
   align-items: flex-start;
   justify-content: flex-start;
 }
 .info .labels .label label:after{
   content:":";
 }
 .info .labels .label span{
   flex: 0 0 60%;
   display: flex;
   align-items: flex-start;
   justify-content: flex-start;
   border-bottom:1px dashed #ccc;
 }

  .datatable{

  }
</style>
