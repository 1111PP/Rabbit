//封装获取导航条标题的api，信息在url: 'home/category/head'中

import httpInstance from "@/utils/http";

export function getCategoryAPI() {
    return httpInstance({
        url: 'home/category/head'
    })
}