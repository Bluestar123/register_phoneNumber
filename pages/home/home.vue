<template>
	<view>
		<view class='home1'>
			<image src="/static/home1.jpg" class="bg1"></image>
			
			<view class='btn1'>
				<image @tap='toChooseNum' src="/static/11.png"></image>
				<image @tap='toHistory' src="/static/22.png"></image>
			</view>
		</view>
		
		<view class='home2'>
			<image src="/static/home2.jpg" mode=""></image>
		</view>
		
		<view class='home3'>
			<image src="/static/home3.jpg" mode=""></image>
		</view>
		
		<view class="home4">
			<image src="/static/home4.jpg" mode=""></image>
		</view>
		<view class="home5">
			<image src="/static/home5.jpg" mode=""></image>
		</view>
		<view class="home6">
			<image src="/static/home6.jpg" mode=""></image>
		</view>
		
		<image @tap='toChooseNum' src="/static/home_bot.jpg" class='application' mode=""></image>
	</view>
</template>

<script>
	import {get} from '../../utils/api.js'
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			get('/mobleOrder/homeHtml').then(res=>{
				console.log(res)
			})
		},
		methods:{
			toChooseNum(){
				uni.navigateTo({
					url:'../chooseNum/chooseNum'
				})
			},
			toHistory(){
				uni.navigateTo({
					url:'../history/history'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.home1{
	width: 100%;height:1018upx;position: relative;
	.bg1{
		position: absolute;top: 0;left: 0;width: 100%;height: 1018upx; z-index: -1;
	}
	.btn1{
		width: 100%;position: absolute;top:900upx;display: flex;flex-wrap: nowrap;padding: 0 100upx;
		image{
			width: 281upx;height: 94upx;
		}
	}
}

.home2{
	width: 100%;height: 1083upx;
	image{
		width: 100%;height: 100%;
	}
}

.home3{
	width: 100%;height: 685upx;
	image{
		width: 100%;height: 100%;
	}
}

.home4{
	width: 100%;height: 1725upx;
	image{
		width: 100%;height: 100%;
	}
}

.home5{
	width: 100%;height: 2436upx;
	image{
		width: 100%;height: 100%;
	}
}

.home6{
	width: 100%;height: 169upx;
	image{
		width: 100%;height: 100%;
	}
}
.application{
	width: 100%;height: 98upx;

}
</style>
