// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '笔记',
    link: '/note/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的 
      { text: '《单片机》笔记', link: '/note/mcu/' },
      { text: '《SIMetrix-SIMPLIS》笔记', link: '/note/simetrix/' },
      { text: '《WinForm》笔记',link: '/note/WinForm/',},
      { text: '《逻辑英语》笔记',link: '/note/LogicalEnglish/',},
    ],
  },
  {
    text: '技术',
    link: '/technology/',
    items: [
      { text: '技术文档', link: '/pages/9a7ee40fc232253e/' },
      { text: '电源文集', link: '/pages/pfc20211027221400/' },
    ],
  },
  {
    text: '更多',
    link: '/more/',
    items: [
      { text: '后期调色笔记', link: '/pages/20220418223000/' },
      { text: '实用技巧', link: '/pages/20220315090000/' },
      { text: '友情链接', link: '/friends/' },
    ],
  },
  { text: '关于', link: '/about/' },
  {
    text: '书签',
    link: '/pages/beb6c0bd8a66cea6/',
  },
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
]
