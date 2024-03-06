//倒计时函数
import { computed, ref, onUnmounted } from 'vue'
import dayjs from 'dayjs' //第三方格式化插件dayjs
export const useCountDown = () => {
    let timer = null //定时器开关
    // 1.响应式数据
    const time = ref(0) //format计划
    //格式化(format)时间：xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 2.开启倒计时函数
    const start = (currentTime) => { //current当前
        //倒计时的逻辑
        //核心逻辑：每隔1s就-1
        time.value = currentTime
        timer = setInterval(() => { time.value-- }, 1000)
    }
    //组件销毁时清除定时器（💡原因是定时器通常会出现内存溢出的问题）
    //因为当定时器存在的组件被销毁时，定时器却没有关闭，一直在执行
    //因此可以在组件销毁时调用钩子onUnmounted，关闭定时器
    onUnmounted(() => {
        if (timer) clearInterval(timer)//如果定时器存在，则关闭定时器
    })
    return {
        formatTime,
        start
    }
}