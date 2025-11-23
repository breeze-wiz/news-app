<template>
	<view class="header">
	    <view class="app-title">新闻APP - 计工本2303王德康</view>
	</view>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" 
				  v-for="(item, index) in news" :key="index"
				  @tap="openinfo" :data-newsid="item.post_id">  <!-- 使用 post_id -->
				<view class="uni-media-list">
					<!-- 使用 cover 字段显示图片 -->
					<image class="uni-media-list-logo" :src="item.cover || '/static/default-news.png'" 
						   mode="aspectFill"></image>
					<view class="uni-media-list-body">
						<!-- 新闻标题 - 单行显示，超出省略 -->
						<view class="uni-media-list-text-top">{{ item.title }}</view>
						<!-- 发布时间 - 格式化为更简洁的形式 -->
						<view class="uni-media-list-text-bottom">
							{{ formatTime(item.published_at || item.created_at) }}
						</view>
						<!-- 作者信息 -->
						<view class="uni-media-list-text-desc">
							{{ item.author_name || '未知作者' }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			news:[]
		};
	},
	onLoad:function(){
		uni.showLoading({
			title:"加载中...."
		})
		uni.request({
			url:"https://unidemo.dcloud.net.cn/api/news",
			method:"GET",
			success:res=>{
				console.log('首页数据:', res.data);
				this.news = res.data;
				uni.hideLoading();
			},
			fail:(err)=>{
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				});
				uni.hideLoading();
			}
		});
	},
	methods:{
		
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
				
				// 始终显示完整日期和时间
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
		},
		
		openinfo(e){
			const newsid = e.currentTarget.dataset.newsid;
			console.log('跳转到详情页，新闻ID:', newsid);
			uni.navigateTo({
				url:"../info/info?newsid=" + newsid
			});
		}
	}
}
</script>

<style>
.content {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.uni-list-cell {
	background: white;
	margin-bottom: 20rpx;
	padding: 24rpx;
	border-radius: 12rpx;
	box-shadow: 0 1rpx 6rpx rgba(0,0,0,0.1);
	border: 1rpx solid #f0f0f0;
}

.uni-media-list {
	display: flex;
	align-items: flex-start;
}

.uni-media-list-logo {
	width: 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-right: 24rpx;
	background-color: #f0f0f0;
	flex-shrink: 0;
}

.uni-media-list-body {
	flex: 1;
	min-width: 0;
}

/* 新闻标题样式 - 单行显示，超出省略 */
.uni-media-list-text-top {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	line-height: 1.5em;
	margin-bottom: 12rpx;
	display: -webkit-box;
	-webkit-line-clamp: 2;  /* 限制两行 */
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	max-height: 3em; /* 两行高度 */
}

/* 时间样式 - 灰色小字 */
.uni-media-list-text-bottom {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 6rpx;
}

/* 作者样式 - 更浅的灰色 */
.uni-media-list-text-desc {
	font-size: 22rpx;
	color: #ccc;
}

/* 悬停效果 */
.uni-list-cell-hover {
	background-color: #f8f9fa;
	transform: translateY(-1rpx);
	transition: all 0.2s ease;
}
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30rpx;
    text-align: center;
}

.app-title {
    font-size: 36rpx;
    font-weight: bold;
}
</style>