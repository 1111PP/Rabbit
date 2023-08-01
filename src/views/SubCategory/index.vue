<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue'

//二级分类面包屑导航
const route = useRoute()
const categoryDate = ref({})
const getCategoryDate = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    categoryDate.value = res.result
}
onMounted(() => { getCategoryDate() })


//获取筛选页面商品基础数据
const goodList = ref([])
//reqData书写getSubCategoryAPI接口函数参数，此参数是一个对象，内需要的4个数据
const reqData = ref({//req 请求
    categoryId: route.params.id,//当前页的params的id
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const getGoodList = async () => {
    const res = await getSubCategoryAPI(reqData.value)//此接口参数为一个对象
    // console.log(res);
    goodList.value = res.result.items//此请求返回的响应名称为temporary
}
onMounted(() => { getGoodList() })


//tab切换回调（tabChange事件被触发调用此函数，触发筛选条件开始筛选商品）
const tabChange = () => {
    console.log('用户开始筛选商品了', reqData.value.sortField);
    reqData.value.page = 1
    getGoodList()
}


//商品列表无限加载 elementUI中的v-infinite-scroll

//disabled控制指令是否失效，初始false表示v-infinite-scroll指令生效
const disabled = ref(false)
const load = async () => {
    console.log("已经加载到底部");
    //获取下一页数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)//拿到新数据
    //新老数据拼接，老数据goodsList   新数据res.result.items
    //展开运算符拼接法 （因为都属对象形式，所以可使用展开运算符）
    goodList.value = [...goodList.value, ...res.result.items]
    //当商品数据已经翻到没有了的时候，v-infinite-scroll="load"关闭这个监听事件
    if (res.result.items.length === 0) {
        disabled.value = true
    }
}

</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryDate.parentId}` }">{{ categoryDate.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryDate.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <!-- v-model="reqData.sortField" -->
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <!-- 当滚动到底部已经没有数据时:infinite-scroll-disabled="disabled"可控制该指令是否失效 -->
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <!-- GoodsItem用于渲染一个独立商品的小模块，将循环出来的每一个商品信息传递给GoodsItem组件-->
                <GoodsItem v-for="goods in goodList" :key="goods.id" :goods="goods" />
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>