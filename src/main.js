import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './global.less';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('v-icon', Icon);
Vue.use(ElementUI);
Vue.component('vue-draggable-resizable', VueDraggableResizable)

// 输入正整数的指令
Vue.directive('enterInteger', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
              e.preventDefault();
          }else{
              e.returnValue = false;
          }                            
      }
    });
  }
});


// 引入组件
const requireComponent = require.context(
	// 其组件目录的相对路径
	"./components",
	// 是否查询其子目录
	true,
	// 匹配基础组件文件名的正则表达式
	/[A-Za-z0-9_]+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName);

	// 获取组件的 PascalCase 命名
	const componentName = fileName
		.split("/")
		.pop()
		.replace(/\.\w+$/, "");

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	);
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
