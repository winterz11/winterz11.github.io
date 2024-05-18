import {  defineStore } from "pinia";
import { ref ,computed} from "vue";
import { useUserStore } from "./user";
import { insertCartAPI,findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore=defineStore('cart',()=>{
    const userStore=useUserStore()
    //1.定义cart数据state
    const cartList=ref([])
    //判断是否登录
    const isLogin=computed(()=>userStore.userInfo.token)
    //定义更新购物车列表action函数
    const updateNewList=async()=>{
        //2.调用获取购物车列表接口
        const res=await findNewCartListAPI()
        //3.用接口购物车列表覆盖本地
        cartList.value=res.result
    }
    //2.定义函数action
    const addCart=async(goods)=>{
        const{skuId,count}=goods
        if(isLogin.value){
            //登录情况
            //1.调用加入购物车接口
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
            //未登录情况
            //原理：通过匹配过来的sku数据的skuId，若能在store中找到相同的skuId则为添加过
            //通过find方法找到匹配的对象，返回的就是这个匹配的对象；所以item是一个对象数据类型
            const item=cartList.value.find((item)=>{return goods.skuId===item.skuId})
            //添加过，原count+n
            if(item){
            item.count+=goods.count
            }else{
                //没添加过，直接push
                cartList.value.push(goods)
        }
        }   
    }
    //定义delCart函数
    const delCart=async(skuId)=>{
        if (isLogin.value) {
            // 调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId])
            updateNewList()
          } else {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
          }
    }
    //定义单选功能
    const singleCheck=(skuId,selected)=>{
        const item=cartList.value.find((item)=>item.skuId===skuId)
        item.selected=selected
    }
    //定义全选功能
    const allCheck=(selected)=>{
        cartList.value.forEach((item)=>item.selected=selected)
    }

    //清除购物车功能
    const clearCart=()=>{
        cartList.value=[]
    }

    //计算属性
    //2.1.总数 allCount reduce方法
    const allCount=computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    //2.2.总价 allPrice count*price
    const allPrice=computed(()=>cartList.value.reduce((a,c)=>a+c.price*c.count,0))
    //定义全选功能
    const isAll=computed(()=>cartList.value.every((item)=>item.selected))
    //2.3.选中商品数量
    const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
    //2.4.选中商品的总价
    const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
    //3.以对象形式返回数据和方法
    return{
        cartList,
        updateNewList,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice
    }
},{
    persist:true,
})