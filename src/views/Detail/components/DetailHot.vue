<script setup>
import { getHotGoodsAPI } from '@/apis/detail'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

//用来接收外部index.js传递进来的hotType数值，来决定是获取24h热榜信息（hotType=1），还是周热榜信息（hotType=2）
const props = defineProps({
    hotType: {
        type: Number
    }
})
//适配两个热榜模块的title，hotType=1时，title="24小时热榜"；hotType=2时，title="周热榜单"
const TYPEMAP = {
    1: '24小时热榜',
    2: '周热榜单'
}
// console.log(TYPEMAP['1']);//24小时热榜
console.log(props.hotType[1]);
const title = TYPEMAP[props.hotType]

const hotList = ref([])
const route = useRoute()
const getHotList = async () => {
    const res = await getHotGoodsAPI({
        id: route.params.id,
        //通过API参数中type值，来分别获取24h热榜信息和周热榜信息，1是24h，2是周榜
        //所以对API参数中的type直接去修改，以拿到对应数据
        type: props.hotType,//type参数决定了此次请求的信息是24h热榜还是周热榜（1是24h热榜信息）
    })
    hotList.value = res.result
}
onMounted(() => { getHotList() })


</script>


<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

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
}
</style>