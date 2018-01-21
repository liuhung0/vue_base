<template>
  <div>
    <div class='textline'>
      <span>{{label}}:</span>
      <div class="input_area">
        <input type='text' v-model="currentValue" @input="emitValue"/>
        <button class="btn getCode" @click="getCode">获取验证码</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  let wait=60;
  import Toast from '@/components/cub/Toast.js'
  export default{
    props: ['value','label','phone'],
    data(){
      return {
        currentValue:this.value,
        thisphone :this.phone
      }
    },
    watch: {
        value(val,old){
            if(this.isInteger(val)) {
                val=Math.round(val * 1);
              this.currentValue = val;
            }
            else{
              this.currentValue=old;
            }
        },
        phone(val){
            this.thisphone=val;
        }
    },
    methods: {
      getCode: function (e) {
        //发送验证码
        let that = this;
        if (that.thisphone === null || that.thisphone.length === 0) {
          Toast("请先输入手机号码");
          return;
        }
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!reg.test(that.thisphone)) {
          Toast("请输入正确的手机号码");
          return;
        }
        that.$http.post(that.Constants.REST_MEBILE_CODE, {"phone": that.thisphone}, {emulateJSON: true}).then(function (response) {
            that.resData = response.data;
            if (that.resData.result) {
              Toast("验证码已经发送");
            }
            else {
              Toast(that.resData.message);
            }
          },
          function (response) {
            Toast("数据交互发生错误,请联系网络管理员");
          });
        //发送验证码的按钮事件
        (function second(e) {
          if (wait !== 0) {
            e.target.setAttribute("disabled", "disabled");
            e.target.innerText="重新发送(" + wait + ")";
            e.target.setAttribute("style", "font-size:13px;border-top:2px solid #ddd;padding:9px");
            wait--;
            setTimeout(function () {
                second(e);
              },
              1000)
          } else {
            e.target.removeAttribute("disabled");
            e.target.innerText="获取验证码";
            e.target.setAttribute("style", "font-size:15px;border-top:2px solid #ffbe96;padding:8px");
            wait = 60;
          }
        })(e);
      },
      emitValue(){
         this.$emit("input",this.currentValue);
      },
      isInteger(val) {
        let reg = /^[1-9]\d*$/;
        return reg.test(val);
      },
    }

  }
</script>
<style>
  .textline .input_area .getCode{
    margin-left:-120px;
  }

</style>
