<template>
	<div class="dark-2 tb">
		<el-menu default-active="1" class="el-menu-demo" mode="horizontal"
			background-color="#181128" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">FrontendBlocks</el-menu-item>
			<el-submenu index="2">
				<template slot="title">文件</template>
				<el-menu-item index="2-1" @click="createTab()">新建</el-menu-item>
				<el-menu-item index="2-2" @click="genJson()">保存</el-menu-item>
				<el-menu-item index="2-3" @click="fromFile()">读取</el-menu-item>
				<el-menu-item index="2-4" @click="clearCache()">重置工作区</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">代码生成</template>
				<el-menu-item index="3-1" @click="showHtml()">生成HTML(100%宽 1x输出 px单位)</el-menu-item>
				<el-menu-item index="3-2" @click="showVUE()">生成VUE手机端(375宽 2x输出 rpx单位)</el-menu-item>
				<el-menu-item index="3-3" @click="showVUEForPC()">生成VUE电脑端(100%宽 1x输出 px单位)</el-menu-item>
				<el-menu-item index="3-4" @click="showJSON()">生成可二次加工的JSON串</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">关于</template>
				<a href="https://yangruoyu.blog.csdn.net/" target="_blank"><el-menu-item index="4-1">访问 杨若瑜的CSDN博客</el-menu-item></a>
				<el-menu-item>本产品采用Apache Licence授权许可协议</el-menu-item>
				<el-menu-item>版本号：3.6 (2022)</el-menu-item>
			</el-submenu>
		</el-menu>
		<CodePreview :visible="dialogVisible" :onClose="onDilaogClose" :onSave="onSave" :code="code" />
	</div>
</template>

