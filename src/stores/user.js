import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore=defineStore('user',()=>{
    const cartStore=useCartStore()
    //1.定义数据管理store
    const userInfo=ref({})
    //2.定义调用数据的action函数
    const getUserInfo=async({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value=res.result
        await mergeCartAPI(cartStore.cartList.map(item=>{
            return{
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()
    }
    //定义清除用户信息action函数
    const clearUserInfo=()=>{
        userInfo.value={}
        //清除购物车的本地信息
        cartStore.clearCart()
    }
    //3.以对象形式return出去
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true,
}
)