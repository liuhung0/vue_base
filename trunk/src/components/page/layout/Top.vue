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
      <span @click="logout">退出</span>
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
    data() {
      return {
        username:sessionStorage.getItem("LOGIN_PARKING_USENAME"),
        parking: {
          id: 0,
          name: "",
        },
        parkingList: [
          {
            id: 1,
            name: "浩泰电建停车场",
          },
          {
            id: 2,
            name: "三维浩泰地下停车场",
          },
          {
            id: 3,
            name: "中川地下停车场",
          }
        ],
      }
    },
    mounted(){
      let uid = sessionStorage.getItem("LOGIN_PARKING_UID");
      if(uid == null){
        this.$message.error("您的登录信息已过期！");
        this.$router.push('/login')
      }
    },
    methods: {
      logout() {
        sessionStorage.removeItem("LOGIN_PARKING_UID");
        sessionStorage.removeItem("LOGIN_PARKING_TOKEN");
        sessionStorage.removeItem("LOGIN_PARKING_SUBID");
        sessionStorage.removeItem("LOGIN_PARKING_TYPE");
        this.$router.push('/login')
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
