<template>
  <div class="main">
    <h2>账号管理</h2>
    <data-table
      :confignation="dataTableConfig"
      @addObjHandler="addObjHandler"
      @delObjHandler="delObjHandler"
      ref="datatable">
    </data-table>
    <Layer ref="addLayer"></Layer>
  </div>
</template>

<script>
  import DataTable from "../../ui/cub/DataTable";
  import Layer from "../../ui/cub/Layer";
  import Add from "@/components/page/specialvehicle/Add"
  import Update from "@/components/page/specialvehicle/Update"
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
          serverurl: that.Constants().SPECIAlVEHICLE_LIST,
          title: "黑白名单",
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
              prop: "name",
              name: "姓名",
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
              prop: "carNumber",
              name: "车牌号",
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
              prop: "type",
              name: "类型",
              width: '100px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>白名单</label>"
                }
                if(data == 2){
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>黑名单</label>"
                }
                return " -- "
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "白名单"
                  },
                  {
                    value: 2,
                    text: "黑名单"
                  },
                ]
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "remark",
              name: "备注",
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
          ],
          actions: [
            {
              name: "编辑",
              show(){
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
          template: '<div><Add @addOK="addOK" ></Add></div>',
          components: {
            Add
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
      delObjHandler:function(id){
        let that = this;
        that.$confirm('此操作将永久删除选择信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(id);
          that.delete(id);
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
          template: '<div><Update @addOK="addOK" id="'+id+'" ></Update></div>',
          components: {
            Update
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
      delete(id){
        let that = this;
        that.$http.post(that.Constants().SPECIAlVEHICLE_DELETE,{id:id.toString()},{emulateJSON: true}).then(function(res){
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
    padding:30px;
    display:block;
  }
  .main h2{
    color: #fff;
    font-weight: 300;
    text-align: left;
    padding-left: 20px;
    border-left: 4px solid #49a9ff
  }
</style>
