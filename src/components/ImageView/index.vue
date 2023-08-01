<script setup>
import { ref, watch, onMounted } from 'vue'
import { useMouseInElement } from '@vueuse/core'
// 图片列表
// const imageList = [
//     "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//     "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//     "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//     "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//     "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]
//上面的详细展示图不应该用死数据,应该是从服务器响应的数据接收过来使用,因此需要到index.vue中传入服务器响应数据goods中的图片
defineProps({
    imageList: {
        type: Array,
        //默认值，通过工厂函数初始化一个空的数组
        default: () => []
    }
})


//切换小图，显示大图
const activeIndex = ref(0)//记录小图下标，移入第1个小图，就让activeIndex=1，以此来决定展示哪个大图
//而移入哪个小图，就根据下方小图列表中的v-for内，按顺序渲染小图，而每个小图都有自己的i，也就是小图下标
const enterHandler = (index) => {
    activeIndex.value = index
    // console.log(index);
}

//通过vueuse中的useMouseInElement函数拿到鼠标相对于大图的坐标信息
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
//黑色蒙块的左上角X、Y坐标  （left 和 top）
const left = ref(0)
const top = ref(0)
//控制大图左上角坐标
const positionX = ref(0)
const positionY = ref(0)

//通过不断监视鼠标在大图内的坐标变化，从而改变蒙版左上角的坐标
watch([elementX, elementY, isOutside], () => {
    if (isOutside.value) return //如果鼠标不在中图中，就不需要执行下面的代码了
    if (elementX.value <= 100) left.value = 0
    if (elementY.value <= 100) top.value = 0
    if (elementX.value >= 300) left.value = 200
    if (elementY.value >= 300) top.value = 200
    if (elementX.value > 100 && elementX.value < 300) left.value = elementX.value - 100
    if (elementY.value > 100 && elementY.value < 300) top.value = elementY.value - 100
    // console.log(left.value, top.value);

    //控制放大镜大图坐标
    // 中图往右移，大图往左移动，反方向，且大图是中图的两倍大小
    positionX.value = -left.value * 2
    positionY.value = -top.value * 2

}
)



</script>

<template>
    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target">
            <img :src="imageList[activeIndex]" alt="" />
            <!-- 蒙层小滑块 -->
            <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }"></div>
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="{ active: i === activeIndex }">
                <img :src="img" alt="" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div class="large" :style="[
            {
                backgroundImage: `url(${imageList[activeIndex]})`,
                backgroundPositionX: `${positionX}px`,
                backgroundPositionY: `${positionY}px`,
            },
            //通过isOutside判断鼠标是否在中图内，并配合v-show做放大镜大图的显示和隐藏
        ]" v-show="!isOutside"></div>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>