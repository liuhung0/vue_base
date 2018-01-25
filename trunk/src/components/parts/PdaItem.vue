<template>
    <div class="box">
      <div class="tools">
        <div @click="charts(1)"><el-icon class="el-icon el-icon-edit" /> </div>
        <div @click="info(1)"><el-icon class="el-icon el-icon-document" /> </div>
        <div @click="del(1)"><el-icon class="el-icon el-icon-close" /> </div>
      </div>
      <div class="pdalist">
        <div class="item imgs"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516798084548&di=0a24c867473e46684ca2a64da030d631&imgtype=0&src=http%3A%2F%2Fwww.sgsoft.cc%2Fuploads%2Fallimg%2F141216%2F1-141216121T1U2.jpg"/></div>
        <div class="item info">
          <div class="label">
            <Label>编号</Label>
            <span>{{pda.id}}</span>
          </div>
          <div class="label">
            <Label>型号</Label>
            <span>{{pda.code}}</span>
          </div>
          <div class="label">
            <Label>品牌</Label>
            <span>{{pda.brand}}</span>
          </div>
          <div class="label">
            <Label>CPU</Label>
            <span>{{pda.cpu}}</span>
          </div>
          <div class="label">
            <Label>RAM</Label>
            <span>{{pda.ram}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "pda-item",
        data(){
          return {
            pda:{
              id:1,
              code:"ZE-1033",
              brand:"中兴",
              cpu:"high_234u",
              ram:"3GB",
            }
          }
        },
        methods:{
          charts(id){
            console.log("打开考勤记录")
            this.$message.info("打开考勤记录")
          },
          info(id){
            this.$router.push('/main/device/pdainfo')
          },
          del(id){
            console.log("删除pda")
            this.$message.warning("删除pda");
          }
        }
    }
</script>

<style scoped>
  .box{
    display:flex;
    flex: 0 0 360px;
    flex-flow: column nowrap;
    justify-content: space-around;
    border: 1px solid #ccc;
    margin:10px;
    padding:10px 10px 10px 10px ;
    border-radius: 10px;
    background: rgba(161, 228, 139, 0.15);
  }
  .tools{
    display:flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    flex:0 0 24px;
  }
  .tools  div{
    flex:0 0 28px;
  }
  .tools  div:hover{
    font-weight: 600;
    color: #3888fe;
  }
  .pdalist{
    display:flex;
    flex: 0 0 160px;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
  .imgs{
    flex:0 0 40%;
  }
  .imgs img{
    width:100%;
  }
  .info{
    flex:0 0 60%;
    display: flex;
    flex-flow: row wrap;
    justify-content:flex-start;
    padding:4px;
  }
  .info .label{
    flex:0 0 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    border-bottom: 1px dashed #ccc;
  }
  .label label{
    flex:0 0 40%;
    align-items: flex-start;
    font-weight: 600;
  }
  .label label:after{
   content:":";
  }

</style>
