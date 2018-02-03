<template>
  <el-row>
    <el-col :span="24">
      <el-menu   default-active="2"  class="el-menu-vertical-demo">
        <el-submenu  v-for="(MENU,index) in menuList" :index="index" :key="index">
          <template slot="title">
            <i :class="MENU.icon"></i>
            <span class="title">{{MENU.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(cmenu,i) in MENU.children" :key="i"  index="i"  >
              <router-link :to="cmenu.path">{{cmenu.title}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data(){

      return{
        menuList:[
          {
            title:"报表管理",
            icon:"el-icon-location",
            children:[
              {
                title:"出入明细",
                path:"/page/parts/Gates"
              },
              {
                title:"订单明细",
                path:"/main/statistics/orderlog"
              },
              {
                title:"财务收入统计表",
                path:"/main/statistics/settlelog"
              },
            ]
          },
          {
            title:"人员管理",
            icon:"el-icon-star-on",
            children:[
              {
                title:"账户管理",
                path:"/main/staff/account"
              },
              {
                title: "角色管理",
                path: "/main/staff/rule"
              },
              {
                title: "考勤管理",
                path: "/main/staff/worklog"
              }
            ]
          },
          {
            title:"基本设置",
            icon:"el-icon-setting",
            children:[
              {
                title:"收费规则",
                path:"/main/setting/moneyRoles"
              }
            ]
          },
          {
            title:"租户管理",
            icon:"el-icon-setting",
            children:[
              {
                title:"租户列表",
                path:"/page/vip/VipList"
              },
              {
                title:"业主管理",
                path:"/page/vip/HouseOwnerList"
              },
              {
                title:"管理费列表",
                path:"/page/vip/ManageList"
              },
              {
                title:"黑白名单",
                path:"/page/specialvehicle/list"
              },
            ]
          }
        ]
      }
    },
    mounted(){
      let that = this;
      if(sessionStorage.setItem("LOGIN_PARKING_TYPE") == 20){
          that.$http.post(that.Constants().REST_USER_QUERYWORKINFO, that.form,{emulateJSON: true}).then(function (res) {
            if(res.data.result){

            }else {
              that.$message.error(that.res.data.message);
            }
          },function (res) {
            that.$message.error(res);
          });
      }
    },
    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  .el-menu-vertical-demo{
    background-color:#181D24;
    text-color:#fff;
    active-text-color:#ffd04b;
  }
  .el-col{
    width: 100%;
  }
  .el-menu-item{
    background:  #1D242E;
  }
  .el-menu-item:focus, .el-menu-item:hover{
    background: #203A59;
    box-shadow: 0 0 6px 0 #588FFF;
    border-radius: 2px;
  }

  .router-link-active{
    color: #FFFFFF
  }

  .el-menu{
    border-right: none;
  }
  .el-menu-item-group__title{
    padding: 0;
  }
  .router-link > a{
    color: #fff;
  }
  .el-submenu__title:hover {
    background: #203A59;
    box-shadow: 0 0 2px 0 rgba(113,160,255,0.50);
    border-radius: 2px;
    color: #fff;
  }
  .title{
    font-size: 18px;
    color: #fff;
  }
  .tac
  {
    width:230px;
  }
</style>
