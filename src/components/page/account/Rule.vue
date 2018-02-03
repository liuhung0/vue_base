<template>
  <div class="main">
    <h2>角色管理</h2>
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
    import RuleInfo from "@/components/parts/RuleInfo"
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
            serverurl: that.Constants().REST_RULE_LIST,
            title: "角色管理",
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
                name: "名称",
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
                prop: "remark",
                name: "说明",
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
                prop: "dateline",
                name: "新增时间",
                width: "160px",
                render: function (data) {
                  if(data)
                    return "<span>" + new Date(data*1000).Format("yyyy-MM-dd hh:mm:ss") + "</span>";
                  else
                    return " - ";
                  },
                filter: {
                  type: "none",
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
            template: '<div><RuleInfo @addOK="addOK" ></RuleInfo></div>',
            components: {
              RuleInfo
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
            template: '<div><RuleInfo @addOK="addOK" ruleid="'+id+'" ></RuleInfo></div>',
            components: {
              RuleInfo
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
          that.$http.post(that.Constants().REST_RULE_DELETE,{id:ids.toString()},{emulateJSON: true}).then(function(res){
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
    font-size: 18px;
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
