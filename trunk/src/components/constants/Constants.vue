<script type="text/ecmascript-6">
  const LOGIN_MEMBERS_USERNAME = "LOGIN_MEMBERS_USERNAME";
  const LOGIN_MEMBERS_TOKEN = "LOGIN_MEMBERS_TOKEN";
  const LOGIN_MEMBERS_BID = "LOGIN_MEMBERS_BID";
  const LOGIN_MEMBERS_BNAME = "LOGIN_MEMBERS_BNAME";
  const LOGIN_MEMBERS_HAS_PROTECT = "LOGIN_MEMBERS_HAS_PROTECT";
  const LOGIN_MEMBERS_HAS_CASH = "LOGIN_MEMBERS_HAS_CASH";
  const LOGIN_MEMBERS_UID = "LOGIN_MEMBERS_UID";

  //客服电话
  const KEF = "400-9455-6400";
  //dev
//  const THIS_DOMAIN = "http://localhost:9000";
//  const BASE_URL = "http://localhost:9000/";
//  const PORXY_PATH = "api";
//  const THIS_DOMAIN = "http://192.168.50.200:9000";
//  const BASE_URL = "http://192.168.50.200:9000/";
//  const PORXY_PATH = "api";
//  //make
  const THIS_DOMAIN = "http://bebuy.isbein.com";
  const BASE_URL = "http://www.isbein.com";
  const PORXY_PATH = "";

  //获取验证码
  const REST_MEBILE_CODE = BASE_URL + PORXY_PATH + "/isbein/bebuy/biz/mobileCode";
  //商户登录
  const REST_MEMBERS_LOGIN = BASE_URL + PORXY_PATH + "/isbein/bebuy/biz/login";
  const REST_MEMBERS_LOGOUT = BASE_URL + PORXY_PATH + "/isbein/bebuy/biz/logout";
  //商户注册
  const REST_MEMBERS_REG = BASE_URL + PORXY_PATH + "/isbein/bebuy/biz/register";
  //商户忘记密码
  const REST_MEMBERS_FORGOT = BASE_URL + PORXY_PATH + "/isbein/bebuy/biz/forgotLoginPassword";
  //商户验证
  const REST_MEMBER_VALIDATE = BASE_URL + PORXY_PATH + "/token/bebuy/biz/validate";
  //个人账户录入
  const REST_MEMBER_PERSONAL = BASE_URL + PORXY_PATH + "/token/bebuy/biz//personal";
  //企业账户录入
  const REST_MEMBER_ENTERPRISE = BASE_URL + PORXY_PATH + "/token/bebuy/biz/enterprise";


  //注册成功 执行此接口后可直接访问管理界面
  const REST_MEMBER_SUCCESS = BASE_URL + PORXY_PATH + "/token/bebuy/biz/success";
  //获取验证信息接口
  const REST_MEMBER_INFO = BASE_URL + PORXY_PATH + "/token/bebuy/biz/info";

  const REST_BIZ_TAG_INFO = BASE_URL + PORXY_PATH + "/web/bebuy/biz/tag/info";
  const REST_BIZ_TAG_SETTING = BASE_URL + PORXY_PATH + "/web/bebuy/biz/tag/setting";


  //基础设置信息
  const REST_BASE_INFO = BASE_URL + PORXY_PATH + "/web/bebuy/basics/basicsShow";
  //基础设置保存
  const REST_BASE_SAVE = BASE_URL + PORXY_PATH + "/web/bebuy/basics/setBasics";

  //收货地址保存
  const REST_ADDRESS_SAVE = BASE_URL + PORXY_PATH + "/token/bebuy/address/add";
  //收货地址展示
  const REST_ADDRESS_LIST = BASE_URL + PORXY_PATH + "/token/bebuy/address/list";
  //收货地址展示
  const REST_ADDRESS_DELETE = BASE_URL + PORXY_PATH + "/token/bebuy/address/delateAddress";
  //设为默认
  const REST_ADDRESS_SETDEFAULT = BASE_URL + PORXY_PATH + "/token/bebuy/address/defaultAddress";

  //免费设施
  const REST_BIZ_EQUIPMENT = BASE_URL + PORXY_PATH + "/web/bebuy/biz/facilities";
  //营业时间
  const REST_BIZ_TIMES = BASE_URL + PORXY_PATH + "/web/bebuy/biz/businesshours";

  //菜单详情
  const REST_GOODS_INFO = BASE_URL + PORXY_PATH + "/web/bebuy/biz/info";
  //新增/修改菜单
  const REST_GOODS_SAVE = BASE_URL + PORXY_PATH + "/web/bebuy/biz/save";
  //菜单列表
  const REST_GOODS_LIST = BASE_URL + PORXY_PATH + "/web/bebuy/biz/list";
  //删除菜单
  const REST_GOODS_DELETE = BASE_URL + PORXY_PATH + "/web/bebuy/biz/delete";

  //包厢详情
  const REST_BOX_INFO = BASE_URL + PORXY_PATH + "/web/bebuy/box/info";
  //新增/修改包厢
  const REST_BOX_SAVE = BASE_URL + PORXY_PATH + "/web/bebuy/box/save";
  //包厢列表
  const REST_BOX_LIST = BASE_URL + PORXY_PATH + "/web/bebuy/box/list";
  //删除包厢
  const REST_BOX_DELETE = BASE_URL + PORXY_PATH + "/web/bebuy/box/delete";
  //预订总列表
  const REST_YD_ALL = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/allData";
  //预订信息
  const REST_YD_WBOX = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/info";
  //预订列表
  const REST_YD_LIST = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/list";
  //预订设置
  const REST_YD_SETTING = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/setting";
  //预订新增
  const REST_YD_SAVE = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/save";
  //预订修改
  const REST_YD_UPDATE = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/update";
  //预订完成
  const REST_YD_FINISH = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/finish";
  //某座位或包厢预订列表
  const REST_YD_LIST_WITHBOX = BASE_URL + PORXY_PATH + "/web/bebuy/reserve/listWithBox";


  //代金券列表
  const REST_COUPON_LIST = BASE_URL + PORXY_PATH + "/web/bebuy/coupon/list";
  //代金券设置
  const REST_COUPON_SETTING = BASE_URL + PORXY_PATH + "/web/bebuy/coupon/setting";

  //到店付设置
  const REST_ARRIVALPAY_SETTING = BASE_URL + PORXY_PATH + "/web/bebuy/biz/arrivalpay";

  //保护密码设置
  const REST_ANQUAN_BAOHU = BASE_URL + PORXY_PATH + "/web/bebuy/safety/protect";
  //保护密码修改
  const REST_ANQUAN_BAOHU_UPDATE = BASE_URL + PORXY_PATH + "/web/bebuy/safety/updateProtectPassword";

  //登录密码修改
  const REST_ANQUAN_DENGLU = BASE_URL + PORXY_PATH + "/web/bebuy/safety/changeLoginPassword";

  //提现密码修改
  const REST_ANQUAN_TIXIAN = BASE_URL + PORXY_PATH + "/web/bebuy/safety/updateCashPassword";
  const REST_ANQUAN_TIXIAN_SETTING = BASE_URL + PORXY_PATH + "/web/bebuy/safety/cash";

  //手机号码修改

  const REST_ANQUAN_PHONE = BASE_URL + PORXY_PATH + "/web/bebuy/safety/bindPhone";


  //银行卡添加
  const REST_ANQUAN_BANKCARD_ADD = BASE_URL + PORXY_PATH + "/web/bebuy/safety/bank";
  //银行卡列表
  const REST_ANQUAN_BANKCARD_LIST = BASE_URL + PORXY_PATH + "/web/bebuy/safety/bankList";
  //银行卡删除
  const REST_ANQUAN_BANKCARD_DEL = BASE_URL + PORXY_PATH + "/web/bebuy/safety/delBank";

  const REST_ANQUAN_CHILD_LIST = BASE_URL + PORXY_PATH + "/web/bebuy/safety/child/list";
  const REST_ANQUAN_CHILD_ADD = BASE_URL + PORXY_PATH + "/web/bebuy/safety/child/add";
  const REST_ANQUAN_CHILD_DEL = BASE_URL + PORXY_PATH + "/web/bebuy/safety/child/del";
  const REST_ANQUAN_ROLE_LIST_ALL = BASE_URL + PORXY_PATH + "/web/bebuy/safety/role/list";

  //素材列表
  const REST_DREW_LIST = BASE_URL + PORXY_PATH + "//token/bein/drew/drewList";
  //素材包添加
  const REST_DREW_DIR_ADD = BASE_URL + PORXY_PATH + "/token/bein/drew/dir/add";
  //素材添加
  const REST_DREW_FILE_ADD = BASE_URL + PORXY_PATH + "/token/bein/drew/file/add";
  //素材删除
  const REST_DREW_DELETE = BASE_URL + PORXY_PATH + "/token/bein/drew/delete";

  const REST_USER_RECOMMEND_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/recommend/list";
  const REST_USER_RECOMMEND_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/recommend/edit";
  const REST_USER_RECOMMEND_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/recommend/info";
  const REST_USER_BIZ_SIMPLE_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/recommend/biz/list";
  const REST_USER_BIZ_GOODS_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/recommend/goods/list";
  const REST_USER_RECOMMEND_TYPE_LIST = BASE_URL + PORXY_PATH + "/r/bein/forum/commendsTypeList?time=" + new Date().getTime();
  const REST_USER_RECOMMEND_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/recommend/mobileT";
  const REST_USER_RICH_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/recommend/mobile1";
  const REST_USER_VOTE_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/recommend/mobile2";
  const REST_USER_TALK_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/recommend/mobile3";
  const REST_USER_ACTIVITY_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/activityGoods/mobileT";
  const REST_USER_ACTIVITYI_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/activityGoods/mobileI";
  const REST_USER_VERIFY_PREVIEW = BASE_URL + PORXY_PATH + "/token/admin/Recommon/mobileI";
  const REST_USER_IMAGE_PREVIEW = BASE_URL + PORXY_PATH + "/admin/bein/recommend/mobileT";
  const REST_USER_VOTEVERIFY_PREVIEW = BASE_URL + PORXY_PATH + "/token/admin/PostVerity/mobileB";
  const REST_USER_VERIFYTALK_PREVIEW = BASE_URL + PORXY_PATH + "/token/admin/talkVerity/mobileB";

  const REST_USER_THREAD_PUSH = BASE_URL + PORXY_PATH + "/token/bein/web/thread/push";
  const REST_USER_THREAD_AGREE = BASE_URL + PORXY_PATH + "/token/bein/web/thread/agree";
  const REST_USER_THREAD_DISAGREE = BASE_URL + PORXY_PATH + "/token/bein/web/thread/disagree";
  const REST_USER_THREAD_REBACK = BASE_URL + PORXY_PATH + "/token/bein/web/thread/reback";
  const REST_USER_THREAD_DELETE = BASE_URL + PORXY_PATH + "/token/bein/web/thread/delete";

  const REST_USER_VOTE_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/vote/list";
  const REST_USER_VOTE_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/vote/edit";
  const REST_USER_VOTE_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/vote/info";

  const REST_USER_TALK_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/talk/list";
  const REST_USER_TALK_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/talk/edit";
  const REST_USER_TALK_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/talk/info";

  const REST_USER_RICH_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/richtext/list";
  const REST_USER_RICH_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/richtext/edit";
  const REST_USER_RICH_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/richtext/info";
  const REST_USER_RICH_TYPE_LIST = BASE_URL + PORXY_PATH + "/r/bein/forum/topicTypeList?time=" + new Date().getTime();

  const REST_USER_ACTIVITY_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/activity/list";
  const REST_USER_ACTIVITY_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/activity/edit";
  const REST_USER_ACTIVITY_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/activity/info";
  const REST_USER_ACTIVITY_DETAILS = BASE_URL + PORXY_PATH + "/token/bein/web/activity/details";
  const REST_USER_ACTIVITY_WINNER = BASE_URL + PORXY_PATH + "/token/bein/web/activity/winner";

  const REST_USER_NECHAR_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/nechar/list";
  const REST_USER_NECHAR_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/nechar/edit";
  const REST_USER_NECHAR_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/nechar/info";

  const REST_USER_REDBAG_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/redbag/list";
  const REST_USER_REDBAG_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/redbag/edit";
  const REST_USER_REDBAG_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/redbag/info";
  const REST_USER_REDBAG_DETAILS = BASE_URL + PORXY_PATH + "/token/bein/web/redbag/details";
  const REST_USER_REDBAGVIEW = BASE_URL + PORXY_PATH + "/admin/bein/redbag/redBagView";
  const REST_USER_NECHARVIEW = BASE_URL + PORXY_PATH + "/admin/bein/nectarbag/necharView";
  const REST_USER_REDBAG_DELETE = BASE_URL + PORXY_PATH + "/token/bein/web/redbag/delete";
  const REST_USER_NECHAR_DELETE = BASE_URL + PORXY_PATH + "/token/bein/web/nechar/delete";
  const REST_ADMIN_BEBUY_APPLY_LIST = BASE_URL + PORXY_PATH + "/token/admin/bebuy/applay/list";
  const REST_ADMIN_BEBUY_APPLY_AGREE = BASE_URL + PORXY_PATH + "/token/admin/bebuy/applay/agree";
  const REST_ADMIN_BEBUY_APPLY_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/bebuy/applay/disagree";
  const REST_ADMIN_BEBUY_APPLY_DEL = BASE_URL + PORXY_PATH + "/token/admin/bebuy/applay/del";

  const REST_ADMIN_BEBUY_BACTIVITY_LIST = BASE_URL + PORXY_PATH + "/token/admin/bebuy/bactivity/list";
  const REST_ADMIN_BEBUY_PARTYVITY_LIST = BASE_URL + PORXY_PATH + "/token/admin/bebuy/partyvity/list";

  const REST_ADMIN_LIVE_VERITY_LIST = BASE_URL + PORXY_PATH + "/token/admin/live/verity/list";
  const REST_ADMIN_LIVE_VERITY_AGREE = BASE_URL + PORXY_PATH + "/token/admin/live/verity/agree";
  const REST_ADMIN_LIVE_VERITY_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/live/verity/disagree";
  const REST_ADMIN_LIVE_VERITY_DEL = BASE_URL + PORXY_PATH + "/token/admin/live/verity/del";

  const REST_ADMIN_LINE_VERITY_LIST = BASE_URL + PORXY_PATH + "/token/isbein/tour/lineList";
  const REST_ADMIN_LINE_VERITY_AGREE = BASE_URL + PORXY_PATH + "/token/isbein/tour/agree";
  const REST_ADMIN_LINE_VERITY_DISAGREE = BASE_URL + PORXY_PATH + "/token/isbein/tour/disagree";

  const REST_ADMIN_BUSINESS_VERITY_LIST = BASE_URL + PORXY_PATH + "/token/isbein/tour/recommendList";
  const REST_ADMIN_BUSINESS_VERITY_DEL = BASE_URL + PORXY_PATH + "/token/isbein/tour/recommendDel";

  const REST_ADMIN_USER_INSIDE_LIST = BASE_URL + PORXY_PATH + "/token/admin/user/insider/list";
  const REST_ADMIN_USER_INSIDE_AGREE = BASE_URL + PORXY_PATH + "/token/admin/user/insider/agree";
  const REST_ADMIN_USER_INSIDE_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/user/insider/disagree";
  const REST_ADMIN_USER_INSIDE_DEL = BASE_URL + PORXY_PATH + "/token/admin/user/insider/del";
  //用户相关
  const REST_ADMIN_USER_LIST = BASE_URL + PORXY_PATH + "/token/admin/user/list";
  const REST_ADMIN_USER_EDIT = BASE_URL + PORXY_PATH + "/token/admin/user/edit";
  const REST_ADMIN_USER_INFO = BASE_URL + PORXY_PATH + "/token/admin/user/info";
  //商户相关
  const REST_ADMIN_BUSINESSES_LIST = BASE_URL + PORXY_PATH + "/token/admin/businesses/list";

  const REST_COMMEND_LIST_AGREE = BASE_URL + PORXY_PATH + "/token/bein/web/thread/agree";
  const REST_COMMEND_LIST_DISAGREE = BASE_URL + PORXY_PATH + "/token/bein/web/thread/agree";
  //图文审核
  const REST_ADMIN_ACTIIVVER_LIST = BASE_URL + PORXY_PATH + "/token/admin/ActivityVerify/list";
  const REST_ADMIN_ACTIIVVER_DEL = BASE_URL + PORXY_PATH + "/token/admin/ActivityVerify/del";
  const REST_ADMIN_ACTIIVVER_AGREE = BASE_URL + PORXY_PATH + "/token/admin/ActivityVerify/agree";
  const REST_ADMIN_ACTIIVVER_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/ActivityVerify/disagree";

  const REST_ADMIN_RECOMMON_LIST = BASE_URL + PORXY_PATH + "/token/admin/Recommon/list";
  const REST_ADMIN_RECOMMON_DEL = BASE_URL + PORXY_PATH + "/token/admin/Recommon/del";
  const REST_ADMIN_RECOMMON_AGREE = BASE_URL + PORXY_PATH + "/token/admin/Recommon/agree";
  const REST_ADMIN_RECOMMON_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/Recommon/disagree";
  const REST_ADMIN_RECOMMON_ISOFF = BASE_URL + PORXY_PATH + "/token/admin/Recommon/isOff";

  const REST_ADMIN_POSTVERITY_LIST = BASE_URL + PORXY_PATH + "/token/admin/PostVerity/list";
  const REST_ADMIN_POSTVERITY_DEL = BASE_URL + PORXY_PATH + "/token/admin/PostVerity/del";
  const REST_ADMIN_POSTVERITY_AGREE = BASE_URL + PORXY_PATH + "/token/admin/PostVerity/agree";
  const REST_ADMIN_POSTVERITY_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/PostVerity/disagree";
  const REST_ADMIN_TALKVERITY_LIST = BASE_URL + PORXY_PATH + "/token/admin/talkVerity/list";
  const REST_ADMIN_TALKVERITY_DEL = BASE_URL + PORXY_PATH + "/token/admin/talkVerity/del";
  const REST_ADMIN_TALKVERITY_AGREE = BASE_URL + PORXY_PATH + "/token/admin/talkVerity/agree";
  const REST_ADMIN_TALKVERITY_DISAGREE = BASE_URL + PORXY_PATH + "/token/admin/talkVerity/disagree";

  const REST_ADMIN_MENU_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/user/menu/list";
  const REST_ADMIN_MENU_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/menu/edit";
  const REST_ADMIN_MENU_DEL = BASE_URL + PORXY_PATH + "/token/bein/web/menu/delete";

  const REST_ADMIN_ROLE_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/role/edit";
  //角色管理
  const REST_ADMIN_ROLE_LIST = BASE_URL + PORXY_PATH + "/token/bein/web/user/role/list";
  const REST_ADMIN_ROLE_DEL = BASE_URL + PORXY_PATH + "/token/bein/web/role/delete";
  const REST_ADMMIN_ROLE_INFO = BASE_URL + PORXY_PATH + "/token/bein/web/role/info";

  const REST_ADMIN_USER_ROLE_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/user/role/edit";
  const REST_ADMIN_USER_MENU_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/user/menu/edit";
  const REST_ADMIN_ROLE_MENU_EDIT = BASE_URL + PORXY_PATH + "/token/bein/web/role/menu/edit";

  const REST_ADMIN_ORDER_LIST = BASE_URL + PORXY_PATH + "/token/admin/order/list";
  const REST_ADMIN_ORDER_DETAILS = BASE_URL + PORXY_PATH + "/token/admin/order/OrderDetails";
  //清分明细
  const REST_USER_CLEAR_DEATILS = BASE_URL + PORXY_PATH + "/token/clear/deatils/clearList";
  //结算明细
  const REST_USER_SETTLE_DEATILS = BASE_URL + PORXY_PATH + "/token/clear/deatils/settleList";
  //错误清分
  const REST_USER_ERROR_DEATILS = BASE_URL + PORXY_PATH + "/token/clear/deatils/errorList";

  const REST_USER_ISBIZ =BASE_URL +PORXY_PATH +"/token/bein/web/isBiz";

  export default {
    KEF,
    LOGIN_MEMBERS_USERNAME,
    LOGIN_MEMBERS_TOKEN,
    LOGIN_MEMBERS_BID,
    LOGIN_MEMBERS_UID,
    LOGIN_MEMBERS_BNAME,
    LOGIN_MEMBERS_HAS_PROTECT,
    LOGIN_MEMBERS_HAS_CASH,

    REST_BIZ_TAG_INFO,
    REST_BIZ_TAG_SETTING,
    THIS_DOMAIN,
    BASE_URL,

    REST_MEBILE_CODE,
    REST_MEMBERS_LOGIN,
    REST_MEMBERS_LOGOUT,
    REST_MEMBERS_REG,
    REST_MEMBERS_FORGOT,
    REST_MEMBER_VALIDATE,
    REST_MEMBER_PERSONAL,
    REST_MEMBER_ENTERPRISE,
    REST_MEMBER_SUCCESS,
    REST_MEMBER_INFO,

    REST_BASE_INFO,
    REST_BASE_SAVE,
    REST_ADDRESS_SAVE,
    REST_ADDRESS_LIST,
    REST_ADDRESS_DELETE,
    REST_ADDRESS_SETDEFAULT,
    REST_BIZ_EQUIPMENT,
    REST_BIZ_TIMES,
    REST_GOODS_INFO,
    REST_GOODS_SAVE,
    REST_GOODS_LIST,
    REST_GOODS_DELETE,
    REST_BOX_INFO,


    REST_BOX_SAVE,
    REST_BOX_LIST,
    REST_BOX_DELETE,

    REST_YD_ALL,
    REST_YD_WBOX,
    REST_YD_LIST,
    REST_YD_SETTING,
    REST_YD_SAVE,
    REST_YD_FINISH,
    REST_YD_UPDATE,
    REST_YD_LIST_WITHBOX,

    REST_COUPON_LIST,
    REST_COUPON_SETTING,

    REST_ARRIVALPAY_SETTING,

    REST_ANQUAN_BAOHU,
    REST_ANQUAN_BAOHU_UPDATE,

    REST_ANQUAN_DENGLU,

    REST_ANQUAN_TIXIAN,
    REST_ANQUAN_TIXIAN_SETTING,

    REST_ANQUAN_PHONE,

    REST_ANQUAN_BANKCARD_ADD,
    REST_ANQUAN_BANKCARD_LIST,
    REST_ANQUAN_BANKCARD_DEL,

    REST_ANQUAN_CHILD_LIST,
    REST_ANQUAN_CHILD_ADD,
    REST_ANQUAN_CHILD_DEL,
    REST_ANQUAN_ROLE_LIST_ALL,

    REST_DREW_LIST,
    REST_DREW_DIR_ADD,
    REST_DREW_FILE_ADD,
    REST_DREW_DELETE,

    REST_USER_THREAD_PUSH,
    REST_USER_THREAD_REBACK,
    REST_USER_THREAD_DELETE,

    REST_USER_RECOMMEND_LIST,
    REST_USER_RECOMMEND_EDIT,
    REST_USER_BIZ_SIMPLE_LIST,
    REST_USER_BIZ_GOODS_LIST,
    REST_USER_RECOMMEND_TYPE_LIST,
    REST_USER_RECOMMEND_INFO,
    REST_USER_RECOMMEND_PREVIEW,
    REST_USER_RICH_PREVIEW,
    REST_USER_VOTE_PREVIEW,
    REST_USER_TALK_PREVIEW,
    REST_USER_ACTIVITY_PREVIEW,
    REST_USER_ACTIVITYI_PREVIEW,

    REST_USER_VOTE_LIST,
    REST_USER_VOTE_EDIT,
    REST_USER_VOTE_INFO,

    REST_USER_TALK_LIST,
    REST_USER_TALK_EDIT,
    REST_USER_TALK_INFO,

    REST_USER_RICH_LIST,
    REST_USER_RICH_EDIT,
    REST_USER_RICH_INFO,
    REST_USER_RICH_TYPE_LIST,


    REST_USER_ACTIVITY_LIST,
    REST_USER_ACTIVITY_EDIT,
    REST_USER_ACTIVITY_INFO,


    REST_USER_NECHAR_LIST,
    REST_USER_NECHAR_EDIT,
    REST_USER_NECHAR_INFO,
    REST_USER_REDBAG_LIST,
    REST_USER_REDBAG_EDIT,
    REST_USER_REDBAG_INFO,
    REST_USER_REDBAGVIEW,
    REST_USER_NECHARVIEW,
    REST_USER_REDBAG_DELETE,

    REST_ADMIN_BEBUY_APPLY_LIST,
    REST_ADMIN_BEBUY_APPLY_AGREE,
    REST_ADMIN_BEBUY_APPLY_DISAGREE,
    REST_ADMIN_BEBUY_APPLY_DEL,

    REST_ADMIN_BEBUY_BACTIVITY_LIST,
    REST_ADMIN_BEBUY_PARTYVITY_LIST,

    REST_ADMIN_LIVE_VERITY_LIST,
    REST_ADMIN_LIVE_VERITY_AGREE,
    REST_ADMIN_LIVE_VERITY_DISAGREE,
    REST_ADMIN_LIVE_VERITY_DEL,

    REST_ADMIN_USER_INSIDE_LIST,
    REST_ADMIN_USER_INSIDE_AGREE,
    REST_ADMIN_USER_INSIDE_DISAGREE,
    REST_ADMIN_USER_INSIDE_DEL,

    REST_ADMIN_USER_LIST,
    REST_ADMIN_USER_EDIT,
    REST_ADMIN_USER_INFO,

    REST_COMMEND_LIST_AGREE,
    REST_COMMEND_LIST_DISAGREE,

    REST_ADMIN_BUSINESSES_LIST,

    REST_ADMIN_MENU_LIST,
    REST_ADMIN_MENU_EDIT,
    REST_ADMIN_MENU_DEL,

    REST_ADMIN_ROLE_LIST,
    REST_ADMIN_ROLE_EDIT,
    REST_ADMIN_ROLE_DEL,
    REST_ADMMIN_ROLE_INFO,

    REST_ADMIN_ROLE_MENU_EDIT,
    REST_ADMIN_USER_ROLE_EDIT,
    REST_ADMIN_USER_MENU_EDIT,


    REST_ADMIN_ACTIIVVER_LIST,
    REST_ADMIN_ACTIIVVER_DEL,
    REST_ADMIN_ACTIIVVER_AGREE,
    REST_ADMIN_ACTIIVVER_DISAGREE,

    REST_ADMIN_POSTVERITY_LIST,
    REST_ADMIN_POSTVERITY_DEL,
    REST_ADMIN_POSTVERITY_AGREE,
    REST_ADMIN_POSTVERITY_DISAGREE,

    REST_ADMIN_RECOMMON_LIST,
    REST_ADMIN_RECOMMON_DEL,
    REST_ADMIN_RECOMMON_AGREE,
    REST_ADMIN_RECOMMON_DISAGREE,
    REST_ADMIN_RECOMMON_ISOFF,

    REST_ADMIN_TALKVERITY_LIST,
    REST_ADMIN_TALKVERITY_DEL,
    REST_ADMIN_TALKVERITY_AGREE,
    REST_ADMIN_TALKVERITY_DISAGREE,

    REST_ADMIN_ORDER_LIST,
    REST_ADMIN_ORDER_DETAILS,
    REST_USER_ACTIVITY_DETAILS,
    REST_USER_REDBAG_DETAILS,
    REST_USER_VERIFY_PREVIEW,
    REST_USER_IMAGE_PREVIEW,
    REST_USER_VOTEVERIFY_PREVIEW,
    REST_USER_VERIFYTALK_PREVIEW,
    REST_USER_NECHAR_DELETE,
    REST_USER_CLEAR_DEATILS,
    REST_USER_SETTLE_DEATILS,
    REST_USER_ERROR_DEATILS,
    REST_USER_ISBIZ,
    REST_ADMIN_LINE_VERITY_LIST,
    REST_ADMIN_LINE_VERITY_DISAGREE,
    REST_ADMIN_LINE_VERITY_AGREE,
    REST_ADMIN_BUSINESS_VERITY_LIST,
    REST_ADMIN_BUSINESS_VERITY_DEL,
    REST_USER_THREAD_AGREE,
    REST_USER_THREAD_DISAGREE,
    REST_USER_ACTIVITY_WINNER,
  }
</script>
