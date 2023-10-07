import{_ as d}from"./LED_KEY-a7d16fae.js";import{_ as v,a as r}from"./TimerRegisters-4cd6c010.js";import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as u,c,d as b,e,w as s,a as i,b as l,f as m}from"./app-9edd4270.js";const o="/blog/assets/blog_image/TMS320F28035/PIE_Block.png",E="/blog/assets/blog_image/TMS320F28035/PeripheralInterruptVectorTable.png",_={},G=i("h1",{id:"c2000的external-interrupt实例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#c2000的external-interrupt实例","aria-hidden":"true"},"#"),l(" C2000的External Interrupt实例")],-1),p=i("p",null,"本节主要记录C2000的External Interrupt驱动实例。",-1),I=i("ul",null,[i("li",null,"相关的IO：")],-1),P=i("img",{src:d},null,-1),D=i("ul",null,[i("li",null,"定时器框图：")],-1),R=i("img",{src:v},null,-1),f=i("img",{src:r},null,-1),g=i("ul",null,[i("li",null,"中断矢量表：")],-1),O=i("img",{src:o},null,-1),L=i("img",{src:E},null,-1),h=m(`<p>工程中的main.c内容如下。</p><details class="hint-container details"><summary>详情</summary><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>

#include &quot;DSP28x_Project.h&quot;
#include &quot;DSP2803x_Gpio.h&quot;


//
// Function Prototypes
//
interrupt void xint1_isr(void);
__interrupt void cpu_timer0_isr(void);


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
#define KEY_S100_EXINT_NUM   27
#define KEY_S100_MUX         GpioCtrlRegs.GPAMUX2.bit.GPIO27
#define KEY_S100_DIR         GpioCtrlRegs.GPADIR.bit.GPIO27
#define KEY_S100_PUD         GpioCtrlRegs.GPAPUD.bit.GPIO27
#define KEY_S100_DAT()       GpioDataRegs.GPADAT.bit.GPIO27
#define KEY_S100_EXINT_QSEL  GpioCtrlRegs.GPAQSEL2.bit.GPIO27
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


    //BEEP GPIO
    BEEP_MUX = 0;
    BEEP_DIR = 1;

    //Clear the EALLOW bit.
    EDIS;
}

void ExInt_Init(void)
{
    //Set the EALLOW bit to allow modification to GPBMUX1 and GPBDIR.
    EALLOW;

    //KEY GPIO

    //Configure this pin as:general purpose I/O
    KEY_S100_MUX = 0;
    //Configures the GPIO pin as an input
    KEY_S100_DIR = 0;
    //Disable the internal pullup on the specified pin
    KEY_S100_PUD = 0;
    //Synchronize to SYSCLKOUT only. Valid for both peripheral and GPIO pins.
    KEY_S100_EXINT_QSEL = 0;
    //Select the GPIO27 pin as the XINTn interrupt source
    GpioIntRegs.GPIOXINT1SEL.bit.GPIOSEL = KEY_S100_EXINT_NUM;
    //Clear the EALLOW bit.
    EDIS;

    //Interrupt generated:(0:falling edge;1: rising edge;2:falling edge ;3: a falling edge and a rising edge)
    XIntruptRegs.XINT1CR.bit.POLARITY = 2;  // 2:falling edge
    //enables external interrupt XINT1.
    XIntruptRegs.XINT1CR.bit.ENABLE = 1;    // Enable XINT1

    //
    // Interrupts that are used in this example are re-mapped to ISR functions
    //
    EALLOW;
    PieVectTable.XINT1 = &amp;xint1_isr;
    EDIS;

    //Enable CPU int1 which is connected to M_INT1
    IER |= M_INT1;
    //
    // Enable XINT1 in the PIE: Group 1 interrupt 4
    //
    PieCtrlRegs.PIEIER1.bit.INTx4 = 1;

}

void Timer0_Init(void)
{
    EALLOW;  // This is needed to write to EALLOW protected registers
    PieVectTable.TINT0 = &amp;cpu_timer0_isr;
    EDIS;

    InitCpuTimers();   // For this example, only initialize the Cpu Timers

    ConfigCpuTimer(&amp;CpuTimer0, 60, 100000);//100ms &quot;Freq&quot; is entered as &quot;MHz&quot;;&quot;Period&quot; in &quot;uSeconds&quot;

    CpuTimer0Regs.TCR.all = 0x4000; //write-only instruction to set TSS bit = 0

    IER |= M_INT1;
    //
    // Enable TINT0 in the PIE: Group 1 interrupt 7
    //
    PieCtrlRegs.PIEIER1.bit.INTx7 = 1;

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

    ExInt_Init();
    Timer0_Init();


    PieCtrlRegs.PIECTRL.bit.ENPIE = 1;          // Enable the PIE block
    //
    // Enable global Interrupts and higher priority real-time debug events:
    //
    EINT;   // Enable Global interrupt INTM
    ERTM;   // Enable Global realtime interrupt DBGM

    //
    // IDLE loop. Just sit and loop forever (optional):
    //
    for(;;)
    {




    }
}

//
// cpu_timer0_isr - Timer0 counter
//
__interrupt void cpu_timer0_isr(void)
{
   CpuTimer0.InterruptCount++;
   LED_D400_TOGGLE();

   // Acknowledge this interrupt to receive more interrupts from group 1
   PieCtrlRegs.PIEACK.all = PIEACK_GROUP1;
}

interrupt void xint1_isr(void)
{
    LED_D401_TOGGLE();

    PieCtrlRegs.PIEACK.all = PIEACK_GROUP1;// clears PIE Interrupt Acknowledge (PIEACK) Register
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li>实验现象：定时器0为100ms；外部中断为下降沿中断，按键按下时LED状态翻转。</li></ul>`,3);function C(T,S){const n=t("center");return u(),c("div",null,[G,p,b(" more "),I,e(n,null,{default:s(()=>[P,e(n,null,{default:s(()=>[l(" LED和KEY的IO ")]),_:1})]),_:1}),D,e(n,null,{default:s(()=>[R,e(n,null,{default:s(()=>[l(" 定时器框图 ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[f,e(n,null,{default:s(()=>[l(" 定时器的寄存器 ")]),_:1})]),_:1}),g,e(n,null,{default:s(()=>[O,e(n,null,{default:s(()=>[l(" 使用 PIE 块的中断多路复用 ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[L,e(n,null,{default:s(()=>[l(" PIE 多路复用的外设中断矢量表 ")]),_:1})]),_:1}),h])}const x=a(_,[["render",C],["__file","19.C2000的External Interrupt实例.html.vue"]]);export{x as default};
