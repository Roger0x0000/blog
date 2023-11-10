import{_ as a}from"./GPIO-bff48e98.js";import{_ as t}from"./LED-02de1c83.js";import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as v,c,d as o,e,w as l,a as i,b as s,f as d}from"./app-02156c45.js";const m="/blog/assets/blog_image/TMS320F28035/寄存器编程模型比较.png",b="/blog/assets/blog_image/TMS320F28035/driverlib.png",_="/blog/assets/blog_image/TMS320F28035/BitField.png",p="/blog/assets/blog_image/TMS320F28035/Oscillator1.png",g="/blog/assets/blog_image/TMS320F28035/ClockAndResetDomains.png",h="/blog/assets/blog_image/TMS320F28035/PLLSettings.png",f="/blog/assets/blog_image/TMS320F28035/C2000_1.png",O="/blog/assets/blog_image/TMS320F28035/Variables.png",D="/blog/assets/blog_image/TMS320F28035/IncludeOptions.png",G="/blog/assets/blog_image/TMS320F28035/FileSearchPath.png",L="/blog/assets/blog_image/TMS320F28035/AddFiles.png",P={},T=i("h1",{id:"c2000的gpio-led实例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#c2000的gpio-led实例","aria-hidden":"true"},"#"),s(" C2000的GPIO-LED实例")],-1),S=i("p",null,"本节演示如何使用TMS320F28035-GPIO翻转三个GPIOB的LED。",-1),I=i("h2",{id:"寄存器",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#寄存器","aria-hidden":"true"},"#"),s(" 寄存器")],-1),E=i("p",null,"C2000寄存器的访问支持三种模式：",-1),C=i("ul",null,[i("li",null,"直接访问"),i("li",null,"Bit Field Header Files （位域操作）"),i("li",null,"Driverlib（库文件操作）")],-1),R=i("img",{src:m},null,-1),F=i("p",null,[i("strong",null,"Driverlib 目前只支持以下型号，不支持TMS320F28035")],-1),q=i("img",{src:b},null,-1),x=i("p",null,[i("strong",null,"TMS320F28035常使用Bit Field Header Files 的方式操作寄存器")],-1),A=i("img",{src:_},null,-1),B=i("ul",null,[i("li",null,"GPIOB相关的寄存器：")],-1),M=i("img",{src:a},null,-1),N=i("ul",null,[i("li",null,"LED相关的IO：")],-1),U=i("img",{src:t},null,-1),k=i("ul",null,[i("li",null,"时钟树和外设时钟")],-1),y=i("img",{src:p},null,-1),$=i("blockquote",null,[i("p",null,"开启内部时钟源1、关闭内部时钟源2、关闭外部时钟源和关闭外部晶体振荡器；")],-1),z=i("img",{src:g},null,-1),V=i("img",{src:h},null,-1),Y=i("blockquote",null,[i("p",null,"SYSCLKOUT = 10MHz*12/2=60MHz")],-1),H=i("h2",{id:"新建工程示例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#新建工程示例","aria-hidden":"true"},"#"),s(" 新建工程示例")],-1),W=i("ul",null,[i("li",null,[i("strong",null,"新建工程")])],-1),w=i("img",{src:f},null,-1),Q=d(`<ul><li><strong>新建变量名</strong></li></ul><blockquote><p>Build--&gt;Variables</p></blockquote><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>Name:  INSTALLROOT_2803x
Type:  Directory
Value: \${PROJECT_ROOT}/../C2000Ware/device_support/f2803x

Name:  INSTALLROOT_IQMATH
Type:  Directory
Value: \${PROJECT_ROOT}/../C2000Ware/libraries/math/IQmath/c28

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),J=i("img",{src:O},null,-1),X=d(`<ul><li><strong>设置头文件的路径</strong></li></ul><p>C2000 Compiler --&gt; Include Options</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>/* Add &lt;dir&gt; */

\${PROJECT_ROOT}

&quot;\${CG_TOOL_ROOT}/include&quot;

&quot;\${INSTALLROOT_2803x}/headers/include&quot;

&quot;\${INSTALLROOT_2803x}/common/include&quot;

&quot;\${INSTALLROOT_IQMATH}/include&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),K=i("img",{src:D},null,-1),j=d(`<p>C2000 Linker --&gt; File Search Path</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>
/* include library file */
libc.a
&quot;rts2800_ml.lib&quot;
&quot;IQmath.lib&quot;

/* Add &lt;dir&gt; */
&quot;\${CG_TOOL_ROOT}/lib&quot;
&quot;\${CG_TOOL_ROOT}/include&quot;
&quot;\${PROJECT_ROOT}&quot;
&quot;\${INSTALLROOT_IQMATH}/lib&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Z=i("img",{src:G},null,-1),ii=i("ul",null,[i("li",null,[i("strong",null,"从C2000Ware的device_support和libraries中，添加相关文件。")])],-1),ni=i("img",{src:L},null,-1),ei=d(`<ul><li><strong>main.c代码：</strong></li></ul><blockquote><p>开启内部时钟源1、关闭内部时钟源2、关闭外部时钟源和关闭外部晶体振荡器；</p></blockquote><blockquote><p>SYSCLKOUT = 10MHz*12/2=60MHz</p></blockquote><details class="hint-container details"><summary>详情</summary><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>


#include &quot;DSP28x_Project.h&quot;
#include &quot;DSP2803x_Gpio.h&quot;

//Writing a 1 forces the respective output data latch to toggle from its current state
#define LED_D400_TOGGLE()   GpioDataRegs.GPBTOGGLE.bit.GPIO41 = 1
//Writing a 1 forces the respective output data latch to low.
#define LED_D400_ON()       GpioDataRegs.GPBCLEAR.bit.GPIO41 = 1
//Writing a 1 forces the respective output data latch to high.
#define LED_D400_OFF()      GpioDataRegs.GPBSET.bit.GPIO41 = 1


#define LED_D401_TOGGLE()   GpioDataRegs.GPBTOGGLE.bit.GPIO34 = 1
#define LED_D401_ON()       GpioDataRegs.GPBCLEAR.bit.GPIO34 = 1
#define LED_D401_OFF()      GpioDataRegs.GPBSET.bit.GPIO34 = 1



#define LED_D402_TOGGLE()   GpioDataRegs.GPBTOGGLE.bit.GPIO43 = 1
#define LED_D402_ON()       GpioDataRegs.GPBCLEAR.bit.GPIO43 = 1
#define LED_D402_OFF()      GpioDataRegs.GPBSET.bit.GPIO43 = 1



//
// Gpio_select - Sets the gpios functionality
//
void Gpio_select(void)
{
    //Set the EALLOW bit to allow modification to GPBMUX1 and GPBDIR.
    EALLOW;

    //Configure this pin as:general purpose I/O
    GpioCtrlRegs.GPBMUX1.bit.GPIO41 = 0;
    GpioCtrlRegs.GPBMUX1.bit.GPIO34 = 0;
    GpioCtrlRegs.GPBMUX1.bit.GPIO43 = 0;

    //Configures the GPIO pin as an output
    GpioCtrlRegs.GPBDIR.bit.GPIO41 = 1;
    GpioCtrlRegs.GPBDIR.bit.GPIO34 = 1;
    GpioCtrlRegs.GPBDIR.bit.GPIO43 = 1;

    //Clear the EALLOW bit.
    EDIS;
}
/**
 * main.c
 */
int main(void)
{
    //
    // Step 1. Initialize System Control:
    // PLL, WatchDog, enable Peripheral Clocks
    // This example function is found in the DSP2803x_SysCtrl.c file.
    //
    InitSysCtrl();

    //
    // Step 2. Initialize GPIO:
    // This example function is found in the DSP2803x_Gpio.c file and
    // illustrates how to set the GPIO to it&#39;s default state.
    //
    // InitGpio();  // Skipped for this example

    //
    // For this example use the following configuration:
    //
    Gpio_select();

    //
    // Step 3. Clear all interrupts and initialize PIE vector table:
    // Disable CPU interrupts
    //
    DINT;

    //
    // Initialize PIE control registers to their default state.
    // The default state is all PIE interrupts disabled and flags
    // are cleared.
    // This function is found in the DSP2803x_PieCtrl.c file.
    //
    InitPieCtrl();

    //
    // Disable CPU interrupts and clear all CPU interrupt flags:
    //
    IER = 0x0000;
    IFR = 0x0000;

    //
    // Initialize the PIE vector table with pointers to the shell Interrupt
    // Service Routines (ISR).
    // This will populate the entire table, even if the interrupt
    // is not used in this example.  This is useful for debug purposes.
    // The shell ISR routines are found in DSP2803x_DefaultIsr.c.
    // This function is found in DSP2803x_PieVect.c.
    //
    InitPieVectTable();
    // Copy time critical code and Flash setup code to RAM
    // The  RamfuncsLoadStart, RamfuncsLoadSize, and RamfuncsRunStart
    // symbols are created by the linker. Refer to the F28035v1.cmd file.

    //memcpy(&amp;RamfuncsRunStart, &amp;RamfuncsLoadStart, (Uint32)&amp;RamfuncsLoadSize);

    //
    // Step 4. Initialize all the Device Peripherals:
    // Not required for this example
    //

    //
    // Step 5. User specific code:
    //
    for(;;)
    {
#if 0
        LED_D400_ON();
        DELAY_US(100000);// us
        LED_D401_ON();
        DELAY_US(100000);// us
        LED_D402_ON();
        DELAY_US(100000);// us

        LED_D400_OFF();
        DELAY_US(100000);// us
        LED_D401_OFF();
        DELAY_US(100000);// us
        LED_D402_OFF();
        DELAY_US(100000);// us

#else
        LED_D400_TOGGLE();
        DELAY_US(100000);// us
        LED_D401_TOGGLE();
        DELAY_US(100000);// us
        LED_D402_TOGGLE();
        DELAY_US(100000);// us
#endif
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li><strong>实验现象：三个LED闪烁。</strong></li></ul>`,5);function li(si,di){const n=r("center");return v(),c("div",null,[T,S,o(" more "),I,E,C,e(n,null,{default:l(()=>[R,e(n,null,{default:l(()=>[s(" 寄存器编程模型比较 ")]),_:1})]),_:1}),F,e(n,null,{default:l(()=>[q,e(n,null,{default:l(()=>[s(" Driverlib支持的芯片型号 ")]),_:1})]),_:1}),x,e(n,null,{default:l(()=>[A,e(n,null,{default:l(()=>[s(" Bit Field Header Files 路径 ")]),_:1})]),_:1}),B,e(n,null,{default:l(()=>[M,e(n,null,{default:l(()=>[s(" GPIO寄存器 ")]),_:1})]),_:1}),N,e(n,null,{default:l(()=>[U,e(n,null,{default:l(()=>[s(" LED GPIO ")]),_:1})]),_:1}),k,e(n,null,{default:l(()=>[y,e(n,null,{default:l(()=>[s(" 时钟树 ")]),_:1})]),_:1}),$,e(n,null,{default:l(()=>[z,e(n,null,{default:l(()=>[s(" 时钟和复位域 ")]),_:1})]),_:1}),e(n,null,{default:l(()=>[V,e(n,null,{default:l(()=>[s(" PLL设置 ")]),_:1})]),_:1}),Y,H,W,e(n,null,{default:l(()=>[w,e(n,null,{default:l(()=>[s(" 新建工程 ")]),_:1})]),_:1}),Q,e(n,null,{default:l(()=>[J,e(n,null,{default:l(()=>[s(" 新建变量名 ")]),_:1})]),_:1}),X,e(n,null,{default:l(()=>[K,e(n,null,{default:l(()=>[s(" 设置头文件的路径 ")]),_:1})]),_:1}),j,e(n,null,{default:l(()=>[Z,e(n,null,{default:l(()=>[s(" 设置头文件的路径 ")]),_:1})]),_:1}),ii,e(n,null,{default:l(()=>[ni,e(n,null,{default:l(()=>[s(" 添加相关文件 ")]),_:1})]),_:1}),ei])}const vi=u(P,[["render",li],["__file","15.C2000的GPIO-LED实例.html.vue"]]);export{vi as default};
