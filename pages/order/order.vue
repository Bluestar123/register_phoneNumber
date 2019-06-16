<template>
	<view style='position: relative;height: auto;min-height: 100vh;'>
		<image class='bg' src="/static/bg.png" mode=""></image>
		
		<view class='top'>
			<image src="/static/sure.png" mode=""></image>
		</view>
		
		<view class='main'>
			<view class='title'>
				<text style='color: #FD4800;'>套餐名称：</text>移动网卡
			</view>
			<view class='info'>
				收货信息：
			</view>
			
			<form @submit="formSubmit">
				<view class='every_item'>
					<view class='item'>收货人姓名：</view>
					<input type="text" v-model='info.geterName' name='geterName' class='right' placeholder-style="color:#ccc;" placeholder="请输入收货人姓名">
				</view>
				<view class='every_item'>
					<view class='item'>身份证号码：</view>
					<input type="idcard" v-model='info.idCard' name='idCard' class='right' placeholder-style="color:#ccc;" placeholder="请输入身份证号码">
				</view>
				<view class='every_item'>
					<view class='item'>联系电话：</view>
					<input type="number" v-model='info.phoneNumber' name='phoneNumber' class='right' placeholder-style="color:#ccc;" placeholder="请输入联系电话">
				</view>
				
				<view class='every_item'>
					<view class='item'>收货地址：</view>
					<view @click="cityPicker2" class='right'>
						<text v-if='cityText2'>{{cityText2}}</text>
						<text v-else style='color: #ccc;'>请选择省市区</text>
					</view>
				</view>
				<view class='every_item'>
					<view class='item'>详细地址：</view>
					<input type="text" v-model='info.address' name='address' class='right' placeholder-style="color:#ccc;" placeholder="具体单元门,门牌号码等">
				</view>
				
				<view class='info' style='border-top: 1upx solid #FD4900;padding-top: 30upx;margin-bottom: 28upx;'>
					号码确认：
				</view>
				
				<view style='display: flex;flex-wrap: wrap;'>
					<view @tap='chooseNum(item)' class='every_item1' v-for='(item,index) in list' :key='index'>
						<image v-if='!item.choose' src="/static/6.png" mode=""></image>
						<image v-else src="/static/5.png" mode=""></image>
						<text>{{item.phoneNum}}</text>
					</view>
				</view>
				<!-- <view style="padding:22upx 0;">
					<button formType="submit" type="primary" style="width:100%;">提交</button>
				</view> -->
			</form>
		</view>
		
		<view style='padding-left: 30upx;margin-top: 28upx;height: 180upx;'>
			<radio @tap='changeRadio' color="#FD4800" value="r1" :checked="radio" />
			<text style="font-size: 34upx;color: #8e8c87;padding-left: 12upx;">我已阅读并同意</text>
			<text style='color: #FD4800;font-size: 34upx;'>《北京移动选号入网协议》</text>
		</view>
		
		<!-- 确定 -->
		<image @tap='sureOrder' src="/static/qd.png" class='sure' mode=""></image>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker2" :pickerValueDefault="cityPickerValueDefault2" @onCancel="onCancel2" @onConfirm="onConfirm2"></mpvue-city-picker>
	</view>
</template>

