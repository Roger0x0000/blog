// head
module.exports = [
  // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  ['link', { rel: 'icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
  [
    'meta',
    {
      name: 'keywords',
      content: '电源博客,个人技术博客,MCU,技术文档,学习,DSC,python,C#,git,github,markdown',
    },
  ],
  ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc' }], // 百度统计的站长验证
  ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
  ['link', {rel:'stylesheet', href:'https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css'}],
  ['link', {rel:'stylesheet', href:'https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.css'}],
  ['script', {src: 'https://github.com/markdown-it/markdown-it/blob/master/bin/markdown-it.js'}],
  ['script', {src: 'https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.js'}],
  ['script', {src: 'https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js'}],
  [
    'script',
    {
      'data-ad-client': 'ca-pub-7828333725993554',
      async: 'async',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    },
  ], // 网站关联Google AdSense 与 html格式广告支持
]
