//封装api接口
import httpInstance from "@/utils/http";

export function getCategoryAPI(){
    return httpInstance({
        url:"/home/category/head"
    })
}