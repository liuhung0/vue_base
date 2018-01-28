//插件开发
export default {
  install(Vue, options) {
    Date.prototype.Format = function (fmt) {
      let o = {
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
    };
    Vue.prototype.rebackToLogin = function () {
      if (window) {
        window.location.href = "/";
      }
    };
    Vue.prototype.Constants = function () {
      let LOGIN_CLOUD_USERNAME = "LOGIN_CLOUD_USERNAME",
        LOGIN_CLOUD_TOKEN = "LOGIN_CLOUD_TOKEN",
        LOGIN_CLOUD_UID = "LOGIN_CLOUD_UID",
        LOGIN_COULD_TYPE = "LOGIN_COULD_TYPE";
      //dev

      let BASE_URL = "http://192.168.0.11:9109";
      let PROXY_URL = "";
      // let BASE_URL ="http://cloud.chinahtiot.com",PROXY_URL="/api";
      return {
        LOGIN_COULD_TYPE,
        LOGIN_CLOUD_USERNAME,
        LOGIN_CLOUD_TOKEN,
        LOGIN_CLOUD_UID,
        BASE_URL:BASE_URL,
        PROXY_URL:PROXY_URL,
        //用户个人中心信息展示
        REST_GATE_LOG_LIST: BASE_URL + PROXY_URL + "/gate/log",
        REST_GATE_LOG_INFO: BASE_URL + PROXY_URL + "/gate/log",
        REST_WORKLOG_LIST:  BASE_URL +PROXY_URL  +  "",

        //用户登录接口
        REST_USER_LOGIN: BASE_URL + PROXY_URL + "/parkingManager/v1/user/userLogin",
        //用户登出接口
        REST_USER_LOGINOUT: BASE_URL + PROXY_URL + "/parkingManager/v1/user/loginOut",
        //基础设置企业信息展示
        REST_MERCHANT_INFO: BASE_URL + PROXY_URL + "/parkingManager/v1/OwnerAndParking/queryMerchantByUid",
        //企业信息和企业信息新增
        REST_MERCHANT_ADD: BASE_URL + PROXY_URL + "/parkingManager/v1/OwnerAndParking/addMerchant",
        //收费引擎接口
        REST_MERCHANT_SETPRICE: BASE_URL + PROXY_URL + "/parkingManager/v1/setParkingPrice/andParkingPrice",

        VIP_LIST: BASE_URL + PROXY_URL + "/parkingManager/v1/vip/getVipInfo",

        VIP_ADD: BASE_URL + PROXY_URL + "/parkingManager/v1/vip/saveVipInfo",

        VIP_PARKING_LIST: BASE_URL + PROXY_URL +"/parkingManager/v1/vip/getParkingList",

        //停车场出入记录
        PARKING_EXIT:BASE_URL + PROXY_URL + "/parkingManager/v1/record/recordList",
        //导出停车场excel表格
        EXCEL:BASE_URL + PROXY_URL + "/parkingManager/v1/record/download/",
        //导出财务报表excel表格
        DOWNLOADFINACE:BASE_URL + PROXY_URL + "/parkingManager/v1/record/downloadFinace/",
        //财务列表
        FINANCE_LIST:BASE_URL + PROXY_URL + "/parkingManager/v1/financeList/financeList",
        //各类车辆数，及其收入金额
        CARTYPE:BASE_URL + PROXY_URL + "/parkingManager/v1/financeList/carType",
        //查詢全年月数据
        MONTHMPNRY:BASE_URL + PROXY_URL + "/parkingManager/v1/financeList/monthMoney",
        //查询当年数据
        PARKING_YEAR_LIST:BASE_URL + PROXY_URL+"/parkingManager/v1/record/allYear",
        //按照条件年月日周查询，进出车辆及其收入
        DATECARTYPE:BASE_URL + PROXY_URL + "/parkingManager/v1/financeList/dateCarType",
       }

    }
  }

}
