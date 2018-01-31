<template>
    <div class="main">
      <h2>考勤记录</h2>
      <button @click="daka()">{{status == 2 || status == 3? "下班打卡" : "上班打卡"}}</button>
      <data-table
        :confignation="dataTableConfig"
        ref="datatable">
      </data-table>
    </div>
</template>

<script>
  import DataTable from "../../ui/cub/DataTable";
  export default {
    components: {
      DataTable},
    props: [],
    data() {
      let that = this;
      return {
        dataTableConfig: {
          hi:1,
          serverurl: that.Constants().REST_USER_QUERYWORK_LIST,
          title: "考勤记录",
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
              prop: "username",
              name: "账户",
              width: "160px",
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
              prop: "startTime",
              name: "上班打卡时间",
              width: "200px",
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
              prop: "endTime",
              name: "下班打卡时间",
              width: "200px",
              render: function (data) {
                if(data == null){
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>还未打卡</label>"
                }
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
              name: "打卡状态",
              width: '100px',
              render: function (data) {
                if (data == 2 || data == 3) {
                  return "<label style='color: #1AC45D;padding:2px 6px;display: inline-block;'>正常</label>"
                }
                  return "<label style='color: #ff5e46;padding:2px 6px;display: inline-block;'>不正常</label>"
              },
              filter: {
                type: "select",
                data: [
                  {
                    value: 2 || 3,
                    text: "正常"
                  },
                  {
                    value: !2 || !3,
                    text: "不正常"
                  },
                ]
              },
            },
          ],
          actions:[],
          dataset: [],
        },
        status:'',
        queryData:{
          suId:sessionStorage.getItem("LOGIN_PARKING_UID"),
          id:'',
        }

      }
    },
    mounted(){
      let that = this;
      that.$http.post(that.Constants().REST_USER_QUERYWORKINFO, that.queryData,{emulateJSON: true}).then(function (res) {
        if(res.data.result){
          that.status = res.data.data.status;
          that.queryData.id = res.data.data.id;
        }else {
          that.$message.error(that.res.data.message);
        }
      },function (res) {
        that.$message.error(res);
      });
      this.config=this.confignation;
      this.pagenation =this.confignation.pagenation;
      this.loadData();
    },
    methods: {
      daka(){
        let that = this;
        that.$http.post(that.Constants().REST_USER_CLOCKONANDOFF, that.queryData,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.$message.success(res.data.data);
            location.reload();
          }else {
            that.$message.error(that.res.data.message);
          }
        },function (res) {
          that.$message.error(res);
        });
      },
    }
  }
</script>
<style scoped>
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
