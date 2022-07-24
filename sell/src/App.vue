<template>
  <div id="app">
    <MyHeader :poiInfo="poiInfo"></MyHeader>

    <MyNav :commentNum="commentNum"></MyNav>
    <!-- <div id="content">
      content
    </div> -->
    <!-- 由路由出口取代 -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件將渲染在這裡 -->
    <keep-alive>
    <!-- 重要，引為我們每一次切換一個葉面或功能時，它等於是重新請求數據，會浪費資源，而且內容會被重置
    因此要讓它保持不被重新渲染 -->
    <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import MyHeader from "components/Header/Header";
import MyNav from "components/Nav/Nav";
// 因為我們有在webpack.base.conf裡的resolve新增依據 'components': resolve('./src/components')，所以路徑有改變

export default {
  name: "app",
  components: {
    MyHeader,
    MyNav
  },
  data(){
    return{
      //商家訊息組件
      poiInfo:{},
      commentNum:0,  //再傳遞給組件
    }
  },
  created(){
    var that = this;
    // 發請異步請求，以獲取數據
    // Make a request for a user with a given ID
this.$axios.get('/static/星巴克(店家菜單).json')
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
  });


  // 獲取評價的數據(兩種方式都可以獲取)
  this.$axios.get('/static/星巴克(店家評價).json')
// this.$axios.get('/api/goods')
  .then(function (response) {
    // handle success
    var dataSource = response.data;
    if(dataSource.code ==0){ 
      that.commentNum =dataSource.data.comment_num;
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
