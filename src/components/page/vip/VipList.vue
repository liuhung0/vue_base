<!--韩彩霞-->
<template>
  <div class="main">
    <h2>租户管理</h2>
    <div class="guanli">
      <data-table
        :confignation="dataTableConfig"
        @addObjHandler="addObjHandler"
        @delObjHandler="delObjHandler"
        ref="datatable">
      </data-table>
    </div>
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
          serverurl:that.Constants().VIP_LIST,
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
              prop: "nick",
              name: "用户姓名",
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
              prop: "carNumber",
              name: "车牌号",
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
              prop: "phone",
              name: "联系电话",
              width: "160px",
              render: function (data) {
                return "<span>" + data + "</span>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "reserve",
              name: "车位类型",
              width: "160px",
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>自助车位</label>"
                }
                if (data == 2) {
                  return "<label style='color: #40A6FF;padding:2px 6px;display: inline-block;'>预定车位</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "自助车位"
                  },
                  {
                    value: 2,
                    text: "预定车位"
                  }
                ]
              },
            },
            {
              sortable: false,
              sort: "asc",
              prop: "type",
              name: "会员类型",
              width: '120px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #EEEE00;padding:2px 6px;display: inline-block;'>月卡用户</label>"
                }
                if (data == 2) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>季卡用户</label>"
                }
                if (data == 3) {
                  return "<label style='color: #40A6FF;padding:2px 6px;display: inline-block;'>年卡用户</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "月卡用户"
                  },
                  {
                    value: 2,
                    text: "季卡用户"
                  },
                  {
                    value: 3,
                    text: "年卡用户"
                  }
                ]
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "startTime",
              name: "付费时间",
              width: '160px',
              render: function (data) {
                return new Date(data * 1000).Format("yyyy-MM-dd hh:mm:ss");
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "endTime",
              name: "到期时间",
              width: '160px',
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
              prop: "status",
              name: "状态",
              width: '100px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>正常</label>"
                }
                if (data == 2) {
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>已过期</label>"
                }
                if (data == 3) {
                  return "<label style='color: #40A6FF;padding:2px 6px;display: inline-block;'>已冻结</label>"
                }
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 1,
                    text: "正常"
                  },
                  {
                    value: 2,
                    text: "已过期"
                  },
                  {
                    value: 3,
                    text: "已冻结"
                  }
                ]
              },
            }
          ],
          actions: [
          ],
          dataset: [],
        }
      }
    },
    methods: {
      addObjHandler(){
        this.$router.push("/page/vip/VipAdd");
      },
      delObjHandler(id){
        let that = this;
        that.$swal({
          title:"你确定要删除选中的数据么?",
          text:"删除后将无法再找回,相关的所有数据都将被删除.",
          type:"warning",
          showCancelButton: true,
          confirmButtonColor: "#dd8b1f",
          confirmButtonText: "确定删除",
          cancelButtionText:"算来,再考虑下",
          closeOnConfirm: true,
          allowOutsideClick: true,
        }).then(function(){
          that.$http.post(that.Constants().VIP_ID_DEL,{id:id},{emulateJSON: true}).then(function(res){
            if(res.data.result){
              that.$message.info("删除成功","您选择的数据已经成功删除!");
              this.$refs.datatable.loadData();
            }
            else{
              that.$message.error("删除失败"+res.data.message);
            }
          },function(){
            that.$message.error("删除失败"+res.data.message);
          });
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

