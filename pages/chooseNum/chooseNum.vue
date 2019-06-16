<template>
	<view class='choose_main'>
		<!-- 悬浮球 -->
		<view class='qiu' :style="{left:style.left+'px',top:style.top+'px'}" @touchstart="startQiu" @touchmove.stop="moveQiu" @touchend.stop="endQiu" @tap.stop='showNumber'>
			<image src="/static/bx.png" mode=""></image>
			<text>{{chooseList.length}}</text>
		</view>
		
		<!-- 选中的号码 -->
		<view class='chooseMask' v-if='showMask'>
			<view class='content1'>
				<view class='top'>
					<view class='inner' v-for='(item,index) in chooseList' :key='index'>
						<view class='number'>
							<image src="/static/5.png" mode=""></image>
							<text>{{item.phoneNum}}</text>
						</view>
						<view class='del' @tap='delItem(item,index)'>
							<image src="/static/X.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class='bottom' @tap='closeMask'>
					<image src="/static/del.png" mode=""></image>
				</view>
			</view>
		</view>

		<image src="/static/bg.png" class='bg' mode=""></image>
		<view class='top_img'>
			<image src="/static/choose.png" mode=""></image>
		</view>
		
		<view class='search_box'>
			<input type="number" v-model='searchKey' placeholder="可输入3-8位意向数字进行号码检索" placeholder-style="color:#ddd;font-size:28upx"/>
			<image src="/static/tj.png" @tap='search' mode=""></image>
		</view>
		
		<view class="content">
			<view @tap='chooseNum(item)' class='every_item' v-for='(item,index) in list' :key='index'>
				<image v-if='!item.choose' src="/static/6.png" mode=""></image>
				<image v-else src="/static/5.png" mode=""></image>
				<text>{{item.phoneNum}}</text>
			</view>

		</view>
		
		<view class='another_batch' @tap='changeAnother'>
			没有中意号码？ 换一批
		</view>
		
		<view class="bot_btn">
			<image @tap='addNumber' src="/static/nn1.png" mode=""></image>
			<image @tap='writeInfo' src="/static/nn2.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	var screenWidth,screenHeight,viewH,viewW
	import {mapMutations} from 'vuex'
	import {error,get} from '../../utils/api.js'
	export default {
		data() {
			return {
				style:{
					left:0,
					top:300
				},
				searchKey:'',
				currentItem:{},
				showMask:false,
				chooseList:[],
				list:[],
				page:1,
				startx:'',
				starty:'',
				movex:'',
				movey:'',
				endx:'',
				endy:'',
				startLeft:'',
				startTop:''
			};
		},
		onReady() {
			const res = uni.getSystemInfoSync()
			screenWidth=res.screenWidth
			screenHeight=res.screenHeight
			
			this.$nextTick(()=>{
				var query = uni.createSelectorQuery();
				var nodesRef = query.selectAll(".qiu");
				nodesRef.fields({
					size: true
									
				},(result)=>{
						viewH=result[0].height
						viewW=result[0].width
				}).exec() 
			})
		},
		onLoad() {
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods:{
			...mapMutations([
				'set_chooseList'
			]),
			search(){
				if(/^[0-9]{3,8}$/.test(this.searchKey)){
					this.page=1
					this.getData()
				}else{
					uni.showToast({
						icon:'none',
						title:'请输入正确的数字号码'
					})
				}
			},
			getData(){
				let para ={
					page:this.page,
					numString:this.searchKey
				}
				uni.showLoading({
					title:'加载中...'
				})
				get('/mobleOrder/dealNumQueryNum',para).then(res=>{
					uni.hideLoading()
					
					if(res.data.code==0){
						for(let i = 0;i<res.data.data.num_info.numList.length;i++){
							res.data.data.num_info.numList[i].choose=false
						}
						this.list = res.data.data.num_info.numList
						
						if(this.list.length<16){
							this.page=1
						}

					}else if(res.data.code==501){
						this.page--
						uni.showToast({
							icon:'none',
							title:res.data.data.deal_msg
						})
					}else{
						this.page--
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}).catch(err=>{
					this.page--
					error()
				})
			},
			changeAnother(){
				this.page++
				this.getData()
			},
			chooseNum(item){
				
				for(var i of this.chooseList){
					if(i==item){
						uni.showToast({
							icon:'none',
							title:'该号码已选择'
						})
						return 
					}
				}
				
				if(this.chooseList.length<5){
					this.list.map(i=>{
						i.choose=false
					})
					
					this.currentItem = item
					item.choose=true
					
					
				}else{
					uni.showToast({
						icon:'none',
						title:'最多可选五个备选号码'
					})
				}
				
			},
			addNumber(){
	
				if(this.currentItem.phoneNum){
					this.chooseList.push(this.currentItem)
					this.currentItem={}
				}
				
				for(var i of this.list){
					i.choose=false
				}
			},
			writeInfo(){
				if(this.chooseList.length>0){
					
					this.set_chooseList(this.chooseList)
					uni.navigateTo({
						url:'../order/order'
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请选择号码'
					})
				}
				
			},
			delItem(item,index){
				this.chooseList.splice(index,1)
				this.list.map(i=>{
					if(i==item){
						i.choose=false
					}
				})
				
				if(this.chooseList.length==0){
					this.showMask=false
				}
			},
			showNumber(){
				
				if(this.chooseList.length>0){
					this.showMask=true
				}else{
					uni.showToast({
						icon:'none',
						title:'请选择号码'
					})
				}
				
			},
			closeMask(){
				this.showMask=false
			},
			startQiu(e){
				this.startx = e.mp.touches[0].pageX //起始点位置
				this.starty = e.mp.touches[0].pageY
				this.startLeft = this.style.left  //元素左边距
				this.startTop = this.style.top//元素上边距
			},
			moveQiu(e){
				e.preventDefault(); //取消默认操作
				this.movex = e.mp.touches[0].pageX  //当前位置坐标
				this.movey = e.mp.touches[0].pageY
				//左边距 = 当前触摸点 - 鼠标起始位置 + 起始的左边距
				this.style.left = parseFloat(this.movex)-parseFloat(this.startx)+parseFloat(this.startLeft)
				//上边距 = 当前触摸点- 鼠标起始点位置 + 起始上边距
				this.style.top = parseFloat(this.movey)-parseFloat(this.starty)+parseFloat(this.startTop)
			},
			endQiu(e){
				var bodyW = screenWidth/2 //屏幕宽一半
				var bodyH = screenHeight //屏幕高
				
				this.endx = e.mp.changedTouches[0].pageX //松开的位置
				this.endy = e.mp.changedTouches[0].pageY 
				//最终位置在屏幕左半部分
				if(this.endx<bodyW){
					this.style.left=0
				}else if(this.endx>=bodyW){ //在右侧
					this.style.left=screenWidth-parseFloat(viewW)
				}
				
				//当元素顶部在屏幕外
				if(parseFloat(this.style.top)<0){
					this.style.top=0 //置顶
				}
				//当元素底部在屏幕外
				if(bodyH-this.endy < parseFloat(viewH)/2){
					//放在底部
					this.style.top = bodyH - parseFloat(viewH)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.choose_main{
	padding: 50upx 27upx;width: 100%; position: relative; min-height: 100vh;
	.top_img{
		width: 100%;text-align: center;
		image{
			width: 639upx;height: 99upx;
		}
	}
	.search_box{
		display: flex;flex-wrap: nowrap;margin-top: 26upx;margin-bottom: 31upx; align-items: center;
		input{
			height: 85upx;width: 530upx;padding:0 20upx;box-sizing: border-box;border: 1upx solid #ccc;border-radius: 24upx;margin-right: 10upx; box-shadow: 8upx 8upx 8upx #eee;
		}
		image{
			width: 156upx;height: 82upx;
		}
	}
	
	.content{
		width: 100%;border-radius: 24upx;padding: 55upx 46upx;background-color: #fff;display: flex;flex-wrap: wrap;box-shadow: 10upx 10upx 15upx #fcecdd;
		.every_item{
			display: flex;align-items: center; margin-bottom: 40upx; margin-right: 90upx;
			image{
				width: 38upx;height: 38upx;margin-right: 11upx;
			}
			text{
				color: #FE814F; font-size: 32upx;
			}
		}
		.every_item:nth-child(even){
			margin-right: 0upx
		}
	}
	
	.another_batch{
		margin-top: 32upx;margin-bottom: 47upx;width: 100%;text-align: center;font-size: 30upx;color: #FE814F;font-weight: bold;
	}
	
	.bot_btn{
		width: 100%;display: flex;flex-wrap: nowrap; padding: 0 50upx;
		image{
			height: 95upx; width:279upx; flex-shrink: 0;
		}
		image:first-child{
			margin-right: 46upx
		}
	}
}
.qiu{
	width: 134upx;height: 124upx;position: fixed;z-index: 10;
	image{
		width: 100%; height: 100%;
	}
	text{
		position: absolute;right: 18upx;top: 4upx;font-size: 28upx;color: #FD4800;
	}
}

.chooseMask{
	position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 99;
	.content1{
		position: absolute;top: 30%;left: 50%;transform: translate(-50%);width: 642upx;
		.top{
			background: #fff;padding: 40upx 45upx;border-radius: 24upx;
			.inner{
				display: flex;flex-wrap: nowrap;line-height: 38upx; border-bottom: 1upx solid #FD4900; padding: 20upx 0;
				&:first-child{
					padding-top: 0;
				}
				&:last-child{
					border-bottom: 0; padding-bottom: 0;
				}
				.number{
					display: flex;flex-wrap: nowrap;align-items: center;
					image{
						width: 38upx;height: 38upx;margin-right: 12upx;
					}
					text{
						font-size: 32upx;
					}
				}
				.del{
					text-align: right;flex: 1;
					image{
						width: 30upx;height: 30upx;
					}
				}
			}
		}
		.bottom{
			text-align: center;margin-top: 20upx;
			image{
				width: 56upx;height: 56upx;
			}
		}
	}
}
</style>
