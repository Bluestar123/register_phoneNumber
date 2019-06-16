// let base = 'http://192.168.101.184:8080'
let base = 'http://www.service10086.com:8080'

export const get=(url,data)=>{
	let header = {
		'content-type':'application/json'
	}
	return new Promise((res,rej)=>{
		uni.request({
			url:base + url,
			data,
			header,
			method:'GET',
			success(response) {
				res(response)
			},
			fail(err) {
				rej(err)
			}
		})
	})
}

//请求 post
export const post=(url,data)=>{
	let header = {
		'content-type':'application/x-www-form-urlencoded'
	}
	return new Promise((res,rej)=>{
		uni.request({
			url:base + url,
			data,
			header,
			method:'POST',
			success(response) {
				res(response)
			},
			fail(err) {
				rej(err)
			}
		})
	})
}

//报错
export const error=()=>{
	return  uni.getNetworkType({
		success: function (res) {
			uni.hideLoading()
			if(res.networkType=='none'){
				uni.showToast({
					icon:'none',
					title:'网络故障请检查您的网络',
					duration:2000
				})
			}else{
				uni.showToast({
					icon:'none',
					title:'系统故障请稍后重试',
				})
			}
		}
	});
}
