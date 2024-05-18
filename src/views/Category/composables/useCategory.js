//封装分类逻辑函数
import { ref ,onMounted} from 'vue';
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
import { getCategoryAPI } from '@/apis/category';

export const useCategory=()=>{
    const categoryData=ref({})
    const route=useRoute()
    const getCategory=async(id=route.params.id)=>{
    const res=await getCategoryAPI(id)
    categoryData.value=res.result
    //console.log(categoryData)
    }

    //添加路由守卫，路由更新时触发；分类数据接口重新发送
    onBeforeRouteUpdate(to=>{
    //console.log(to)
    getCategory(to.params.id)
    })

    onMounted(()=>getCategory())
    return{
        categoryData
    }
}