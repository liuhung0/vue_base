<template>
  <div class="main" style="width:500px;margin-left:450px;margin-top: 150px">
    <h2>修改账号密码</h2>
    <el-form ref="form" :rules="form" :model="form" label-width="100px" class="addAccount">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="passwordA">
        <el-input v-model="form.passwordA"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
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
      var validateName = (rule, value, callback) => {
        if (value === '') {
          console.log(value)
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          console.log(value)
          callback(new Error('请输入密码'));
        }else {
          callback();
        }
      };
      return {
        form: {
          passwordA:'',
          suId:'',
          password:'',
          newPassword:'',
        },
        bossRole: {
          username: [
            { validator: validateName, trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
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
            that.$emit("addOK");
          }else {
            that.$message.error(that.res.data.message);
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
