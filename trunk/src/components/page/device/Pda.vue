<template>
  <div>
    <h1>PDA管理</h1>
    <div class="box">
      <pda-item v-for="(item,index) of PDAList"
                :key="index"></pda-item>
    </div>
  </div>

</template>

<script>
    import DataTable from "../../ui/cub/DataTable";
    import PdaItem from "../../parts/PdaItem";

    export default {
      components: {
        PdaItem,
        DataTable},
      name: "pda",
      data(){
        let that = this;
        return {
          PDAList:[
            {
              id:1,
              code:"zx_001",
              brand:"中兴",
              cpu:"hiseo 8x1.5Ghz",
              ram:"3G"
            },
            {
              id:2,
              code:"zx_001",
              brand:"中兴",
              cpu:"hiseo 8x1.5Ghz",
              ram:"3G"
            },
            {
              id:3,
              code:"zx_001",
              brand:"中兴",
              cpu:"hiseo 8x1.5Ghz",
              ram:"3G"
            },
            {
              id:4,
              code:"zx_001",
              brand:"中兴",
              cpu:"hiseo 8x1.5Ghz",
              ram:"3G"
            },
            {
              id:5,
              code:"zx_001",
              brand:"中兴",
              cpu:"hiseo 8x1.5Ghz",
              ram:"3G"
            },
          ]

        }
      }
    }
</script>

<style scoped>
  .box{
    display: flex;
  }
</style>
