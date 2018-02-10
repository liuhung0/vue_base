<template>
  <el-row>
    <el-col :span="24">
      <el-menu   default-active="2"  class="menu-demo">
        <el-submenu class="menu-oicn" v-for="(MENU,index) in menuList" :index="index" :key="index">
          <template slot="title">
            <router-link :to="MENU.path" v-if="MENU.name === '主界面'" >
              <b :class="MENU.icon"></b>
              <span class="title">{{MENU.name}}</span>
            </router-link>
              <b :class="MENU.icon" v-if="MENU.name != '主界面'"></b>
              <span class="title" v-if="MENU.name != '主界面'">{{MENU.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(son,i) in children" :key="i"  v-if="son.parentId===MENU.id"  index="i" >
              <router-link :to="son.path" class="menuStyle" >{{son.name}}</router-link>
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
        menuList:[],
        children:[],
        form:{
          suId:sessionStorage.getItem("LOGIN_PARKING_SUBID"),
          token:sessionStorage.getItem("LOGIN_PARKING_TOKEN")
        }
      }
    },
    mounted(){
      let that = this;
          that.$http.post(that.Constants().REST_ROLE_SU_ID, that.form,{emulateJSON: true}).then(function (res) {
            if(res.data.result){
              that.menuList.splice(0, that.menuList.length, ...res.data.data.parentList);
              that.children.splice(0, that.children.length, ...res.data.data.childrenList);
            }else {
              that.$message.error(that.res.data.message);
            }
          },function (res) {
            that.$message.error(res);
          });
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
  .menu-demo{
    background-color:#181D24;
    text-color:#fff;
    active-text-color:#ffd04b;
  }
  .menu-demo b{
    color: #278bff !important;
  }
  .menu-demo .el-col{
    width: 100%;
  }
  .menu-demo .el-menu-item{
    background:  #1D242E;
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
  .menu-demo.el-menu{
    border-right: none;
  }
  .menu-demo .el-menu-item-group__title{
    padding: 0;
  }
  .menu-demo .title{
    font-size: 16px;
    color: #fff;
  }

</style>
<style>
  .menu-demo .menu-oicn i{
    display: none !important;
  }
  .menu-demo .el-menu-item{
    background:  #1D242E;
  }
  .menu-demo .el-menu-item-group__title{
    padding:0 !important;
  }
  .menu-demo .el-menu-item:focus, .el-menu-item:hover{
    background: #203A59;
    box-shadow: 0 0 6px 0 #588FFF;
    border-radius: 2px;
  }
  .menu-demo .el-submenu__title:hover {
    background: #203A59;
    box-shadow: 0 0 2px 0 rgba(113,160,255,0.50);
    border-radius: 2px;
    color: #fff;
    border-right: 4px solid #49a9ff;
    margin-bottom: 2px;

  }
</style>
