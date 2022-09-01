<template>
  <el-dialog title="代码预览" :visible.sync="visible" width="70%" @close="onClose">
    <div class="root">
      <div class="codePanel">
        <textarea class="codeArea">{{code}}</textarea>
      </div>
      <div class="buttonBar">
        <div class="closeBtn" @click="onClose">关闭</div>
        <div class="saveBtn" @click="onSave">保存</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: () => ({
  }),
  props: ['visible','onClose','onSave','code'],
  methods: {
  },
};
</script>

<style scoped>
.root {
  box-sizing: border-box;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  display: flex;
  position: relative;
  width: 100%;
  height: 600px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.codePanel {
  box-sizing: border-box;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.codeArea {
  box-sizing: border-box;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden scroll;
}
.buttonBar {
  box-sizing: border-box;
  border: 1px solid rgba(207, 207, 207, 1);
  border-top: 1px solid rgba(207, 207, 207, 1);
  border-bottom: none;
  border-left: none;
  border-right: none;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.closeBtn {
  box-sizing: border-box;
  background-color: rgba(159, 159, 159, 1);
  border-radius: 100px;
  font-weight: normal;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px;
  margin: 0px 20px 0px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.saveBtn {
  box-sizing: border-box;
  background-color: rgba(68, 125, 56, 1);
  border-radius: 100px;
  font-weight: normal;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>