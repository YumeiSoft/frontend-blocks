<template>
  <div class="LayoutPanel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="图层" name="first">
        <el-tree
          ref="eltree"
          :data="[context.tabBlocks[context.currentTab]]"
          :props="{
            label: 'id',
            children: 'blocks',
          }"
          node-key="id"
          :default-expand-all="false"
          :expand-on-click-node="false"
          @node-click="nodeClick"
          :allow-drag="allowDrag"
          :render-content="renderContent"
          :default-expanded-keys="expandedList"
          :highlight-current="true"
          @node-drop="dropSuccess"
          @node-expand="nodeExpand"
          @node-collapse="nodeCollapse"
          draggable
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane
        v-if="context.currentBlock != null"
        label="在内部插入"
        name="second"
      >
        <div v-for="(item, i) in tools" v-bind:key="i">
          <el-button
            type="primary"
            style="width: 100%"
            @click="insertTool(item)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    activeName: "first",
    currentBlock: null,
    tools: [],
    expandedList: ["root"],
  }),
  props: ["context", "currentId"],
  methods: {
    nodeClick(node) {
      this.context.currentBlock = node.id;
    },
    allowDrag(draggingNode) {
      return draggingNode.data.id != "root";
    },
    addChild(data) {
      this.context.addMiddle(this.context.findBlockById(data.id));
    },
    renderContent(h, { node, data, store }) {
      return (
        <div style="display:flex;flex-direction:row;line-height:30px;justify-content: space-between; width:100%">
          <div>{node.label}</div>
          <a
            href="#"
            on-click={() => this.addChild(data)}
            style="color:#86cef1;font-size:12px;"
          >
            添加
          </a>
        </div>
      );
    },
    insertTool(item) {
      let context = this.context;
      let toPaste = context.findBlockById(context.currentBlock);
      let toCopy = JSON.parse(JSON.stringify(item.blocks));
      context.autoRenameNewBlocks(toCopy);
      toPaste.blocks.push(toCopy);
    },
    nodeExpand(data) {
      let parent = data;
      while (parent.id != "root") {
        parent = this.context.findParent(parent);
        if (this.expandedList.indexOf(parent.id) == -1) {
          this.expandedList.push(parent.id);
        }
        console.log(parent.id);
      }
      this.$nextTick(() => {
        this.$refs.eltree.setCurrentKey(data.id);
      });
      console.log(this.expandedList);
    },
    nodeCollapse(data) {
      if (this.expandedList.indexOf(data.id) != -1) {
        this.expandedList.splice(this.expandedList.indexOf(data.id), 1);
        let parent = this.context.findBlockById(data.id);
        if (parent.blocks && parent.blocks.length > 0) {
          for (let childIdx in parent.blocks) {
            this.nodeCollapse(parent.blocks[childIdx]);
          }
        }
      }
    },
    dropSuccess() {},
  },
  watch: {
    currentId: {
      handler(id) {
        let block = this.context.findBlockById(id);
        this.currentBlock = block;
        this.nodeExpand(block);
      },
    },
  },
  created() {
    axios.get("./tools.json").then((res) => {
      this.tools = res.data.tools;
    });
  },
};
</script>

<style lang="less">
.LayoutPanel {
  width: 320px;
  flex-shrink: 0;
  height: 100%;
  background-color: #ffffff;
  border-right: #f3f3f3 1px solid;
  border-left: #999999 1px solid;
  padding: 10px;
  box-sizing: border-box;
  user-select: none;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
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

  &.firstColumnFixed > tr > td:first-child {
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
