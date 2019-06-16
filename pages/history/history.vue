<template>
	<view style='position: relative;min-height: 100vh;'>
		<image class='bg' src="/static/bg.png" mode=""></image>
		<view class='top'>
			<image src="/static/history.png" mode=""></image>
		</view>
		
		<view class='main'>
			<!-- 填写搜索信息 -->
			<view v-if='write_info'>
				<view class='content'>
					<text>查询姓名</text>
					<input v-model='username' type="text">
				</view>
				<view class='content'>
					<text>身份证号</text>
					<input v-model='idcard' type="idcard">
				</view>
			</view>
			<block v-if='!write_info'>
				<!-- 没有信息 -->
				<view class='no_info' v-if='no_info'>
					<view style='margin-bottom: 30upx;'>
						对不起您还未进行号卡申请
					</view>
					<view>
						请申请后再进行查询
					</view>
				</view>
				<!-- 有信息 -->
				<view v-if='!no_info'>
					<view class='orderId'>订单号：{{orderId}}</view>
					<view class='info_content'>
						<view class='status'>
							物流状态
						</view>
						
						<view v-for='(item,index) in list' :key='index'>
							<view class='title'>
								{{item.sendMsg}}
							</view>
							<view class='time'>
								{{item.time}}
							</view>
						</view>
					</view>
				</view>
			</block>
			
		</view>
		<view style='height: 100upx;'></view>
		<!-- 开始查询 -->
		<image @tap='startSearch' src="/static/qd1.png" v-if='write_info' class='start_search' mode=""></image>
		<block v-else>
			<!-- 有结果重新查询 -->
			<image @tap='reStart' src="/static/qd2.png" v-if='!no_info' class='start_search' mode=""></image>
			<!-- 无卡进行开卡 -->
			<image @tap='application' src="/static/qd4.png" v-if='no_info' class='start_search' mode=""></image>
		</block>
	</view>
</template>

<script>
	import {post,error} from '../../utils/api.js'
	export default {
		data() {
			return {
				username:'',
				idcard:'',
				write_info:true,
				no_info:true,
				orderId:'',
				list:[],
				testId: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
			};
		},
		methods:{
			startSearch(){
				if(this.username&& this.idcard){
					if(!this.testId.test(this.idcard)){
						uni.showToast({
							icon:'none',
							title:'身份证号不正确'
						})
						return
					}
					
					let para = {
						custName:this.username,
						idCardNumber:this.idcard
					}
					uni.showLoading({
						title:'加载中...'
					})
					post('/mobleOrder/historyQuery',para).then(res=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.code==0){
							for(let i=0;i<res.data.data.partner_info.length;i++){
								var newDate = new Date() 
								newDate.setTime(res.data.data.partner_info[i].sendTime);
								res.data.data.partner_info[i].time = newDate.toLocaleString()
							}
							
							this.list = res.data.data.partner_info
							this.write_info=false
							this.no_info=false
						}else if(res.data.code==501){
							uni.showToast({
								icon:'none',
								title:res.data.data.deal_msg,
								duration:3000
							})
						}else if(res.data.code==500){//没开卡
							this.write_info=false
						}else{
							
							uni.showToast({
								icon:'none',
								title:res.data.msg,
								duration:3000
							})
						}
						
					}).catch(err=>{
						error()
					})

				}else{
					uni.showToast({
						icon:'none',
						title:'请输入查询信息'
					})
				}
			},
			reStart(){
				this.username=''
				this.idcard=''
				this.write_info=true
			},
			application(){
				uni.navigateTo({
					url:'../chooseNum/chooseNum'
				})
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
	margin-left: 20upx;width: 713upx;background: #fff;padding: 80upx 40upx;box-shadow: 8upx 10upx 0upx #fcecdd;border-radius: 24upx; padding-bottom: 30upx; margin-bottom: 30upx;
	.content{
		display: flex;flex-wrap: nowrap;line-height: 82upx;margin-bottom: 40upx;

		input{
			margin-left: 15upx;height: 82upx;border-radius: 24upx;border: 1upx solid #ccc;flex: 1; padding-left: 20upx;
		}
	}
	.content:last-child{
		margin-bottom: 0
	}
	.no_info{
		color: #FE814F;font-weight: bold;text-align: center;padding: 30upx 0;
	}
	.orderId{
		border-bottom: 1upx solid #fd4900;font-size: 32upx;color: #fd4800;padding-bottom: 22upx;padding-left: 33upx;
	}
	.info_content{
		padding: 40upx 33upx;
		.status{
			font-size: 32upx;margin-bottom: 38upx;color: #fd4800;
		}
		.title{
			font-size: 29upx;color: #222;margin-bottom: 25upx;
		}
		.time{
			font-size: 29upx;color: #ccc;margin-bottom: 25upx;
		}
	}
}
.start_search{
	width: 100%;
	height: 94upx; position: absolute;left: 0; bottom: 0;
}
</style>
