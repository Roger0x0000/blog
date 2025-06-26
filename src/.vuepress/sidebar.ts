import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
        text: "如何使用",
        icon: "laptop-code",
        prefix: "demo/",
        link: "demo/",
        children: "structure",
    },
    {
        text: "文章",
        icon: "book",
        prefix: "posts/",
        children: [
            {
                text: "苹果",
                icon: "gear",
                prefix: "apple/",
                collapsible: true,
                children: "structure"
            },
            {
                text: "香蕉",
                icon: "gear",
                prefix: "banana/",
                collapsible: true,
                children: "structure"
            },
        ],
    },
    {
        text: "项目 projects",
        icon: "star",
        collapsible: true,
        expanded: true,
        children: [
            {
                text: "弦月档案",
                icon: "link",
                link: "https://twis.uk/yisibite",
            },
            {
                text: "线代笔记",
                icon: "link",
                link: "https://twis.uk/Notes-on-Linear-Algebra"
            }
        ],
    }
  ],
});
