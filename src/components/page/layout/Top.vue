<template>
    <div>
      <div class="flex_box">
        <div class="flex_item flex_item_60">
          <el-select :model="parking.id">
            <el-option v-for="(parking,index) of parkingList" :key="index" :value="parking.id" v-text="parking.name">
            </el-option>
          </el-select>
        </div>
        <div class="flex_item">
          当前值班: 李大力
        </div>
        <div class="flex_item">
          <a @click="logout">退出</a>
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
      method:{
        logout(){
          sessionStorage.removeItem("LOGIN_BOSS");
          sessionStorage.removeItem("LOGIN_TOKEN");
          this.$route.path("/login");
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
