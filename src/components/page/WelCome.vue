<template>
  <div class="on">
    <div class="outOrIn">
        <div>
            <img src="../../assets/image/kaoqing.png" class="shangban"/>
            <span class="dk">上班打卡</span>
        </div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox  v-for="(door,index) of doorList" :checked="door.checked" :key="index" @change="toggle(index)">{{door.name}}</el-checkbox>
      </el-checkbox-group>
     </div>
    <div  v-for="(door,index) of doorList"   class="contain">
      <gate-in  v-if="door.type==1"  v-show="door.checked" class="gate" :doorId="door.id"></gate-in>
      <gate-out v-if="door.type==2"  :key="index" v-show="door.checked" :doorId="door.id" class="gate"></gate-out>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import GateIn from "@/components/parts/GateIn"
  import GateOut from "@/components/parts/GateOut"
  export default {
    props: [],
    components: {
      GateIn,GateOut
    },
    data(){
      return{
        doorList:[
        ],
        checkList: ['选中且禁用','复选框 A'],
      }
    },
    mounted(){
      this.getDoors();
    },
    methods:{
      toggle(i){
        if(this.doorList[i].checked){
          this.doorList[i].checked =false
        }
        else{
          this.doorList[i].checked =true
        }
      },
      getDoors(){
        let that = this;
        let pid = sessionStorage.getItem("THIS_PARKING_ID");
        if (!pid){
          that.$message.error("请先选择停车场");
          return;
        }
        that.$http.post(that.Constants().REST_BARRIER_LIST,{pId:pid},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.doorList.splice(0,that.doorList.length,...res.data.data.data);
            let len = that.doorList.length;
            for(let i=0; i<len;i++){
              that.$set(that.doorList[i],"checked",true);
            }
            console.log(that.doorList);
          }
          else{
            that.$message.error("出入口列表获取失败:"+res.data.message);
          }
        },function(){
          that.$message.error("数据交互发生错误");
        })

      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/WelCome.css";
</style>
