<script setup>
import { getOrderAPI } from '@/apis/pay'
import { ref, onMounted, } from 'vue'
import { useRoute } from 'vue-router'

//获取订单数据(用于获取订单金额，并渲染支付结果页面中的支付金额)
const route = useRoute()
const payInfo = ref({})
const getPayInfo = async () => {
    const res = await getOrderAPI(route.query.orderId)//这次获取的是orderId，也就是支付金额
    payInfo.value = res.result
}
onMounted(() => getPayInfo())
</script>


<template>
    <div class="xtx-pay-page">
        <div class="container">
            <!-- 支付结果 -->
            <div class="pay-result">
                <!-- http://localhost:5173/paycallback?payResult=true&orderId=1678405989277110274 -->
                <!-- 根据链接中的query参数判断支付结果是否成功，$route.query.payResult
                     🔴支付结果payResult的值，是字符串类型的'true'
                     配合v-if和v-else显示支付成功或支付失败-->
                <span class="iconfont icon-queren2 green" v-if="$route.query.payResult === 'true'"></span>
                <span class="iconfont icon-shanchu red" v-else></span>
                <p class="tit">支付{{ $route.query.payResult === 'true' ? '成功' : '失败' }}</p>
                <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
                <p>支付方式：<span>支付宝</span></p>
                <p>支付金额：<span>¥{{ payInfo.payMoney?.toFixed(2) }}</span></p>
                <div class="btn">
                    <el-button type="primary" style="margin-right:20px">查看订单</el-button>
                    <RouterLink to="/"><el-button>进入首页</el-button></RouterLink>
                </div>
                <p class="alert">
                    <span class="iconfont icon-tip"></span>
                    温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pay-result {
    padding: 100px 0;
    background: #fff;
    text-align: center;
    margin-top: 20px;

    >.iconfont {
        font-size: 100px;
    }

    .green {
        color: #1dc779;
    }

    .red {
        color: $priceColor;
    }

    .tit {
        font-size: 24px;
    }

    .tip {
        color: #999;
    }

    p {
        line-height: 40px;
        font-size: 16px;
    }

    .btn {
        margin-top: 50px;
    }

    .alert {
        font-size: 12px;
        color: #999;
        margin-top: 50px;
    }
}
</style>