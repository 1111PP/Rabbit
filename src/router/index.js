//createRouter创建路由实例
//createWebHistory创建historty模式路由
import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //首页默认路由
      path: '/',
      component: Layout,
      children: [
        {
          ////path置空，初始化（一打开）时就显示该路由
          path: '',
          component: Home
        },
        //一级分类，导航栏切换路由
        {
          path: 'category/:id',
          component: Category
        },
        //二级分类，商品筛选路由
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        //二级路由：商品详情页
        {
          path: 'detail/:id',
          component: Detail
        },
        //二级路由：购物车详细页面
        {
          path: 'cartlist',
          component: CartList
        },
        //二级路由：订单结算页面
        {
          path: 'checkout',
          component: Checkout
        },
        //二级路由：支付界面
        {
          path: 'pay',
          component: Pay
        },
        //二级路由：支付结果界面
        {
          path: 'paycallback',
          component: PayBack
        },
        //二级路由：会员中心
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',//path置空，初始化（一打开）时就显示该路由
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      //登录页路由
      path: '/login',
      component: Login
    },
  ],
  //路由滚动行为定制(让该分类页面的滚动记录不会影响其他级别的分类级别滚动记录)
  //如果二级分类中滚动条滑动到了页面中部，切换到一级分类时就可以让滚动条回到顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
