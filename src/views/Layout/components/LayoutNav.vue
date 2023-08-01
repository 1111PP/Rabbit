<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

//退出登录的业务逻辑
const confirm = () => {
    // console.log('退出登录');
    //1.清除用户信息,触发store中的action(clearUserInfo函数)
    userStore.clearUserInfo()
    //2.跳转至登录页面
    router.replace({ path: '/login' })
}

</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 分为已登录页面和未登录页面 通过v-if和v-else切换这两个页面 -->
                <!-- 登录时显示 -->
                <template v-if="userStore.userInfo.token">
                    <li>
                        <RouterLink to="/login">
                            <a href="javascript:;">
                                <i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a>
                        </RouterLink>
                    </li>
                    <li>
                        <!-- 绑定confirm(确定)事件,实现退出登录逻辑 -->
                        <!-- 点击退出：1.清除用户信息 2.跳转至登录页面 -->
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <RouterLink to="/member">
                        <li><a href="javascript:;">会员中心</a></li>
                    </RouterLink>
                </template>
                <!-- 未登录时显示 -->
                <template v-else>
                    <RouterLink to="/login">
                        <li><a href="javascript:;">请先登录</a></li>
                    </RouterLink>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="scss">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            // ~li : 对于每个 li 元素，除了第一个 li 元素外，其余的 li 元素都将应用特定的样式。
            // 创建左边的竖线丨
            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>