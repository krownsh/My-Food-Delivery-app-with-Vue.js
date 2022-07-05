<template>
<div class="goods">
    <div class="menu-wrapper">
        <ul>
        <!-- 專場部分 -->
            <li class="menu-item" >
                <p class="text">
                    <img :src="container.tag_icon" v-if="container.tag_icon" class="icon"/>
                    <!--                  有才顯，沒就不顯 -->
                    {{container.tag_name}}
                </p>
            </li>



            <li class="menu-item" v-for="item in goods">
                <p class="text">
                    <img :src="item.icon" v-if="item.icon" class="icon"/>
                    <!--                  有才顯，沒就不顯 -->
                    {{item.name}}
                </p>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper">
        <ul>
            <li v-for="item in goods"> 
            <!-- 這是品項分類 -->
            <h3 class="title">{{item.name}}</h3>
            <!-- 這是單一商品列表 -->
            <ul>
                <li v-for="food in item.spus">
                    <div class="icon" :style="head_bg(food.picture)">
                    <!-- 原本背景圖都是用computed在寫得，但因為我們要抓的是屬性裡面的值，computed沒辦法傳參，因此要用method方法寫 -->
                    </div>
                    <div class="content">
                        <h3 class="name">{{food.name}}</h3>
                        <p class="desc" v-if="food.description">
                        <!--             有值的話才跑 -->
                        {{food.description}}
                        </p>
                        <div class="extra">
                            <span class="saled">{{food.month_saled_content}}</span>
                            <span class="praise">{{food.praise_content}}</span>
                        </div>
                        <img class="product" :src="food.product_label_picture" v-show="food.product_label_picture" />
								<p class="price">
									<span class="text">${{food.min_price}}</span>
									<span class="unit">/{{food.unit}}</span>
								</p>
                    </div>
                </li>
            </ul>
            </li>
        </ul>
    </div>


</div>

</template>

<script>

export default{
    data(){
        return{
            container:{},
            // 可以刪，他只是拿來放專場的內容
            goods:[],
            // 依照json內容格式建立
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
      that.container =dataSource.data.container_operation_source;
      that.goods = dataSource.data.food_spu_tags;
    //   搭配上面見的data()參考，建立符合要的json的內容
    //   console.log(that.container);
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  },
//   computed:{
//      計算屬性是不能傳遞參數的，我們之前圖片寫法，因此要改成method寫法
//     head_bg(){
//         return{

//         }
//     }
//   }
    methods: {
        // 寫法跟原本用computed差不多
        head_bg(imgName){
              return "background-image:url("+imgName+");"
        }
    },
};

</script>

<style>
    @import url("Goods.css");
</style>