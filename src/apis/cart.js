//封装购物车相关接口
import request from "@/utils/http";

//加入购物车
export function insertCartAPI({skuId,count}){
    return request({
        url:'/member/cart',
        method:'POST',
        data:{
            skuId,
            count
        }
    })
}
// 删除购物车
export function delCartAPI(ids){
    return request({
      url: '/member/cart',
      method: 'DELETE',
      data: {
        ids
      }
    })
  }

//合并购物车
export function mergeCartAPI(data){
  return request({
    url:'/member/cart/merge',
    method:'POST',
    data
  })
}

//获取最新购物车列表
export function findNewCartListAPI(){
    return request({
        url:'/member/cart'
    })
}