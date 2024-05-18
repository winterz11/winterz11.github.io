import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from "@/apis/layout"

export const useCategoryStore = defineStore('category', () => {
    //state 导航列表的数据
    const categoryList=ref([])

    //action 获取导航列表数据的方法
    const getCategory =async function(){
        const res=await getCategoryAPI()
        categoryList.value=res.result
        //console.log(categoryList)
    }
    return {categoryList,getCategory }
})