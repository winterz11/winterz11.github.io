//封装 轮播图逻辑函数
import {getBannerAPI} from '@/apis/home'
import { ref ,onMounted} from 'vue';
export const useBanner=()=>{
    const BannerList=ref([])
    const getBanner=async()=>{
        const res= await getBannerAPI({distributionSite:'2'})
        //console.log(res)
        BannerList.value=res.result
    // console.log( BannerList.value)
    }

    onMounted(()=>getBanner())
    return{
        BannerList
    }
}