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
        <el-form-item  label="验证码"style="width:360px">
          <el-row style="width: 100%">
            <el-col :span="9" style="width: 30%;height:36px">
              <el-input  type="text" placeholder="请输入验证码" class="yanzhengma_input" @blur="checkLpicma"
                         v-model="boss.picLyanzhengma" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="9" style="padding-left: 65px;height:40px;">
              <el-input type="button" id="code" @click.native="createCode" class="verification1"
                        v-model="boss.checkCode"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-button @click="submitForm('bossForm')">登录</el-button>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  var code; //在全局定义验证码
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
      var validatePic = (rule, value, callback) => {
        if (value === ''){
          console.log(value)
          this.checkLpicma();
          callback(new Error('请输入验证码'));
        }else{
          callback();
        }
      };
      return {
        picLyanzhengma: '',
        checkCode: '',
        boss: {
          checkCode: '',
          picLyanzhengma:'',
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
          picLyanzhengma:[
            { validator: validatePic, trigger: 'blur'},
            { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur'}
          ],
        }
      };
    },
    mounted(){
      this.createCode();
      this.checkLpicma();
    },
    methods: {
      // 图片验证码
      createCode: function() {
        code = "";
        var codeLength = 4;//验证码的长度
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
        for (var i = 0; i < codeLength; i++) {//循环操作
          var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.boss.checkCode = code;//把code值赋给验证码
      },
      // 失焦验证图和密码
      checkLpicma: function() {
        this.boss.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写
        if (this.boss.picLyanzhengma == '') {
          $(".login_content1 span:eq(2)").removeClass("disappear");
        } else if (this.boss.picLyanzhengma.toUpperCase() != this.boss.checkCode) { //若输入的验证码与产生的验证码不一致时
          $(".login_content1 span:eq(2)").removeClass("disappear");
          this.createCode();//刷新验证码
          this.boss.picLyanzhengma = '';
        } else { //输入正确时
          $(".login_content1 span:eq(2)").addClass("disappear");
          return true;

        }

      },
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


  body{
    margin:0;
    padding:0;
  }
  .el-form-item{
    width: 360px;
  }
  .el-col{
    border:none;
  }
  .yanzhengma_input {
    width: 170px;
  }
  .verification1 {
    vertical-align: middle;
    transform: translate(0px, 0);
    width: 102px;
  }
  #code {
    font-size: 18px;
    letter-spacing: 3px;
    color: #053d84;
    background: #f2f2f5;
  }
  .disappear {
    visibility: hidden;
  }
</style>
