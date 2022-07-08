<template>

    <div class="shopcart-wrapper" :class="{'highlight':totalCount>0}">
    <!--                                 透過計算式，如果有就加入這個class屬性 
    在css樣式中  黏再一起寫 .shopcart-wrapper.highlight  就是同一層-->
    <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
        <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
        <i class="num" v-show="totalCount">{{totalCount}}
        <!--                   如果為true才執行 -->
        <!-- 購物車選中的另外樣式 -->
        </i>
        </div>
        <div class="desc-wrapper">
            <p class="total-price" v-show="totalPrice" >小計{{totalPrice}}</p>
            <p class="tip" :class="{'highlight':totalCount>0}">{{shipping_fee_tip}}</p>
        </div>
    </div>
    <div class="content-right" :class="{'highlight':totalCount>0}">
    {{payStr}}
    </div>

    </div>
</template>

<script>
    export default{
        props:{
            // 接收完之後就可以再傳遞給上面欄位
            min_price_tip:{
                type:String,
                default:'',

            },
            shipping_fee_tip:{
                type:String,
                default:'',
            },
            selectFoods: {
                // 來畔對購物車是否被選擇
				type: Array,
				default() {
                    // 因為是數組所以要用這種寫法
					return [
                        // 先模擬用方便看
                    {
                    min_price: 20,
                    count: 1
                    },
                    {
                    min_price: 7,
                    count: 1
                    }
					];
				}
			}

        },
        computed:{
            // 總個數的計算
            	totalCount() {
				let num = 0;
				this.selectFoods.forEach((food) => {
					num += food.count;
				});

				return num;
			},
			// 總金額
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.min_price * food.count;
				});

				return total;
			},
            // 轉成結算按鈕
            payStr(){
				if(this.totalCount > 0) {
					return "去结算";
				} else {
					return this.poiInfo.min_price_tip;
				}
//                   false的話照原本
            }

        }
    }
</script>


<style>
    @import url(./ShopCart.css);
</style>