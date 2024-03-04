import{_ as d}from"./LED-02de1c83.js";import{_ as a}from"./GPIO-bff48e98.js";import{_ as v}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as u,d as c,e,w as s,a as i,b as l,f as m}from"./app-4799cfad.js";const b="/blog/assets/blog_image/TMS320F28035/KEY.png",o={},_=i("h1",{id:"c2000的gpio-key实例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#c2000的gpio-key实例","aria-hidden":"true"},"#"),l(" C2000的GPIO-KEY实例")],-1),p=i("p",null,"本节演示如何通过一个按键控制一个LED。",-1),G=i("ul",null,[i("li",null,"相关的IO：")],-1),f=i("img",{src:d},null,-1),P=i("img",{src:b},null,-1),h=i("ul",null,[i("li",null,"相关的GPIO寄存器：")],-1),D=i("img",{src:a},null,-1),I=m(`<p>将LED工程中的main.c改为以下内容（增加按键相关的代码）。</p><details class="hint-container details"><summary>详情</summary><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>

#include &quot;DSP28x_Project.h&quot;
#include &quot;DSP2803x_Gpio.h&quot;


/********************************** LED **********************************/
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

/********************************** KEY **********************************/

#define KEY_S100_MUX     GpioCtrlRegs.GPAMUX2.bit.GPIO27
#define KEY_S100_DIR     GpioCtrlRegs.GPADIR.bit.GPIO27
#define KEY_S100_PUD     GpioCtrlRegs.GPAPUD.bit.GPIO27
#define KEY_S100_DAT()   GpioDataRegs.GPADAT.bit.GPIO27


//
// Gpio_select - Sets the gpios functionality
//
void Gpio_select(void)
{
    //Set the EALLOW bit to allow modification to GPBMUX1 and GPBDIR.
    EALLOW;

    //LED GPIO

    //Configure this pin as:general purpose I/O
    GpioCtrlRegs.GPBMUX1.bit.GPIO41 = 0;
    GpioCtrlRegs.GPBMUX1.bit.GPIO34 = 0;
    GpioCtrlRegs.GPBMUX1.bit.GPIO43 = 0;

    //Configures the GPIO pin as an output
    GpioCtrlRegs.GPBDIR.bit.GPIO41 = 1;
    GpioCtrlRegs.GPBDIR.bit.GPIO34 = 1;
    GpioCtrlRegs.GPBDIR.bit.GPIO43 = 1;



    //KEY GPIO

    //Configure this pin as:general purpose I/O
    KEY_S100_MUX = 0;
    //Configures the GPIO pin as an input
    KEY_S100_DIR = 0;
    //Disable the internal pullup on the specified pin
    KEY_S100_PUD = 0;
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


        LED_D401_TOGGLE();
        DELAY_US(100000);// us
        LED_D402_TOGGLE();
        DELAY_US(100000);// us

        if(0 == KEY_S100_DAT())
        {
            LED_D400_TOGGLE();
        }


    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li>实验现象：按键按下时，LED_D400会闪烁。</li></ul>`,3);function E(O,g){const n=r("center");return t(),u("div",null,[_,p,c(" more "),G,e(n,null,{default:s(()=>[f,e(n,null,{default:s(()=>[l(" LED GPIO ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[P,e(n,null,{default:s(()=>[l(" KEY GPIO ")]),_:1})]),_:1}),h,e(n,null,{default:s(()=>[D,e(n,null,{default:s(()=>[l(" GPIO寄存器 ")]),_:1})]),_:1}),I])}const T=v(o,[["render",E],["__file","16.C2000的GPIO-KEY实例.html.vue"]]);export{T as default};
