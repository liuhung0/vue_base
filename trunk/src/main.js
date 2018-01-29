// The Vue build version to load with the `import` command

import Vue from 'vue'
import App from './App'
import router from './router'
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


//引入本地全局
//引入这个可以传多个参数——fanzeyu
import VueResource from 'vue-resource'
import util from './components/plugin/util.js'
import VueSweetAlert from 'vue-sweetalert'
import VueAMap from 'vue-amap';
import VueAreaLinkage from 'vue-area-linkage';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '37693160a67c833c65e50467707a4e98',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});
Vue.use(ElementUI);

Vue.config.productionTip = false




Vue.use(VueAreaLinkage)
// globally (in your main .js file)
Vue.config.productionTip = false;
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};

Vue.use(util);
Vue.use(VueResource)
Vue.use(VueSweetAlert);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

Date.prototype.Format = function (fmt) { //author: meizz
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
};





