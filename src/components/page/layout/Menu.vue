<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
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
                path:"/main/statistics/doorlog"
              },
              {
                title:"订单明细",
                path:"/main/statistics/orderlog"
              },
              /*{
                title:"违章记录",
                path:"/main/statistics/errorlog"
              },*/
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
                title: "考勤管理",
                path: "/main/staff/worklog"
              }
            ]
          },
          {
            title:"设备管理",
            icon:"el-icon-info",
            children:[
              {
                title:"PDA管理",
                path:"/main/device/pda"
              },
              {
                title: "设备管理",
                path: "/main/device/other"
              }
            ]
          },
          {
            title:"基本设置",
            icon:"el-icon-setting",
            children:[
              {
                title:"基础设置",
                path:"/main/setting/setting"
              },
              {
                title:"收费规则",
                path:"/main/setting/moneyRoles"
              }
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
<style scoped>
 .tac
 {
   width:230px;
 }
</style>
