import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as d,d as c,a as i,b as s,e as n,w as l,f as u}from"./app-1990fe92.js";const _="/blog/assets/blog_image/NXP_DSC/CodeWarrior_Download1.png",g="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools.png",m="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools_1.png",p="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools_2.png",v="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools_3.png",b="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools_4.png",f="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools_5.png",h="/blog/assets/blog_image/NXP_DSC/MCUXpressoConfigTools_6.png",C="/blog/assets/blog_image/NXP_DSC/SDK1.png",P="/blog/assets/blog_image/NXP_DSC/projects1.png",D="/blog/assets/blog_image/NXP_DSC/projects2.png",S="/blog/assets/blog_image/NXP_DSC/projects3.png",X="/blog/assets/blog_image/NXP_DSC/projects4.png",x="/blog/assets/blog_image/NXP_DSC/projects5.png",N="/blog/assets/blog_image/NXP_DSC/projects6.png",w="/blog/assets/blog_image/NXP_DSC/projects7.png",T="/blog/assets/blog_image/NXP_DSC/projects8.png",I="/blog/assets/blog_image/NXP_DSC/PORT_JTAG.png",M="/blog/assets/blog_image/NXP_DSC/Update_JTAG3.png",U="/blog/assets/blog_image/NXP_DSC/Update_JTAG2.png",k="/blog/assets/blog_image/NXP_DSC/Update_JTAG.png",j="/blog/assets/blog_image/NXP_DSC/Programmer1.png",y="/blog/assets/blog_image/NXP_DSC/Programmer2.png",G="/blog/assets/blog_image/NXP_DSC/Programmer3.png",K="/blog/assets/blog_image/NXP_DSC/Programmer4.png",O={},z=i("h1",{id:"nxp的dsc-mc56f83783新建工程示例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#nxp的dsc-mc56f83783新建工程示例","aria-hidden":"true"},"#"),s(" NXP的DSC_MC56F83783新建工程示例")],-1),q=i("p",null,"本文主要演示MCUXpresso Config Tools、CodeWarrior和PROGDSC - Flash Programmer的简单使用。",-1),A=i("h2",{id:"一、codewarrior-11-1-安装",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#一、codewarrior-11-1-安装","aria-hidden":"true"},"#"),s(" 一、CodeWarrior 11.1 安装")],-1),B={href:"https://www.nxpic.org.cn/module/forum/thread-621195-1-1.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.nxpic.org.cn/module/forum/thread-621298-1-1.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://nxp.flexnetoperations.com/control/frse/download?agree=Accept&element=10623377",target:"_blank",rel:"noopener noreferrer"},W=i("img",{src:_},null,-1),F=i("h2",{id:"二、mcuxpresso-config-tools-安装",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#二、mcuxpresso-config-tools-安装","aria-hidden":"true"},"#"),s(" 二、MCUXpresso Config Tools 安装")],-1),J=i("ul",null,[i("li",null,"获取SDK包")],-1),V={href:"https://www.nxp.com/design/software/development-software/mcuxpresso-software-and-tools-/mcuxpresso-config-tools-pins-clocks-peripherals:MCUXpresso-Config-Tools",target:"_blank",rel:"noopener noreferrer"},L=i("img",{src:g},null,-1),H={href:"https://mcuxpresso.nxp.com/",target:"_blank",rel:"noopener noreferrer"},Q=i("ul",null,[i("li",null,"选择开发板")],-1),Y=i("img",{src:m},null,-1),Z=i("ul",null,[i("li",null,"选择处理器或者套件")],-1),$=i("img",{src:p},null,-1),ii=i("ul",null,[i("li",null,"构建 MCUXpresso SDK")],-1),ni=i("img",{src:v},null,-1),ei=u('<ul><li>下载SDK</li></ul><figure><img src="'+b+'" alt="下载SDK" tabindex="0" loading="lazy"><figcaption>下载SDK</figcaption></figure><figure><img src="'+f+'" alt="下载SDK" tabindex="0" loading="lazy"><figcaption>下载SDK</figcaption></figure><figure><img src="'+h+'" alt="下载SDK" tabindex="0" loading="lazy"><figcaption>下载SDK</figcaption></figure><ul><li>将下载的SDK解压到电脑中。</li></ul><figure><img src="'+C+'" alt="下载SDK" tabindex="0" loading="lazy"><figcaption>下载SDK</figcaption></figure><h2 id="三、新建工程" tabindex="-1"><a class="header-anchor" href="#三、新建工程" aria-hidden="true">#</a> 三、新建工程</h2><ul><li>打开MCUXpresso Config Tools v12软件，创建一个人基于SDK实例</li></ul><figure><img src="'+P+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>设置路径和工程名称</li></ul><figure><img src="'+D+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>关闭和更新源代码</li></ul><figure><img src="'+S+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>打开引脚界面（工具--&gt;引脚），设置RE0、RE1和RE2为输出</li></ul><figure><img src="'+X+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>更新源代码</li></ul><figure><img src="'+x+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>在CodeWarrior中导入工程</li></ul><figure><img src="'+N+`" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>编写代码</li></ul><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>
/*
 * Copyright (c) 2013 - 2015, Freescale Semiconductor, Inc.
 * Copyright 2016-2017 NXP
 * All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

#include &quot;fsl_device_registers.h&quot;

#include &quot;pin_mux.h&quot;
#include &quot;clock_config.h&quot;
#include &quot;peripherals.h&quot;

#include &quot;board.h&quot;
#include &quot;fsl_gpio.h&quot;
/*******************************************************************************
 * Definitions
 ******************************************************************************/

/*******************************************************************************
 * Prototypes
 ******************************************************************************/

/*******************************************************************************
 * Code
 ******************************************************************************/
/*!
 * @brief Main function
 */

int main(void)
{
    int i,j,k;
    /* Init board hardware. */
    BOARD_InitBootPins();
    BOARD_InitBootClocks();
    BOARD_InitBootPeripherals();

    /* Add user initialization code */

    __EI(0);

    /* Add user custom codes below */

    while (1)
    {
        for(i=0;i&lt;1000;i++)
        {
            for(j=0;j&lt;1000;j++)
            {
                
            }
        }
        GPIO_PinToggle(GPIOE,kGPIO_Pin1);
        GPIO_PinClear(GPIOE,kGPIO_Pin0);
        for(i=0;i&lt;1000;i++)
        {
            for(j=0;j&lt;1000;j++)
            {
                
            }
        }
        GPIO_PinSet(GPIOE,kGPIO_Pin0);
    }
}



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>烧录和仿真代码</li></ul><figure><img src="`+w+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><ul><li>测试结果</li></ul><figure><img src="'+T+'" alt="新建工程" tabindex="0" loading="lazy"><figcaption>新建工程</figcaption></figure><h2 id="三、仿真器使用说明" tabindex="-1"><a class="header-anchor" href="#三、仿真器使用说明" aria-hidden="true">#</a> 三、仿真器使用说明</h2><ul><li>仿真器调试接口</li></ul>',27),li=i("img",{src:I},null,-1),si=i("ul",null,[i("li",null,"仿真器")],-1),oi=i("img",{src:M},null,-1),ri=i("p",null,"仿真器如果提示升级，需要将J5进行短路。",-1),ai=i("img",{src:U},null,-1),ti=i("img",{src:k},null,-1),di=i("h2",{id:"四、progdsc-flash-programmer使用说明",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#四、progdsc-flash-programmer使用说明","aria-hidden":"true"},"#"),s(" 四、PROGDSC - Flash Programmer使用说明")],-1),ci=i("img",{src:j},null,-1),ui=i("img",{src:y},null,-1),_i=i("img",{src:G},null,-1),gi=i("img",{src:K},null,-1);function mi(pi,vi){const o=r("ExternalLinkIcon"),e=r("center");return t(),d("div",null,[z,q,c(" more "),A,i("p",null,[i("a",B,[s("CodeWarrior 11.1 安装 参考链接1"),n(o)])]),i("p",null,[i("a",E,[s("CodeWarrior 11.1 安装 参考链接2"),n(o)])]),i("p",null,[i("a",R,[s("CodeWarrior 下载链接"),n(o)])]),n(e,null,{default:l(()=>[W,n(e,null,{default:l(()=>[s(" 下载链接 ")]),_:1})]),_:1}),F,J,i("p",null,[i("a",V,[s("MCUXpresso Config Tools 链接"),n(o)])]),n(e,null,{default:l(()=>[L,n(e,null,{default:l(()=>[s(" 下载链接 ")]),_:1})]),_:1}),i("p",null,[i("a",H,[s("MCUXpresso SDK包的链接"),n(o)])]),Q,n(e,null,{default:l(()=>[Y,n(e,null,{default:l(()=>[s(" 选择开发板 ")]),_:1})]),_:1}),Z,n(e,null,{default:l(()=>[$]),_:1}),ii,n(e,null,{default:l(()=>[ni]),_:1}),ei,n(e,null,{default:l(()=>[li]),_:1}),si,n(e,null,{default:l(()=>[oi]),_:1}),ri,n(e,null,{default:l(()=>[ai]),_:1}),n(e,null,{default:l(()=>[ti]),_:1}),di,n(e,null,{default:l(()=>[ci,n(e,null,{default:l(()=>[s(" 选择器件型号 ")]),_:1})]),_:1}),n(e,null,{default:l(()=>[ui,n(e,null,{default:l(()=>[s(" 选择器件型号的文件 ")]),_:1})]),_:1}),n(e,null,{default:l(()=>[_i,n(e,null,{default:l(()=>[s(" 导入烧录文件 ")]),_:1})]),_:1}),n(e,null,{default:l(()=>[gi,n(e,null,{default:l(()=>[s(" 烧录软件 ")]),_:1})]),_:1})])}const hi=a(O,[["render",mi],["__file","14.NXP的DSC_MC56F83783新建工程示例.html.vue"]]);export{hi as default};
