<template>
  <div class="on">
    <div class="outOrIn">
      <div class="header1">
        <div class="dks">
          <!--这里子账号登录才会有图片和按钮显示-->
          <img v-if="type == 20" src="../../assets/image/kaoqing.png" class="shangban"/>
          <button class="dk" @click="daka"  v-if="type == 20">{{status == 2 || status == 3? "下班打卡" : "上班打卡"}}</button>
        </div>
        <el-checkbox-group class="wel">
          <el-checkbox class="chek" v-for="(door,index) of doorList" :checked="door.checked" :key="index"
                       @change="toggle(index)">{{door.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="container_2">
        <div v-for="(door,index) of doorList" class="contain">
          <gate-in v-if="door.type==1" v-show="door.checked" class="gate" :doorId="door.id"></gate-in>
          <gate-out v-if="door.type==2" :key="index" v-show="door.checked" :doorId="door.id" class="gate2"></gate-out>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import GateIn from "@/components/parts/GateIn"
  import GateOut from "@/components/parts/GateOut"

  export default {
    props: [],
    components: {
      GateIn, GateOut
    },
    data() {
      return {
        status:1,
        type:sessionStorage.getItem("LOGIN_PARKING_TYPE"),
        quest:{
          //子账号suId为空，表示超管登录（超管登录没有打卡————————子账号登录才有打卡功能）
          suId:sessionStorage.getItem("LOGIN_PARKING_SUBID"),
        },
        form:{
          uId:sessionStorage.getItem("LOGIN_PARKING_UID"),
          platform:sessionStorage.getItem("LOGIN_PARKING_TYPE") === 8 ? 8 : 20,
          token:sessionStorage.getItem("LOGIN_PARKING_TOKEN"),
        },
        doorList: [],
        checkList: ['选中且禁用', '复选框 A'],
        parkingList:[],
      }
    },
    mounted() {
      let that = this;
      this.getDoors();

      if(that.type == 8){
        return;
      }
      that.$http.post(that.Constants().REST_USER_QUERYWORKINFO, that.quest,{emulateJSON: true}).then(function (res) {
        if(res.data.result){
          that.status = res.data.data.status;
        }else {
          that.$message.error(that.res.data.message);
        }
      },function (res) {
        that.$message.error(res);
      });
      this.loadData();
    },
    methods: {
      toggle(i) {
        if (this.doorList[i].checked) {
          this.doorList[i].checked = false
        }
        else {
          this.doorList[i].checked = true
        }
      },
      getDoors() {
        let that = this;
        let pid = sessionStorage.getItem("LOGIN_PARKING_PID");
        if (this.pid === null) {
          that.$message.error("请先选择停车场");
          return;
        }
        that.$http.post(that.Constants().REST_BARRIER_LIST, {pId: 67}, {emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.doorList.splice(0, that.doorList.length, ...res.data.data.data);
            let len = that.doorList.length;
            for (let i = 0; i < len; i++) {
              that.$set(that.doorList[i], "checked", true);
            }
          }
          else {
            that.$message.error("出入口列表获取失败:" + res.data.message);
          }
        }, function () {
          that.$message.error("数据交互发生错误");
        })

      },
      daka(){
        let that = this;
        that.$http.post(that.Constants().REST_USER_CLOCKONANDOFF, that.quest,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.$message.success(res.data.data);
            that.status=2;
          }else {
            that.$message.error(that.res.data.message);
          }
        },function (res) {
          that.$message.error(res);
        });
      },
    }
  }
</script>
<style scoped>
  @import "../../assets/css/WelCome.css";
  /*.header1{*/
    /*position: fixed;*/
    /*top: 36px;*/
    /*left:230px;*/
    /*!*height: 72px;*!*/
    /*!*z-index:300;*!*/
    /*background: #1D242E;*/
    /*box-shadow: 0 2px 6px 0 rgba(46,46,46,0.50);*/
    /*width:100%;*/

  /*}*/
  .header1 .dks{
    float:left;
    /*Width:200px;*/
  }
  .header1 .wel{
    float:right;
    margin-top: 20px;
    margin-right: 10%;
  }
 .container_2{
   width:100%;
   overflow: auto;
 }
</style>
