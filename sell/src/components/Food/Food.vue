<!-- 食物詳情葉 -->

<template>
<transition name="detail">
    <div class="food" v-show="detail" ref="foodView">
        		<div class="food-wrapper">

				<div class="food-content">
					<div class="img-wrapper">
						<img class="food-img" :src="food.picture" />

						<span class="close-bt icon-close" @click="closeView"></span>
						<!-- <img class="share-bt" src="./share.png" /> -->
                        <!-- 可刪除  不建置功能 -->
						<!-- <img class="more-bt" src="./more.png" /> -->
                        <!-- 可刪除  不建置功能 -->
					</div>
                    	<div class="content-wrapper">
						<h3 class="name">{{food.name}}</h3>
						<p class="saled">{{food.month_saled_content}}</p>
						<img class="product" v-show="food.product_label_picture" :src="food.product_label_picture" />
                        <!--                  有才顯示 -->
						<p class="price">
							<span class="text">${{food.min_price}}</span>
							<span class="unit">/{{food.unit}}</span>
						</p>
                        <div class="cartcontrol-wrapper">
							<Cartcontrol :food="food"></Cartcontrol>
						</div>
						<div class="buy" v-show="!food.count || food.count==0" @click="addFirst">
                        <!--                     數量不存在或是等於0才顯示 -->
							加入購物車
						</div>


					</div>

				</div>
                <Split></Split>
        			<div class="rating-wrapper">
					<div class="rating-title">
						<div class="like-ratio" v-if="food.rating">
                        <!--                    "title">{{food.rating.title}}拜訪兩個層級以上記得要用if,而且2曾寫法     -->
							<span class="title">{{food.rating.title}}</span>
							<span class="ratio">
							(
								{{food.rating.like_ratio_desc}}
								<i>{{food.rating.like_ratio}}</i>
							)
						</span>
						</div>
						<div class="snd-title" v-if="food.rating">
                        <!--        依json檔命名 -->
							<span class="text">{{food.rating.snd_title}}</span>
							<span class="icon icon-keyboard_arrow_right"></span>
						</div>
					</div>

					<ul class="rating-content" v-if="food.rating">
						<li v-for="comment in food.rating.comment_list" class="comment-item">
							<div class="comment-header">
                            <!-- 左邊頭像 -->
								<img :src="comment.user_icon" v-if="comment.user_icon" />
								<img src="./anonymity.png" v-if="!comment.user_icon" />
                                <!--                       沒有用戶頭像，幫她置入我們的圖片 -->
							</div>
							<div class="comment-main">
								<div class="user">
									{{comment.user_name}}
								</div>
								<div class="time">
									{{comment.comment_time}}
								</div>
								<div class="content">
									{{comment.comment_content}}
								</div>
							</div>
						</li>
					</ul>
				</div>


			    
                
                </div>

    </div>
</transition>

</template>


<script>
import Cartcontrol from '../Cartcontrol/Cartcontrol.vue';
// 用來作新增品項的連動
import betterscroll from '@better-scroll/core';

import Vue from 'vue';
import Split from '../Split/Split.vue';


export default{
    data(){
        return{
            detail:false,

        }
    },
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        // good父組件可以調用子組建的方法
        showView(){
            this.detail=true;
            // betterscroll先進行初始化(要等dom元素先更新完成才初始化)
            this.$nextTick(()=>{
                if(!this.scroll){
                    this.scroll = new betterscroll(this.$refs.foodView,{
                        click:true, //記得打開點擊事件
                    });
                }else{
                    this.scroll.refresh();
                }
            })
        },
        closeView(){
            this.detail=false;

        },
        addFirst(){
        // 先調用vue才有辦法監聽count屬性
            Vue.set(this.food,'count',1)
        }
    },
    components:{
    Cartcontrol,
    betterscroll,
    Split,

}
}


</script>

<style>
    @import url(./Food.css);
</style>