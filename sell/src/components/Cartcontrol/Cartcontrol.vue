<template>

<div class="cartcontrol">
<transition name="move">
<!-- 可移除 -->
    <div class="cart-decrease "
    @click.stop.prevent="decreaseCart" v-show="food.count">
    <!--                有值才顯示 -->
    <span class="inner icon-remove_circle_outline"></span>  
    <!-- 用來製作動畫 -->
    </div>
</transition>
    
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle"
    @click.stop.prevent="addCart">
     <!-- <i class="bg"></i> -->
     <!-- /* bug找不到，目前不影響可刪 */ -->
     <!-- 讓文字圖案變成黑色背景 ，讓他變成黑色++-->
    </div>
</div>


</template>

<script>
import Vue from 'vue'

export default{

    props:{
        // 將goods的商品傳遞過來
        food:{
            type:Object
        }

    },
    methods:{
        decreaseCart(){
            this.food.count--;
        },
        addCart(){
            if(!this.food.count){
                // 利用vue的set方法，因此需要import
                Vue.set(this.food,'count',1);   // target,key,value
                // 幫她做一個count的值，丟回到我們的json檔欄位
                }else{
                    this.food.count++;
                }
            }
        }
    }
</script>


<style>
@import url(./Cartcontrol.css);
</style>