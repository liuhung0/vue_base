<template>
  <div class="flex_box">
    <div class="flex_item flex_item_4" >
      <img src="@/assets/image/logo.png" style="width:32px;Height:32px">
    </div>
    <div class="flex_item flex_item_20" >
      <span>泊联停车场管理系统</span>
    </div>
    <div class="flex_item flex_item_40" >

      <el-select :model="parking.id">
        <el-option v-for="(parking,index) of parkingList" :key="index" :value="parking.id" v-text="parking.name">
        </el-option>
      </el-select>
    </div>
    <div class="flex_item flex_item_10">
      <span><B>当前值班:</B>{{username}} </span>
      <router-link id="index" @click.native="logout" to="">注销登录</router-link>
    </div>
    <div class="flex_item flex_item_100_w" >
    </div>
    <div class="flex_item flex_item_100_w2" >
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      components: {},
      props: [],
      data(){
        return {
          username:sessionStorage.getItem("LOGIN_PARKING_USENAME"),
          form:{
            uId:sessionStorage.getItem("LOGIN_PARKING_UID"),
            platform:sessionStorage.getItem("LOGIN_PARKING_TYPE") == 8 ? 8 : 20,
            token:sessionStorage.getItem("LOGIN_PARKING_TOKEN"),
          },
          parking:{
            id:0,
            name:"",
          },
          parkingList:[],
        }
      },


      mounted(){
        let uid = sessionStorage.getItem("LOGIN_PARKING_UID");
        if(uid == null){
          this.$message.error("您的登录信息已过期！");
          this.$router.push('/login')
        }
        let that = this;
        that.$http.post(that.Constants().VIP_PARKING_LIST, that.form,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.parkingList.splice(0, that.parking.length, ...res.data.data);
          }else {
            that.$message.error(that.res.data.message);
          }
        },function (res) {
          that.$message.error(res);
        });
      },
      methods:{
        logout(){
          let that = this;
          that.$http.post(that.Constants().REST_USER_LOGINOUT, that.form,{emulateJSON: true}).then(function (res) {
              if(res.data.result){
                sessionStorage.removeItem("LOGIN_PARKING_UID");
                sessionStorage.removeItem("LOGIN_PARKING_TOKEN");
                sessionStorage.removeItem("LOGIN_PARKING_SUBID");
                sessionStorage.removeItem("LOGIN_PARKING_TYPE");
                this.$router.push('/login')
              }else {
                that.$message.error(that.res.data.message);
              }
          },function (res) {
            that.$message.error(res);
          });
        }
      }
    }
</script>
<style>
  .flex_box {
    flex: 1 0 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    background: rgb(84, 92, 100);
    color: #fff;
    height: 100%;
  }

  .flex_item {
    flex:0;
    display: flex;
  }
  .flex_item_20{
    flex:0 0 18%;
    text-align: left;
    padding-top:16px;
  }
  .flex_item_20 span{
    font-size:26px;
  }
  .flex_item_40{
    flex:0 0 60%;
    text-align: left;
    padding-top:16px;
  }
  .flex_item_10{
    flex:0 0 14%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
    padding-top:16px;
  }
  .flex_item_10 span{
    padding:0 10px;
  }
  .flex_item_4{
    flex:0 0 4%;
    text-align:center;
    padding-top:16px;
  }
  .flex_item_4 img{
    text-align:center;
    margin:4px auto;
    width:32px;
    height:32px;
  }
  .flex_item_100_w{
    flex:1 1 100%;
    height:2px;
    background:#faffb3;
  }
  .flex_item_100_w2{
    flex:1 1 100%;
    height:2px;
    background: #fff;
  }
</style>
