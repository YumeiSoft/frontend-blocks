<template>
	<div class="row hfull scroll-y" v-if="context.tabBlocks[context.currentTab]&&context.tabs.length>0">
		<!-- 图层面板 -->
		<LayoutPanel :context="context" :currentId="context.currentBlock"></LayoutPanel>
		<div class="ws">
			<!-- 页签 -->
			<el-tabs v-model="context.currentTab" type="card" @tab-click="changeTab" style="user-select: none;" closable
				@tab-remove="removeTab" :before-leave="beforeChangeTab">
				<el-tab-pane :label="item.name" :name="item.code" v-for="(item,index) in context.tabs"
					v-bind:key="'tab'+index"></el-tab-pane>
			</el-tabs>
			<!-- 设计区 -->
			<div style="z-index: 5;">
				<table>
					<tr>
						<td>
							<button type="button" @click="preview()">预览</button>
							<button type="button" @click="edit()">设计</button>
							{{this.context.viewMode=='edit'?'设计模式':null}}
							{{this.context.viewMode!='edit'?'预览模式':null}}
						</td>
						<td width="40px" style="vertical-align:middle;">自适应</td>
						<td width="50px" style="vertical-align:middle;">
							{{viewportType==0?'375px':null}}
							{{viewportType==1?'750px':null}}
							{{viewportType==2?'960px':null}}
							{{viewportType==3?'100%':null}}
						</td>
						<td width="20%">
							<el-slider v-model="viewportType" :min="0" :max="3" :step="1" :show-tooltip="false"
								show-stops input-size="mini"></el-slider>
						</td>
						<td width="80px" style="vertical-align:middle;">设计时高度</td>
						<td width="20%">
							<el-slider v-model="context.editMinHeight" :show-tooltip="false" :min="0" :max="100"
								input-size="mini"></el-slider>
						</td>
						<td width="80px" style="vertical-align:middle;">设计时内距</td>
						<td width="20%">
							<el-slider v-model="context.editPadding" :show-tooltip="false" :min="0" :max="20"
								input-size="mini"></el-slider>
						</td>
					</tr>
				</table>
			</div>
			<div class="blocks-panel">
				<Block v-if="showRootBlock" class="root-block" :blockConfig="context.tabBlocks[context.currentTab]"
					:context="context" :style="{width:viewportWidth}"></Block>
			</div>
		</div>
		<!-- 属性面板 -->
		<PropertiesPanel :context="context" :currentId="context.currentBlock"></PropertiesPanel>
	</div>
</template>

