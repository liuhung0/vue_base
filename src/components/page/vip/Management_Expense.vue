<!--韩彩霞-->
<template>
  <div class="main">
    <h2>管理费</h2>
    <div class="guanli">
      <data-table
        :confignation="dataTableConfig"
        @addObjHandler="addObjHandler"
        @delObjHandler="delObjHandler"
        @expObjHandler="expObjHandler"
        ref="datatable">
      </data-table>
    </div>
    <Layer ref="addLayer"></Layer>
  </div>
</template>
<script>
  import DataTable from '@/components/ui/cub/DataTable'
  import Layer from "../../ui/cub/Layer";
  import ManagementAdd from "@/components/page/vip/ManagementAdd"
  export default {
    components: {
      DataTable,Layer},
    data() {
      let that = this;
      return {
        dataTableConfig: {
          draw: 1,
          showAdd: 1,
          showDel: 1,
          showCheckBack: 1,
          excel:1,
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
              prop: "region",
              name: "所属区域",
              width: "80px",
              render: function (data) {
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
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
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
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
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
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
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
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
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
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
                if(data)
                  return "<span>" + data + "</span>";
                else
                  return " - ";
              },
              filter: {
                type: "none",
              },
              filterData: ""
            }

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
    methods: {
      expObjHandler:function(){
        let that = this;
        window.open(
          that.Constants().VIP_EXP_LIST+"?pId="+sessionStorage.getItem("LOGIN_PARKING_PID")
        );

      },
      addObjHandler:function(){
        let that = this;
        let dialog = that.$refs.addLayer;
        let vDialog = dialog.open({
          template: '<div><ManagementAdd @addOK="addOK"></ManagementAdd></div>',
          components: {
            ManagementAdd
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
      loadData(){
        this.$refs.datatable.loadData();
      },
      delete(ids){
        let that = this;
        that.$http.post(that.Constants().VIP_ID_DEL,{id:ids.toString()},{emulateJSON: true}).then(function(res){
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
      },
      infoObjHandler:function(id){
        let that = this;
        let dialog = that.$refs.addLayer;
        let vDialog = dialog.open({
          template: '<div><ManagementAdd @addOK="addOK" id="'+id+'" ></ManagementAdd></div>',
          components: {
            ManagementAdd
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
      online(id) {
        let that = this;
        that.$swal({
          title: "你确定要冻结此Vip用户么?",
          text: "冻结后此用户的Vip特权将失效...",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd8b1f",
          confirmButtonText: "确定",
          cancelButtionText: "再考虑下",
          closeOnConfirm: true,
          allowOutsideClick: true,
        }).then(function () {
          that.$http.post(that.Constants().VIP_FREEZE+id,{}, {emulateJSON: true}).then(function (res) {
            if (res.data.result) {
              that.$message.info("此Vip已被冻结...请联系管理员");
              this.$refs.datatable.loadData();
            }
            else {
              that.$message.error("冻结失败：" + res.data.message);
            }
          }, function () {
            that.$message.error("冻结失败");
          });
        })
      },
      agree(id) {
        let that = this;
        that.$swal({
          title: "确定要解冻此用户的Vip权限吗？",
          text: "解冻后此用户的Vip权限变更为正常",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#5f8bdd",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnConfirm: true,
          allowOutsideClick: true,
        }).then(function () {
          that.$http.post(that.Constants().VIP_THAW + id, {}, {emulateJSON: true}).then(function (res) {
            if (res.data.result) {
              that.$message.info("解冻成功");
              this.$refs.datatable.loadData();
            }
            else {
              that.$message.error("解冻失败：" + res.data.message);
            }
          }, function () {
            that.$message.error("解冻失败");
          })
        }).catch(function () {
          that.unagree(id);
        });
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
    font-size: 18px;
    line-height: 58px;
    font-weight: 300;
    text-align: left;
    padding-left: 20px;
    background: #1D242E;
    box-shadow: 0 2px 6px 0 rgba(46,46,46,0.50);
    -webkit-margin-before: 0em;
  }
</style>

