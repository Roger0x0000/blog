import{_ as d}from"./LED-02de1c83.js";import{_ as v,a as r}from"./TimerRegisters-4cd6c010.js";import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as u,c,d as m,e,w as s,a as i,b as l,f as b}from"./app-795d25d7.js";const o="/blog/assets/blog_image/TMS320F28035/TimerResult.png",p={},_=i("h1",{id:"c2000的timers实例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#c2000的timers实例","aria-hidden":"true"},"#"),l(" C2000的Timers实例")],-1),G=i("p",null,"本节主要记录C2000的Timers驱动实例。",-1),E=i("ul",null,[i("li",null,"相关的IO：")],-1),P=i("img",{src:d},null,-1),D=i("ul",null,[i("li",null,"定时器框图：")],-1),I=i("img",{src:v},null,-1),f=i("img",{src:r},null,-1),R=b(`<p>定时器0为100ms的中断；定时器1为200ms的中断；定时器2为300ms的查询标志。</p><p>将LED工程中的main.c改为以下内容。</p><details class="hint-container details"><summary>详情</summary><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>

#include &quot;DSP28x_Project.h&quot;
#include &quot;DSP2803x_Gpio.h&quot;


//
// Function Prototypes
//
__interrupt void cpu_timer0_isr(void);
__interrupt void cpu_timer1_isr(void);
__interrupt void cpu_timer2_isr(void);




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
    // Interrupts that are used in this example are re-mapped to
    // ISR functions found within this file.
    //
    EALLOW;  // This is needed to write to EALLOW protected registers
    PieVectTable.TINT0 = &amp;cpu_timer0_isr;
    PieVectTable.TINT1 = &amp;cpu_timer1_isr;
    //PieVectTable.TINT2 = &amp;cpu_timer2_isr;
    EDIS;    // This is needed to disable write to EALLOW protected registers

    //
    // Step 4. Initialize the Device Peripheral. This function can be
    //         found in DSP2803x_CpuTimers.c
    //
    InitCpuTimers();   // For this example, only initialize the Cpu Timers


    //
    // Configure CPU-Timer 0, 1, and 2 to interrupt every second:
    // 60MHz CPU Freq, 1 second Period (in uSeconds(us))
    //
    ConfigCpuTimer(&amp;CpuTimer0, 60, 100000);//100ms &quot;Freq&quot; is entered as &quot;MHz&quot;;&quot;Period&quot; in &quot;uSeconds&quot;
    ConfigCpuTimer(&amp;CpuTimer1, 60, 200000);//200ms
    ConfigCpuTimer(&amp;CpuTimer2, 60, 300000);//300ms

    //
    // To ensure precise timing, use write-only instructions to write to the
    // entire register. Therefore, if any of the configuration bits are changed
    // in ConfigCpuTimer and InitCpuTimers (in DSP2803x_CpuTimers.h), the
    // below settings must also be updated.
    //
    CpuTimer0Regs.TCR.all = 0x4000; //write-only instruction to set TSS bit = 0
    CpuTimer1Regs.TCR.all = 0x4000; //write-only instruction to set TSS bit = 0
    //CpuTimer2Regs.TCR.all = 0x4000; //write-only instruction to set TSS bit = 0
    CpuTimer2Regs.TCR.bit.TSS = 0;// To start or restart the CPU-timer, set TSS to 0
    //CpuTimer2Regs.TCR.bit.TSS = 1;// To stop the CPU-timer, set TSS to 1
    //
    // Step 5. User specific code, enable interrupts:
    //

    //
    // Enable CPU int1 which is connected to CPU-Timer 0, CPU int13
    // which is connected to CPU-Timer 1, and CPU int 14, which is connected
    // to CPU-Timer 2:
    //
    IER |= M_INT1;
    IER |= M_INT13;
    //IER |= M_INT14;

    //
    // Enable TINT0 in the PIE: Group 1 interrupt 7
    //
    PieCtrlRegs.PIEIER1.bit.INTx7 = 1;

    //
    // Enable global Interrupts and higher priority real-time debug events:
    //
    EINT;   // Enable Global interrupt INTM
    ERTM;   // Enable Global realtime interrupt DBGM

    //
    // Step 6. IDLE loop. Just sit and loop forever (optional):
    //
    for(;;)
    {



        if(CpuTimer2Regs.TCR.bit.TIF == 1)//CPU-Timer2 Overflow Flag
        {
            CpuTimer2Regs.TCR.bit.TIF = 1;//Writing a 1 to this bit clears the flag
            LED_D402_TOGGLE();
        }

    }
}

//
// cpu_timer0_isr - Timer0 counter
//
__interrupt void cpu_timer0_isr(void)
{
   CpuTimer0.InterruptCount++;
   LED_D400_TOGGLE();
   //
   // Acknowledge this interrupt to receive more interrupts from group 1
   //
   PieCtrlRegs.PIEACK.all = PIEACK_GROUP1;
}

//
// cpu_timer1_isr - Timer1 counter
//
__interrupt void cpu_timer1_isr(void)
{
   LED_D401_TOGGLE();
   EALLOW;
   CpuTimer1.InterruptCount++;

   //
   // The CPU acknowledges the interrupt.
   //
   EDIS;
}

//
// cpu_timer2_isr - Timer2 counter
//
__interrupt void cpu_timer2_isr(void)
{
   EALLOW;
   CpuTimer2.InterruptCount++;

   //
   // The CPU acknowledges the interrupt.
   //
   EDIS;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li>实验现象：定时器0为100ms；定时器1为200ms；定时器2为300ms。</li></ul>`,4),T=i("img",{src:o},null,-1);function g(h,C){const n=t("center");return u(),c("div",null,[_,G,m(" more "),E,e(n,null,{default:s(()=>[P,e(n,null,{default:s(()=>[l(" LED GPIO ")]),_:1})]),_:1}),D,e(n,null,{default:s(()=>[I,e(n,null,{default:s(()=>[l(" 定时器框图 ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[f,e(n,null,{default:s(()=>[l(" 定时器的寄存器 ")]),_:1})]),_:1}),R,e(n,null,{default:s(()=>[T,e(n,null,{default:s(()=>[l(" 实验现象 ")]),_:1})]),_:1})])}const A=a(p,[["render",g],["__file","18.C2000的Timers实例.html.vue"]]);export{A as default};
