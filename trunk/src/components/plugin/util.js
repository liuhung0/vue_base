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

      let BASE_URL = "http://192.168.0.45:9000";
      let PROXY_URL = "/api";
      // let BASE_URL ="http://cloud.chinahtiot.com",PROXY_URL="/api";
      return {
        LOGIN_COULD_TYPE,
        LOGIN_CLOUD_USERNAME,
        LOGIN_CLOUD_TOKEN,
        LOGIN_CLOUD_UID,
        BASE_URL:BASE_URL,
        PROXY_URL:PROXY_URL,

        //停车场出入口列表
        REST_BARRIER_LIST: BASE_URL + PROXY_URL + "/parkingManager/v1/barrier/list",
        REST_RECORD_IN_FIRST: BASE_URL + PROXY_URL + "/parkingManager/v1/barrier/in",
        REST_RECORD_OUT_FIRST: BASE_URL + PROXY_URL + "/parkingManager/v1/barrier/out",
        REST_WORKLOG_LIST:  BASE_URL +PROXY_URL  +  "",

        //用户登录接口
        REST_USER_LOGIN: BASE_URL + PROXY_URL + "/parkingManager/v1/user/userLogin",
        //用户修改密码
        REST_USER_UPDATA_PASSWORD: BASE_URL + PROXY_URL + "/parkingManager/v1/work/updateSubPassword",
        //用户登出接口
        REST_USER_LOGINOUT: BASE_URL + PROXY_URL + "/parkingManager/v1/user/loginOut",
        //基础设置企业信息展示
        REST_MERCHANT_INFO: BASE_URL + PROXY_URL + "/parkingManager/v1/OwnerAndParking/queryMerchantByUid",
        //企业信息和企业信息新增
        REST_MERCHANT_ADD: BASE_URL + PROXY_URL + "/parkingManager/v1/OwnerAndParking/addMerchant",
        //收费引擎接口
        REST_MERCHANT_SETPRICE: BASE_URL + PROXY_URL + "/parkingManager/v1/setParkingPrice/addParkingPrice",
        //根据pid查询收费引擎设置
        REST_MERCHANT_QUERYPRICE: BASE_URL + PROXY_URL + "/parkingManager/v1/setParkingPrice/queryParkingPriceByPid",

        /*
        *vip
        * begin
        */

        //vip列表
        VIP_LIST: BASE_URL + PROXY_URL + "/parkingManager/v1/vip/getTenant",
        //Vip添加
        VIP_ADD: BASE_URL + PROXY_URL + "/parkingManager/v1/vip/saveVipInfo",
        //vip停车场选择下拉框
        VIP_PARKING_LIST: BASE_URL + PROXY_URL +"/parkingManager/v1/vip/getParkingList",
        //vip根据id查询
        VIP_ID_LIST: BASE_URL + PROXY_URL +"/parkingManager/v1/vip/setVipId",
        //修改
        VIP_ID_EDIT: BASE_URL + PROXY_URL +"/parkingManager/v1/vip/updateVipInfo",
        //删除
        VIP_ID_DEL: BASE_URL + PROXY_URL +"/parkingManager/v1/vip/deleteVipInfo",
        //冻结Vip
        VIP_FREEZE:BASE_URL + PROXY_URL +"/parkingManager/v1/vip/setVipFreeze/",
        //解冻Vip
        VIP_THAW:BASE_URL + PROXY_URL +"/parkingManager/v1/vip/setVipThaw/",

        VIP_MANAGE: BASE_URL + PROXY_URL +"/parkingManager/v1/vip/getManagementExpense",

        /*
        *vip
        *end
         */

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
        //打卡接口
        REST_USER_CLOCKONANDOFF:BASE_URL + PROXY_URL + "/parkingManager/v1/work/clockOnAndOff",
        //根据当前的子账号id，查询当天的打卡状态
        REST_USER_QUERYWORKINFO:BASE_URL + PROXY_URL + "/parkingManager/v1/work/queryWorkInfo",
        //根据当前的uid查询打卡列表
        REST_USER_QUERYWORK_LIST:BASE_URL + PROXY_URL + "/parkingManager/v1/work/queryWorkList",


        //角色
        //列表
        REST_RULE_LIST:BASE_URL + PROXY_URL + "/parkingManager/v1/rule",
        //保存
        REST_RULE_SAVE:BASE_URL + PROXY_URL + "/parkingManager/v1/rule/save",
        //单条
        REST_RULE_INFO:BASE_URL + PROXY_URL + "/parkingManager/v1/rule/info",
        //删除
        REST_RULE_DELETE:BASE_URL + PROXY_URL + "/parkingManager/v1/rule/delete",
        //权限列表接口
        REST_MENU_LIST:BASE_URL + PROXY_URL + "/parkingManager/v1/menu",

        //新增子账号管理
        REST_SUB_USER_SAVE:BASE_URL + PROXY_URL + "/parkingManager/v1/work/save",
        //查询用户列表
        REST_SUB_USER_LIST:BASE_URL + PROXY_URL  + "/parkingManager/v1/work/queryInfoList",
        //根据id获取单个账户信息
        REST_SUB_USER_INFO: BASE_URL + PROXY_URL + "/parkingManager/v1/work/info",

        //根据id删除账号
        REST_SUB_USER_DELETE_INFO: BASE_URL + PROXY_URL + "/parkingManager/v1/work/delete",
        //查看角色列表
        REST_SUB_USER_ROLE_INFO:BASE_URL + PROXY_URL + "/parkingManager/v1/work/queryRuleInfo",


        HOUSE_OWNER_LIST:BASE_URL + PROXY_URL + "/parkingManager/v1/houseOwner/houseOwnerList",


        HOUSE_OWNER_ADD:BASE_URL + PROXY_URL + "/parkingManager/v1/houseOwner/addOwner",

        HOUSE_OWNER_ID:BASE_URL + PROXY_URL + "/parkingManager/v1/houseOwner/houseById",
        //门闸进场操作
        REST_MENZHA_SAVE: BASE_URL + PROXY_URL + "/parkingManager/v1/barrier/gateIn",
        //门闸离场操作
        REST_MENZHA_OUT: BASE_URL + PROXY_URL + "/parkingManager/v1/barrier/gateout",
        //门闸免费操作
        REST_MENZHA_FREE: BASE_URL + PROXY_URL + "/parkingManager/v1/barrier/freeout",

        //根据子账号uId查询权限列表
        REST_ROLE_SU_ID: BASE_URL + PROXY_URL + "/parkingManager/v1/user/queryBySuidRole",

        HOUSE_OWNER_DELETE:BASE_URL + PROXY_URL + "/parkingManager/v1/houseOwner/delOwner",

        ORDER_LIST:BASE_URL + PROXY_URL + "/parkingManager/v1/order/orderList",

        //导出停车场excel表格
        EXCEL_ORDER:BASE_URL + PROXY_URL + "/parkingManager/v1/excel/download/",

        /*
        *黑白名单
        * begin
         */

        SPECIAlVEHICLE_LIST:BASE_URL + PROXY_URL +"/parkingManager/v1/SpecialVehicle/get",

        SPECIAlVEHICLE_ADD:BASE_URL + PROXY_URL +"/parkingManager/v1/SpecialVehicle/save",

        SPECIAlVEHICLE_ID:BASE_URL + PROXY_URL + "/parkingManager/v1/SpecialVehicle/queryById",

        SPECIAlVEHICLE_DELETE:BASE_URL + PROXY_URL + "/parkingManager/v1/SpecialVehicle/delete",
        /*
        *黑白名单
        * begin
         */

       }
    }
  }

}
