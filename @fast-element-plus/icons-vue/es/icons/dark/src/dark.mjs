import { defineComponent, createVNode, mergeProps } from "vue";
import { ElIcon } from "element-plus";
const DarkTSX = /* @__PURE__ */ defineComponent({
  name: "Dark",
  components: {
    ElIcon
  },
  setup(_, {
    attrs
  }) {
    return {
      attrs
    };
  },
  render() {
    return createVNode(ElIcon, mergeProps(this.attrs, {
      "class": "fa-icon fa-icon-Dark icon"
    }), {
      default: () => [createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024"
      }, [createVNode("path", {
        "d": "M593.054 120.217C483.656 148.739 402.91 248.212 402.91 366.546c0 140.582 113.962 254.544 254.544 254.544 118.334 0 217.808-80.746 246.328-190.144C909.17 457.12 912 484.23 912 512c0 220.914-179.086 400-400 400S112 732.914 112 512s179.086-400 400-400c27.77 0 54.88 2.83 81.054 8.217z"
      }, null)])]
    });
  }
});
export {
  DarkTSX as default
};
//# sourceMappingURL=dark.mjs.map
