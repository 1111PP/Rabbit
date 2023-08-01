//封装分类数据业务相关代码
//获取导航栏params.id等信息数据，用于点击导航切换响应的路由界面

import { ref, onUpdated, onMounted, watchEffect } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    //获取数据,响应数据为对象
    const categoryData = ref({})
    //需要传递当前页的params.id作为参数，引入usrRoute函数，
    //route.params.id用于获取当前页的路由参数id。
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        //浏览器页面初始化时，id为route.params.id当前页的路由参数id，用于初始化加载时调用；
        //当导航栏某个路由被点击，新路由params.id作为参数传入此函数
        console.log(route.params.id);
        console.log(id);
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => {
        getCategory()
    })
    // 方法一：
    // watchEffect(() => { getCategory() })
    // 方法二：
    //路由参数变化时调用此钩子，可以将接口数据重新发送
    onBeforeRouteUpdate((to) => {
        console.log("导航栏某个路由发生变化");
        console.log(to);
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
}