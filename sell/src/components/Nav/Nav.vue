<template>
  <div class="nav">
    <!-- <div class="nav-item goods">
      點菜
    </div>
    <div class="nav-item ratings">
      評價
    </div>
    <div class="nav-item sellers">
      商家
    </div>                   直接用router的呈現取代-->

    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/goods" class="nav-item">
      點餐
      <i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="nav-item"
      >評價({{commentNum}})
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="nav-item"
      >店家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props:{
    commentNum:{
      type:Number,
      default:0,
    }
  }
};
</script>

<style>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
  
}
.nav-item {
  flex: 1;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  color: #666666;
  position: relative;
}
/* 選重後的效果 */
.nav .active {
  color: #ffbb22;
}
.nav .active .line {
  /* 選擇後的底線小效果 */
  width:20px;
  height:2px;
  display:inline-block;
  background-color: #ffbb22;
  position: absolute;
  left: 50%;
  bottom:0;
  margin-left: -10px;
  /* 因為50致中，還包含自身寬度，要減回來 */
    transition: all 1s;



}
</style>
