<script setup>
import { findHotAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import HomePanel from './HomePanel.vue'

const hotList=ref([])

const getHot=async()=>{
    const res=await findHotAPI()
    //console.log('res',res)
    hotList.value=res.result
    //console.log('@',hotList.value)
}

onMounted(()=>getHot())
</script>

<template>
<HomePanel title="人气推荐" sub-title="新鲜好物 好多商品">
    <ul class="goods-list">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img v-img-lazy="item.picture"  alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  </HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>