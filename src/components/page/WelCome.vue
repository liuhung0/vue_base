<template>
  <div class="on">
    <div class="outOrIn">
      <div class="header1">
        <div class="dks">
          <img src="../../assets/image/kaoqing.png" class="shangban"/>
          <span class="dk">上班打卡</span>
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
        doorList: [],
        checkList: ['选中且禁用', '复选框 A'],
      }
    },
    mounted() {
      this.getDoors();
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
        alert("首页")
        alert(pid);
        if (pid === null) {
          that.$message.error("请先选择停车场");
          return;
        }
        that.$http.post(that.Constants().REST_BARRIER_LIST, {pId: pid}, {emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.doorList.splice(0, that.doorList.length, ...res.data.data.data);
            let len = that.doorList.length;
            for (let i = 0; i < len; i++) {
              that.$set(that.doorList[i], "checked", true);
            }
            console.log(that.doorList);
          }
          else {
            that.$message.error("出入口列表获取失败:" + res.data.message);
          }
        }, function () {
          that.$message.error("数据交互发生错误");
        })

      }
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
