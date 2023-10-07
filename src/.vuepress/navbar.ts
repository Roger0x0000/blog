import { navbar } from "vuepress-theme-hope";
//  /article/

export default navbar([
  "/",
  {
    text: "文章列表",
    icon: "book",
    link: "/article/",
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/", 
  },
]);
