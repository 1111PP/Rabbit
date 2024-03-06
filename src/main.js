//引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives/index'
//引入自定义全局组件
import { componentPlugin } from '@/components'
//引入pinia插件piniaPluginPersistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

//通过调用createPinia()函数来创建一个Pinia实例。
//然后，通过app.use()方法将这个Pinia实例作为插件使用，将其安装到Vue应用中。
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) //注册持久化插件，用于持久化保存用户登录信息（暂存，一段时间内无需每次都重新登录）
app.use(pinia) //创建pinia实例，用于集中统一管理一些数据state和方法action
app.use(router)

//使用懒加载插件
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
