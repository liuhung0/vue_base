import  Vue from 'vue'

//插件开发
export default{
  install(Vue,options)
  {
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    Vue.prototype.rebackToLogin = function () {
      if(window)
      {
        window.location.href="/";
      }
    }
    Vue.prototype.Constants={
       LOGIN_USERS:"LOGIN_USERS",
       LOGIN_TOKEN:"LOGIN_TOKEN",
       BASE_URL:"",
       PROXY_URL:"",
       //发送验证码的接口地址
       REST_MEBILE_CODE:"",
    }
  }

}
