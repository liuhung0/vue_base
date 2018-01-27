<template>
    <div>
      <div class="flex_box">
        <div class="flex_item flex_item_60">
          <el-select :model="parking.id" :value="'请选择要管理的停车场'">
            <el-option v-for="(parking,index) of parkingList" :key="index" :value="parking.id" v-text="parking.name">
            </el-option>
          </el-select>
        </div>
        <div class="flex_item">
          当前值班: 李大力
        </div>
        <div class="flex_item">
          <span @click="logout">退出</span>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      components: {},
      props: [],
      data(){
        return {
          parking:{
            id:0,
            name:"",
          },
          parkingList:[
            {
              id:1,
              name:"浩泰电建停车场",
            },
            {
              id:2,
              name:"三维浩泰地下停车场",
            },
            {
              id:3,
              name:"中川地下停车场",
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
      methods:{
        logout(){
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
  .flex_box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    background:rgb(84, 92, 100);
    margin:0;
    padding:10px;
    color:#fff;
  }
  .flex_item{
    flex:1;
  }
  .flex_item_60{
    flex: 0 0 60%;
    display: flex;
    justify-content: flex-start;
  }

</style>
