<template>
  <div class="on">
    <div class="outOrIn">
     请选择要显示的出入口:
      <el-checkbox  v-for="(door,index) of doorList" :checked="door.checked" :key="index" @change="toggle(index)">{{door.name}}</el-checkbox>
    </div>
    <div  v-for="(door,index) of doorList"   class="main">
      <gate-in  v-if="door.type=='in'"  v-show="door.checked" class="gate"></gate-in>
      <gate-out v-if="door.type=='out'"  :key="index" v-show="door.checked" class="gate"></gate-out>
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
          {
            name:"东入口",
            type:"in",
            checked:true
          },
          {
            name:"东出口",
            type:"out",
            checked:true
          },
          {
            name:"西入口",
            type:"in",
            checked:false
          },
          {
            name:"东出口",
            type:"out",
            checked:false
          }
        ]
      }
    },
    methods:{
      toggle(i){
        if(this.doorList[i].checked){
          this.doorList[i].checked =false
        }
        else{
          this.doorList[i].checked =true
        }
      }
    }
  }
</script>
<style scoped>
  .on {
    display: block;
    width:100%;
  }
  .main {
    display: block;
    overflow: hidden;
  }
  .outOrIn{
    padding:20px;
    text-align: left;
    border:1px solid #ddd;
    margin:20px 20px 0;
  }
</style>
