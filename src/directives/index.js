import { useIntersectionObserver } from '@vueuse/core'

//定义图片懒加载插件
export const lazyPlugin={
    install(app){
        //定义全局指令
        app.directive('img-lazy',{
            mounted(el,binding){
                //console.log(el,binding)
                const {stop}=useIntersectionObserver(el,([{isIntersecting}])=>{
                    console.log(isIntersecting)
                    if(isIntersecting){
                        el.src=binding.value
                        //首次执行后，停止重复执行
                        stop()
            }
        })
    }
})
    }
}