<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
	export default {
		data(){
			return {}
		}
	}
</script>

<style lang="less">
	#app{
		width: 100%;
		height: 100%;
		padding: 0px;
		margin: 0px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
</style>