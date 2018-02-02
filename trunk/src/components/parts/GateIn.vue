<template>
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.approach_picture">
      </div>
    </div>
    <div class="enter">
      <div class="enter_top">
        <span>入口:{{record.approach_alleyway}}</span>
        <span>门闸编号:{{record.approach_door}}</span>
        <span>摄像头编号:{{record.approach_camera}}</span>
      </div>
      <div v-if="record.car_number" class="row">
        <div class="item">
            <b class="label">车牌号:</b><span>{{record.car_number}}</span>
            <el-form class="number">
              <el-form-item>
                <el-input placeholder="手动矫正车牌号"></el-input>
                <el-button class="sure">确定</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="item"><b class="label">进场时间:</b><span>{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
        <div class="item"><b class="label">出场时间:</b><span>{{record.car_number}}</span></div>
        <div class="item"><b class="label">停泊类型:</b><span>{{record.car_nuber}}</span></div>
        <div class="item"><b class="label">收费金额:</b><span>{{record.car_nummber}}</span></div>
      </div>
      <el-button class="startGate">开闸</el-button>
    </div>
    <div v-if="!record.car_number">暂无记录</div>
  </div>
</template>
<script type="text/ecmascript-6">

  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";

  export default {
    components: {
      ElForm,
      ElButton,
      ElInput,
      ElFormItem
    },
    props: ["doorId"],
    data() {
      let that = this;
      return {
        record:{}
      }
    },
    mounted(){
      this.getRecord(this.doorId);
    },
    methods: {
      getRecord(doorId){
        let that = this;
        that.$http.post(that.Constants().REST_RECORD_IN_FIRST,{id:doorId},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.$set(that,"record",res.data.data)
            console.log(that.record);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/GateIn.css";
</style>
