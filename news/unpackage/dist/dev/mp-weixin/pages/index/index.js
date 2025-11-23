"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: []
    };
  },
  onLoad: function() {
    common_vendor.index.showLoading({
      title: "加载中...."
    });
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news",
      method: "GET",
      success: (res) => {
        console.log("首页数据:", res.data);
        this.news = res.data;
        common_vendor.index.hideLoading();
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
        common_vendor.index.hideLoading();
      }
    });
  },
  methods: {
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
    },
    openinfo(e) {
      const newsid = e.currentTarget.dataset.newsid;
      console.log("跳转到详情页，新闻ID:", newsid);
      common_vendor.index.navigateTo({
        url: "../info/info?newsid=" + newsid
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.news, (item, index, i0) => {
      return {
        a: item.cover || "/static/default-news.png",
        b: common_vendor.t(item.title),
        c: common_vendor.t($options.formatTime(item.published_at || item.created_at)),
        d: common_vendor.t(item.author_name || "未知作者"),
        e: index,
        f: common_vendor.o((...args) => $options.openinfo && $options.openinfo(...args), index),
        g: item.post_id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
