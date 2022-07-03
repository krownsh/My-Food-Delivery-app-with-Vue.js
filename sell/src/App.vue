<template>
  <div id="app">
    <MyHeader :poiInfo="poiInfo"></MyHeader>

    <MyNav></MyNav>
    <!-- <div id="content">
      content
    </div> -->
    <!-- 由路由出口取代 -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

  </div>
</template>

<script>
import MyHeader from "./components/Header/Header";
import MyNav from "./components/Nav/Nav";

export default {
  name: "app",
  components: {
    MyHeader,
    MyNav
  },
  data(){
    return{
      //商家訊息組件
      poiInfo:{}
    }
  },
  created(){
    var that = this;
    // 發請異步請求，以獲取數據
    // Make a request for a user with a given ID
this.$axios.get('/static/01-商品页(点菜).json')
// this.$axios.get('/api/goods')
  .then(function (response) {
    // handle success
    var dataSource = response.data;
    if(dataSource.code ==0){ 
      that.poiInfo =dataSource.data.poi_info;
      console.log(that.poiInfo);
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
};
</script>

<style></style>
