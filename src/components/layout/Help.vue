<template>
	<div class="root">
		<div class="block-4">
			<div class="block-2"></div>
			<div class="block-3" @click="hideMe">关闭</div>
		</div>
		<div class="block-5">
			使用说明：
			<div class="block-6">1、快捷键</div>
			<div class="block-7">Ctrl+C 复制</div>
			<div class="block-8">Ctrl+V 粘贴</div>
			<div class="block-9">Ctrl+S 保存</div>
			<div class="block-10">2、如何使用</div>
			<div class="block-11">1）如果是APP项目，先设置自适应为750px，其余的项目按需要来。如果点不上背景的盒子，则可以使用缩放功能把盒子撑开。</div>
			<div class="block-13">2）点击加号可以在上下左右或者内部增加新的盒子，如果父容器排列方向与要操作的方向不同，则会自动增加一个新的盒子用来改变排列方向。</div>
			<div class="block-14">3）设计好之后可以保存，也可以直接生成HTML、VUE手机端或电脑端</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({}),
		props:['onHide'],
		methods:{
			hideMe(){
				console.log("关闭自己");
				if(this.onHide){
					this.onHide();
				}
			}
		}
	}
</script>

<style>
	html,body,#root,uni-page-body,page #app{
		padding:0;
		margin:0;
		width:100%;
		height:100%;
	}
	.root{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-4{
		display:flex;
		flex-direction:row;
		justify-content:flex-start;
		align-items:flex-start;
		width:100%;
	}
	.block-2{
		display:flex;
		box-sizing:border-box;
		background-color:rgba(54, 120, 145, 1);
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		height:50px;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-3{
		display:flex;
		box-sizing:border-box;
		background-color:rgba(225, 56, 56, 1);
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:50px;
		height:50px;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		color: white;
	}
	.block-5{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		line-height:25px;
		text-align:left;
		position:relative;
		width:100%;
		padding:20px;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-6{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-7{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-8{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-9{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-10{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-11{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-13{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
	.block-14{
		display:flex;
		box-sizing:border-box;
		font-weight:normal;
		font-style:normal;
		text-align:left;
		position:relative;
		width:100%;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
	}
</style>