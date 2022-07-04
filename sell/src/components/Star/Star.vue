<!-- 利用3種類型的圖片來建立星星評價，滿星one-star，半星half-star,無星none-star -->
<template >
    <div class="star">
        <span v-for="star in stars" :class="star" class="star-item"></span>
    </div>
</template>
<script>

    // 定義星星長度
    const length = 5;
    const oneStar = "one-star" ;
    const halfStar = "half-star";
    const noneStar = "none-star";
    // 要用這些定義的來把她帶回去class屬性裡



export default {
    props:{
        score:{
            type:Number
        }
    },
    computed:{
        stars(){
            let result = [];
            let score = Math.floor(this.score*2)/2;
            // 向下取0.5的倍數，想是4.7變4.5
            let decimal = score % 1 !==0;
            // 是否有小數，以控制半星
            let integer = Math.floor(score);
            // 取整數，控制全星

            // 計算全星數量
            for(let i= 0 ; i<integer ; i++){
                result.push(oneStar)
            }
            // 半星
            if(decimal){
                result.push(halfStar)
            }
            // 剩下的補齊
            while(result.length < length){
			result.push(noneStar);
			}
				
				return result;
        }
    }
}
</script>
<style >
    .star{
        font-size: 10px;
    }
    .star .star-item{
        display: inline-block;
        width:10px;
        height: 10px;
        margin-right:3px;
        background-repeat: no-repeat;
        background-size:10px 10px ;
    }
    .star .star-item:last-child{
        margin-right: 0;
    }
     .star .one-star{
		background-image: url(star24_on@2x.png);
	}
	.star .half-star{
		background-image: url(star24_half@2x.png);
	}
	.star .none-star{
		background-image: url(star24_off@2x.png);
	}
	

</style>
