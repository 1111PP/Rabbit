import request from '@/utils/http'

//一级导航栏各路由组件跳转api
export function getCategoryAPI(id) {
    return request({
        url: '/category',
        params: {
            id
        }
    })
}

//二级导航栏跳转至商品分类路由组件
/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */
export const getCategoryFilterAPI = (id) => {
    return request({
        url: '/category/sub/filter',
        params: {
            id
        }
    })
}

//二级分类商品筛选页面的商品数据
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
    return request({
        url: '/category/goods/temporary',
        method: 'POST',
        data
    })
}