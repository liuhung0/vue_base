// The Vue build version to load with the `import` command

import Vue from 'vue'
import App from './App'
import router from './router'


//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = false


//引入 axios
import axios from 'axios'
Vue.prototype.$http = axios

// globally (in your main .js file)
Vue.config.productionTip = false;
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};
//引入本地全局
import util from './components/plugin/util.js'
Vue.use(util);

import VueSweetAlert from 'vue-sweetalert'
Vue.use(VueSweetAlert)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



