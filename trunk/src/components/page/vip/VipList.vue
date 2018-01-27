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
          draw: 1,
          showAdd: 1,
          showDel: 1,
          showCheckBack: 1,
          serverurl:that.Constants().VIP_LIST,
          title: "Vip管理",
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
              prop: "carNumber",
              name: "车牌号",
              width: "80px",
              render: function (data) {
                return "<B>" + data + "</B>"
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
                return "<span>" + data + "</span>";
              },
              filter: {
                type: "none",
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "siteNumber",
              name: "车位号",
              width: '80px',
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
              prop: "type",
              name: "会员类型",
              width: '100px',
              render: function (data) {
                if (data == 1) {
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>月卡用户</label>"
                }
                if (data == 2) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>季卡用户</label>"
                }
                if (data == 3) {
                  return "<label style='color: #40A6FF;padding:2px 6px;display: inline-block;'>年卡用户</label>"
                }
                if (data == 4) {
                  return "<label style='color: #40A6FF;padding:2px 6px;display: inline-block;'>管理费</label>"
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
                  },
                  {
                    value: 4,
                    text: "管理费"
                  }
                ]
              },
            },
            {
              sortable: false,
              sort: "desc",
              prop: "startTime",
              name: "会员开始时间",
              width: '80px',
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
              name: "会员结束时间",
              width: '80px',
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
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>正常</label>"
                }
                if (data == 2) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>已过期</label>"
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
            {
              name: "编辑",
              show(){
                return true;
              },
              btnClass: "btn-main",
              handler: function (id) {
                that.$router.push('/console/parkingUp/' + id)
              }
            },
            {
              name: "申请审核",

              show: function (data) {
                //没有通过的且没有上线的还能编辑

                return data.verify == 3;
              },
              btnClass: "btn-main",

              handler: function (id) {
                that.agree(id);
              }
            },
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
          that.$http.post(that.Constants().PARKING_DEL,{id:id},{emulateJSON: true}).then(function(res){
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
      agree(id) {
        let that = this;
        that.$swal({
          title: "是否申请审核？",
          text: "通过审核的应用才可以上线正式运营",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#5f8bdd",
          confirmButtonText: "申请",
          cancelButtonText: "不申请",
          closeOnConfirm: true,
          allowOutsideClick: true,
        }).then(function () {
          that.$http.post(that.Constants().PARK_APPLY + id, {}, {emulateJSON: true}).then(function (res) {
            if (res.data.result) {
              that.$message.info("申请成功,等待审核结果");
              this.$refs.datatable.loadData();
            }
            else {
              that.$message.error("审核失败：" + res.data.message);
            }
          }, function () {
            that.$message.error("审核失败");
          })
        }).catch(function () {
          that.unagree(id);
        });
      }
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
