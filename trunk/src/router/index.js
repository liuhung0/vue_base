import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/page/Login'
import Main from '@/components/page/Main'
import Welcome from '@/components/page/WelCome'

import OrderList from '@/components/page/log/OrderList'
import PeccancyList from '@/components/page/log/PeccancyList'
import SettleList from '@/components/page/log/SettleList'

import AccountList from '@/components/page/account/AccountList'
import WorkLog from '@/components/page/account/WorkLog'

import PDAList from '@/components/page/device/Pda'
import DeviceList from '@/components/page/device/Device'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path: '/main/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/main/welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/main/log/inout',
          name: 'inout',
          component: Welcome
        },
        {
          path: '/main/log/order',
          name: 'order',
          component: OrderList
        },
        {
          path: '/main/log/peccancy',
          name: 'peccancy',
          component: PeccancyList
        },
        {
          path: '/main/log/settle',
          name: 'settle',
          component: SettleList
        },
        {
          path: '/main/account/list',
          name: 'accountList',
          component: AccountList,
        },
        {
          path: '/main/account/workLog',
          name: 'workLog',
          component: WorkLog,
        },
        {
          path: '/main/account/workLog',
          name: 'workLog',
          component: WorkLog,
        },
        {
          path: '/main/device/pda',
          name: 'pda',
          component: PDAList,
        },
        {
          path: '/main/device/device',
          name: 'device',
          component: DeviceList,
        },





      ]
    },
  ]
})
