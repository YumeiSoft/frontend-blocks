<template>
	<component :is="blockConfig.domType?blockConfig.domType:'div'" :blockid="blockConfig.id" :class="['block',context.viewMode=='preview'?'preview':null]"
		@click="setCurrentBlock($event)" :style="autoStyle"
		v-bind="properties" :value="blockConfig.text"
		>
		<!-- 遮罩层 -->
		<div v-if="context.viewMode=='edit'" v-show="blockConfig.id==context.currentBlock" class="block-mask"></div>
		<!-- 添加按钮开始 -->
		<div v-if="context.viewMode=='edit'" v-show="blockConfig.id==context.currentBlock&&blockConfig.id!='root'"
			class="add-btn top" @click="addBlocks('top')">
			<img src="../../asset/images/icon-add.png">
		</div>
		<div v-if="context.viewMode=='edit'" v-show="blockConfig.id==context.currentBlock&&blockConfig.id!='root'"
			class="add-btn bottom" @click="addBlocks('bottom')">
			<img src="../../asset/images/icon-add.png">
		</div>
		<div v-if="context.viewMode=='edit'" v-show="blockConfig.id==context.currentBlock&&blockConfig.id!='root'"
			class="add-btn left" @click="addBlocks('left')">
			<img src="../../asset/images/icon-add.png">
		</div>
		<div v-if="context.viewMode=='edit'" v-show="blockConfig.id==context.currentBlock&&blockConfig.id!='root'"
			class="add-btn right" @click="addBlocks('right')">
			<img src="../../asset/images/icon-add.png">
		</div>
		<div v-if="context.viewMode=='edit'" v-show="blockConfig.id==context.currentBlock" class="add-btn middle"
			@click="addBlocks('middle')">
			<img src="../../asset/images/icon-add.png">
		</div>
		<!-- 添加按钮结束 -->

		<!-- 文本内容 -->
		{{blockConfig.text}}
		<!-- 子元素 -->
		<Block v-if="blockConfig" v-for="(item,index) in blockConfig.blocks" v-bind:key="item.id" :blockConfig="item"
			:context="context">
		</Block>
	</component>
</template>

