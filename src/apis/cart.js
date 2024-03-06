// 封装接口购物车相关接口（已登录状态购物车接口）
import request from '@/utils/http'

// 接口购物车API------------加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

//接口购物车API------------获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: '/member/cart',
  })
}

// 接口购物车API------------删除购物车
export const delCartAPI = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data,
  })
}
