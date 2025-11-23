<template>
	<view class="content">
		<!-- 新闻标题区域 -->
		<view class="title-section">
			<view class="title">{{ title }}</view>
			<view class="meta-info">
				<text class="author">{{ author || '未知作者' }}</text>
				<text class="time">{{ formatTime(publishTime) }}</text>
			</view>
		</view>
		
		<!-- 新闻内容区域 -->
		<view class="content-section">
			<rich-text class="rich-text" :nodes="content"></rich-text>
		</view>
		
		<!-- 加载状态 -->
		<view v-if="loading" class="loading">
			<text>加载中...</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: "",           // 新闻标题
			content: "",         // 新闻内容
			author: "",          // 作者
			publishTime: "",     // 发布时间
			loading: true        // 加载状态
		}
	},
	onLoad: function(e) {
		console.log('详情页新闻ID:', e.newsid);
		
		// 显示加载动画
		uni.showLoading({
			title: '加载中...'
		});
		
		// 请求新闻详情
		uni.request({
			url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + e.newsid,
			method: 'GET',
			success: (res) => {
				console.log('详情页数据:', res.data);
				
				// 把API返回的数据保存到页面数据中
				this.title = res.data.title || '无标题';
				this.content = res.data.content || '暂无内容';
				this.author = res.data.author_name || '未知作者';
				this.publishTime = res.data.published_at || res.data.created_at;
				
				// 隐藏加载状态
				this.loading = false;
				uni.hideLoading();
			},
			fail: (err) => {
				console.error('详情请求失败:', err);
				
				// 显示错误提示
				uni.showToast({
					title: '加载失败，请重试',
					icon: 'none'
				});
				
				this.loading = false;
				uni.hideLoading();
			}
		});
	},
	methods: {
		// 时间格式化函数 - 和首页保持一致
		formatTime(timeStr) {
			if(!timeStr) return '未知时间';
			
			try {
				// 处理 iOS 日期兼容性
				let date;
				if (typeof timeStr === 'string') {
					const normalizedStr = timeStr.replace(/-/g, '/');
					date = new Date(normalizedStr);
				} else {
					date = new Date(timeStr);
				}
				
				if (isNaN(date.getTime())) {
					return '未知时间';
				}
				
				// 显示完整日期和时间
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				const seconds = date.getSeconds().toString().padStart(2, '0');
				
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			} catch(e) {
				console.error('时间格式化错误:', e);
				return '未知时间';
			}
		}
	}
}
</script>

<style>
/* 页面容器 */
.content {
	padding: 0;
	background-color: #f5f5f5;
	min-height: 100vh;
}

/* 标题区域 - 白色卡片 */
.title-section {
	background: white;
	padding: 40rpx 30rpx;
	margin-bottom: 20rpx;
	border-radius: 0 0 20rpx 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.08);
}

/* 新闻标题 */
.title {
	font-size: 44rpx;
	font-weight: bold;
	line-height: 1.4em;
	color: #333;
	margin-bottom: 30rpx;
}

/* 作者和时间信息 */
.meta-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 20rpx;
	border-top: 1rpx solid #f0f0f0;
}

.author {
	font-size: 28rpx;
	color: #666;
}

.time {
	font-size: 26rpx;
	color: #999;
}

/* 内容区域 - 白色卡片 */
.content-section {
	background: white;
	padding: 40rpx 30rpx;
	border-radius: 20rpx;
	margin: 0 20rpx 20rpx 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.08);
}

/* 富文本内容样式 */
.rich-text {
	line-height: 1.8em;
	font-size: 32rpx;
	color: #333;
}

/* 让图片显示得更好看 */
.rich-text img {
	max-width: 100%;
	height: auto;
	border-radius: 12rpx;
	margin: 30rpx 0;
	display: block;
	box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
}

/* 段落间距 */
.rich-text p {
	margin-bottom: 40rpx;
}

/* 加载状态 */
.loading {
	text-align: center;
	padding: 100rpx 0;
	color: #666;
	font-size: 28rpx;
	background: white;
	margin: 20rpx;
	border-radius: 20rpx;
}
</style>