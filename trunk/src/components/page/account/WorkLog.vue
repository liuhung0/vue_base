<template >
    <div class="main">
      <h2>考勤记录</h2>
      <button @click="daka()"  @addOK="addOK">{{status == 2 || status == 3? "下班打卡" : "上班打卡"}}</button>
      <div class="guanli">
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
                    value: !(2 || 3),
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
        form:{
          suId:sessionStorage.getItem("LOGIN_PARKING_UID"),
        }

      }
    },
    mounted(){
      let that = this;
      that.$http.post(that.Constants().REST_ROLE_SU_ID, that.form,{emulateJSON: true}).then(function (res) {
        if(res.data.result){
          that.status = res.data.data.status;
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
      addOK: function () {
        let that =this;
        that.loadData();
      },
      loadD(){
        this.$refs.datatable.loadData();
      },
      daka(){
        let that = this;
        that.$http.post(that.Constants().REST_USER_CLOCKONANDOFF, that.form,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.$message.success(res.data.data);
            that.loadD();
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
    display:block;
  }
  .guanli{
    padding: 30px;
  }
  .main h2{
    color: #fff;
    line-height: 58px;
    font-weight: 300;
    font-size: 18px;
    text-align: left;
    padding-left: 20px;
    background: #1D242E;
    box-shadow: 0 2px 6px 0 rgba(46,46,46,0.50);
    -webkit-margin-before: 0em;
  }
</style>
