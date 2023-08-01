//封装banner轮播图相关代码
import { ref, onMounted } from 'vue'
import { getBannerApi } from '@/apis/home'

export function useBanner() {
    //获取banner
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerApi({
            distributionSite: '2'
        })
        bannerList.value = res.result
    }
    onMounted(() => { getBanner() })

    //将组件需要的数据return出去
    return {
        bannerList
    }
}