<script>
	// 声明上下文
	let context = {
		currentBlock: null,
		// 展现方式
		// edit - 编辑模式
		// preview - 预览模式
		viewMode: "edit",
		editPadding: 0,
		editMinHeight: 0,
		tabIndex: 0,
		currentTab: 'blank',
		tabs: [],
		tabBlocks: {},
		/**
		 * 找当前元素
		 * @param {Object} id
		 */
		findBlockById(id, parent) {
			if (!parent) {
				parent = context.tabBlocks[context.currentTab]
			}
			if (parent.id == id) {
				return parent;
			}
			for (let i in parent.blocks) {
				let child = parent.blocks[i]
				let result = context.findBlockById(id, child)
				if (result) {
					return result;
				}
			}
			return null;
		},
		autoRenameNewBlocks(parent) {
			if (!parent) {
				throw '必须要传入对象'
			}
			parent.id = "block-" + (++context.tabBlocks[context.currentTab].indexCounter)
			for (let i in parent.blocks) {
				let child = parent.blocks[i]
				context.autoRenameNewBlocks(child)
			}
		},
		/**
		 * 获取当前的元素
		 */
		getCurrentBlock() {
			return context.findBlockById(context.currentBlock)
		},
		/**
		 * 删除制定ID的元素及其子元素
		 * @param {Object} id ID
		 */
		deleteBlockById(id) {
			if (!id) {
				return;
			}
			let block = context.findBlockById(id)
			if (!block) {
				return;
			}
			let parent = context.findParent(block)
			let index = context.indexOf(block, parent)
			if (block.id == "root") {
				context.workspace.$message('画板中至少留有一个区块');
				return
			}
			parent.blocks.splice(index, 1)
		},
		/**
		 * 删除当前元素
		 */
		deleteCurrentBlock() {
			context.deleteBlockById(context.currentBlock)
		},
		/**
		 * 找父级元素
		 * @param {Object} block 元素
		 * @param {Object} parent 父级元素
		 */
		findParent(block, parent) {
			if (!parent) {
				parent = context.tabBlocks[context.currentTab]
			}
			for (let i in parent.blocks) {
				let child = parent.blocks[i]
				if (child.id == block.id) {
					return parent
				}
			}
			for (let i in parent.blocks) {
				let child = parent.blocks[i]
				let result = context.findParent(block, child)
				if (result) {
					return result;
				}
			}
			return null;
		},
		/**
		 * 查找元素在父容器中的位置
		 * @param {Object} block 元素
		 * @param {Object} parent 父容器
		 */
		indexOf(block, parent) {
			if (!parent) {
				parent = context.tabBlocks[context.currentTab]
			}
			for (let i in parent.blocks) {
				let child = parent.blocks[i]
				if (child.id == block.id) {
					return i;
				}
			}
			return -1;
		},
		/**
		 * 创建新的元素
		 */
		createNewBlock() {
			let result = {
				style: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					width: "100%"
				},
				blocks: [],
				domType:"div"
			}
			if (context.tabBlocks[context.currentTab]) {
				result.id = "block-" + (++context.tabBlocks[context.currentTab].indexCounter)
			} else {
				result.indexCounter = 1
				result.id = "root"
				delete result.display
				delete result.flexDirection
				delete result.justifyContent
				delete result.alignItems
			}
			return result;
		},
		/**
		 * 在上方加入
		 * @param {Object} block 元素
		 */
		addBefore(block) {
			let parent = context.findParent(block)
			let index = context.indexOf(block, parent)
			let newBlock = context.createNewBlock()
			if (parent.style.flexDirection == "row") {
				let newParent = context.createNewBlock()
				newParent.style.flexDirection = "column"
				parent.blocks.splice(index, 1)
				parent.blocks.splice(index, 0, newParent)
				newParent.blocks.push(newBlock);
				newParent.blocks.push(block);
			} else {
				parent.blocks.splice(index, 0, newBlock)
			}
		},
		/**
		 * 在下方加入
		 * @param {Object} block 元素
		 */
		addAfter(block) {
			let parent = context.findParent(block)
			let index = context.indexOf(block, parent)
			let newBlock = context.createNewBlock()
			if (parent.style.flexDirection == "row") {
				let newParent = context.createNewBlock()
				newParent.style.flexDirection = "column"
				parent.blocks.splice(index, 1)
				parent.blocks.splice(index, 0, newParent)
				newParent.blocks.push(block);
				newParent.blocks.push(newBlock);
			} else {
				parent.blocks.splice(index + 1, 0, newBlock)
			}
		},
		/**
		 * 在内部加入
		 * @param {Object} block 元素
		 */
		addMiddle(block) {
			let newBlock = context.createNewBlock()
			block.blocks.push(newBlock)
		},
		/**
		 * 在左侧插入
		 * @param {Object} block 元素
		 */
		addLeft(block) {
			let parent = context.findParent(block)
			let index = context.indexOf(block, parent)
			let newBlock = context.createNewBlock()
			if (parent.style.flexDirection == "column") {
				let newParent = context.createNewBlock()
				newParent.style.flexDirection = "row"
				parent.blocks.splice(index, 1)
				parent.blocks.splice(index, 0, newParent)
				newParent.blocks.push(newBlock);
				newParent.blocks.push(block);
			} else {
				parent.blocks.splice(index, 0, newBlock)
			}
		},
		/**
		 * 在右侧插入
		 * @param {Object} block 元素
		 */
		addRight(block) {
			let parent = context.findParent(block)
			let index = context.indexOf(block, parent)
			let newBlock = context.createNewBlock()
			if (parent.style.flexDirection == "column") {
				let newParent = context.createNewBlock()
				newParent.style.flexDirection = "row"
				parent.blocks.splice(index, 1)
				parent.blocks.splice(index, 0, newParent)
				newParent.blocks.push(block);
				newParent.blocks.push(newBlock);
			} else {
				parent.blocks.splice(index + 1, 0, newBlock)
			}
			context.currentBlock = newBlock.id
		},
		/**
		 * 获取上下文
		 */
		getContext() {
			return context;
		},
		/**
		 * 保存
		 */
		save() {
			function download(filename, text) {
				var element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
				element.setAttribute('download', filename);
				element.style.display = 'none';
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			}

			let rootBlock = context.tabBlocks[context.currentTab]
			context.workspace.$message('已生成文件')
			download("page.blocks", JSON.stringify(rootBlock))
		},
		/** 临时保存 */
		tempSave(){
			localStorage.setItem("tempSave",JSON.stringify({
				tabBlocks:context.tabBlocks,
				currentTab:context.currentTab,
				tabs:context.tabs,
				tabIndex:context.tabIndex
			}))
		},
		/** 读取临时保存 */
		tempLoad(){
			try{
				let temp = JSON.parse(localStorage.getItem("tempSave"))
				if(temp){
					for(let i in temp){
						context[i]=temp[i]
					}
				}
			}catch(e){

			}
		},
		/**
		 * 创建页签
		 */
		createTab(title) {
			context.tabIndex++
			context.tabs = [
				...context.tabs,
				{
					code: `tab${context.tabIndex}`,
					name: title ? title : `未命名${context.tabIndex}`
				}
			]
			context.currentTab = context.tabs[context.tabs.length - 1].code
			context.tabBlocks[context.currentTab] = {
				...context.createNewBlock()
			};
			context.currentBlock = null;
		},
		/**
		 * 删除页签
		 * @param {Object} code
		 */
		removeTab(code) {
			for (let i = 0; i < context.tabs.length; i++) {
				if (context.tabs[i].code == code) {
					let tab = context.tabs[i]
					// 当前页处理
					if (tab.code == context.currentTab) {
						if (i == context.tabs.length - 1 && context.tabs.length > 1) {
							// 关闭最后一页，自动打开前一页
							context.currentTab = context.tabs[i - 1].code
						} else if (i == 0 && context.tabs.length > 1) {
							// 关闭第一页，自动打开第二页
							context.currentTab = context.tabs[1].code
						} else if (context.tabs.length > 1) {
							// 关闭当前页，打开后一页
							context.currentTab = context.tabs[i + 1].code
						}
					}
					context.tabs.splice(i, 1)
					break;
				}
			}
			context.tempSave()
		}
	}
	export default {
		data: () => ({
			name: null,
			context,
			showRootBlock: true,
			viewportType: 3,
			lastSelectBlock: {}
		}),
		props: ['initFinished'],
		methods: {
			/**
			 * 进入编辑模式
			 */
			edit() {
				this.context.viewMode = 'edit'
			},
			/**
			 * 进入预览模式
			 */
			preview() {
				this.context.viewMode = 'preview'
			},
			beforeChangeTab(newName, oldName) {
				console.log(newName, oldName);
				this.lastSelectBlock[oldName] = context.currentBlock
				context.currentBlock = null
				if (this.lastSelectBlock[newName]) {
					this.$nextTick(() => {
						context.currentBlock = this.lastSelectBlock[newName]
					})
				} else {
					context.currentBlock = null
				}
			},
			/**
			 * 切换页签
			 */
			changeTab(e) {

			},
			removeTab(name) {
				this.$confirm('在保存前此操作将永久清理该稿件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.context.removeTab(name);
				});
			}
		},
		mounted() {
			let page = this;
			context.workspace = this;
			document.onkeydown = function(e) {
				// 如果当前标签是输入框，则不进行操作
				if (document.activeElement.tagName == 'INPUT') {
					return
				}

				// 获取键位
				var keyCode = e.keyCode || e.which || e.charCode;
				var ctrlKey = e.ctrlKey || e.metaKey;

				// 删除操作，即按下delete键
				if (keyCode == 46) {
					page.context.deleteCurrentBlock()
					e.preventDefault();
					return false;
				}

				// 保存操作，即ctrl+s
				if (ctrlKey && keyCode == 83) {
					context.save();
					e.preventDefault();
					return false;
				}

				// 复制操作
				if (ctrlKey && keyCode == 67) {
					if (context.currentBlock) {
						let toCopy = context.findBlockById(context.currentBlock)
						if (toCopy) {
							context.toCopy = JSON.stringify(toCopy);
							console.log("已复制", context.toCopy);
							e.preventDefault();
							return false;
						}
					}
				}

				// 粘贴操作
				if (ctrlKey && keyCode == 86) {
					if (context.toCopy && context.currentBlock) {
						let toPaste = context.findBlockById(context.currentBlock)
						if (toPaste) {
							let toCopy = JSON.parse(context.toCopy)
							console.log("粘贴", toCopy);
							context.autoRenameNewBlocks(toCopy)
							console.log("粘贴到", toPaste);
							toPaste.blocks.push(toCopy)
							e.preventDefault();
							return false;
						}
					}
				}

				// 剪切操作
				if (ctrlKey && keyCode == 88) {
					if (context.currentBlock) {
						let toCopy = context.findBlockById(context.currentBlock)
						if (toCopy) {
							context.toCopy = JSON.stringify(toCopy);
							console.log("已复制", context.toCopy);
						}
					}
					page.context.deleteCurrentBlock()
					e.preventDefault();
					return false;
				}

				// 还原操作
				if (ctrlKey && keyCode == 89) {

				}

				// 撤销操作
				if (ctrlKey && keyCode == 90) {

				}
			}
			if (this.initFinished) {
				this.initFinished(context)
			}
		},
		computed: {
			viewportWidth() {
				if (this.viewportType == 0) {
					return '375px'
				}
				if (this.viewportType == 1) {
					return '750px'
				}
				if (this.viewportType == 2) {
					return '960px'
				}
				if (this.viewportType == 3) {
					return '100%'
				}
			}
		},
		components: {}
	};
</script>

<style lang="less">
	.scroll-y {
		overflow-y: scroll;
	}

	.scroll-y::-webkit-scrollbar {
		width: 0px;
	}

	.ws {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		font-size: initial;
		font-family: initial;
		color: initial;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.ws::-webkit-scrollbar {
		width: 0px;
	}

	.root-block {
		overflow-y: scroll;
		transform: translate(0, 0);
		height: 100%;
		// width: 100%;
		background-color: white;
	}

	.root-block::-webkit-scrollbar {
		width: 0px;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.blocks-panel {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding: 5px;
		overflow: hidden;
		background-color: #333333;
	}
</style>
