<template>
  <div class="on">
    <h1>出入记录</h1>
    <el-checkbox  v-for="(door,index) of doorList" :checked="door.checked" :key="index" @change="toggle(index)">{{door.name}}</el-checkbox>
    <div class="main">
      <gate v-for="(door,index) of doorList" :key="index" v-if="door.checked"></gate>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Gate from "@/components/parts/Gate"
  export default {
    props: [],
    components: {
      Gate
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
        console.log("?SDKas")
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
    display: flex;
    flex-flow: row wrap;
    width:100%;
    overflow: auto;
    min-height: 100vh;
  }

  .main {
    display: flex;
    flex-flow: row nowrap;
    align-content: flex-start;
  }

  main:nth-child(0) {
    border-left: 0px;
  }
</style>
