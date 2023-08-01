<script setup>
//使用vueuse中的api获取页面的纵向Y的滚动距离，赋值给const y
import { useScroll } from '@vueuse/core'
//获取pinia中数据
import { useCategoryStore } from '@/stores/category'

const { y } = useScroll(window)

const categoryStore = useCategoryStore()
</script>

<template>
    <div class="app-header-sticky" :class="{ show: y > 78 }">

        <div class=" container">
            <RouterLink class="logo" to="/" />
            <!-- 导航区域 -->
            <ul class="app-header-nav ">
                <!-- <li class="home">
                    <RouterLink to="/">首页</RouterLink>
                </li> -->
                <li class="home">
                    <RouterLink to="/">首页</RouterLink>
                </li>
                <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
                    <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
                </li>
            </ul>

            <div class="right">
                <RouterLink to="/">品牌</RouterLink>
                <RouterLink to="/">专题</RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    // 此处为关键样式!!!
    // 状态一：往上平移自身高度 + 完全透明
    transform: translateY(-100%);
    opacity: 0;

    // 状态二：移除平移 + 完全不透明
    //在CSS样式文件中，&符号表示父选择器。它用于在嵌套选择器中引用父选择器的样式。
    //例如，如果有一个父选择器为".parent"的元素，并且希望在该元素的子元素中添加一个类名为".show"的样式，
    //可以使用"&.show"来表示父选择器和子选择器的组合，
    //即".parent.show"。这样可以方便地为父元素和子元素同时设置样式。
    //内层选择器的前面没有＆符号，则它被解析为父选择器的后代；
    //如果有＆符号，它就被解析力父元奈自身或父元素的仂类
    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;
        height: 80px;
        background: url("@/assets/images/logo.png") no-repeat right 2px;
        background-size: 160px auto;
    }

    .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid $xtxColor;

        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;

            &:hover {
                color: $xtxColor;
            }
        }
    }
}

.app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;

            &:hover {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }

        .active {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
        }
    }
}
</style>