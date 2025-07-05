import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "口袋数字电源",
  description: "口袋数字电源",

  theme,
  
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});


