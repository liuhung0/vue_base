<template>
  <div class="flex_box">
    <div class="flex_item_title">
      <h1>泊联停车场管理系统</h1>
    </div>
    <div class="flex_item_center">
      <el-form :model="boss" status-icon :rules="bossRole" ref="bossForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="boss.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="boss.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('bossForm')">提交</el-button>
          <el-button @click="resetForm('bossForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
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
        boss: {
          username: '',
          password: '',
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this;
            this.$http.post(that.Constants().REST_USER_LOGIN, that.boss,{emulateJSON: true}).then(function (response) {
              that.resData = response.data;
              if (that.resData.result) {
                //登录成功
                //登录信息保存在sessionStorage中
                sessionStorage.setItem("LOGIN_PARKING_USENAME",that.boss.username);
                sessionStorage.setItem("LOGIN_PARKING_SUBID",that.resData.data.subId);
                sessionStorage.setItem("LOGIN_PARKING_UID", that.resData.data.uid);
                sessionStorage.setItem("LOGIN_PARKING_TOKEN", that.resData.data.token);
                sessionStorage.setItem("LOGIN_PARKING_TYPE", that.resData.data.type);
                that.$router.replace("/main");
                that.$message.success('登录成功');
              }
              else {
                that.$message.error(that.resData.message);
//                if(that.resData.message=='账号未激活,请激活!'){
//                  that.$router.replace("/fore/active/"+username);
//                }
              }
            },function (res) {
              that.$message.error(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  html,body{
    padding:0;
    margin:0;
    width:100vw;
    height:100vh;
  }
  .flex_box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background:#48ace6;
    min-height:101vh;
    overflow: hidden;
    flex-flow: column;

  }
  .flex_item_title  {
    flex: 0 0 100%;
  }
  .flex_item_center{
    width:480px;
    align-self: center;
    border:1px solid  #ccc;
    padding:100px 40px  20px 20px;
    border-radius: 4px;
    background:#f3f3f6;
  }
  .flex_item_title h1{
    font-size:4.2rem;
  }


</style>
