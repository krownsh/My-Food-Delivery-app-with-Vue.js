<template>
<div class="ratings" ref="ratingView">
    <div class="ratings-wrapper">
        <div class="overview">
            <div class="overview-left">
                <div class="comment-score">
                    <p class="score">{{ratings.comment_score}}</p>
                    <p class="text">店家評分</p>
                </div>

            </div>


        </div>
        <Split></Split>
        <div class="content">
            <div class="rating-select" v-if="ratings.tab">
            <!--                          因為有兩層或以上，記得要加入v-if -->
            <span class="item" @click="selectTypeFn(2)" :class="{'active':selectType==2}">
            <!--                         利用DATA的selectType帶的 -->
                {{ratings.tab[0].comment_score_title}}
            </span>
            <span class="item" @click="selectTypeFn(1)" :class="{'active':selectType==1}">
                {{ratings.tab[1].comment_score_title}}
            </span>
            </div>
				<ul class="rating-list">
					<li v-for="comment in selectComments" class="comment-item">
						<div class="comment-header">
							<img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
							<img src="./anonymity.png" v-if="!comment.user_pic_url" />
						</div>
						<div class="comment-main">
							<div class="user">
								{{comment.user_name}}
							</div>
							<div class="time">
                            <!-- 他是用時間撮記所以要轉換 -->
								{{comment.comment_time}}
                                <!-- {{fotmatDate(comment.comment_time)}} -->

							</div>
							<div class="star-wrapper">
								<span class="text">評分</span>
								<Star :score='comment.order_comment_score' class='star'></Star>
							</div>
							<div class="c_content" v-html="commentStr(comment.comment)"></div>
                            <!--                這邊不能直接寫在<div>commentStr(comment.comment)<div>，因為我們裡面是有包html，他會直接顯示html ，要用v-html方法-->
							<div class="img-wrapper" v-if="comment.comment_pics">
                            <!-- <div class="img-wrapper" v-if="comment.comment_pics.length"> -->

                            <!--                                                有長度才代表有圖片，才要進行渲染 -->
								<img v-for="item in comment.comment_pics" :src="item.thumbnail_url" />
							</div>
						</div>
					</li>
				</ul>


        </div>

    </div>
</div>

</template>

<script>

//導入星星組件
import Star from "components/Star/Star"
import Split from "components/Split/Split"
import betterscroll from '@better-scroll/core';


const ALL = 2; //全部  記得寫在外邊
const PICTURE = 1; //帶圖片
const COMMENT = 0; // 點評

export default{
    data(){
        return{
            ratings:{},
            selectType:ALL,

        }
    }
    ,
    created(){
        // 一開啟就獲取數據
        let that = this;
   this.$axios.get('/static/星巴克(店家評價).json')
  .then(function (response) {
    // handle success
    var dataSource = response.data;
    if(dataSource.code ==0){ 
        // console.log(dataSource.data.comment_num);

      that.ratings =dataSource.data;  //欄位就叫data

    //   初始化bettersvroll
        that.$nextTick(() => {
        if(!that.scroll) {
            // 是空的話就初始化
            that.scroll = new betterscroll(that.$refs.ratingView, {
                click: true
            });
        } else {
            that.scroll.refresh();
        }
    });

    }


  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
    },  
    methods: {
    selectTypeFn(type){
        this.selectType = type;

        // 刷新操作，讓他重新刷新高度
        this.$nextTick(() => {
            this.scroll.refresh();
        });

    },
            fotmatDate(time) {
            let date = new Date(time * 1000);

            // 時間格式
            let fmt = 'yyyy.MM.dd';
            // 利用正規表達事進行
            if(/(y+)/.test(fmt)) { // 年
                let year = date.getFullYear().toString();
                fmt = fmt.replace(RegExp.$1, year);
            }
            if(/(M+)/.test(fmt)) { // 月
                let month = date.getMonth() + 1;
                if(month < 10) {
                    month = '0' + month;
                }
                fmt = fmt.replace(RegExp.$1, month);
            }
            if(/(d+)/.test(fmt)) { // 日
                let mydate = date.getDate();
                if(mydate < 10) {
                    mydate = '0' + mydate;
                }
                fmt = fmt.replace(RegExp.$1, mydate);
            }

            return fmt;
        },
			commentStr(content) {
                // 利用正規表達法找出，內容中有跟菜單一樣的文字(裡面是寫到#...#，不要直接用#+#他會把多個#包再一起)
				let rel = /#[^#]+#/g;
                         //^#中間不能出現#的意思
				return content.replace(rel, '<i>$&</i>');
                // 要記得還他一個樣式
			}

  },
    computed:{
// 依照選取的不同，來決定要顯示那些畫面
    selectComments(){
        if(this.selectType ==ALL){ //全部的
            return this.ratings.comments;
        }else if(this.selectType ==PICTURE){ //有圖的
            let arr = [];
            // 圖片部分是陣列，所以要用數組，把他一個一個抓出來
            this.ratings.comments.forEach((comment) => {
                if(comment.comment_pics) {
                // if(comment.comment_pics.length) {

                    // 有長度的就代表有東西
                    arr.push(comment);
                }
            });
            return arr;
        }else{  //點評的
		return this.ratings.comments_dp.comments;
        }
    }
    },
    components:{
        Star,  //先註冊
        Split,
        betterscroll,
    }
}
</script>

<style>
@import url("./Ratings.css");
</style>