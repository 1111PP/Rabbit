<script setup>
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router';
const cartStore = useCartStore()
const cartList = cartStore.cartList
//点击单选框的回调函数
const singleCheck = (i, selected) => {
    // 除了拿到selected外，我们还需要根据skuId，来确定是修改了哪个商品的selected值
    // 但是change事件的回调函数默认只接收一个参数，即当前复选框的选中状态。这个选中状态会作为回调函数的第一个参数传递。
    // 所以我们需要修改change事件回调，以此拿到对应商品的skuId
    // console.log(selected, i.skuId);
    cartStore.singleCheck(i.skuId, selected)
}

//点击全选按钮修改所有单选框状态,调用Store中cart.js中action（cartStore.allCheck）
const changeAll = (selected) => {
    cartStore.allCheck(selected)
}

</script>

<template>
    <div class="xtx-cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                            <th width="120">
                                <el-checkbox :model-value="cartStore.isAll" @change="changeAll" />
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="i in cartList" :key="i.id">
                            <td>
                                <!-- 单选框 -->

                                <!-- 饿了么组件对Checkbox组件的change事件进行了封装，使其传递当前的选中状态作为参数。
                                    change事件的回调函数默认只接收一个参数，即当前复选框的选中状态。这个选中状态会作为回调函数的第一个参数传递。
                                    这样做的目的是为了方便开发者获取Checkbox的选中状态。所以singleCheck传递了参数i.selected -->

                                <!--change事件的回调singleCheck需要两个参数sku和selected
                                    但是el-checkbox组件的@change事件的回调函数参数只有一个，即该单选框的value（也就是selected），
                                    因此使用一个回调函数，利用作用域，让singleCheck同时获取到两个参数
                                    selected是默认参数，绑定该单选框的value，该回调返回singleCheck调用，
                                    因为作用域在el-checkbox组件内部，所以还可以取到i，从而拿到i.skuId，这样就可以同时获取到两个参数-->
                                <el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
                            </td>
                            <td>
                                <div class=" goods">
                                    <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                            {{ i.name }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ i.price }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number v-model="i.count" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p>
                                    <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                        @confirm="delCart(i)">
                                        <template #reference>
                                            <a href="javascript:;">删除</a>
                                        </template>
                                    </el-popconfirm>
                                </p>
                            </td>
                        </tr>
                        <tr v-if="cartList.length === 0">
                            <td colspan="6">
                                <div class="cart-none">
                                    <el-empty description="购物车列表为空">
                                        <el-button type="primary">随便逛逛</el-button>
                                    </el-empty>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch">
                    共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
                    <span class="red">¥ {{ cartStore.selectedPrice?.toFixed(2) }} </span>
                </div>
                <div class="total">
                    <RouterLink to="/checkout">
                        <el-button size="large" type="primary">下单结算</el-button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
    margin-top: 20px;

    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }

    .cart-none {
        text-align: center;
        padding: 120px 0;
        background: #fff;

        p {
            color: #999;
            padding: 20px 0;
        }
    }

    .tc {
        text-align: center;

        a {
            color: $xtxColor;
        }

        .xtx-numbox {
            margin: 0 auto;
            width: 120px;
        }
    }

    .red {
        color: $priceColor;
    }

    .green {
        color: $xtxColor;
    }

    .f16 {
        font-size: 16px;
    }

    .goods {
        display: flex;
        align-items: center;

        img {
            width: 100px;
            height: 100px;
        }

        >div {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;

            .attr {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .action {
        display: flex;
        background: #fff;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        padding: 0 30px;

        .xtx-checkbox {
            color: #999;
        }

        .batch {
            a {
                margin-left: 20px;
            }
        }

        .red {
            font-size: 18px;
            margin-right: 20px;
            font-weight: bold;
        }
    }

    .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

}
</style>