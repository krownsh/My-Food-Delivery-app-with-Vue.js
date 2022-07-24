<template>

    <div class="shopcart" :class="{'highlight':totalCount>0}">
    <!--                                 透過計算式，如果有就加入這個class屬性 
    在css樣式中  黏再一起寫 .shopcart-wrapper.highlight  就是同一層-->
    <div class="shopcart-wrapper">
    <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight':totalCount>0}"
        @click="toggleList">
        <!-- 是否展開購物籃 -->
        <span class="icon-shopping_cart logo" :class="{'highlight':totalCount>0}"></span>
        <i class="num" v-show="totalCount">{{totalCount}}
        <!--                   如果為true才執行 -->
        <!-- 購物車選中的另外樣式 -->
        </i>
        </div>
        <div class="desc-wrapper">
            <p class="total-price" v-show="totalPrice" >小計{{totalPrice}}</p>
            <p class="tip" :class="{'highlight':totalCount>0}">{{poiInfo.shipping_fee_tip}}</p>
        </div>
    </div>
    <div class="content-right" :class="{'highlight':totalCount>0}">
    {{payStr}}
    </div>
    <!-- 購物車詳情 -->
    <div class="shopcart-list" v-show="listShow" :class="{'show':listShow}">
    <!--                                         有listShow時才有這個show class -->
    <!-- 購物籃的顯示 -->
        <div class="list-top" v-if="poiInfo.discounts2">
        {{poiInfo.discounts2[0].info}}
        </div>
        <div class="list-header">
            <h3 class="title">購物籃</h3>
            <div class="empty" @click="emptyCart">
                <img src="./ash_bin.png" alt="">
                <span>清空購物車</span>
            </div>
        </div>
        <div class="list-content" ref="listContent">
        <!-- 設定 ref="listContent"屬性，丟給computed-->
            <ul>
                <li class="food-item" v-for="food in selectFoods">
                    <div class="desc-wrapper">
                        <div class="desc-left">

                            <p class="name" >{{food.name}}</p>
                            <p class="description" v-show="food.description">{{food.description}}</p>
                        </div>
                        <div class="desc-right">
                            <span class="price">${{food.min_price}}</span>
                        </div>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <Cartcontrol :food="food"></Cartcontrol>
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-bottom"></div>

    </div>
    </div>
    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
    <!-- 點擊遮罩也可以關閉 -->

    </div>
    <!-- 購物車的遮罩 -->
</template>

<script>
	import betterscroll from 'better-scroll'
    import Cartcontrol from "../Cartcontrol/Cartcontrol"
    export default{
        data() {
			return {
			fold: true
			}
		},
        props:{
            // 接收完之後就可以再傳遞給上面欄位
            // min_price_tip:{
            //     type:String,
            //     default:'',

            // },
            // shipping_fee_tip:{
            //     type:String,
            //     default:'',
            // },
            poiInfo: {
				type: Object,
				default: {}
			},
            selectFoods: {
                // 來畔對購物車是否被選擇
				type: Array,
				default() {
                    // 因為是數組所以要用這種寫法
					return [
                        // 先模擬用方便看
                    // {
                    // min_price: 20,
                    // count: 1
                    // },
                    // {
                    // min_price: 7,
                    // count: 0
                    // }
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
            },
            listShow(){
            //展開與否，從data取值 
                if(!this.totalCount){  //個數為0
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;

                //滾動操作
                if(show){
                    // 有show的話才繼續執行scroll，要丟回上面要執行的地方
                    this.$nextTick(()=>{
                        // dom元素更新完成，渲染結束後才去計算它的高度
                        if(!this.shopScroll){
                        this.shopScroll = new betterscroll(this.$refs.listContent,{
                            click:true
                            // 派發一個點擊事件
                        });
                    }else{
                        this.shopScroll.refresh();
                        // betterscroll的功能
                    }
                    })
                }

                return show;
            }

        },
        methods:{
            toggleList(){
                if(!this.totalCount){  //個數為0
                return ;
            }
            this.fold = !this.fold;
        },
            emptyCart(){
                // 對應商品清0
                this.selectFoods.forEach((food)=>{
                    food.count = 0;
                })
            },
            hideMask(){
                this.fold = true;
            }
        },
        components:{
            Cartcontrol,
            betterscroll
            }
    }
</script>


<style>
    @import url(./ShopCart.css);
</style>