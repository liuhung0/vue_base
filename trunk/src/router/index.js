import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/page/Login'
import Main from '@/components/page/Main'
import Welcome from '@/components/page/WelCome'

import OrderList from '@/components/page/log/OrderList'
import SettleList from '@/components/page/log/SettleList'

import AccountList from '@/components/page/account/AccountList'
import WorkLog from '@/components/page/account/WorkLog'

import PDAList from '@/components/page/device/Pda'
import PDAInfo from '@/components/page/device/PdaInfo'
import DeviceList from '@/components/page/device/Device'

import Base from '@/components/page/settings/Base'
import ParkingInfo from '@/components/page/settings/ParkingInfo'
import MoneyRules from '@/components/page/settings/MoneyRules'
import DoorWay from '@/components/page/settings/DoorWay'
import SeatList from '@/components/page/settings/SeatList'
import VipList from '@/components/page/vip/VipList'
import VipAdd from '@/components/page/vip/VipAdd'
import FinancePic from '@/components/page/log/FinancePic'
import echarts from 'echarts'
Vue.use(Router);
Vue.prototype.$echarts = echarts;
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
          path: '/main/device/pdainfo',
          name: 'pdaInfo',
          component: PDAInfo,
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
        {
          path: '/main/setting/doorWay',
          name: 'doorWay',
          component: DoorWay,
        },
        {
          path: '/main/setting/SeatList',
          name: 'seatList',
          component: SeatList,
        },
        {
          path: '/page/vip/VipList',
          name: 'viplist',
          component: VipList,
        },
        {
          path: '/page/vip/VipAdd',
          name: 'vipadd',
          component: VipAdd,
        },
        {
          path: '/page/log/FinancePic',
          name:'financepic',
          component:FinancePic
        },
      ]
    },
  ]
})

