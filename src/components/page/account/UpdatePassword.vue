<template>
  <div class="main" style="width:500px;margin-left:450px;margin-top: 150px">
    <h2>修改账号密码</h2>
    <el-form ref="form" :rules="form" :model="form" label-width="100px" class="addAccount">
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="passwordA">
        <el-input type="password" v-model="form.passwordA"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-button type="primary" @click="setInfo">保 &nbsp;&nbsp;存</el-button>
      <el-button type="primary" @click="callback" >返 &nbsp;&nbsp;回</el-button>
    </el-form>
  </div>

</template>
<script>
  import ElRadio from "../../../../node_modules/element-ui/packages/radio/src/radio.vue";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";

  export default {
    components: {
      ElCheckbox,
      ElFormItem,
      ElRadio},
    name: "sub-info",
    props:["id"],
    data() {
      return {
        form: {
          username:sessionStorage.getItem("LOGIN_PARKING_USENAME"),
          password:'',
          suId:sessionStorage.getItem("LOGIN_PARKING_SUBID"),
          passwordA:'',
          newPassword:'',
        },
      }
    },
    mounted(){
    },
    methods: {
      callback(){
        this.$router.push("/main");
      },
      setInfo(){
        let that = this;
        that.$http.post(that.Constants().REST_USER_UPDATA_PASSWORD, that.form,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.$message.success("保存子账号信息成功！");
            sessionStorage.removeItem("LOGIN_PARKING_UID");
            sessionStorage.removeItem("LOGIN_PARKING_TOKEN");
            sessionStorage.removeItem("LOGIN_PARKING_SUBID");
            sessionStorage.removeItem("LOGIN_PARKING_TYPE");
            sessionStorage.removeItem("LOGIN_PARKING_PID");
            sessionStorage.removeItem("LOGIN_PARKING_USENAME");
            that.$router.replace("/login");
          }else {
            that.$message.error(res.data.message);
          }
        },function (res) {
          that.$message.error(res);
        });
      }
    }
  }
</script>

<style scoped>
  .main{
    padding:20px 60px;
    background: #3D4E66;
    border-radius: 4px;
  }
  .main h2{
    color: #fff;
    font-weight: 300;
    padding-left:20px;
    border-left:4px solid #49a9ff;
    text-align: left;
  }
  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
</style>
<style>
  .addAccount .el-form-item__label{
    color:#fff;
  }
  .addAccount .selec{
    width:300px;
    margin-left: -194px;
  }
  .addAccount .radio{
    margin-left: -364px;
  }
  .addAccount .radio2{
    margin-left: -340px;
  }
</style>
