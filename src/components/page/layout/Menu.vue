<template>
  <el-row>
    <el-col :span="24">
      <el-menu   default-active="2"  class="menu-demo">
        <el-submenu class="menu-oicn" v-for="(MENU,index) in menuList" :index="index" :key="index">
          <template slot="title">
            <!--<b :class="MENU.icon"></b>-->
            <img src=""/>
            <span class="title">{{MENU.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(cmenu,i) in MENU.children" :key="i"  index="i"  >
              <router-link :to="cmenu.path" class="menuStyle">{{cmenu.title}}</router-link>
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
      if(sessionStorage.getItem("LOGIN_PARKING_TYPE") == 20){
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
  .menu-demo{
    background-color:#181D24;
    text-color:#fff;
    active-text-color:#ffd04b;
  }
  .menu-demo .menu-oicn i{
    display: none !important;
  }
  .menu-demo .el-col{
    width: 100%;
  }
  .menu-demo .el-menu-item{
    background:  #1D242E;
  }
  .menu-demo .el-menu-item:focus, .el-menu-item:hover{
    background: #203A59;
    box-shadow: 0 0 6px 0 #588FFF;
    border-radius: 2px;
  }
 .menuStyle{
  color: #A5A5A5;
  }
  .menuStyle:hover{
    color: #FFFFFF
  }
  .menu-demo .router-link-active{
    color: #FFFFFF
  }

  .menu-demo .el-menu{
    border-right: none;
  }
  .menu-demo .el-menu-item-group__title{
    padding: 0;
  }

  .menu-demo .el-submenu__title:hover {
    background: #203A59;
    box-shadow: 0 0 2px 0 rgba(113,160,255,0.50);
    border-radius: 2px;
    color: #fff;
    border-right: 4px solid #49a9ff
  }
  .menu-demo .title{
    font-size: 18px;
    color: #fff;
  }

</style>
