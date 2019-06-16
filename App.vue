<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view{
		box-sizing: border-box;
	}
	.bg{
		position: absolute;top: 0;left: 0;width: 750upx;height: 100%;z-index: -10;
	}
	.sure{
		width: 100%;
		height: 94upx; position: absolute;left: 0; bottom: 0;
	}
</style>
