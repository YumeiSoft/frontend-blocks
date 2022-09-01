<!-- 首页 -->
<template>
	<div class="home hfull">
		<ToolsBar :context="context"></ToolsBar>
		<WorkSpace ref="workspace" :initFinished="workSpaceInitFinished"></WorkSpace>
	</div>
</template>

<script>
export default {
	data: () => ({
		context:null
	}),
	methods: {
		workSpaceInitFinished(context){
			this.context=context
			this.context.tempLoad()
			if(this.context.tabs.length==0){
				// 创建一个页签
				this.context.createTab();
			}
		}
	},
	created(){
		window.isCloseHint = true;
		//初始化关闭
		window.addEventListener("beforeunload", function(e) {
			if (window.isCloseHint) {
				var confirmationMessage = "记得保存！确定要离开吗？";
				(e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
				return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
			}
		});
	},
	components: {}
};
</script>

<style lang="less">
	.home{
		display: flex;
		flex-direction: column;
	}
</style>
