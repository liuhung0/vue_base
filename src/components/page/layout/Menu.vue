<template>
  <el-row>
    <el-col :span="24">
      <el-menu   default-active="2"  class="menu-demo">
        <el-submenu class="menu-oicn" v-for="(MENU,index) in menuList" :index="index" :key="index">
          <template slot="title">
            <b :class="MENU.icon"></b>
            <span class="title">{{MENU.name}}</span>
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
<style>
  .menu-demo{
    background-color:#181D24;
    text-color:#fff;
    active-text-color:#ffd04b;
  }
  .menu-demo .menu-oicn i{
    display: none !important;
    /*color: #fff;*/
    /*background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTE3ODI0NzI3MzI5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQ0MS4wMDI2NjcgNTc4LjI4NjkzM2MwIDM3LjAwMDUzMyAzMS40MDI2NjcgNjcuMDM3ODY3IDcwLjA0MTYgNjcuMDM3ODY3IDM4LjcwNzIgMCA3MC4wNDE2LTMwLjAzNzMzMyA3MC4wNDE2LTY3LjAzNzg2NyAwLTM2LjkzMjI2Ny0zMS40MDI2NjctNjYuOTAxMzMzLTcwLjA0MTYtNjYuOTAxMzMzLTM4LjcwNzIgMC03MC4wNDE2IDI5Ljk2OTA2Ny03MC4wNDE2IDY2LjkwMTMzM3pNNjk2LjU5MzA2NyA1NzguMjg2OTMzYzAgMzcuMDAwNTMzIDMxLjQwMjY2NyA2Ny4wMzc4NjcgNzAuMDQxNiA2Ny4wMzc4NjcgMzguNjM4OTMzIDAgNzAuMDQxNi0zMC4wMzczMzMgNzAuMDQxNi02Ny4wMzc4NjcgMC0zNi45MzIyNjctMzEuNDAyNjY3LTY2LjkwMTMzMy03MC4wNDE2LTY2LjkwMTMzMy0zOC43MDcyIDAtNzAuMDQxNiAyOS45NjkwNjctNzAuMDQxNiA2Ni45MDEzMzN6TTMwMS43Mzg2NjcgMjg5LjM4MjRjMjUuMzk1MiAwIDQ3LjUxMzYtMTkuNzI5MDY3IDQ3LjUxMzYtNDQuMTAwMjY3VjQ0Ljk4NzczM2MwLTI0LjMwMjkzMy0yMi4xMTg0LTQ0LjAzMi00Ny40NDUzMzQtNDQuMDMyLTI1LjQ2MzQ2NyAwLTQ2LjE0ODI2NyAxOS43MjkwNjctNDYuMTQ4MjY2IDQ0LjAzMnYyMDAuMzYyNjY3YzAgMjQuMzcxMiAyMC42ODQ4IDQ0LjEwMDI2NyA0Ni4xNDgyNjYgNDQuMTAwMjY3di0wLjA2ODI2N3ogbTQxOC40NzQ2NjYgMGMyNS4zOTUyIDAgNDcuNTEzNi0xOS43MjkwNjcgNDcuNTEzNi00NC4xMDAyNjdWNDQuOTg3NzMzYzAtMjQuMzAyOTMzLTIyLjExODQtNDQuMDMyLTQ3LjU4MTg2Ni00NC4wMzItMjUuMzk1MiAwLTQ2LjAxMTczMyAxOS43MjkwNjctNDYuMDExNzM0IDQ0LjAzMnYyMDAuMzYyNjY3YzAgMjQuMzcxMiAyMC42ODQ4IDQ0LjEwMDI2NyA0Ni4wOCA0NC4xMDAyNjd2LTAuMDY4MjY3ek0xODUuMDAyNjY3IDU3OC4yODY5MzNjMCAzNy4wMDA1MzMgMzEuNDAyNjY3IDY3LjAzNzg2NyA3MC4wNDE2IDY3LjAzNzg2NyAzOC43MDcyIDAgNzAuMDQxNi0zMC4wMzczMzMgNzAuMDQxNi02Ny4wMzc4NjcgMC0zNi45MzIyNjctMzEuNDAyNjY3LTY2LjkwMTMzMy03MC4wNDE2LTY2LjkwMTMzMy0zOC43MDcyIDAtNzAuMDQxNiAyOS45NjkwNjctNzAuMDQxNiA2Ni45MDEzMzN6TTE4My43NzM4NjcgODIzLjE1OTQ2N2MwIDM2LjkzMjI2NyAzMS40MDI2NjcgNjYuOTAxMzMzIDcwLjA0MTYgNjYuOTAxMzMzIDM4LjcwNzIgMCA3MC4wNDE2LTI5Ljk2OTA2NyA3MC4wNDE2LTY2LjkwMTMzMyAwLTM3LjAwMDUzMy0zMS40MDI2NjctNjYuOTY5Ni03MC4wNDE2LTY2Ljk2OTYtMzguNzA3MiAwLTcwLjA0MTYgMjkuOTY5MDY3LTcwLjA0MTYgNjYuOTAxMzMzek00NDEuMDAyNjY3IDgyMy4xNTk0NjdjMCAzNi45MzIyNjcgMzEuNDAyNjY3IDY2LjkwMTMzMyA3MC4wNDE2IDY2LjkwMTMzMyAzOC43MDcyIDAgNzAuMDQxNi0yOS45NjkwNjcgNzAuMDQxNi02Ni45MDEzMzMgMC0zNy4wMDA1MzMtMzEuNDAyNjY3LTY2Ljk2OTYtNzAuMDQxNi02Ni45Njk2LTM4LjcwNzIgMC03MC4wNDE2IDI5Ljk2OTA2Ny03MC4wNDE2IDY2LjkwMTMzM3oiIGZpbGw9IiNjY2NjY2MiIHAtaWQ9IjEwMDQiPjwvcGF0aD48cGF0aCBkPSJNOTAxLjEyIDExMS45NTczMzNoLTU2Ljc5Nzg2N2MtMS43MDY2NjctMC4yNzMwNjctMy4yNzY4LTEuMDI0LTUuMDUxNzMzLTEuMDI0YTM0LjgxNiAzNC44MTYgMCAwIDAtMzUuNjM1MiAzNC4wNjUwNjcgMzQuODE2IDM0LjgxNiAwIDAgMCAzNS42MzUyIDMzLjk5NjhjMS43NzQ5MzMgMCAzLjIwODUzMy0wLjY4MjY2NyA0Ljg0NjkzMy0wLjg4NzQ2N2g2MC4yNzk0NjdjMjYuNDg3NDY3IDAgNDguODEwNjY3IDIxLjM2NzQ2NyA0OC44MTA2NjcgNDYuNzYyNjY3djE1NC4wNzc4NjdINzAuMTA5ODY3VjIyNC44NzA0YzAtMjUuMzk1MiAyMi4yNTQ5MzMtNDYuNzYyNjY3IDQ4Ljc0MjQtNDYuNzYyNjY3aDU0LjA2NzJjMS42Mzg0IDAuMjczMDY3IDMuMDcyIDAuODg3NDY3IDQuNzc4NjY2IDAuODg3NDY3YTM0LjgxNiAzNC44MTYgMCAwIDAgMzUuNTY2OTM0LTMzLjk5NjggMzQuODE2IDM0LjgxNiAwIDAgMC0zNS41NjY5MzQtMzQuMDY1MDY3Yy0xLjcwNjY2NyAwLTMuMjA4NTMzIDAuNjgyNjY3LTQuOTE1MiAwLjk1NTczNEgxMjIuODhDNTUuNTAwOCAxMTIuMjMwNCAxLjA5MjI2NyAxNjQuMzg2MTMzIDAuODg3NDY3IDIyOC43NjE2djY3Ny41NDY2NjdjMCA2NC4yMzg5MzMgNTIuOTA2NjY3IDExNi44MDQyNjcgMTIwLjAxMjggMTE2LjgwNDI2Nmg3ODAuMjE5NzMzYzY3LjMxMDkzMy0wLjIwNDggMTIxLjc4NzczMy01Mi40Mjg4IDEyMS45OTI1MzMtMTE2LjczNlYyMjguNjkzMzMzYy0wLjIwNDgtNjQuMzc1NDY3LTU0LjYxMzMzMy0xMTYuNTMxMi0xMjEuOTkyNTMzLTExNi43MzZsLTAuMDY4MjY3LTAuMTM2NTMzeiBtNTIuMDg3NDY3IDc5Ny44MzI1MzRjLTAuMjczMDY3IDI1LjY2ODI2Ny0yMS45ODE4NjcgNDYuNDIxMzMzLTQ4LjgxMDY2NyA0Ni42OTQ0SDExOC44NTIyNjdjLTI2LjgyODgtMC4zNDEzMzMtNDguNDY5MzMzLTIxLjAyNjEzMy00OC43NDI0LTQ2LjY5NDRWNDQ1LjMwMzQ2N2g4ODMuMDk3NnY0NjQuNDg2NHoiIGZpbGw9IiNjY2NjY2MiIHAtaWQ9IjEwMDUiPjwvcGF0aD48cGF0aCBkPSJNNDMxLjcxODQgMTc5LjA2MzQ2N2MxLjAyNCAwIDEuOTExNDY3LTAuNDc3ODY3IDIuOTM1NDY3LTAuNjgyNjY3SDU5MS4xODkzMzNjMC45NTU3MzMgMC4yMDQ4IDEuODQzMiAwLjY4MjY2NyAyLjkzNTQ2NyAwLjY4MjY2NyAxLjAyNCAwIDEuOTExNDY3LTAuNDc3ODY3IDIuOTM1NDY3LTAuNjgyNjY3aDMuNzU0NjY2di0wLjYxNDRjMTYuMzg0LTMuMTQwMjY3IDI4Ljk0NTA2Ny0xNi4xNzkyIDI4Ljk0NTA2Ny0zMi43NjggMC0xNi41MjA1MzMtMTIuNjI5MzMzLTI5LjY5Ni0yOC45NDUwNjctMzIuNzY4VjExMS45NTczMzNoLTEuNzA2NjY2Yy0xLjcwNjY2Ny0wLjIwNDgtMy4yMDg1MzMtMC45NTU3MzMtNC45ODM0NjctMC45NTU3MzMtMS44NDMyIDAtMy4zNDUwNjcgMC42ODI2NjctNS4wNTE3MzMgMC45NTU3MzNINDM2LjcwMTg2N2MtMS43MDY2NjctMC4yMDQ4LTMuMjA4NTMzLTAuOTU1NzMzLTQuOTgzNDY3LTAuOTU1NzMzYTM0LjgxNiAzNC44MTYgMCAwIDAtMzUuNjM1MiAzNC4wNjUwNjcgMzQuODE2IDM0LjgxNiAwIDAgMCAzNS42MzUyIDMzLjk5Njh2MC4wNjgyNjZ6IiBmaWxsPSIjY2NjY2NjIiBwLWlkPSIxMDA2Ij48L3BhdGg+PC9zdmc+);*/
    /*background-repeat: no-repeat;*/
    /*background-size: cover;*/
    /*background-position: center;*/
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

  .menu-demo.el-menu{
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
    font-size: 16px;
    color: #fff;
  }

</style>
