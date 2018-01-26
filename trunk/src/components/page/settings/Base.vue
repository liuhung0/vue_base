<template>
  <div class="box ">
    <h1>基础设置</h1>
    <el-form ref="form" :model="form" label-width="120px" class="settings">
      <h2>企业信息</h2>
      <el-form-item label="企业名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业执照号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="统一信用代码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业对公账户">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <h2>管理者信息</h2>
      <el-form-item label="管理者姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="现居住地">
        <el-select v-model="form.name"></el-select>
        <el-select v-model="form.name"></el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.name"></el-input>
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
        reqData:{
          uId:1,
        },
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
    mounted(){
      let that = this;
      that.$http.post(that.Constants().REST_MERCHANT_INFO, that.reqData, {emulateJSON: true}).then(function (res) {
        if (res.data.result) {

        }
        else {
          that.$message.info(that.res.data.message);
        }
      }, function () {
        that.$message.error("网络发生错误");
      })
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
  .box{
    padding:20px;
  }
  .box h1{
    text-align: left;
    font-weight: 400;
    padding:10px 10px 30px 10px;
    border-bottom: 1px dashed #ccc;
    color:#666666;
  }
  .settings{
    max-width: 640px;
    margin:0 2%;
    background:#f6f6f6;
    height:100%;
    padding:60px 40px;
    border-radius: 10px;
  }

</style>
