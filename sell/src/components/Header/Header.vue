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
        <div class="more-bt">
          <i class="little-circle"></i>
          <i class="little-circle"></i>
          <i class="little-circle"></i>
        </div>
      </div>
    </div>

    <!-- 主體內容 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
        <!-- <img :src="poiInfo.pic_url" /> -->
        <!-- 跟下面bg-wrapper依樣意思 -->
      </div>
      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <img src="../../../resource/img/star.png" />
        <span>收藏</span>
      </div>
    </div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper" @click="showBulletin">
      <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" />
      <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
      <!-- 在vue中，所謂的discount[0]，假如定0個位置就是為空，會導致程式錯誤，因此他會要求必須加入v-if="poiInfo.discount2，情況是指，如果有的話才去顯示... -->
      <div class="detail">
        {{poiInfo.discounts2.length}}個活動進行中
        <span class="icon-keyboard_arrow_right"></span>
        <!-- 陣列裡有幾個就是幾個活動 -->
      </div>
    </div>

    <div class="bg-wrapper" :style="content_bg">
      <!-- <img :src="poiInfo.head_pic_url" />  不好用-->
      <!-- <div class="bg-wrapper" style="background-image:url({}) ">
                在vue中，style的url()沒辦法直接傳值，因此需要用下面的computed的計算屬性來加入 -->
    </div>


    <!-- 公告的詳情頁部分 有蒙版的感覺-->
    <transition name="detail"> 
    <!-- vue內建的過度效果，官網有，name是相關操作的載入，需要寫。過度效果是寫在css裡 -->
    <!-- https://vuejs.org/guide/built-ins/transition.html#css-based-transitions -->
    <div class="bulletin-detail" v-show="isShow"> 
    <!-- v-show的使用相似於v-if，v-if是有條件的渲染，若判斷為true則渲染；v-show則是無條件渲染 -->
      <div class="detail-wrapper" >
        <!-- <div class="main-wrapper" :style="detail_bg"> -->
        <div class="main-wrapper" >
          <div class="detail-icon" :style="head_bg"></div>
          <h3 class="detail-name">{{poiInfo.name}}</h3>

          <!-- 星星評分組件 -->
          <div class="star-score">
            <Star :score="poiInfo.wm_poi_score"></Star>
            <!-- 透過這邊將分數帶進star組件裡面去運算 -->
            <span>{{poiInfo.wm_poi_score}}</span>
          </div>
          <p class="tip">
          {{poiInfo.min_price_tip}}<i>|</i>
          {{poiInfo.shipping_fee_tip}}<i>|</i>
          {{poiInfo.delivery_time_tip}}</p>
          <p class="time">
            營業時間:
            {{poiInfo.shipping_time}}
          </p>
          <div class="discounts">
            <p>
              <img v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" >
              <span  v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span><br/><br/>
              <span  v-if="poiInfo.discounts2">{{poiInfo.discounts2[1].info}}</span><br/><br/>
              <span  v-if="poiInfo.discounts2">{{poiInfo.discounts2[2].info}}</span>

              <!-- 跟上面一樣狀況 -->
            </p>
          </div>
        </div>
        <div class="close-wrapper" @click="closeBullentin">
          <span class="icon-close"></span>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
// 導入star組件 
// 為了方便且統一導入的路徑進行一些系統設置
// 先到build的webpack.base.conf裡的resolve新增依據 'components': resolve('./src/components')
import Star from "components/Star/Star"



export default {
  data(){
    return{
      isShow:false,  //初始值為關閉
      // 用來傳遞公告詳情的閉合搭配method方法使用
    }
  },
  // 元件的註冊
  components:{
    Star
  },
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
    },
    head_bg(){
              return "background-image:url("+this.poiInfo.pic_url+");"
    },
        detail_bg(){
              return "background-image:url("+this.poiInfo.poi_back_pic_url+");"
    }
  },
  methods:{
    showBulletin(){  //搭配data的isSsow操作
      this.isShow = true;
    },
    closeBullentin(){
      this.isShow = false;
    }
  }
};
</script>

<style>
/* 另一種的字體圖標，需要先導入樣式才行 */
@import url("../../common/styles/icon.css");

@import url("./Header.css");
</style>
