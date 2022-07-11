<template>
	<div class="seller" ref='sellerView'>
		<div class="seller-wrapper">
			<Split></Split>
			<div class="seller-view">
				<div class="address-wrapper">
					<div class="address-left">
						{{seller.address}}
					</div>
					<div class="address-right">
						<div class="content"></div>
					</div>
				</div>
				<div class="pics-wrapper" v-if="seller.poi_env" ref='picsView'>
                <!--                      兩層以上記得喔 -->
					<ul class="pics-list" ref='picsList'>
						<li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" ref='picsItem'>
							<img :src="imgurl" />
						</li>
					</ul>
				</div>
				<div class="safety-wrapper">
					查看食品檔案
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			</div>

			<Split></Split>
			<div class="tip-wrapper">
				<div class="delivery-wrapper">
					外送服務: {{seller.app_delivery_tip}}
				</div>
				<div class="shipping-wrapper">
					服務時間: {{seller.shipping_time}}
				</div>
			</div>

			<Split></Split>
			<div class="other-wrapper">
				<div class="server-wrapper">
					店家服務
					<div class="poi-server" v-for="item in seller.poi_service">
						<img :src="item.icon" /> {{item.content}}
					</div>
				</div>
				<div class="discounts-wrapper">
					<div class="discounts-item" v-for="item in seller.discounts2">
						<div class="icon">
							<img :src="item.icon_url" />
						</div>
						<div class="text">
							{{item.info}}
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
import Split from "components/Split/Split"
import Betterscroll from '@better-scroll/core';


export default{
		data() {
			return {
				seller: {}
			}
		},
		created() {
			// 通过axios发起get请求
			let that = this;
			this.$axios.get('/api/seller')
				.then(function(response) { // 获取到数据
					var dataSource = response.data;
					if(dataSource.code == 0) {
						that.seller = dataSource.data;

		// 				// 初始化
						that.$nextTick(() => {
                            // 更新後渲染
							if(that.seller.poi_env.thumbnails_url_list) {
                                // 計算它的橫向拉深寬度
								let imgW = that.$refs.picsItem[0].clientWidth;  //也可以直接依照css寫入固定數值
								let marginR = 11;
								let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length;

								that.$refs.picsList.style.width = width + 'px';

								that.scroll = new Betterscroll(that.$refs.picsView, {
									scrollX: true
								});
							}
							
							that.sellerView = new Betterscroll(that.$refs.sellerView);
							
						});
					}
				})
				.catch(function(error) { // 出错处理
					console.log(error);
				});
		},
		components: {
			Split,
			Betterscroll,
		}
	}
</script>

<style>
@import url("./Seller.css");
</style>