<script>
import mpvueCityPicker from '../../threeComponents/mpvueCityPicker.vue';
import {error,get} from '../../utils/api.js'
export default {
	data() {
		return {
			info:{
				geterName:'',
				address:'',
				phoneNumber:'',
				idCard:''
			},
			radio:true,
			themeColor: '#fd4800', //颜色
			cityText2 : "",
			cityPickerValueDefault2 : [0,0,1],
			//记录全部信息用于表单提交
			city2 : null,
			//有备选号码 单选。只有一个号码直接选中
			list:[],
			testId: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
			testNumber: /^((([0-9]|[-])+){7,18})|(1[0-9]{10})$/
		}
	},
	onShow() {
		
		this.list = this.$store.state.chooseList
	},
	methods:{
		chooseNum(item){
			this.list.map(i=>{
				i.choose=false
			})
			item.choose=true
		},
		changeRadio(){
			this.radio=!this.radio
		},
		sureOrder(){
			this.chooseNumber = null
			this.list.map(i=>{
				if(i.choose){
					this.chooseNumber = i
				}
			})
			
			if(!this.info.address){
				uni.showToast({
					icon:'none',
					title:'请输入详细地址',
					duration:3000
				})
			}else if(!this.info.geterName){
				uni.showToast({
					icon:'none',
					title:'请输入收货人姓名',
					duration:3000
				})
			}else if(!this.testId.test(this.info.idCard)){
				uni.showToast({
					icon:'none',
					title:'请输入正确的身份证号码',
					duration:3000
				})
			}else if(!this.testNumber.test(this.info.phoneNumber)){
				uni.showToast({
					icon:'none',
					title:'请输入正确的联系电话',
					duration:3000
				})
			}else if(!this.cityText2){
				uni.showToast({
					icon:'none',
					title:'请输入收货地址',
					duration:3000
				})
			}else if(this.chooseNumber==null){
				uni.showToast({
					icon:'none',
					title:'请选择一个电话号码',
					duration:3000
				})
			}else{
				this.info.choose = this.chooseNumber
				this.info.city = this.cityText2
				this.sendData(this.info)
			}
			
		},
		sendData(info){
			
			let para = {
				idCardAddress:'北京市东城区东中街58号美惠大厦移动营业厅',
				phoneNum:info.choose.phoneNum,
				numLevel:info.choose.jXHRmSerialAttributeList[0].numLevel,
				custName:info.geterName,
				idCardNumber:info.idCard,
				custPostalCode:100000,
				linkPhone:info.phoneNumber,
				addresseePhone:info.phoneNumber,
				addresseeAddr:info.city + info.address
			}
			uni.showLoading({
				title:'加载中...'
			})
			get('/mobleOrder/dealNumSaveOrder',para).then(res=>{
				
				uni.hideLoading()
				if(res.data.code==0){
		
					uni.navigateTo({
						url:'../result/result'
					})
				}else if(res.data.code==501){
					uni.showToast({
						icon:'none',
						title:res.data.data.deal_msg,
						duration:3000
					})
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

		},
		cityPicker2 : function(){
			this.$refs.mpvueCityPicker2.show();
		},
		onConfirm2(e) {
			var cityText2  = e.label;
			var cityValue2 = e.value;
			var cityCode2  = e.cityCode;
			console.log(cityText2, cityValue2, cityCode2);
			this.cityText2 = cityText2;
			this.cityPickerValueDefault2 = cityValue2;
			this.city2 = e;
		},
		onCancel2(){
			
		},
		//表单提交
		formSubmit : function(){
			//表单验证
			if(this.city2 == null){
				uni.showToast({title : "请选择城市", icon:"none"});
				return ;
			}
			//获取城市信息 保存完整的城市信息 {lable - 文字 , value - 数组index记录, cityCode : 城市编号}
			//请根据实际需求选择要使用的数据
			console.log(JSON.stringify(this.city2));
			uni.showToast({title : "请观看控制台", icon:"none"});
		}
	},
	components: {
		mpvueCityPicker
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
	margin-left: 20upx;width: 713upx;background: #fff;padding: 80upx 40upx;box-shadow: 8upx 10upx 0upx #fcecdd;border-radius: 24upx; padding-bottom: 20upx;
	.title{
		font-weight: bold;font-size: 34upx;border-bottom: 1upx solid #FD4900;padding-bottom: 23upx;
	}
	.info{
		font-size: 34upx;margin-top: 47upx;margin-bottom: 40upx;font-weight: bold;color: #FD4800;
	}
}

form{
	.every_item{
		display: flex;flex-wrap: nowrap;line-height: 70upx;margin-bottom: 27upx;
		.item{
			 width: 160upx; text-align: right; font-size: 28upx; margin-right: 10upx; white-space: nowrap;
		}
		.right{
			border: 1upx solid #ccc;flex: 1;border-radius: 12upx;height: 70upx;padding-left: 20upx; font-size: 29upx;
		}
		.placeholder1{
			color:#ccc;
		}
	}
	
}
.every_item1{
	display: flex;align-items: center; margin-bottom: 30upx; margin-right: 120upx;
	image{
		width: 38upx;height: 38upx;margin-right: 11upx;
	}
	text{
		color: #FE814F; font-size: 32upx;
	}
}
.every_item1:nth-child(even){
	margin-right: 0;
}
</style>
