<template>
<div class="goods">
    <div class="menu-wrapper" ref="menuScroll">
        <ul>
        <!-- 專場部分 -->
            <li class="menu-item" :class="{'current':currentIndex===0}" @click="selectMenu(0)">
                <p class="text">
                    <img :src="container.tag_icon" v-if="container.tag_icon" class="icon"/>
                    <!--                  有才顯，沒就不顯 -->
                    {{container.tag_name}}
                </p>
            </li>



            <!-- <li class="menu-item" v-for="item in goods"> -->
            <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)">
<!--                                            位數組索引指定別名           css也給他一個current的樣式-->
                <p class="text">
                    <img :src="item.icon" v-if="item.icon" class="icon"/>
                    <!--                  有才顯，沒就不顯 -->
                    {{item.name}}
                </p>
				<!-- <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i> -->

            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodScroll">
        <ul>
        <!--上面的廣告-->
				<li class="container-list food-list-slide">
					<div v-for="item in container.operation_source_list">
						<img :src="item.pic_url" />
					</div>
				</li>
            <li v-for="item in goods" class="food-list food-list-slide"> 
            <!--                                       用來抓滾輪高度 -->
            <!-- 這是品項分類 -->
            <h3 class="title">{{item.name}}</h3>
            <!-- 這是單一商品列表 -->
            <ul>
                <li v-for="food in item.spus" class="food-item">
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
// 導入 betterscroll
import betterscroll from '@better-scroll/core';
// https://better-scroll.github.io/docs/zh-CN/guide/how-to-install.html

export default{
    data(){
        return{
            container:{},
            // 到時候可以刪，他只是拿來放專場的內容
            goods:[],
            // 依照json內容格式建立
            listHeight:[],
            // 用來抓滾輪區間高度
            scrollY:0,
            // betterScroll計算插件滾動值
            menuScroll:{},
            foodScroll:{},
			selectedFood: {}

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


    // 調用初始化後的betterScroll
	// 不能直接調用that.initScroll();因為，DOM還沒被渲染
	// 因此需要nextTick語法，在下一次dom被更新之後調用
	that.$nextTick( ()=>{
	// DOM已經更新
	that.initScroll();
	// 計算各分類的區間高度
	that.calculateHeight();

	});



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
        },
        initScroll(){
        // 滾動套件的初始化
        // 要搭配ref屬性，它是用來綁定某個dom元素或組件，並用this.$refs呼叫
        // 這裡完成還要再回去created進行調用
        this.menuScroll = new betterscroll(this.$refs.menuScroll,{click:true});
        //                                                       better sceoll 預設是false所以click事件會無反應
        this.foodScroll = new betterscroll(this.$refs.foodScroll,{probeType:3,click:true});
        //                                                        官方寫法
        //滾動監聽事件
        // 看套件官網 scroll特定位置
        this.foodScroll.on('scroll',(position)=>{
            // console.log(position.y)
            this.scrollY = Math.abs(Math.round(position.y));
            console.log(this.scrollY)
        })

    },
    // 計算各格區間的高度
    calculateHeight() {
				// 透過$refs來獲取對應元素
				let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-slide');
				
				// 0~216 專場  第一區件位置
				// 217~1286 商品列表
				let height = 0;
				this.listHeight.push(height);
				for (let i=0; i<foodlist.length; i++) {
					let item = foodlist[i];
					
					// 累加
					height += item.clientHeight;
					
					this.listHeight.push(height);
				}
				
			},
    selectMenu(index){
        // console.log(index);
        
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-slide');
        
        // 根据下标，滚动到相对应的元素
        let el = foodlist[index];
        
        // 滚动到对应元素的位置
        this.foodScroll.scrollToElement(el,250); //說明文件寫法
    },
    },
    computed:{
        currentIndex(){
            // 依照右側滾動來抓左側索引
				for (let i=0; i<this.listHeight.length; i++) {
					// 商品區間範圍
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					
					// 是否在上述區間中
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						return i;
					}
				}
				
				return 0;            
        }
    }

};

</script>

<style>
    @import url("Goods.css");
</style>