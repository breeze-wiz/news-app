"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      // 新闻标题
      content: "",
      // 新闻内容
      author: "",
      // 作者
      publishTime: "",
      // 发布时间
      loading: true
      // 加载状态
    };
  },
  onLoad: function(e) {
    console.log("详情页新闻ID:", e.newsid);
    common_vendor.index.showLoading({
      title: "加载中..."
    });
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + e.newsid,
      method: "GET",
      success: (res) => {
        console.log("详情页数据:", res.data);
        this.title = res.data.title || "无标题";
        this.content = res.data.content || "暂无内容";
        this.author = res.data.author_name || "未知作者";
        this.publishTime = res.data.published_at || res.data.created_at;
        this.loading = false;
        common_vendor.index.hideLoading();
      },
      fail: (err) => {
        console.error("详情请求失败:", err);
        common_vendor.index.showToast({
          title: "加载失败，请重试",
          icon: "none"
        });
        this.loading = false;
        common_vendor.index.hideLoading();
      }
    });
  },
  methods: {
    // 时间格式化函数 - 和首页保持一致
    formatTime(timeStr) {
      if (!timeStr)
        return "未知时间";
      try {
        let date;
        if (typeof timeStr === "string") {
          const normalizedStr = timeStr.replace(/-/g, "/");
          date = new Date(normalizedStr);
        } else {
          date = new Date(timeStr);
        }
        if (isNaN(date.getTime())) {
          return "未知时间";
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      } catch (e) {
        console.error("时间格式化错误:", e);
        return "未知时间";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: common_vendor.t($data.author || "未知作者"),
    c: common_vendor.t($options.formatTime($data.publishTime)),
    d: $data.content,
    e: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
