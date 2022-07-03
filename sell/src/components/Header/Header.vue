<template>
  <div class="header">
    <!-- {{ poiInfo.name }} -->
    <!-- 頂部搜尋欄 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜尋" />
      </form>
      <div class="more-wrapper">
        <a class="spelling-bt" href="#">拚單</a>
        <div class="more-bt">
          <i class="little-circle"></i>
          <i class="little-circle"></i>
          <i class="little-circle"></i>
        </div>
      </div>
    </div>

    <!-- 主體內容 -->
    <div class="content-wrapper"></div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper"></div>

    <div class="bg-wrapper" :style="content_bg">
      <!-- <img :src="poiInfo.head_pic_url" />  不好用-->
      <!-- <div class="bg-wrapper" style="background-image:url({}) ">
                在vue中，style的url()沒辦法直接傳值，因此需要用下面的computed的計算屬性來加入 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //組件的傳值
    poiInfo: {
      type: Object,
      default: {}
    }
  },
  computed:{  //計算屬性
    content_bg(){
        return "background-image:url("+this.poiInfo.head_pic_url+");"
        // 記得要this，因為是props呼叫的
    }
  }
};
</script>

<style>
/* 另一種的字體圖標，需要先導入樣式才行 */
@import url("../../common/styles/icon.css");

@import url("Header.css");
</style>
