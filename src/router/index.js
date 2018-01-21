import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/map'
/*import index from '@/components/index'
import main from '@/components/main'*/
import index from '@/components/index'
import map from '@/components/map'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/page',
      name:'map',
      component:map
    }
  ]
})
