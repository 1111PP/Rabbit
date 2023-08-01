//购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userstore = useUserStore()
    //这里必须要用计算属性获取token，因为获取token需要时间，计算属性computed特性时所依赖数据发生变化时执行，
    //const isLogin=userStore.userInfo.token这是错误的方法❌
    const isLogin = computed(() => userstore.userInfo.token)

    //state=====================================================================================
    //1.定义state------购物车列表cartList
    const cartList = ref([])

    //action=====================================================================================

    //定义action----------获取最新购物车列表（接口购物车状态下，使用接口API完成 新 覆盖 旧 购物车信息的操作）
    const updateNewList = async () => {
        //接口购物车----获取最新的购物车列表API 
        const res = await findNewCartListAPI()
        // 接口购物车新列表列表 覆盖 本地购物车列表
        cartList.value = res.result
    }

    //定义action---------addCart添加购物车信息
    //添加购物车操作（若在购物车中已添加过，则count+1，否则push商品的完整信息至购物车内）
    const addCart = async (goods) => {
        const { skuId, count } = goods//insertCartAPI的参数
        //登录状态下的接口购物车逻辑
        if (isLogin) {
            //接口购物车----加入购物车API
            await insertCartAPI({ skuId, count })
            //新 覆盖 旧 购物车信息
            updateNewList()
        }
        //未登录状态下的本地购物车逻辑
        else {
            //1.若在购物车中已添加过
            //思路：通过购物车cartList中各商品的skuId，对比添加商品skuId，对比后若找到相同的skuId，则表示添加过

            //对cartList.value数组遍历其每一个对象i元素，i.skuId则是每个购物车商品的skuId，一一循环对比
            //如果item有值表示找到了添加商品在购物车中已有
            //cartList.value.find()方法返回的是满足条件的数组元素的引用，而不是该元素的拷贝。
            //因此，将该引用赋值给item后，item和cartList.value实际上指向的是同一个对象。
            //所以，如果item是满足条件的数组元素，item.count++会修改cartList.value中对应元素的count属性。
            const item = cartList.value.find((i) => goods.skuId === i.skuId)
            if (item) {
                // 找到了
                item.count += goods.count
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }
    }

    //定义action---------delCart删除购物车信息
    //根据商品唯一标识skuId删除对应的商品
    const delCart = async (skuId) => {
        //登录状态下的接口购物车逻辑
        if (isLogin) {
            //调用接口实现 接口购物车状态的删除功能
            await delCartAPI([skuId])
            //新 覆盖 旧 购物车信息
            updateNewList()
        }
        //未登录状态下的本地购物车逻辑
        else {
            // 方法一：
            //找对要删除商品的下标index
            const index = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(index, 1)//使用splice删除指定下标的元素
            //方法二：
            //filter过滤函数，根据原数组生成一个新的满足筛选条件的新数组
        }
    }

    //定义action---------clearCart清除购物车信息
    const clearCart = () => {
        cartList.value = []
    }


    //定义action---------购物车结算页面单选框功能
    //通过skuId找到需要修改商品的selected值
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)//使用splice删除指定下标的元素
        item.selected = selected
    }

    //定义actoin---------购物车结算页面全选功能（点击后所有商品全选或全取消选择）
    //将全选框的状态做参数，根据全选框状态，来控制所有单选为true或false
    const allCheck = (selected) => {
        //forEach是对数组的操作。它不会引用数组，而是会直接修改原数组。
        //修改所有商品的selected，使他们和全选框selected（选中/未选中 状态）保持一致
        cartList.value.forEach(item => item.selected = selected)
    }


    //计算属性=====================================================================================
    //首页购物车下拉框-----总数  所有count之和
    //初始值为0，每次加上下一项的count
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

    //首页购物车下拉框-----总价  总count*price
    //初始值为0，每次加上该类商品的总价=数量*单价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    //购物车结算界面-----是否全选(购物车结算界面的全选按钮)
    //every函数在所有商品的selected都为真时返回true（即购物车商品单选框都选中的情况下，全选按钮才跟着选中）
    const isAll = computed(() => cartList.value.every(item => item.selected))

    //购物车结算界面-----已选中的商品总数（先过滤所有选中商品的信息，再从过滤后的商品中统计总数）
    const selectedCount = computed(() =>
        cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

    //购物车结算界面-----已选中的商品总价
    const selectedPrice = computed(() =>
        cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    //return 数据
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        updateNewList,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart,
    }
}, {
    //pinia让购物车商品信息持久化操作
    //pinia的插件piniaPluginPersistedstate会将本地存储的数据始终和pinia中的state（数据）,也就是购物车信息
    persist: true,
})