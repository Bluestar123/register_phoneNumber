<template>
	<view style='position: relative;height: 100vh;'>
		<image class='bg' src="/static/bg.png" mode=""></image>
		
		<view class='top'>
			<image src="/static/banli.png" mode=""></image>
		</view>
		
		<view class='main'>
			<view class='content'>
				<view style='line-height: 80upx;' v-if='!noInfo'>
					您的号码已办理，可随时在首页点击历史订单查询按钮，通过身份证信息进行物流信息查询
				</view>
				<view style='line-height: 80upx;' v-if='noInfo'>
					对不起，您的身份信息不符，无法进行号卡办理，请核实后再次申请
				</view>
			</view>
		</view>
		<!-- 确定 -->
		<image @tap='back' src="/static/qd.png" class='sure' mode=""></image>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				noInfo:false
			};
		},
		methods:{
			back(){
				if(this.noInfo){
					uni.navigateBack()
				}else{
					uni.navigateTo({
						url:'../home/home'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.top{
	width: 100%;text-align: center;margin-bottom: 64upx;
	image{
		width: 693upx;height: 99upx;margin-top: 41upx;
	}
}
.main{
	margin-left: 20upx;width: 713upx;background: #fff;padding: 80upx 40upx;box-shadow: 8upx 10upx 0upx #fcecdd;border-radius: 24upx;
	.content{
		color: #FE814F;font-weight: bold;text-align: center;padding: 30upx 40upx;
	}
}

</style>
