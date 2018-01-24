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

import Base from '@/components/page/settings/Base'
import ParkingInfo from '@/components/page/settings/ParkingInfo'
import MoneyRules from '@/components/page/settings/MoneyRules'





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
          path: '/main/statistics/doorlog',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/main/statistics/orderlog',
          name: 'order',
          component: OrderList
        },
        {
          path: '/main/statistics/errorlog',
          name: 'peccancy',
          component: PeccancyList
        },
        {
          path: '/main/statistics/settlelog',
          name: 'settle',
          component: SettleList
        },
        {
          path: '/main/staff/account',
          name: 'accountList',
          component: AccountList,
        },
        {
          path: '/main/staff/worklog',
          name: 'workLog',
          component: WorkLog,
        },
        {
          path: '/main/device/pda',
          name: 'pda',
          component: PDAList,
        },
        {
          path: '/main/device/other',
          name: 'device',
          component: DeviceList,
        },
        {
          path: '/main/setting/setting',
          name: 'base',
          component: Base,
        },
        {
          path: '/main/setting/parking',
          name: 'parking',
          component: ParkingInfo,
        },
        {
          path: '/main/setting/moneyRoles',
          name: 'moneyRoles',
          component: MoneyRules,
        },
      ]
    },
  ]
})
Vue.use(Router);