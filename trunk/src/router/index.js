import Vue from 'vue'
Vue.use(Router);
import Router from 'vue-router'

import Login from '@/components/page/Login'
import Main from '@/components/page/Main'
import Welcome from '@/components/page/WelCome'

import OrderList from '@/components/page/log/OrderList'
import SettleList from '@/components/page/log/SettleList'
import SpecialVehicleList from '@/components/page/specialvehicle/SpecialVehicleList'
import Add from '@/components/page/specialvehicle/Add'
import Update from '@/components/page/specialvehicle/Update'


import AccountList from '@/components/page/account/AccountList'
import WorkLog from '@/components/page/account/WorkLog'
import Rule from '@/components/page/account/Rule'

import PDAList from '@/components/page/device/Pda'
import PDAInfo from '@/components/page/device/PdaInfo'
import DeviceList from '@/components/page/device/Device'

import Base from '@/components/page/settings/Base'
import ParkingInfo from '@/components/page/settings/ParkingInfo'
import MoneyRules from '@/components/page/settings/MoneyRules'
import DoorWay from '@/components/page/settings/DoorWay'
import SeatList from '@/components/page/settings/SeatList'
import VipList from '@/components/page/vip/VipList'
import Management_Expense from '@/components/page/vip/Management_Expense'
import VipAdd from '@/components/page/vip/VipAdd'
import VipEdit from '@/components/page/vip/VipEdit'
import HouseOwnerList from '@/components/page/vip/HouseOwnerList'
import HouseOwnerAdd from '@/components/page/vip/HouseOwnerAdd'
import HouseOwnerEdit from '@/components/page/vip/HouseOwnerEdit'
import FinancePic from '@/components/page/log/FinancePic'
import Gate from '@/components/parts/Gate'
import UpdatePassword from '@/components/page/account/UpdatePassword'


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
          path: '/main/staff/rule',
          name: 'rule',
          component: Rule,
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
          path: '/page/vip/ManageList',
          name: 'managelist',
          component: Management_Expense,
        },
        {
          path: '/main/statistics/Gates',
          name: 'gate',
          component: Gate,
        },
        {
          path: '/page/vip/VipAdd',
          name: 'vipadd',
          component: VipAdd,
        },
        {
          path: '/page/vip/VipEdit/:id',
          name: 'vipedit',
          component: VipEdit,
        },
        {
          path: '/page/vip/HouseOwnerList',
          name: 'houseownerlist',
          component: HouseOwnerList,
        },
        {
          path: '/page/vip/HouseOwnerEdit/:id',
          name: 'houseowneredit',
          component: HouseOwnerEdit,
        },
        {
          path: '/page/log/FinancePic',
          name:'financepic',
          component:FinancePic
        },
        {
          path: '/page/vip/HouseOwnerAdd',
          name:'houseOwnerAdd',
          component:HouseOwnerAdd
        },
        {
          path: '/page/specialvehicle/list',
          name:'specialvehiclelist',
          component:SpecialVehicleList
        },
        {
          path: '/page/specialvehicle/add',
          name:'specialvehicleadd',
          component:Add
        },
        {
          path: '/page/specialvehicle/update/:id',
          name:'specialvehicleupdate',
          component:Update
        },
        {
          path:'/page/user/updatePassword',
          name:'updatePassword',
          component:UpdatePassword
        },
      ]
    },
  ]
})

