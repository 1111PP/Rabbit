import request from '@/utils/http'

//会员中心的我的订单页面数据
/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrder = (params) => {
    return request({
        url: '/member/order',
        method: 'GET',
        params
    })
}