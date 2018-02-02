<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo">
        <el-submenu  v-for="(MENU,index) of menuList" :index="index" :key="index">
          <template slot="title">
            <i :class="MENU.icon"></i>
            <span>{{MENU.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(cmenu,i) of MENU.children" :key="i"  index="i"  >
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
                title:"开闸记录",
                path:"/main/log/sluicestatelist"
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

            ]
          }
        ]
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
 a{
   font-size: 16px;
   text-color: #A5A5A5;
 }
  .router-link-active{

  }

  .el-menu{
    border-right: none;
  }
  .el-menu-item-group__title{
    padding: 0;
  }
  .router-link{
    color: #fff;
  }
  .el-submenu__title:hover {
    background: #203A59;
    box-shadow: 0 0 2px 0 rgba(113,160,255,0.50);
    border-radius: 2px;
    color: #fff;
  }
  span{
    font-size: 18px;
    color: #fff;
  }
 .tac
 {
   width:230px;
 }
</style>
