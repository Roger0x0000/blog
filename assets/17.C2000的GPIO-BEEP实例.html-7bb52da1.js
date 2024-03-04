import{_ as d}from"./LED_KEY-a7d16fae.js";import{_ as v}from"./GPIO-bff48e98.js";import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as u,d as c,e,w as s,a as i,b as l,f as b}from"./app-4799cfad.js";const m="/blog/assets/blog_image/TMS320F28035/Beep.png",o={},G=i("h1",{id:"c2000的gpio-beep实例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#c2000的gpio-beep实例","aria-hidden":"true"},"#"),l(" C2000的GPIO-BEEP实例")],-1),E=i("p",null,"本节主要记录C2000开发板的蜂鸣器和RGB的LED驱动。",-1),_=i("ul",null,[i("li",null,"相关的IO：")],-1),P=i("img",{src:d},null,-1),p=i("img",{src:m},null,-1),D=i("ul",null,[i("li",null,"相关的GPIO寄存器：")],-1),f=i("img",{src:v},null,-1),I=b(`<p>将LED工程中的main.c改为以下内容。</p><details class="hint-container details"><summary>详情</summary><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>
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

/******************************** RGB LED *********************************/
#define LED_RED_MUX        GpioCtrlRegs.GPAMUX1.bit.GPIO7
#define LED_RED_DIR        GpioCtrlRegs.GPADIR.bit.GPIO7
#define LED_RED_TOGGLE()   GpioDataRegs.GPATOGGLE.bit.GPIO7 = 1
#define LED_RED_ON()       GpioDataRegs.GPBCLEAR.bit.GPIO7 = 1
#define LED_RED_OFF()      GpioDataRegs.GPBSET.bit.GPIO7 = 1

#define LED_GREEN_MUX        GpioCtrlRegs.GPAMUX1.bit.GPIO9
#define LED_GREEN_DIR        GpioCtrlRegs.GPADIR.bit.GPIO9
#define LED_GREEN_TOGGLE()   GpioDataRegs.GPATOGGLE.bit.GPIO9 = 1
#define LED_GREEN_ON()       GpioDataRegs.GPACLEAR.bit.GPIO9 = 1
#define LED_GREEN_OFF()      GpioDataRegs.GPASET.bit.GPIO9 = 1

#define LED_BLUE_MUX        GpioCtrlRegs.GPAMUX1.bit.GPIO8
#define LED_BLUE_DIR        GpioCtrlRegs.GPADIR.bit.GPIO8
#define LED_BLUE_TOGGLE()   GpioDataRegs.GPATOGGLE.bit.GPIO8 = 1
#define LED_BLUE_ON()       GpioDataRegs.GPACLEAR.bit.GPIO8 = 1
#define LED_BLUE_OFF()      GpioDataRegs.GPASET.bit.GPIO8 = 1


/********************************** KEY **********************************/

#define KEY_S100_MUX     GpioCtrlRegs.GPAMUX2.bit.GPIO27
#define KEY_S100_DIR     GpioCtrlRegs.GPADIR.bit.GPIO27
#define KEY_S100_PUD     GpioCtrlRegs.GPAPUD.bit.GPIO27
#define KEY_S100_DAT()   GpioDataRegs.GPADAT.bit.GPIO27

/********************************** BEEP **********************************/
#define BEEP_MUX     GpioCtrlRegs.GPAMUX1.bit.GPIO6
#define BEEP_DIR     GpioCtrlRegs.GPADIR.bit.GPIO6
#define BEEP_PUD     GpioCtrlRegs.GPAPUD.bit.GPIO6
#define BEEP_DAT()   GpioDataRegs.GPADAT.bit.GPIO6

#define BEEP_TOGGLE()   GpioDataRegs.GPATOGGLE.bit.GPIO6 = 1
#define BEEP_OFF()       GpioDataRegs.GPACLEAR.bit.GPIO6 = 1
#define BEEP_ON()      GpioDataRegs.GPASET.bit.GPIO6 = 1

//
// Gpio_select - Sets the gpios functionality
//
void Gpio_select(void)
{
    BEEP_OFF();
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

    //RGB LED
    LED_RED_MUX = 0;    //Configure this pin as:general purpose I/O
    LED_RED_DIR = 1;    //Configures the GPIO pin as an output
    LED_GREEN_MUX = 0;  //Configure this pin as:general purpose I/O
    LED_GREEN_DIR = 1;  //Configures the GPIO pin as an output
    LED_BLUE_MUX = 0;   //Configure this pin as:general purpose I/O
    LED_BLUE_DIR = 1;   //Configures the GPIO pin as an output

    //KEY GPIO

    //Configure this pin as:general purpose I/O
    KEY_S100_MUX = 0;
    //Configures the GPIO pin as an input
    KEY_S100_DIR = 0;
    //Disable the internal pullup on the specified pin
    KEY_S100_PUD = 0;

    //BEEP GPIO
    BEEP_MUX = 0;
    BEEP_DIR = 1;

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

        LED_D400_TOGGLE();
        DELAY_US(100000);// us
        LED_D401_TOGGLE();
        DELAY_US(100000);// us
        LED_D402_TOGGLE();
        DELAY_US(100000);// us


        LED_RED_TOGGLE();
        DELAY_US(100000);// us
        LED_GREEN_TOGGLE();
        DELAY_US(100000);// us
        LED_BLUE_TOGGLE();
        DELAY_US(100000);// us


        if(0 == KEY_S100_DAT())
        {
            BEEP_TOGGLE();
        }


    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li>实验现象：LED在闪烁；按键按下时，蜂鸣器会响起。</li></ul>`,3);function O(R,L){const n=r("center");return t(),u("div",null,[G,E,c(" more "),_,e(n,null,{default:s(()=>[P,e(n,null,{default:s(()=>[l(" LED KEY GPIO ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[p,e(n,null,{default:s(()=>[l(" Beep RGB-LED ")]),_:1})]),_:1}),D,e(n,null,{default:s(()=>[f,e(n,null,{default:s(()=>[l(" GPIO寄存器 ")]),_:1})]),_:1}),I])}const S=a(o,[["render",O],["__file","17.C2000的GPIO-BEEP实例.html.vue"]]);export{S as default};
