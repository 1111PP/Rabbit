// 此文件定义全局通用组件 -> 到mian.js中注册这些全局组件
// 使用时无需导入，直接<XtxImageView/>即创建一个组件实例

import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', XtxSku)
    }
}
