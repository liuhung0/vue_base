<template>
  <div class="flex_box">
    <div class="flex_item flex_item_4" >
      <!--<img src="@/assets/image/logo.png" style="width:32px;Height:32px">-->
    </div>
    <div class="flex_item flex_item_20" >
      <span>泊联停车场管理系统</span>
    </div>
    <div class="flex_item flex_item_40" >

      <el-select v-model="pid" v-if="type == 8" placeholder="暂时无" :value="pid" >
        <el-option
          v-for="item in parkingList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          @click.native="change">
      </el-option>

      </el-select>
    </div>
    <div class="flex_item flex_item_10">
      <span><B>当前值班:</B>{{username}} </span>
      <router-link  to="" class="router-link-active">修改密码</router-link>
      <router-link id="index" @click.native="logout" to=""><img src="../../../assets/image/zhuxiao.png" class="zhuxiao"/></router-link>
    </div>
    <!--<div class="flex_item flex_item_100_w" >-->
    <!--</div>-->
    <!--<div class="flex_item flex_item_100_w2" >-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">

    var selected;


    export default {

      components: {},
      props: [],
      data(){
        return {
          type:sessionStorage.getItem("LOGIN_PARKING_TYPE"),
          username:sessionStorage.getItem("LOGIN_PARKING_USENAME"),
          form:{
            uId:sessionStorage.getItem("LOGIN_PARKING_UID"),
            platform:sessionStorage.getItem("LOGIN_PARKING_TYPE") == 8 ? 8 : 20,
            token:sessionStorage.getItem("LOGIN_PARKING_TOKEN"),
          },
          pid:null,
          parkingList:[],
        }
      },
      watch:{
//        pid(val){
//          sessionStorage.setItem("THIS_PARKING_ID",val);
//          this.$router.push('/main')
//        }
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
            that.parkingList.splice(0, that.parkingList.length, ...res.data.data);
            that.pid =res.data.data[0].id;
          }else {
            that.$message.error(that.res.data.message);
          }
        },function (res) {
          that.$message.error(res);
        });
      },
      methods:{
        change(){
          sessionStorage.removeItem("LOGIN_PARKING_PID")
          sessionStorage.setItem("LOGIN_PARKING_PID",this.pid)
          this.$router.replace("/main");
        },
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
    background: #181D24;
  }
  .flex_item {
    flex:0;
    display: flex;
  }
  .flex_item_20{
    flex:0 0 20%;
    text-align: left;
    padding-top:16px;
  }
  .flex_item_20 > span{
    font-size:20px;
    display: inline-block;
    line-height: 42px;
  }
  .flex_item_40{
    flex:0 0 50%;
    text-align: left;
    padding-top:16px;
  }
  .flex_item_10{
    flex:0 0 20%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 75px;
  }

  .flex_item_10 > span{
    font-size: 16px;
    color: #FFFFFF;;
    display: inline-block;
    line-height: 72px;
    padding-right:40px;
  }
  .flex_item_10> .router-link-active{
    font-size: 16px;
    color: #FFFFFF;;
    display: inline-block;
    /*line-height: 72px;*/
    margin-right: 5px;
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
  .zhuxiao{
    line-height: 10px;
  }

</style>
