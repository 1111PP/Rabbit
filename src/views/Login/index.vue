<script setup>

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// useRoute是获取参数（如params.id等等）
// useRouter是调用方法，返回一个对象
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

//表单校验 (账号名+密码)
//1，准备表单对象
const form = ref({
    account: 'heima282',//      12056258282
    password: 'hm#qd@23!',//     hm#qd@23!
    agree: true//记录用户是否同意协议
})
//2.准备规则对象
const rules = {
    account: [
        //required: true设置该内容必须填写（也就是用户名密码表单必须添加）
        { required: true, message: '用户名不能为空', trigger: 'blur' }//blur失去焦点时触发
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' }
    ],
    //定义用户协议规则（此规则为自定义校验规则，内要根据validator函数自定义规则）
    agree: [

        {
            // trigger:"change",
            //有三个参数rule规则、value绑定元素的值（此规则绑定）、callback）
            validator: (rule, value, callback) => {
                console.log(value);
                //勾选用户同意协议就通过，否则不通过
                //不管通过还是未通过都要调用callback函数，区别是参数不同
                if (value) callback()//通过
                else callback(new Error('请勾选用户协议'))//不通过报错
            }
        }
    ]
}
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
    //登录API所需要的参数
    // console.log(form.value);
    const { account, password } = form.value
    //调用实例方法
    formRef.value.validate(async (valid) => {
        //所有表单都校验通过vaild才会显示true
        // console.log(valid);
        //以valid做判断条件，只有通过才会执行登录逻辑
        if (valid) {
            //登录逻辑,(需要用户名和密码这两个参数)
            // const res = await loginAPI({ account, password })
            await userStore.getUserInfo({ account, password })
            // console.log(res);

            //若登录成功：
            //1.提示用户(这里使用饿了么组件库中的ElMessage组件，实现弹窗提示)
            ElMessage({ type: 'success', message: '登录成功' })
            //2.跳转至首页
            router.replace({ path: '/' })
        }
    })
}
</script>

<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">小兔鲜</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <!-- 根据elementUI组件库中el-form组件要求，在最外层加上最关键的:model="form" -->
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
                            status-icon>

                            <!-- prop="account"指定account的规则-->
                            <el-form-item prop="account" label="账户">
                                <!-- 双向绑定表单对象 -->
                                <el-input v-model="form.account" />
                            </el-form-item>

                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>

                            <!-- elementUI组件们的规则数据绑定都类似，
                                内层双向绑定表单对象v-model="form.agree"，外层指定指定agree规则prop="agree" -->
                            <el-form-item label-width="22px" prop="agree">
                                <el-checkbox v-model="form.agree" size="large">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>

                            <el-button size="large" @click="doLogin" class="subBtn">点击登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy; 小兔鲜儿</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: $xtxColor;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background: url('@/assets/images/login-bg.png') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: $xtxColor;
    width: 100%;
    color: #fff;
}
</style>