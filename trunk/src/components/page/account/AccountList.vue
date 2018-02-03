<template>
  <div class="main">
    <h2>账号管理</h2>
    <div class="guanli">
      <data-table
        :confignation="dataTableConfig"
        @addObjHandler="addObjHandler"
        @delObjHandler="delObjHandler"
        ref="datatable">
      </data-table>
    </div>
    <Layer ref="addLayer"></Layer>
  </div>
</template>

<script>
  import DataTable from "../../ui/cub/DataTable";
  import Layer from "../../ui/cub/Layer";
  import SubAccountInfo from "@/components/page/account/SubAccountInfo"
  export default {
    components: {DataTable,Layer},
    name: "rule",
    data(){
      let that =this;
      return {
        dataTableConfig: {
          draw: 1,
          showAdd: 1,
          showDel: 1,
          showCheckBack: 1,
          serverurl: that.Constants().REST_SUB_USER_LIST,
          title: "账号管理",
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
              name: "编号",
              width: "160px",
              render: function (data) {
                if(data){
                  return "<B>" + data + "</B>"
                }
              },
              filter: {
                type: "input",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "username",
              name: "用户名",
              width: "160px",
              render: function (data) {
                if(data){
                  return "<B>" + data + "</B>"
                }
              },
              filter: {
                type: "input",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "identityCard",
              name: "身份证号",
              render: function (data) {
                if(data)
                  return data.length>36?"<a title="+data+">"+ data.subString(0,36)+"...</a>":data;
                else
                  return " -- ";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "phone",
              name: "手机号",
              width: "160px",
              render: function (data) {
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "birthday",
              name: "出生日期",
              width: "160px",
              render: function (data) {
                if(data){
                  return "<B>" + data + "</B>"
                }
              },
              filter: {
                type: "none",
              },
              filterData: ""
            },
            {
              sortable: false,
              sort: "asc",
              prop: "status",
              name: "状态",
              width: '100px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>已启用</label>"
                }
                if(data == 2){
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>禁用</label>"
                }
                  return " -- "
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "已启用"
                  },
                  {
                    value: 2,
                    text: "禁用"
                  },
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
                that.infoObjHandler(id);
              }
            },
          ],
          dataset: [],
        }
      }
    },
    methods:{
      addObjHandler:function(){
        let that = this;
        let dialog = that.$refs.addLayer;
        let vDialog = dialog.open({
          template: '<div><SubAccountInfo @addOK="addOK" ></SubAccountInfo></div>',
          components: {
            SubAccountInfo
          },
          width:720,
          methods: {
            addOK: function () {
              dialog.comps.splice(0, 1)
              if (dialog.comps.length === 0 && dialog.$refs.back.show) {
                dialog.$refs.back.close()
              }
              that.loadData();
            }
          },
        }).then(function (arg) {
          arg.close()
        })
      },
      loadData(){
        this.$refs.datatable.loadData();
      },
      delObjHandler:function(ids){
        let that = this;
        that.$confirm('此操作将永久删除选择信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(ids);
          that.delete(ids);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      infoObjHandler:function(id){
        let that = this;
        let dialog = that.$refs.addLayer;
        let vDialog = dialog.open({
          template: '<div><SubAccountInfo @addOK="addOK" id="'+id+'" ></SubAccountInfo></div>',
          components: {
            SubAccountInfo
          },
          width:720,
          methods: {
            addOK: function () {
              dialog.comps.splice(0, 1)
              if (dialog.comps.length === 0 && dialog.$refs.back.show) {
                dialog.$refs.back.close()
              }
              that.loadData();
            }
          },
        }).then(function (arg) {
          arg.close()
        })
      },
      delete(ids){
        let that = this;
        that.$http.post(that.Constants().REST_SUB_USER_DELETE_INFO,{id:ids.toString()},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.$message.success("删除成功");
            that.loadData();
          }
          else{
            that.$message.error(res.data.messsage);
          }
        },function(){
          that.$message.error("网络连接错误");
        })
      }
    }
  }
</script>
<style scoped>
  .main{
    display:block;
  }
  .guanli{
    padding: 30px;
  }
  .main h2{
    color: #fff;
    line-height: 58px;
    font-weight: 300;
    text-align: left;
    padding-left: 20px;
    background: #1D242E;
    box-shadow: 0 2px 6px 0 rgba(46,46,46,0.50);
    -webkit-margin-before: 0em;
  }
</style>
