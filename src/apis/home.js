import httpInstance from "@/utils/http";

//轮播图数据接口
export function getBannerApi(params = {}) {
  //结构params类的数据，首页为1(默认值)，商品二级页为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
//新鲜好物数据接口
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}
//热门商品数据接口
export const getHotAPI = () => {
  return httpInstance(
    {
      url: 'home/hot'
    })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
//HomeProduct组件数据接口
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}