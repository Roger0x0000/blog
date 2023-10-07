import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "电源知识搬运",
  description: "电源知识搬运",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
