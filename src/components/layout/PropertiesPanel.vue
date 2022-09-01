<template>
	<div class="PropertiesPanel">
		<el-tabs v-if="propForm" v-model="activeName">
			<el-tab-pane label="极速设置" name="first">
				<h4>最常用</h4>
				<table class="propTable firstColumnFixed" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>子元素排列</td>
						<td>
							<select v-model="propForm.layout.content.direction">
								<option value="column">纵向</option>
								<option value="row">横向</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>纯色背景</td>
						<td>
							<div style="display: flex;flex-direction: row;">
								<el-color-picker
									v-model="propForm.common.basic.background.solid" size="mini" show-alpha @change="propForm.common.basic.background.type='Solid'">
								</el-color-picker>
								<el-input v-model="propForm.common.basic.background.solid" size="mini" @change="propForm.common.basic.background.type='Solid'"></el-input>
							</div>
						</td>
					</tr>
					<tr>
						<td>文字颜色</td>
						<td>
							<div style="display: flex;flex-direction: row;">
								<el-color-picker size="mini" show-alpha v-model="propForm.common.text.color">
								</el-color-picker>
								<el-input v-model="propForm.common.text.color" size="mini"></el-input>
							</div>
						</td>
					</tr>
					<tr>
						<td>文本内容</td>
						<td><input type="text" v-model="propForm.common.text.content"></td>
					</tr>
					<tr>
						<td>主轴快速对齐</td>
						<td v-if="propForm.layout.content.direction=='column'">
							<button @click="propForm.layout.content.mainAxis='flex-start'">上</button>
							<button @click="propForm.layout.content.mainAxis='center'">中</button>
							<button @click="propForm.layout.content.mainAxis='flex-end'">下</button>
						</td>
						<td v-if="propForm.layout.content.direction=='row'">
							<button @click="propForm.layout.content.crossAxis='flex-start'">上</button>
							<button @click="propForm.layout.content.crossAxis='center'">中</button>
							<button @click="propForm.layout.content.crossAxis='flex-end'">下</button>
						</td>
					</tr>
					<tr>
						<td>交叉轴快速对齐</td>
						<td v-if="propForm.layout.content.direction=='column'">
							<button @click="propForm.layout.content.crossAxis='flex-start'">左</button>
							<button @click="propForm.layout.content.crossAxis='center'">中</button>
							<button @click="propForm.layout.content.crossAxis='flex-end'">右</button>
						</td>
						<td v-if="propForm.layout.content.direction=='row'">
							<button @click="propForm.layout.content.mainAxis='flex-start'">左</button>
							<button @click="propForm.layout.content.mainAxis='center'">中</button>
							<button @click="propForm.layout.content.mainAxis='flex-end'">右</button>
						</td>
					</tr>
					<tr>
						<td>文字大小</td>
						<td>
							<el-slider v-model="propForm.common.text.fontSize" :min="0" :max="100" input-size="mini" show-input>
							</el-slider>
						</td>
					</tr>
					<tr>
						<td>背景图URL</td>
						<td><input v-model="propForm.common.basic.background.url" type="text" @change="propForm.common.basic.background.type='ImageUrl'"></td>
					</tr>
					<tr>
						<td>圆角</td>
						<td>
							<table class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td>
										<el-slider v-model="propForm.common.border.radius.value" :min="0" :max="100"
											input-size="mini" show-input @change="()=>{propForm.common.border.radius.type='All';borderChange();}">
										</el-slider>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>阴影</td>
						<td>
							<el-color-picker v-model="propForm.common.basic.boxShadow.color" size="mini">
							</el-color-picker>
							<table
								v-if="propForm.common.basic.boxShadow.color!=''&&propForm.common.basic.boxShadow.color!=null"
								class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td>横轴</td>
									<td>纵轴</td>
									<td>模糊</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.common.basic.boxShadow.x" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.common.basic.boxShadow.y" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.common.basic.boxShadow.blur" placeholder=""
											type="number" size="mini"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							内边距
						</td>
						<td>
							<table class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">上</td>
									<td style="text-align: center;">下</td>
									<td style="text-align: center;">左</td>
									<td style="text-align: center;">右</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.top" placeholder=""
											type="number" size="mini" @change="propForm.layout.padding.type='Each'"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.bottom" placeholder=""
											type="number" size="mini" @change="propForm.layout.padding.type='Each'"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.left" placeholder=""
											type="number" size="mini" @change="propForm.layout.padding.type='Each'"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.right" placeholder=""
											type="number" size="mini" @change="propForm.layout.padding.type='Each'"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>外边距</td>
						<td>
							<table class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">上</td>
									<td style="text-align: center;">下</td>
									<td style="text-align: center;">左</td>
									<td style="text-align: center;">右</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.top" placeholder=""
											type="number" size="mini" @change="propForm.layout.margin.type='Each'"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.bottom" placeholder=""
											type="number" size="mini" @change="propForm.layout.margin.type='Each'"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.left" placeholder=""
											type="number" size="mini" @change="propForm.layout.margin.type='Each'"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.right" placeholder=""
											type="number" size="mini" @change="propForm.layout.margin.type='Each'"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</el-tab-pane>
			
			<el-tab-pane label="常用" name="second">
				<h4>基本</h4>
				<table class="propTable firstColumnFixed" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>名称</td>
						<td><el-input v-model="currentName" @keyup.enter.native="changeName" placeholder="请输入内容" ></el-input></td>
					</tr>
					<tr>
						<td>背景</td>
						<td>
							<select v-model="propForm.common.basic.background.type">
								<option value="None">无背景</option>
								<option value="Solid">纯色</option>
								<option value="Gradient">渐变</option>
								<option value="UploadImage">本地图片</option>
								<option value="ImageUrl">图片地址</option>
							</select>
							<!-- 图片展开方式 -->
							<select v-if="propForm.common.basic.background=='ImageUrl'"
								v-model="propForm.common.basic.background.layout">
								<option value="None">默认</option>
								<option value="XRepeat">横向平铺</option>
								<option value="YRepeat">纵向平铺</option>
								<option value="XYRepeat">横纵平铺</option>
								<option value="Contains">等比例容纳</option>
								<option value="Cover">等比例适应</option>
							</select>
							<!-- 用于纯色输入 -->
							<el-color-picker v-if="propForm.common.basic.background.type=='Solid'"
								v-model="propForm.common.basic.background.solid" size="mini" show-alpha>
							</el-color-picker>
							<!-- 用于渐变输入 -->
							<table v-if="propForm.common.basic.background.type=='Gradient'" class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td>起始色</td>
									<td>终止色</td>
									<td>角度</td>
								</tr>
								<tr>
									<td>
										<el-color-picker v-model="propForm.common.basic.background.gradient.start"
											size="mini" show-alpha></el-color-picker>
									</td>
									<td>
										<el-color-picker v-model="propForm.common.basic.background.gradient.end"
											size="mini" show-alpha></el-color-picker>
									</td>
									<td>
										<el-input v-model="propForm.common.basic.background.gradient.angle"
											placeholder="角度" type="number" min="-180" max="180" size="mini">
											<template slot="append">°</template>
										</el-input>
									</td>
								</tr>
							</table>
							<!-- 上传图片 -->
							<table v-if="propForm.common.basic.background.type=='UploadImage'" class="propTable"
								border="0" cellspacing="" cellpadding="">
								<tr>
									<td><button @click="()=>{
										$message('还没实现该功能')
									}">立即上传</button></td>
								</tr>
							</table>
							<!-- 指定url -->
							<input v-if="propForm.common.basic.background.type=='ImageUrl'" v-model="propForm.common.basic.background.url" type="text">
						</td>
					</tr>
					<tr>
						<td>可见度</td>
						<td>
							<div style="padding-right: 10px;">
								<el-slider v-model="propForm.common.basic.transparency" :min="0" :max="100"
									input-size="mini" show-input></el-slider>
							</div>
						</td>
					</tr>
					<tr>
						<td>阴影</td>
						<td>
							<el-color-picker v-model="propForm.common.basic.boxShadow.color" size="mini">
							</el-color-picker>
							<table
								v-if="propForm.common.basic.boxShadow.color!=''&&propForm.common.basic.boxShadow.color!=null"
								class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td>横轴</td>
									<td>纵轴</td>
									<td>模糊</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.common.basic.boxShadow.x" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.common.basic.boxShadow.y" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.common.basic.boxShadow.blur" placeholder=""
											type="number" size="mini"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<h4>边框</h4>
				<table class="propTable firstColumnFixed" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>粗细</td>
						<td>
							<table class="propTable firstColumnFixed" border="0" cellspacing="" cellpadding="">
								<tr>
									<td>
										<el-slider v-model="propForm.common.border.width" :min="0" :max="10" input-size="mini"
											@change="borderChange" show-input>
										</el-slider>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>圆角</td>
						<td>
							<select v-model="propForm.common.border.radius.type">
								<option value="None">不设置</option>
								<option value="All">统一设置</option>
								<option value="Each">分别设置</option>
							</select>
							<table v-if="propForm.common.border.radius.type=='All'" class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td>
										<el-slider v-model="propForm.common.border.radius.value" :min="0" :max="100"
											input-size="mini" @change="borderChange" show-input>
										</el-slider>
									</td>
								</tr>
							</table>
							<table v-if="propForm.common.border.radius.type=='Each'" class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">左上</td>
									<td style="text-align: center;">右上</td>
									<td style="text-align: center;">左下</td>
									<td style="text-align: center;">右下</td>
								</tr>
								<tr>
									<td>
										<el-input placeholder="" type="number" size="mini" min="0"
											v-model="propForm.common.border.radius.eachValue.leftTop"></el-input>
									</td>
									<td>
										<el-input placeholder="" type="number" size="mini" min="0"
											v-model="propForm.common.border.radius.eachValue.rightTop"></el-input>
									</td>
									<td>
										<el-input placeholder="" type="number" size="mini" min="0"
											v-model="propForm.common.border.radius.eachValue.leftBottom"></el-input>
									</td>
									<td>
										<el-input placeholder="" type="number" size="mini" min="0"
											v-model="propForm.common.border.radius.eachValue.rightBottom"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr v-if="propForm.common.border.width>0">
						<td>可见性</td>
						<td>
							<table class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">上</td>
									<td style="text-align: center;">下</td>
									<td style="text-align: center;">左</td>
									<td style="text-align: center;">右</td>
								</tr>
								<tr>
									<td>
										<el-checkbox v-model="propForm.common.border.visible.top"></el-checkbox>
									</td>
									<td>
										<el-checkbox v-model="propForm.common.border.visible.bottom"></el-checkbox>
									</td>
									<td>
										<el-checkbox v-model="propForm.common.border.visible.left"></el-checkbox>
									</td>
									<td>
										<el-checkbox v-model="propForm.common.border.visible.right"></el-checkbox>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr v-if="propForm.common.border.width>0">
						<td>颜色</td>
						<td>
							<el-color-picker size="mini" show-alpha v-model="propForm.common.border.color"
								@change="borderChange">
							</el-color-picker>
						</td>
					</tr>
					<tr v-if="propForm.common.border.width>0">
						<td>线形</td>
						<td>
							<select v-model="propForm.common.border.lineStyle" @change="borderChange">
								<option value="Solid">实线</option>
								<option value="Dashed">虚线</option>
							</select>
						</td>
					</tr>
				</table>

				<h4>文本</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>文本内容</td>
						<td><input type="text" v-model="propForm.common.text.content"></td>
					</tr>
					<tr>
						<td>大小</td>
						<td>
							<el-slider v-model="propForm.common.text.fontSize" :min="0" :max="100" input-size="mini" show-input>
							</el-slider>
						</td>
					</tr>
					<tr>
						<td>格式</td>
						<td>
							<el-checkbox v-model="propForm.common.text.bold">粗体</el-checkbox>
							<el-checkbox v-model="propForm.common.text.italic">斜体</el-checkbox>
						</td>
					</tr>
					<tr>
						<td>颜色</td>
						<td>
							<el-color-picker size="mini" show-alpha v-model="propForm.common.text.color">
							</el-color-picker>
						</td>
					</tr>
					<tr>
						<td>行高</td>
						<td>
							<el-slider v-model="propForm.common.text.lineHeight" :min="0" :max="100" input-size="mini" show-input>
							</el-slider>
						</td>
					</tr>
					<tr>
						<td>对齐方式</td>
						<td>
							<select v-model="propForm.common.text.align">
								<option value="left">左对齐</option>
								<option value="center">居中</option>
								<option value="right">右对齐</option>
							</select>
						</td>
					</tr>
				</table>
			</el-tab-pane>
			<el-tab-pane label="布局" name="third">
				<h4>布局方式</h4>
				<table class="propTable firstColumnFixed" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>弹性</td>
						<td>
							<div>
								<el-checkbox v-model="propForm.layout.shrinkZero">钢化</el-checkbox>
								<el-checkbox v-model="propForm.layout.closeFlex">关闭弹性</el-checkbox>
							</div>
						</td>
					</tr>
					<tr>
						<td>定位方式</td>
						<td>
							<table class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<select v-model="propForm.layout.position.type">
										<option value="relative">相对定位</option>
										<option value="absolute">绝对定位</option>
										<option value="sticky">固钉区域</option>
										<option value="fixed">可见区绝对定位</option>
									</select>
								</tr>
							</table>
							<table
								v-if="propForm.layout.position.type=='absolute'||propForm.layout.position.type=='fixed'||propForm.layout.position.type=='sticky'"
								class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">上</td>
									<td style="text-align: center;">下</td>
									<td style="text-align: center;">左</td>
									<td style="text-align: center;">右</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.layout.position.location.top" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.position.location.bottom" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.position.location.left" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.position.location.right" placeholder=""
											type="number" size="mini"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>大小</td>
						<td>
							<table class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;width: 50%;">宽度</td>
									<td style="text-align: center;width: 50%;">高度</td>
								</tr>
								<tr>
									<td>
										<div>
											<select v-model="propForm.layout.size.width.type">
												<option value="None">不设置</option>
												<option value="UserDefine">指定尺寸</option>
												<option value="Percent">百分比</option>
											</select>
										</div>
										<div>
											<el-input v-if="propForm.layout.size.width.type=='UserDefine'"
												v-model="propForm.layout.size.width.value" placeholder="" type="number"
												size="mini"></el-input>
											<el-input v-if="propForm.layout.size.width.type=='Percent'"
												v-model="propForm.layout.size.width.value" placeholder="" type="number"
												size="mini">
												<template slot="append">%</template>
											</el-input>
										</div>
									</td>
									<td>
										<div>
											<select v-model="propForm.layout.size.height.type">
												<option value="None">不设置</option>
												<option value="UserDefine">指定尺寸</option>
												<option value="Percent">百分比</option>
											</select>
										</div>
										<div>
											<el-input v-if="propForm.layout.size.height.type=='UserDefine'"
												v-model="propForm.layout.size.height.value" placeholder="" type="number"
												size="mini"></el-input>
											<el-input v-if="propForm.layout.size.height.type=='Percent'"
												v-model="propForm.layout.size.height.value" placeholder="" type="number"
												size="mini">
												<template slot="append">%</template>
											</el-input>
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>内边距</td>
						<td>
							<table class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td>
										<select v-model="propForm.layout.padding.type">
											<option value="None">不设置</option>
											<option value="All">统一设置</option>
											<option value="Each">分别设置</option>
										</select>
									</td>
								</tr>
							</table>
							<table v-if="propForm.layout.padding.type=='All'" class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td>设置值</td>
									<td>
										<el-input v-model="propForm.layout.padding.value" placeholder="" type="number"
											size="mini"></el-input>
									</td>
								</tr>
							</table>
							<table v-if="propForm.layout.padding.type=='Each'" class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">上</td>
									<td style="text-align: center;">下</td>
									<td style="text-align: center;">左</td>
									<td style="text-align: center;">右</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.top" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.bottom" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.left" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.padding.eachValue.right" placeholder=""
											type="number" size="mini"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>外边距</td>
						<td>
							<table class="propTable" border="0" cellspacing="" cellpadding="">
								<tr>
									<td>
										<select v-model="propForm.layout.margin.type">
											<option value="None">不设置</option>
											<option value="All">统一设置</option>
											<option value="Each">分别设置</option>
										</select>
									</td>
								</tr>
							</table>
							<table v-if="propForm.layout.margin.type=='All'" class="propTable" border="0" cellspacing=""
								cellpadding="">
								<tr>
									<td>设置值</td>
									<td>
										<el-input v-model="propForm.layout.margin.value" placeholder="" type="number"
											size="mini"></el-input>
									</td>
								</tr>
							</table>
							<table v-if="propForm.layout.margin.type=='Each'" class="propTable" border="0"
								cellspacing="" cellpadding="">
								<tr>
									<td style="text-align: center;">上</td>
									<td style="text-align: center;">下</td>
									<td style="text-align: center;">左</td>
									<td style="text-align: center;">右</td>
								</tr>
								<tr>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.top" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.bottom" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.left" placeholder=""
											type="number" size="mini"></el-input>
									</td>
									<td>
										<el-input v-model="propForm.layout.margin.eachValue.right" placeholder=""
											type="number" size="mini"></el-input>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>

				<h4>内容</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>排列</td>
						<td>
							<select v-model="propForm.layout.content.direction">
								<option value="column">纵向</option>
								<option value="row">横向</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>主对齐方式</td>
						<td>
							<select v-model="propForm.layout.content.mainAxis">
								<option value="flex-start">起始位置</option>
								<option value="center">中间对齐</option>
								<option value="flex-end">结束位置</option>
								<option value="space-between">两边对齐</option>
								<option value="space-around">均分</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>辅对齐方式</td>
						<td>
							<select v-model="propForm.layout.content.crossAxis">
								<option value="flex-start">起始位置</option>
								<option value="center">中间对齐</option>
								<option value="flex-end">结束位置</option>
								<option value="space-between">两边对齐</option>
								<option value="space-around">均分</option>
							</select>
						</td>
					</tr>
				</table>
			</el-tab-pane>
			<el-tab-pane label="高级" name="forth">
				<h4>子元素溢出设置</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>文字</td>
						<td>
							<select v-model="propForm.overflow.children.text">
								<option value="None">默认</option>
								<option value="Wrap">换行</option>
								<option value="NoWrap">不换行</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>弹性换行</td>
						<td>
							<select v-model="propForm.overflow.children.flex">
								<option value="None">不换行</option>
								<option value="Wrap">换行</option>
							</select>
							<select v-if="propForm.overflow.children.flex=='Wrap'" v-model="propForm.overflow.children.alignContent">
								<option value="normal">默认</option>
								<option value="flex-start">起始</option>
								<option value="center">居中</option>
								<option value="flex-end">结束</option>
								<option value="space-between">两边对齐</option>
								<option value="space-around">均分</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>滚动条</td>
						<td>
							<select v-model="propForm.overflow.children.scroll">
								<option value="Default">未设置</option>
								<option value="None">溢出时隐藏</option>
								<option value="X">横向滚动</option>
								<option value="Y">纵向滚动</option>
								<option value="XY">双向滚动</option>
								<!-- 
								<option value="YHide">纵向滚动并隐藏</option>
								<option value="XHide">横向滚动并隐藏</option>
								<option value="XYHide">横纵滚动并隐藏</option> -->
							</select>
						</td>
					</tr>
				</table>
				<h4>元素表达</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>元素类型</td>
						<td>
							<select v-model="propForm.domSettings.domType">
								<option value="div">默认</option>
								<option value="input">input</option>
								<option value="span">span</option>
								<option value="img">img</option>
							</select>
						</td>
					</tr>
				</table>
			</el-tab-pane>
			<el-tab-pane v-if="false" label="高级" name="fifth">
				<h4>套用格式</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>沿用格式</td>
						<td>
							<select name="" id="">
								<option value="">默认格式</option>
							</select>
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<button>应用</button>
							<button>保存当前格式</button>
							<button>删除所选</button>
						</td>
					</tr>
				</table>

				<h4>预览设定</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>重复次数</td>
						<td>
							<input type="text">
						</td>
					</tr>
				</table>

				<h4>属性参数化</h4>
				<table class="propTable" border="0" cellspacing="" cellpadding="">
					<tr>
						<td>已参数化的属性</td>
						<td>
							<select name="" id="">
								<option value="">文字属性-文字内容</option>
							</select>
							<button type="button">移除选中</button>
						</td>
					</tr>
					<tr>
						<td>操作</td>
						<td>
							<select name="" id="">
								<option value="">请选择</option>
							</select>
							<button type="button">添加选中</button>
						</td>
					</tr>
				</table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data: () => ({
			currentName:null,
			activeName: 'first',
			currentBlock: null,
			defaultForm: {
				// 常用
				common: {
					// -- 基本 --
					basic: {
						// 名称
						name: '名称',
						// 背景
						background: {
							// 类型
							type: 'None',
							// 布局
							layout: 'None',
							// 实色
							solid: 'rgba(175,175,175,1)',
							// 渐变
							gradient: {
								start: 'rgba(255,255,255,1)',
								end: 'rgba(175,175,175,1)',
								angle: 180
							},
							// 背景图地址
							url:''
						},
						// 透明度
						transparency: 100,
						boxShadow: {
							color: '',
							x: 5,
							y: 5,
							blur: 10
						}
					},
					// -- 边框 --
					border: {
						// 粗细
						width: 0,
						// 圆角
						radius: {
							// 类型
							type: 'None',
							value: 10,
							eachValue: {
								leftTop: 10,
								rightTop: 10,
								leftBottom: 10,
								rightBottom: 10
							}
						},
						// 可见性
						visible: {
							top: true,
							bottom: true,
							left: true,
							right: true
						},
						// 边框颜色
						color: 'rgba(0,0,0,1)',
						// 线型
						lineStyle: 'Solid'
					},
					// -- 文字 --
					text: {
						// 文字内容
						content: '',
						// 文字大小
						fontSize: '',
						// 行高
						lineHeight: 0,
						// 颜色
						color: '',
						// 对齐方式
						align: 'left',
						// 粗体
						bold: false,
						// 斜体
						italic: false
					}
				},
				// 布局
				layout: {
					// 钢化
					shrinkZero: false,
					// 关闭弹性
					closeFlex:false,
					// 定位
					position: {
						// 定位类型
						type: 'relative',
						// 位置
						location: {
							top: 0,
							bottom: '',
							left: 0,
							right: ''
						}
					},
					// 大小
					size: {
						// 宽度
						width: {
							type: 'None',
							value: '100'
						},
						// 高度
						height: {
							type: 'None',
							value: '100'
						}
					},
					// 内边距
					padding: {
						type: 'None',
						value: '',
						eachValue: {
							top: '',
							bottom: '',
							left: '',
							right: '',
						}
					},
					// 外边距
					margin: {
						type: 'None',
						value: '',
						eachValue: {
							top: '',
							bottom: '',
							left: '',
							right: '',
						}
					},
					// 内容
					content: {
						// 方向
						direction: 'column',
						// 主轴对齐方式
						mainAxis: 'flex-start',
						// 交叉轴对齐方式
						crossAxis: 'flex-start',
					}
				},
				// 溢出
				overflow: {
					// 子元素溢出规则
					children: {
						// 文字
						text: 'None',
						// 块
						flex: 'None',
						// 多行对齐方式
						alignContent:'normal',
						// 滚动条
						scroll: 'Default'
					}
				},
				domSettings:{
					domType:'div'
				}
			},
			propForm: null
		}),
		props: ['context', 'currentId'],
		methods: {
			// 从元素中提取样式
			fromBlock(block) {
				let style = block.style
				let newForm = JSON.parse(JSON.stringify(this.defaultForm))
				/** 基本设置 */
				let basic = newForm.common.basic
				basic.name = block.id
				this.currentName=basic.name
				// 背景颜色
				if (style.backgroundColor) {
					// 纯色
					basic.background = {
						...basic.background,
						type: 'Solid',
						solid: style.backgroundColor
					}
				}
				if (style.backgroundImage) {
					// 判断是否是渐变
					if (style.backgroundImage.indexOf("linear-gradient") != -1) {
						let word = style.backgroundImage;
						let angle = parseInt(word.substring(word.indexOf('(') + 1, word.indexOf(',')).replace('deg', ''))
						word = word.substring(word.indexOf(','))
						let start = word.substring(word.indexOf('rgba'), word.indexOf(')') + 1)
						word = word.substring(word.indexOf(')') + 1)
						let end = word.substring(word.indexOf('rgba'), word.indexOf(')') + 1)
						basic.background = {
							...basic.background,
							type: 'Gradient',
							gradient: {
								start,
								end,
								angle
							}
						}
					}
					if (style.backgroundImage.indexOf("url(") != -1) {
						let word = style.backgroundImage;
						let url=word.substring(4,word.length-1)
						basic.background = {
							...basic.background,
							type: 'ImageUrl',
							url
						}
					}
				}
				// 半透明
				if (style.opacity) {
					basic.transparency = parseInt(style.opacity * 100)
				}
				// 阴影处理
				if (style.boxShadow) {
					let word = style.boxShadow
					let words = word.split(' ')
					basic.boxShadow = {
						color: words[0],
						x: words[1].replace('px', ''),
						y: words[2].replace('px', ''),
						blur: words[3].replace('px', '')
					}
				}

				// 边框处理
				if (style.border) {
					let word = style.border;
					let width = parseInt(word.substring(0, word.indexOf('px')))
					word = word.substring(word.indexOf('px') + 2)
					let lineStyle = word.substring(0, word.indexOf('rgb')).trim()
					lineStyle = lineStyle[0].toUpperCase() + lineStyle.substring(1)
					let color = word.substring(word.indexOf('rgb'))
					newForm.common.border = {
						...newForm.common.border,
						width,
						color,
						lineStyle
					}
				}
				if (style.borderTop == 'none') {
					newForm.common.border.visible.top = false;
				} else {
					newForm.common.border.visible.top = true;
				}
				if (style.borderBottom == 'none') {
					newForm.common.border.visible.bottom = false;
				} else {
					newForm.common.border.visible.bottom = true;
				}
				if (style.borderLeft == 'none') {
					newForm.common.border.visible.left = false;
				} else {
					newForm.common.border.visible.left = true;
				}
				if (style.borderRight == 'none') {
					newForm.common.border.visible.right = false;
				} else {
					newForm.common.border.visible.right = true;
				}
				// 圆角处理
				if (style.borderRadius) {
					let word = style.borderRadius
					let words = word.split(' ')
					if (words.length == 1) {
						newForm.common.border.radius = {
							...newForm.common.border.radius,
							type: 'All',
							value: parseInt(words[0].replace('px', '')),
							eachValue: {
								leftTop: parseInt(words[0].replace('px', '')),
								rightTop: parseInt(words[0].replace('px', '')),
								rightBottom: parseInt(words[0].replace('px', '')),
								leftBottom: parseInt(words[0].replace('px', ''))
							}
						}
					}
					if (words.length == 4) {
						newForm.common.border.radius = {
							...newForm.common.border.radius,
							type: 'Each',
							value: parseInt(words[0].replace('px', '')),
							eachValue: {
								leftTop: parseInt(words[0].replace('px', '')),
								rightTop: parseInt(words[1].replace('px', '')),
								rightBottom: parseInt(words[2].replace('px', '')),
								leftBottom: parseInt(words[3].replace('px', ''))
							}
						}
					}
				}
				// 文本处理
				if (block.text) {
					newForm.common.text.content = block.text
				}
				if (style.fontSize) {
					newForm.common.text.fontSize = parseInt(style.fontSize.replace('px', ''))
				} else {
					newForm.common.text.fontSize = 0
				}
				if (style.fontWeight && style.fontWeight == 'bold') {
					newForm.common.text.bold = true
				}
				if (style.fontStyle && style.fontStyle == 'italic') {
					newForm.common.text.italic = true
				}
				if (style.color) {
					newForm.common.text.color = style.color
				}
				if (style.lineHeight) {
					newForm.common.text.lineHeight = parseInt(style.lineHeight.replace('px', ''))
				}
				if (style.textAlign) {
					newForm.common.text.align = style.textAlign
				}

				// 布局
				if (style.flexShrink == 0) {
					newForm.layout.shrinkZero = true
				}
				if (style.display != 'flex'){
					newForm.layout.closeFlex = true
				}
				if (style.position) {
					newForm.layout.position.type = style.position
				}
				if (style.top != undefined){
					newForm.layout.position.location.top = parseInt(style.top.replace('px', ''))
				}else{
					newForm.layout.position.location.top = null
				}
				if (style.bottom != undefined) {
					newForm.layout.position.location.bottom = parseInt(style.bottom.replace('px', ''))
				}else{
					newForm.layout.position.location.bottom = null
				}
				if (style.left != undefined){
					newForm.layout.position.location.left = parseInt(style.left.replace('px', ''))
				}else{
					newForm.layout.position.location.left = null
				}
				if (style.right != undefined) {
					newForm.layout.position.location.right = parseInt(style.right.replace('px',''))
				}else{
					newForm.layout.position.location.right = null
				}

				if (style.width && style.width.indexOf('px') != -1) {
					newForm.layout.size.width = {
						type: 'UserDefine',
						value: parseInt(style.width.replace('px', ''))
					}
				}
				if (style.height && style.height.indexOf('px') != -1) {
					newForm.layout.size.height = {
						type: 'UserDefine',
						value: parseInt(style.height.replace('px', ''))
					}
				}
				if (style.width && style.width.indexOf('%') != -1) {
					newForm.layout.size.width = {
						type: 'Percent',
						value: parseInt(style.width.replace('%', ''))
					}
				}
				if (style.height && style.height.indexOf('%') != -1) {
					newForm.layout.size.height = {
						type: 'Percent',
						value: parseInt(style.height.replace('%', ''))
					}
				}
				if (style.padding) {
					let word = style.padding
					let words = word.split(" ")
					if (words.length == 1) {
						newForm.layout.padding = {
							...newForm.layout.padding,
							type: 'All',
							value: parseInt(words[0].replace('px', ''))
						}
					} else {
						newForm.layout.padding = {
							...newForm.layout.padding,
							type: 'Each',
							eachValue: {
								top: parseInt(words[0].replace('px', '')),
								bottom: parseInt(words[2].replace('px', '')),
								left: parseInt(words[3].replace('px', '')),
								right: parseInt(words[1].replace('px', '')),
							}
						}
					}
				}
				if (style.margin) {
					let word = style.margin
					let words = word.split(" ")
					if (words.length == 1) {
						newForm.layout.margin = {
							...newForm.layout.margin,
							type: 'All',
							value: parseInt(words[0].replace('px', ''))
						}
					} else {
						newForm.layout.margin = {
							...newForm.layout.margin,
							type: 'Each',
							eachValue: {
								top: parseInt(words[0].replace('px', '')),
								bottom: parseInt(words[2].replace('px', '')),
								left: parseInt(words[3].replace('px', '')),
								right: parseInt(words[1].replace('px', '')),
							}
						}
					}
				}
				if(style.flexDirection){
					newForm.layout.content.direction=style.flexDirection
				}
				if(style.justifyContent){
					newForm.layout.content.mainAxis=style.justifyContent
				}
				if(style.alignItems){
					newForm.layout.content.crossAxis=style.alignItems
				}

				/** 溢出设置 */
				if(style.overflow){
					let overflowSettings = style.overflow.split(" ")
					if(overflowSettings[0]=='hidden'&&overflowSettings[1]=='hidden'){
						newForm.overflow.children.scroll='None'
					}else if(overflowSettings[0]=='hidden'&&overflowSettings[1]=='scroll'){
						newForm.overflow.children.scroll='Y'
					}else if(overflowSettings[0]=='scroll'&&overflowSettings[1]=='hidden'){
						newForm.overflow.children.scroll='X'
					}else if(overflowSettings[0]=='scroll'&&overflowSettings[1]=='scroll'){
						newForm.overflow.children.scroll='XY'
					}
				}else{
					newForm.overflow.children.scroll='Default'
				}
				if(style.flexWrap&&style.flexWrap=='wrap'){
					newForm.overflow.children.flex='Wrap'
				}else{
					newForm.overflow.children.flex='None'
				}
				if(style.alignContent){
					newForm.overflow.children.alignContent=style.alignContent
				}

				if(block.domType){
					newForm.domSettings.domType=block.domType
				}

				this.propForm = newForm;
			},
			changeName(e){
				let block = this.currentBlock
				let basic = this.propForm.common.basic
				// 名称判断
				if(this.currentName!=block.id){
					if(block.id=='root'){
						this.$message('根元素不可改变，请生成源码后手动修改')
						basic.name=block.id
						this.currentName=basic.name
						return;
					}
					if(!(/[_\-0-9a-zA-Z]+/.test(this.currentName))){
						this.$message('名称不合法')
						basic.name=block.id
						this.currentName=basic.name
						return;
					}
					if(this.context.findBlockById(this.currentName)){
						this.$message(`名称${this.currentName}已被其他元素占用`)
						basic.name=block.id
						this.currentName=basic.name
						return;
					}
					block.id=this.currentName
					basic.name=this.currentName
					this.context.currentBlock=basic.name
				}
			},
			// 将样式设置到元素中
			toBlock(block) {
				// 基本设置
				let style = {
					boxSizing: 'border-box'
				};
				let basic = this.propForm.common.basic				
				// 背景渐变
				if (basic.background.type == 'Gradient') {
					if (
						!isNaN(basic.background.gradient.angle) &&
						basic.background.gradient.start &&
						basic.background.gradient.start != '' &&
						basic.background.gradient.start.indexOf('rgba') != -1 &&
						basic.background.gradient.end &&
						basic.background.gradient.end != '' &&
						basic.background.gradient.end.indexOf('rgba') != -1
					) {
						style.backgroundImage =
							`linear-gradient(${basic.background.gradient.angle}deg, ${basic.background.gradient.start}, ${basic.background.gradient.end})`
					}
				}
				if (basic.background.type == 'ImageUrl'){
					if(basic.background.url){
						style.backgroundImage = `url(${basic.background.url})`
						style.backgroundSize = "cover"
						style.backgroundRepeat = "no-repeat"
						style.backgroundPosition = "center"
					}
				}
				// 背景颜色
				if (basic.background.type == 'Solid') {
					style.backgroundColor = basic.background.solid
				}
				// 透明度
				if (basic.transparency != 100) {
					style.opacity = basic.transparency / 100
				}
				// 阴影
				if (
					basic.boxShadow &&
					basic.boxShadow.color &&
					basic.boxShadow.color != '' &&
					!isNaN(basic.boxShadow.x) &&
					!isNaN(basic.boxShadow.y) &&
					!isNaN(basic.boxShadow.blur)
				) {
					style.boxShadow =
						`${basic.boxShadow.color} ${basic.boxShadow.x}px ${basic.boxShadow.y}px ${basic.boxShadow.blur}px`
				}

				/** 边框 */
				let border = this.propForm.common.border
				// 边框
				if (
					border.width &&
					border.width != 0 &&
					border.color &&
					border.color != ''
				) {
					style.border = `${border.width}px ${border.lineStyle.toLowerCase()} ${border.color}`
					if (border.visible.top == true) {
						style.borderTop = `${border.width}px ${border.lineStyle.toLowerCase()} ${border.color}`
					} else {
						style.borderTop = `none`
					}
					if (border.visible.bottom == true) {
						style.borderBottom = `${border.width}px ${border.lineStyle.toLowerCase()} ${border.color}`
					} else {
						style.borderBottom = `none`
					}
					if (border.visible.left == true) {
						style.borderLeft = `${border.width}px ${border.lineStyle.toLowerCase()} ${border.color}`
					} else {
						style.borderLeft = `none`
					}
					if (border.visible.right == true) {
						style.borderRight = `${border.width}px ${border.lineStyle.toLowerCase()} ${border.color}`
					} else {
						style.borderRight = `none`
					}
				}
				// 圆角
				if (border.radius.type == 'All' && border.radius.value != '') {
					style.borderRadius = `${border.radius.value}px`
				}
				if (
					border.radius.type == 'Each' &&
					border.radius.eachValue &&
					!isNaN(border.radius.eachValue.leftTop) &&
					!isNaN(border.radius.eachValue.rightTop) &&
					!isNaN(border.radius.eachValue.leftBottom) &&
					!isNaN(border.radius.eachValue.rightBottom)
				) {
					style.borderRadius =
						`${border.radius.eachValue.leftTop}px ${border.radius.eachValue.rightTop}px ${border.radius.eachValue.rightBottom}px ${border.radius.eachValue.leftBottom}px`
				}
				// 文本
				let text = this.propForm.common.text
				if (text.content && text.content != '') {
					block.text = text.content
				} else {
					block.text = null
				}
				if (text.fontSize && text.fontSize != '' && text.fontSize != '') {
					style.fontSize = `${text.fontSize}px`
				}
				if (text.bold) {
					style.fontWeight = 'bold'
				} else {
					style.fontWeight = 'normal'
				}
				if (text.italic) {
					style.fontStyle = 'italic'
				} else {
					style.fontStyle = 'normal'
				}
				if (text.color && text.color != '') {
					style.color = text.color
				}
				if (text.lineHeight && text.lineHeight != '' && text.lineHeight != 0) {
					style.lineHeight = `${text.lineHeight}px`
				}
				if (text.align && text.align != '') {
					style.textAlign = text.align
				}
				// 布局
				let layout = this.propForm.layout
				if (layout.shrinkZero) {
					style.flexShrink = 0
				}
				if (!layout.closeFlex){
					style.display = 'flex'
				}
				if (layout.position.type) {
					style.position = layout.position.type
					if (layout.position.type == 'absolute' || layout.position.type == 'fixed' || layout.position.type == 'sticky') {
						if (!isNaN(layout.position.location.top)) style.top = `${layout.position.location.top}px`
						if (!isNaN(layout.position.location.left)) style.left = `${layout.position.location.left}px`
						if (!isNaN(layout.position.location.right)) style.right = `${layout.position.location.right}px`
						if (!isNaN(layout.position.location.bottom)) style.bottom = `${layout.position.location.bottom}px`
					}
				}
				if (layout.size.width.type == 'UserDefine') {
					if (!isNaN(layout.size.width.value)) style.width = `${layout.size.width.value}px`
				}
				if (layout.size.height.type == 'UserDefine') {
					if (!isNaN(layout.size.height.value)) style.height = `${layout.size.height.value}px`
				}
				if (layout.size.width.type == 'Percent') {
					if (!isNaN(layout.size.width.value)) style.width = `${layout.size.width.value}%`
				}
				if (layout.size.height.type == 'Percent') {
					if (!isNaN(layout.size.height.value)) style.height = `${layout.size.height.value}%`
				}
				if (layout.padding.type == 'All') {
					if (!isNaN(layout.padding.value) && layout.padding.value != 0) style.padding =
						`${layout.padding.value}px`
				}
				if (layout.padding.type == 'Each') {
					let padding = {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0
					}
					if (!isNaN(layout.padding.eachValue.top) && layout.padding.eachValue.top != 0) padding.top = layout
						.padding.eachValue.top
					if (!isNaN(layout.padding.eachValue.bottom) && layout.padding.eachValue.bottom != 0) padding.bottom =
						layout.padding.eachValue.bottom
					if (!isNaN(layout.padding.eachValue.left) && layout.padding.eachValue.left != 0) padding.left = layout
						.padding.eachValue.left
					if (!isNaN(layout.padding.eachValue.right) && layout.padding.eachValue.right != 0) padding.right =
						layout.padding.eachValue.right

					style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
				}
				if (layout.margin.type == 'All') {
					if (!isNaN(layout.margin.value) && layout.margin.value != 0) style.margin =
						`${layout.margin.value}px`
				}
				if (layout.margin.type == 'Each') {
					let margin = {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0
					}
					if (!isNaN(layout.margin.eachValue.top) && layout.margin.eachValue.top != 0) margin.top = layout
						.margin.eachValue.top
					if (!isNaN(layout.margin.eachValue.bottom) && layout.margin.eachValue.bottom != 0) margin.bottom =
						layout.margin.eachValue.bottom
					if (!isNaN(layout.margin.eachValue.left) && layout.margin.eachValue.left != 0) margin.left = layout
						.margin.eachValue.left
					if (!isNaN(layout.margin.eachValue.right) && layout.margin.eachValue.right != 0) margin.right =
						layout.margin.eachValue.right
				
					style.margin = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
				}
				
				if(layout.content.direction){
					style.flexDirection=layout.content.direction
				}
				if(layout.content.mainAxis){
					style.justifyContent=layout.content.mainAxis
				}
				if(layout.content.crossAxis){
					style.alignItems=layout.content.crossAxis
				}

				/** 溢出设置 */
				let overflow=this.propForm.overflow
				if(overflow.children.scroll == 'None'){
					style.overflow='hidden hidden'
				}else if(overflow.children.scroll=='Y'){
					style.overflow='hidden scroll'
				}else if(overflow.children.scroll=='X'){
					style.overflow='scroll hidden'
				}else if(overflow.children.scroll=='XY'){
					style.overflow='scroll scroll'
				}
				if(overflow.children.flex=='Wrap'){
					style.flexWrap='wrap'
				}
				if(overflow.children.alignContent!='normal'){
					style.alignContent=overflow.children.alignContent
				}
				if(this.propForm.domSettings.domType){
					block.domType=this.propForm.domSettings.domType
				}
				// 实时预览
				// block.properties={
				// 	"attr-value":'预留功能'
				// }
				block.style = style;
			},
			borderChange() {
				let border = this.propForm.common.border
				let origin = {
					...border.visible
				}
				border.visible.top = true
				border.visible.bottom = true
				border.visible.left = true
				border.visible.right = true
				this.$nextTick(() => {
					border.visible = {
						...origin
					}
				})
			}
		},
		watch: {
			currentId: {
				handler(id) {
					if(id==null){
						this.propForm=null
						this.currentBlock=null
						return
					}
					let block = this.context.findBlockById(id);
					this.currentBlock = block;
					this.fromBlock(block);
				}
			},
			propForm: {
				handler(val) {
					if (this.currentBlock) {
						this.toBlock(this.currentBlock)
						this.context.tempSave()
					}
				},
				deep: true
			}
		}
	}
</script>

<style lang="less">
	.PropertiesPanel {
		width: 320px;
		flex-shrink: 0;
		height: 100%;
		background-color: #f3f3f3;
		border-left: #999999 1px solid;
		padding: 10px;
		box-sizing: border-box;
		user-select: none;
		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 0 !important
		}

		h4 {
			line-height: unset;
			margin: 0;
			margin-left: 3px;
			margin-bottom: 10px;
			padding-top: 10px;
			margin-top: 10px;
			padding-bottom: 10px;
			text-align: left;
			padding-left: 10px;
			border-bottom: #cccccc 1px solid;
			background-color: white;
		}
	}


	.propTable {
		font-size: 12px;
		line-height: 12px;

		input,
		select {
			line-height: 12px;
			width: 100%;
			box-sizing: border-box;
			user-select: all;
		}

		td {
			border: none;
		}

		tr {
			border-bottom: #e6e6e6 1px solid;
		}

		&.firstColumnFixed>tr>td:first-child {
			vertical-align: middle;
			word-break: keep-all;
			white-space: nowrap;
			width: 60px;
		}
	}

	.el-tabs__header {
		margin: 0;
	}

	.el-checkbox__label {
		color: #9aa5c0;
		font-size: 12px;
	}
</style>