<script>
	export default {
		data: () => ({
			dialogVisible:false,
			activeIndex2: '1',
			onSave:null,
			code:null
		}),
		props: ['context'],
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			createTab() {
				this.context.createTab();
			},
			clearCache(){
				this.$confirm('你所有暂存的状态都将被永久删除，是否重置工作区？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					localStorage.clear();
					location.reload();
				});
			},
			showHtml(){
				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result = this.parse2HTML(rootBlock)
					console.log(result)
					this.onSave=this.genHtml
					this.code=result.html
					this.dialogVisible=true
				} else {
					this.$message("还未完成加载")
				}
			},
			showVUE(){
				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result = this.parse2VUE(rootBlock)
					this.code=result.html
					this.onSave=this.genVUE
					this.dialogVisible=true
				} else {
					this.$message("还未完成加载")
				}
			},
			showVUEForPC(){
				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result = this.parse2VUE4PC(rootBlock, 1, 'div')
					this.code=result.html	
					this.onSave=this.genVUEForPC
					this.dialogVisible=true
				} else {
					this.$message("还未完成加载")
				}
			},
			showJSON(){
				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result=JSON.parse(JSON.stringify(rootBlock))
					this.code=JSON.stringify(result,null,4)
					this.onSave=this.genJson
					this.dialogVisible=true
				} else {
					this.$message("还未完成加载")
				}
			},
			onDilaogClose(){
				this.dialogVisible=false
			},
			genHtml() {
				function download(filename, text) {
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
					element.setAttribute('download', filename);
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
				}

				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result = this.parse2HTML(rootBlock)
					download("page.html", result.html)
					console.log(result.html);
				} else {
					this.$message("还未完成加载")
				}
			},
			genVUE() {
				function download(filename, text) {
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
					element.setAttribute('download', filename);
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
				}

				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result = this.parse2VUE(rootBlock)
					download("page.vue", result.html)
					// console.log(result.html);
				} else {
					this.$message("还未完成加载")
				}
			},
			genVUEForPC() {
				function download(filename, text) {
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
					element.setAttribute('download', filename);
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
				}

				if (this.context) {
					let rootBlock = this.context.tabBlocks[this.context.currentTab]
					let result = this.parse2VUE4PC(rootBlock, 1, 'div')
					download("page.vue", result.html)
					// console.log(result.html);
				} else {
					this.$message("还未完成加载")
				}
			},
			genJson() {
				this.context.save();
			},
			fromFile() {
				let page = this;
				let fileName = '';
				let openFile = new Promise((resolve, reject) => {
					let input = document.createElement('input');
					input.value = '选择文件';
					input.type = 'file';
					input.onchange = event => {
						let file = event.target.files[0];
						let file_reader = new FileReader();
						file_reader.onload = () => {
							let fc = file_reader.result;
							resolve(fc); // 返回文件文本内容到Promise
						};
						file_reader.readAsText(file, 'UTF-8');
						fileName = file.name
					};
					input.click();
				});
				openFile.then((content) => {
					try {
						let saved = JSON.parse(content)
						page.context.createTab(fileName)
						page.context.tabBlocks[page.context.currentTab] = saved
						page.$message('加载成功')
					} catch (e) {
						page.$message('文件格式错误，无法解析')
					}
				})
			},
			/**
			 * 生成HTML代码
			 */
			parse2HTML(block, level = 0) {
				let result = {
					html: '',
					css: ''
				}
				let html = ''
				let css = ''
				// 样式
				if (block.id == 'root') {
					css += `\t\thtml,body{\n`
					css += `\t\t\tpadding:0;\n`
					css += `\t\t\tmargin:0;\n`
					css += `\t\t\twidth:100%;\n`
					css += `\t\t\theight:100%;\n`
					css += `\t\t}\n`
					css += `\t\tbody{\n`
				} else {
					css += `\t\t.${block.id}{\n`
				}
				for (let key in block.style) {
					let value = block.style[key]
					let realCss = key.replace(/([A-Z])/g, "-$1").toLowerCase()
					css += `\t\t\t${realCss}:${value};\n`
				}
				css += `\t\t}`
				result.css += css;
				// 头部
				if (block.id == 'root') {
					html +=
						`<!DOCTYPE html>\n<html lang="zh">\n<head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title></title>\n</head>\n<body>`
				} else {
					for (let i = 0; i < level; i++) {
						html += '\t'
					}
					html += `<${block.domType?block.domType:'div'} class="${block.id}"${block.domType&&block.domType=='input'&&block.text?' value="'+block.text+'"':''}>`
				}
				// 内容
				if (block.text&&(!block.domType||block.domType!='input')) {
					if (block.blocks && block.blocks.length >= 1) {
						html += '\n'
						for (let i = 0; i < level + 1; i++) {
							html += '\t'
						}
					}
					html += block.text
				}
				if (block.blocks && block.blocks.length >= 1) {
					html += '\n'
					for (let i = 0; i < block.blocks.length; i++) {
						let child = block.blocks[i]
						let childHtml = this.parse2HTML(child, level + 1)
						html += childHtml.html
						// 顺带处理CSS
						result.css += '\n'
						result.css += childHtml.css

						if (i != block.blocks.length - 1) {
							html += '\n'
						}
					}
					html += '\n'
					for (let i = 0; i < level; i++) {
						html += '\t'
					}
				}

				// 尾部
				if (block.id == 'root') {
					html += `\t<style>\n`
					html += result.css + '\n'
					html += `\t</style>\n`
					html += `</body>\n</html>`
				} else {
					html += `</${block.domType?block.domType:'div'}>`
				}
				result.html = html
				return result
			},
			/**
			 * 生成VUE代码
			 */
			parse2VUE(block, level = 1, defaultTag = 'view') {
				let result = {
					html: '',
					css: ''
				}
				let html = ''
				let css = ''
				// 样式
				if (block.id == 'root') {
					css += `\thtml,body,#root,uni-page-body,page #app{\n`
					css += `\t\tpadding:0;\n`
					css += `\t\tmargin:0;\n`
					css += `\t\twidth:100%;\n`
					css += `\t\theight:100%;\n`
					css += `\t}\n`
					css += `\t.${block.id}{\n`
				} else {
					css += `\t.${block.id}{\n`
				}
				for (let key in block.style) {
					let value = new String(block.style[key])
					// 处理RPX换算问题
					if (value) {
						let allCells = value.split(' ')
						for (let i = 0; i < allCells.length; i++) {
							if (allCells[i].match('[0-9]+px')) {
								allCells[i] = (parseInt(allCells[i].replace('px', '')) * 2) + 'rpx'
							}
						}
						value = allCells.join(' ')
					}
					let realCss = key.replace(/([A-Z])/g, "-$1").toLowerCase()
					css += `\t\t${realCss}:${value};\n`
				}
				css += `\t}`
				result.css += css;
				// 头部
				if (block.id == 'root') {
					html += `<template>\n\t<${defaultTag} class="${block.id}">`
				} else {
					for (let i = 0; i < level; i++) {
						html += '\t'
					}
					html += `<${block.domType?(block.domType=='div'?defaultTag:block.domType):defaultTag} class="${block.id}"${block.domType&&block.domType=='input'&&block.text?' value="'+block.text+'"':''}>`
				}
				// 内容
				if (block.text&&(!block.domType||block.domType!='input')) {
					if (block.blocks && block.blocks.length >= 1) {
						html += '\n'
						for (let i = 0; i < level + 1; i++) {
							html += '\t'
						}
					}
					html += block.text
				}
				if (block.blocks && block.blocks.length >= 1) {
					html += '\n'
					for (let i = 0; i < block.blocks.length; i++) {
						let child = block.blocks[i]
						let childHtml = this.parse2VUE(child, level + 1, defaultTag)
						html += childHtml.html
						// 顺带处理CSS
						result.css += '\n'
						result.css += childHtml.css

						if (i != block.blocks.length - 1) {
							html += '\n'
						}
					}
					html += '\n'
					for (let i = 0; i < level; i++) {
						html += '\t'
					}
				}

				// 尾部
				if (block.id == 'root') {
					html += `</${defaultTag}>\n`
					html += "</template>\n\n"
					html += "<script>\n"
					html += "\texport default {\n"
					html += "\t\tdata: () => ({}),\n"
					html += "\t\tprops:[],\n"
					html += "\t\tmethods:{}\n"
					html += "\t}\n"
					html += "</" + "script>\n\n"
					html += "<style scoped>\n"
					html += result.css + "\n"
					html += "</style>"
				} else {
					html += `</${block.domType?(block.domType=='div'?defaultTag:block.domType):defaultTag}>`
				}
				result.html = html
				return result
			},
			parse2VUE4PC(block, level = 1, defaultTag = 'view') {
				let result = {
					html: '',
					css: ''
				}
				let html = ''
				let css = ''
				// 样式
				if (block.id == 'root') {
					css += `\thtml,body,#root,uni-page-body,page #app{\n`
					css += `\t\tpadding:0;\n`
					css += `\t\tmargin:0;\n`
					css += `\t\twidth:100%;\n`
					css += `\t\theight:100%;\n`
					css += `\t}\n`
					css += `\t.${block.id}{\n`
				} else {
					css += `\t.${block.id}{\n`
				}
				for (let key in block.style) {
					let value = block.style[key]
					let realCss = key.replace(/([A-Z])/g, "-$1").toLowerCase()
					css += `\t\t\t${realCss}:${value};\n`
				}
				css += `\t}`
				result.css += css;
				// 头部
				if (block.id == 'root') {
					html += `<template>\n\t<${defaultTag} class="${block.id}">`
				} else {
					for (let i = 0; i < level; i++) {
						html += '\t'
					}
					html += `<${block.domType?(block.domType=='div'?defaultTag:block.domType):defaultTag} class="${block.id}"${block.domType&&block.domType=='input'&&block.text?' value="'+block.text+'"':''}>`
				}
				// 内容
				if (block.text&&(!block.domType||block.domType!='input')) {
					if (block.blocks && block.blocks.length >= 1) {
						html += '\n'
						for (let i = 0; i < level + 1; i++) {
							html += '\t'
						}
					}
					html += block.text
				}
				if (block.blocks && block.blocks.length >= 1) {
					html += '\n'
					for (let i = 0; i < block.blocks.length; i++) {
						let child = block.blocks[i]
						let childHtml = this.parse2VUE4PC(child, level + 1, defaultTag)
						html += childHtml.html
						// 顺带处理CSS
						result.css += '\n'
						result.css += childHtml.css

						if (i != block.blocks.length - 1) {
							html += '\n'
						}
					}
					html += '\n'
					for (let i = 0; i < level; i++) {
						html += '\t'
					}
				}

				// 尾部
				if (block.id == 'root') {
					html += `</${defaultTag}>\n`
					html += "</template>\n\n"
					html += "<script>\n"
					html += "\texport default {\n"
					html += "\t\tdata: () => ({}),\n"
					html += "\t\tprops:[],\n"
					html += "\t\tmethods:{}\n"
					html += "\t}\n"
					html += "</" + "script>\n\n"
					html += "<style scoped>\n"
					html += result.css + "\n"
					html += "</style>"
				} else {
					html += `</${block.domType?(block.domType=='div'?defaultTag:block.domType):defaultTag}>`
				}
				result.html = html
				return result
			}
		}
	}
</script>

<style lang="less">
	.tb {
		width: 100%;
		flex-shrink: 0;
		box-sizing: border-box;
		line-height: 30px;
	}

	.logo {
		font-size: 20px;
		display: inline-block;
		margin-right: 20px;
	}
</style>
