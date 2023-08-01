
//使用pinia统一管理用户的登录相关数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'//用户点击登录按钮的校验接口
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/apis/cart'


export const useUserStore = defineStore('user', () => {
    //调用clearCart实现退出登录时，清除购物车信息
    const cartStore = useCartStore()

    //1.定义管理用户数据的state
    const userInfo = ref({})

    //2.定义点击登录按钮后的操作，同时获取用户信息的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        //合并购物车操作（将离线状态的选好的购物车信息 添加到 登录状态的购物车）
        //通过map函数映射出一个新的对象数组 作为合并购物车API的参数
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                seleted: item.selected,
                count: item.count,
            }
        }))
        cartStore.updateNewList()
    }

    //退出登录时的业务
    // 1.清除用户信息userInfo
    const clearUserInfo = () => {
        userInfo.value = {}//将本地存储的用户信息置空
        cartStore.clearCart()//退出登录时，清除本地存储的购物车信息
    }

    //3.以对象格式把state和action返回return出去
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
    //pinia用户信息持久化操作
    {
        persist: true,
    })