<script>
	export default {
		data: () => ({
			dragContext: {
				x: 0,
				y: 0,
				l: 0,
				t: 0,
				isDown: true
			}
		}),
		props: [
			// 元素
			"blockConfig",
			// 全局上下文
			"context"
		],
		methods: {
			forceLostInputFocuse() {
				if (document.activeElement.tagName == 'INPUT') {
					var input = document.activeElement
					input.blur()
				}
			},
			/**
			 * 把自己设置为当前元素
			 * @param {Object} e
			 */
			setCurrentBlock(e) {
				this.forceLostInputFocuse();
				this.context.currentBlock = this.blockConfig.id
				e.stopPropagation()
			},
			/**
			 * 添加元素
			 * @param {Object} position
			 */
			addBlocks(position) {
				if (position == 'top') {
					this.context.addBefore(this.blockConfig)
				}
				if (position == 'bottom') {
					this.context.addAfter(this.blockConfig)
				}
				if (position == 'middle') {
					this.context.addMiddle(this.blockConfig)
				}
				if (position == 'left') {
					this.context.addLeft(this.blockConfig)
				}
				if (position == 'right') {
					this.context.addRight(this.blockConfig)
				}
			},
			dragMouseDown(e) {
				e.preventDefault()
				e.stopPropagation()
				if (this.blockConfig.id == "root") {
					return;
				}
				if (!(this.blockConfig.style.position == 'absolute' || this.blockConfig.style.position == 'fixed')) {
					return;
				}
				let page = this;
				//获取x坐标和y坐标
				this.dragContext.x = e.clientX;
				this.dragContext.y = e.clientY;

				//获取左部和顶部的偏移量
				function getRealOffset(el, pid = 'root') {
					let left = el.offsetLeft;
					let top = el.offsetTop;
					if (el.offsetParent && el.offsetParent.attributes && el.offsetParent.attributes.blockid && el
						.offsetParent.attributes.blockid.value !== pid) {
						let p = getRealOffset(el.offsetParent, pid);
						left += p.left;
						top += p.top;
					}
					return {
						left,
						top
					};
				}
				let realOffset = getRealOffset(e.target);
				this.dragContext.l = realOffset.left;
				this.dragContext.t = realOffset.top;
				if (this.blockConfig.style.left && this.blockConfig.style.top) {
					let left = parseInt(this.blockConfig.style.left.replace('px', ''))
					let top = parseInt(this.blockConfig.style.top.replace('px', ''))
				}
				//开关打开
				this.dragContext.isDown = true;

				//鼠标移动
				window.onmousemove = function(e) {
					e.preventDefault()
					e.stopPropagation()
					if (page.dragContext.isDown == false) {
						return;
					}
					//获取x和y
					var nx = e.clientX;
					var ny = e.clientY;
					//计算移动后的左偏移量和顶部的偏移量
					var nl = nx - (page.dragContext.x - page.dragContext.l);
					var nt = ny - (page.dragContext.y - page.dragContext.t);
					// var nl = nx - (page.dragContext.x);
					// var nt = ny - (page.dragContext.y);
					page.blockConfig.style.left = nl + 'px';
					page.blockConfig.style.top = nt + 'px';
					page.$forceUpdate();
				}
			},
			dragMouseUp() {
				//开关关闭
				this.dragContext.isDown = false;
				window.onmousemove = null
			}
		},
		computed: {
			properties(){
				if(this.blockConfig.properties){
					return this.blockConfig.properties
				}else{
					return {}
				}
			},
			autoStyle() {
				let {
					context,
					blockConfig,
				} = this
				let newPadding = {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
				let newMargin = {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
				if (blockConfig.style.padding) {
					let words = blockConfig.style.padding.split(' ')
					if (words.length == 1) {
						newPadding.top = parseInt(words[0].replace('px', ''))
						newPadding.right = parseInt(words[0].replace('px', ''))
						newPadding.bottom = parseInt(words[0].replace('px', ''))
						newPadding.left = parseInt(words[0].replace('px', ''))
					} else {
						newPadding.top = parseInt(words[0].replace('px', ''))
						newPadding.right = parseInt(words[1].replace('px', ''))
						newPadding.bottom = parseInt(words[2].replace('px', ''))
						newPadding.left = parseInt(words[3].replace('px', ''))
					}
				}
				if (blockConfig.style.margin) {
					let words = blockConfig.style.margin.split(' ')
					if (words.length == 1) {
						newMargin.top = parseInt(words[0].replace('px', ''))
						newMargin.right = parseInt(words[0].replace('px', ''))
						newMargin.bottom = parseInt(words[0].replace('px', ''))
						newMargin.left = parseInt(words[0].replace('px', ''))
					} else {
						newMargin.top = parseInt(words[0].replace('px', ''))
						newMargin.right = parseInt(words[1].replace('px', ''))
						newMargin.bottom = parseInt(words[2].replace('px', ''))
						newMargin.left = parseInt(words[3].replace('px', ''))
					}
				}
				if (!(context.viewMode == 'preview' || blockConfig.id == 'root')) {
					newPadding.top += context.editPadding
					newPadding.bottom += context.editPadding
					newPadding.left += context.editPadding
					newPadding.right += context.editPadding
					newMargin.top += context.editPadding
					newMargin.bottom += context.editPadding
				}
				let newStyle = {
					...blockConfig.style,
					...(context.viewMode == 'preview' || blockConfig.id == 'root' ? {} : {
						margin: `${newMargin.top}px ${newMargin.right}px ${newMargin.bottom}px ${newMargin.left}px`,
						padding: `${newPadding.top}px ${newPadding.right}px ${newPadding.bottom}px ${newPadding.left}px`,
						minHeight: `${context.editMinHeight+(blockConfig.style.minHeight?parseInt(blockConfig.style.minHeight.replace('px','')):0)}px`
					})
				}
				return newStyle;
			}
		},
		components: {}
	};
</script>

<style lang="less">
	.block {
		box-sizing: border-box;
		border: #00A0E9 1px dashed;
		min-height: 50px;
		position: relative;
		user-select: none;

		.block-mask {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			background-color: #baf8ff;
			border: #0066CC 2px solid;
			// background-image: linear-gradient(#baf8ff, #e9f7f1);
			opacity: 0.5;
			z-index: 2;
			pointer-events: none;
		}

		&.preview {
			min-height: unset;
			border: unset;
			padding: unset;
			margin-top: unset;
			margin-bottom: unset;
			// background-color: red;
		}
	}

	.add-btn {
		position: absolute;
		transition: opacity 2s;
		z-index: 2;
		font-size: 0px;
		line-height: 0px;
		opacity: 1;
		width: 0px;

		&.top {
			left: calc(50% - 8px);
			top: 0px;
		}

		&.bottom {
			left: calc(50% - 8px);
			bottom: 0px;
		}

		&.left {
			left: 0px;
			top: calc(50% - 8px);
		}

		&.right {
			right: 16px;
			top: calc(50% - 8px);
		}

		&.middle {
			top: calc(50% - 8px);
			left: calc(50% - 8px);
		}

		&:active {
			opacity: 0.8;
		}

		img {
			width: 16px;
			height: 16px;
			opacity: 0.7;
		}
	}
</style>
