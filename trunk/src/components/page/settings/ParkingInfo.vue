<template>
  <div class="box">
    <h1>停车场参数</h1>
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="是否地下停车场" >
        <el-switch  style="float:left;padding:10px 0;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="闸口数量">
        <el-input-number style="float:left;" v-model="form.name"></el-input-number>
      </el-form-item>
      <el-form-item label="岗亭数量">
        <el-input-number style="float:left;" v-model="form.name"></el-input-number>
      </el-form-item>
      <el-form-item label="总层数">
        <el-input-number style="float:left;" v-model="form.name"></el-input-number>
      </el-form-item>

      <el-form-item label="其他设施">
        <el-checkbox-group style="float:left;" v-model="form.type">
          <el-checkbox label="立体车库" name="type"></el-checkbox>
          <el-checkbox label="充电桩" name="type"></el-checkbox>
          <el-checkbox label="养护服务" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="地理位置">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
  .box{
    padding:20px;
  }
</style>
