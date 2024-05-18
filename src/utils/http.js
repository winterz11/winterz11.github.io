import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'

//axios实例
const httpInstance=axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //配置token
  //1.获取token
  const userStore=useUserStore()
  const token=userStore.userInfo.token
  //2.按照后端要求拼接token
  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore=useUserStore()
  //统一错误提示
    ElMessage({
      type:'warning',
      message:e.response.data.message
    })
    //401错误拦截
    if(e.response.status==401){
       //1.清空用户信息
      userStore.clearUserInfo()
       //2.跳转到登录页
      router.push('/login')
    }
   
    return Promise.reject(e)
  })

  export default httpInstance
  