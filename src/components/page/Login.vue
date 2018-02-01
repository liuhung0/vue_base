<template>
  <div class="flex_box_login">
    <div class="flex_item_title">
      <h1>泊联停车场管理系统</h1>
    </div>
    <div class="flex_item_center">
      <el-form :model="boss" status-icon :rules="bossRole" ref="bossForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="boss.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="boss.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="border:none">
          <input type="text" class="yzm" />
          <button class="hq">获取验证码</button>
        </el-form-item>
      </el-form>
      <el-button @click="submitForm('bossForm')">登录</el-button>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    components: {
      ElFormItem,
      ElButton},
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
                sessionStorage.setItem("LOGIN_PARKING_PID",that.resData.data.pId);
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

<style>
  html,body{
    padding:0;
    margin:0;
    width:100vw;
    height:100vh;
  }
  .flex_box_login{
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    flex-wrap: wrap;
    background: url("../../assets/image/background-b.jpg") no-repeat;
    background-size: cover;
    min-height:101vh;
    overflow: hidden;
    flex-flow: column;
    position: relative;
  }
  .el-input__inner {
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: #CFCFCF;
  }
  .flex_item_title{
    flex: 0 0 100%;
    margin-top:12%;
  }
  .flex_item_title h1{
    font-size: 1.8rem !important;
    color: #EFEFEF;
  }
  .flex_item_center{
    width:492px;
    align-self: center;
    padding:50px 40px  20px 20px;
    background: rgba(231,236,255,0.30);
    box-shadow: 0 0 6px 0 rgba(109,114,146,0.60);
    border-radius: 6px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .flex_item_title h1{
    font-size:4.2rem;
  }
  .el-form{
    width: 100%;
    height: 100%;
    margin-left: 15%;
  }
  .el-form-item{
    width: 360px;
    border: 1px solid #FFFFFF;
    border-radius: 2px;
  }
  .el-input{
    width: 80%;
    display: flex;
    margin-top: 5px;
    background: none!important;
  }
  .el-form-item__content{
    width: 100%;
    margin-left: 0 !important;
  }
  .yzm{
    width: 50%;
    height: 35px;
    background: none;
    color: #CFCFCF;
    border: 1px solid #FFFFFF;
    margin-right: 6%;
    padding-left: 8px;
 }
  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #fff !important;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .hq{
    width: 40%;
    background: #aaaaaa;
    border-radius: 2px;
    font-size: 1rem;
    color: #FFFFFF;
    border:none !important;
    padding: 10px 20px;
  }
  .el-button{
    width: 360px;
    border:none !important;
    background: #1B94FF;
    border-radius: 2px;
    font-size: 1rem;
    color: #FFFFFF;
  }

</style>
