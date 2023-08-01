//axios基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user';
import router from '@/router'//为什么这里不导入useRouter方法实现页面跳转了
//因为导入router是因为在js文件中，useRouter是在.vue文件中！！！！所以这里导入router！！
//useRouter是一个Vue 3中的Composition API函数，它只能在Vue 3组件的setup函数中使用

// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    //1.从pinia中获取token数据
    const useStore = useUserStore()
    const token = useStore.userInfo.token
    //2.按照后端要求拼接token数据
    if (token) {
        //这句代码是根据后端的要求配置的，它们将用户token放在请求头中并上传至服务器
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()//token失效调用其中的clearUserInfo方法清除本地用户数据
    //统一错误提示（如登录密码错误显示）
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401 token失效处理（token失效时，会报401错误状态码表示token失效）
    // 1.清除本地存储的用户数据
    if (e.response.status === 401) {
        userStore.clearUserInfo()
        // 导入router是因为在js文件中，useRouter是在.vue文件中！！！！所以这里导入router！！
        //useRouter是一个Vue 3中的Composition API函数，它只能在Vue 3组件的setup函数中使用
        router.push('/login')
    }
    // 2.跳转到登录页
    return Promise.reject(e)
})

export default httpInstance