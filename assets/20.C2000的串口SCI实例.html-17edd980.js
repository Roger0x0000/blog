import{_ as d}from"./LED_KEY-a7d16fae.js";import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as v,o as r,c as t,d as c,e,w as s,a as i,b as l,f as u}from"./app-f6d9e5b8.js";const m="/blog/assets/blog_image/TMS320F28035/SCIA_Clock.png",b="/blog/assets/blog_image/TMS320F28035/LOSPCP_Register.png",o="/blog/assets/blog_image/TMS320F28035/SCI_A_Registers.png",p="/blog/assets/blog_image/TMS320F28035/SCI-A框图.png",I="/blog/assets/blog_image/TMS320F28035/CH340G.png",_={},E=i("h1",{id:"c2000的串口sci实例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#c2000的串口sci实例","aria-hidden":"true"},"#"),l(" C2000的串口SCI实例")],-1),R=i("p",null,"本节主要记录C2000的串口SCI-A驱动实例。",-1),G=i("ul",null,[i("li",null,"SCI-A时钟：")],-1),g=i("img",{src:m},null,-1),P=i("img",{src:b},null,-1),S=i("ul",null,[i("li",null,"SCI-A波特率计算公式")],-1),C=i("p",{class:"katex-block"},[i("span",{class:"katex-display"},[i("span",{class:"katex"},[i("span",{class:"katex-mathml"},[i("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[i("semantics",null,[i("mrow",null,[i("mi",null,"B"),i("mi",null,"a"),i("mi",null,"u"),i("mi",null,"d"),i("mi",null,"R"),i("mi",null,"a"),i("mi",null,"t"),i("mi",null,"e"),i("mo",null,"="),i("mfrac",null,[i("mrow",null,[i("mi",null,"L"),i("mi",null,"S"),i("mi",null,"P"),i("mi",null,"C"),i("mi",null,"L"),i("mi",null,"K")]),i("mrow",null,[i("mo",{stretchy:"false"},"("),i("mi",null,"B"),i("mi",null,"R"),i("mi",null,"R"),i("mo",null,"+"),i("mn",null,"1"),i("mo",{stretchy:"false"},")"),i("mo",null,"⋅"),i("mn",null,"8")])])]),i("annotation",{encoding:"application/x-tex"}," Baud Rate = \\frac{LSPCLK}{(BRR+1) \\cdot 8} ")])])]),i("span",{class:"katex-html","aria-hidden":"true"},[i("span",{class:"base"},[i("span",{class:"strut",style:{height:"0.6944em"}}),i("span",{class:"mord mathnormal",style:{"margin-right":"0.05017em"}},"B"),i("span",{class:"mord mathnormal"},"a"),i("span",{class:"mord mathnormal"},"u"),i("span",{class:"mord mathnormal"},"d"),i("span",{class:"mord mathnormal",style:{"margin-right":"0.00773em"}},"R"),i("span",{class:"mord mathnormal"},"a"),i("span",{class:"mord mathnormal"},"t"),i("span",{class:"mord mathnormal"},"e"),i("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),i("span",{class:"mrel"},"="),i("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),i("span",{class:"base"},[i("span",{class:"strut",style:{height:"2.2963em","vertical-align":"-0.936em"}}),i("span",{class:"mord"},[i("span",{class:"mopen nulldelimiter"}),i("span",{class:"mfrac"},[i("span",{class:"vlist-t vlist-t2"},[i("span",{class:"vlist-r"},[i("span",{class:"vlist",style:{height:"1.3603em"}},[i("span",{style:{top:"-2.314em"}},[i("span",{class:"pstrut",style:{height:"3em"}}),i("span",{class:"mord"},[i("span",{class:"mopen"},"("),i("span",{class:"mord mathnormal",style:{"margin-right":"0.00773em"}},"BRR"),i("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),i("span",{class:"mbin"},"+"),i("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),i("span",{class:"mord"},"1"),i("span",{class:"mclose"},")"),i("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),i("span",{class:"mbin"},"⋅"),i("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),i("span",{class:"mord"},"8")])]),i("span",{style:{top:"-3.23em"}},[i("span",{class:"pstrut",style:{height:"3em"}}),i("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),i("span",{style:{top:"-3.677em"}},[i("span",{class:"pstrut",style:{height:"3em"}}),i("span",{class:"mord"},[i("span",{class:"mord mathnormal"},"L"),i("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"SPC"),i("span",{class:"mord mathnormal"},"L"),i("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"K")])])]),i("span",{class:"vlist-s"},"​")]),i("span",{class:"vlist-r"},[i("span",{class:"vlist",style:{height:"0.936em"}},[i("span")])])])]),i("span",{class:"mclose nulldelimiter"})])])])])])],-1),h=i("img",{src:o},null,-1),D=i("ul",null,[i("li",null,"SCI-A框图")],-1),f=i("img",{src:p},null,-1),L=u(`<p>工程中的main.c内容如下。</p><details class="hint-container details"><summary>详情</summary><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>

#include &quot;DSP28x_Project.h&quot;
#include &quot;DSP2803x_Gpio.h&quot;


//
// Function Prototypes
//
interrupt void xint1_isr(void);
__interrupt void cpu_timer0_isr(void);
interrupt void uartRx_isr(void);

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

#define SCI_FIFO_LEN  1

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
void SCI_SendByte(int data)
{

    //while (SciaRegs.SCIFFTX.bit.TXFFST != 0) //Transmit FIFO is not empty
    while(SciaRegs.SCICTL2.bit.TXEMPTY != 1) //Transmitter buffer or shift registers is not empty
    {

    }

    SciaRegs.SCITXBUF= data;

}
void SCI_Init(void)
{

    InitSciaGpio();

    SciaRegs.SCICTL1.bit.SWRESET = 0;

    SciaRegs.SCICCR.all =0x0007;   // 1 stop bit,  No loopback
                                   // No parity,8 char bits,
                                   // async mode, idle-line protocol
    // baud = LSPCLK/8/((BRR+1)
    // baud @LSPCLK = 15MHz (60 MHz SYSCLK)
    SciaRegs.SCIHBAUD   =0x0000;
    SciaRegs.SCILBAUD    =15;  //   194--&gt;9600 ;   97--&gt; 19200 ;  48--&gt;38400;  15---&gt;115200    14--&gt;128000

    SciaRegs.SCICTL1.bit.SWRESET = 1;     // Relinquish SCI from Reset
    SciaRegs.SCIFFTX.bit.SCIRST=1;

    SciaRegs.SCIFFRX.bit.RXFFIL  = SCI_FIFO_LEN;  //Receive FIFO interrupt level bits
    SciaRegs.SCICTL1.bit.TXENA = 1;       //SCI transmitter enable
    SciaRegs.SCICTL1.bit.RXENA = 1;       //SCI receiver enable

    //SciaRegs.SCICTL2.bit.TXINTENA =1;  // TXRDY interrupt is enabled
    //SciaRegs.SCICTL2.bit.RXBKINTENA =1; //Receiver-buffer/break interrupt is enabled
    //SciaRegs.SCIFFTX.bit.TXFFIENA = 0; //Transmit FIFO interrupt  is disabled


    SciaRegs.SCIFFTX.bit.SCIFFENA = 1;      //SCI FIFO enable
    SciaRegs.SCIFFRX.bit.RXFFIENA=1;

    EALLOW;
    PieVectTable.SCIRXINTA = &amp;uartRx_isr;
    EDIS;
    PieCtrlRegs.PIEIER9.bit.INTx1 = 1;
    IER |= M_INT9;

    SciaRegs.SCIFFCT.all=0x00;
    SciaRegs.SCIFFTX.bit.TXFIFOXRESET=1;
    SciaRegs.SCIFFRX.bit.RXFIFORESET=1;
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
    SCI_Init();

    SCI_SendByte(&#39;\\r&#39;);
    SCI_SendByte(&#39;\\n&#39;);
    SCI_SendByte(&#39;A&#39;);

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
   LED_D402_TOGGLE();

   // Acknowledge this interrupt to receive more interrupts from group 1
   PieCtrlRegs.PIEACK.all = PIEACK_GROUP1;
}

interrupt void xint1_isr(void)
{
    LED_D402_TOGGLE();
    SCI_SendByte(&#39;B&#39;);
    // clears PIE Interrupt Acknowledge (PIEACK) Register,(INT1-INT12).
    PieCtrlRegs.PIEACK.all = PIEACK_GROUP1;
}


interrupt void uartRx_isr(void)
{
    Uint16 revData;

    SciaRegs.SCIFFRX.bit.RXFFINTCLR=1;      // Clear Interrupt flag
    PieCtrlRegs.PIEACK.all = PIEACK_GROUP9;

    if(SciaRegs.SCIFFRX.bit.RXFFOVF == 0)//Receive FIFO has not overflowed
    {

        while(SciaRegs.SCIFFRX.bit.RXFFST)// Receive FIFO is not empty.
        {
            revData = SciaRegs.SCIRXBUF.bit.RXDT;//SCI Receive Data Buffer

            SCI_SendByte(revData);


            if(revData == &#39;0&#39;)
            {
                LED_D400_TOGGLE();
            }
            else if(revData == &#39;1&#39;)
            {
                LED_D401_TOGGLE();
            }
        }
    }
    else
    {
        //Receive FIFO has overflowed
        SciaRegs.SCIFFRX.bit.RXFFOVRCLR=1;     // Write 1 to clear RXFFOVF flag
        SciaRegs.SCIFFRX.bit.RXFIFORESET = 0;  //Write 0 to reset the FIFO pointer to zero, and hold in reset.
        SciaRegs.SCIFFRX.bit.RXFIFORESET = 1 ; //Re-enable receive FIFO operation
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li>实验现象：若按下S100按键，串口发送&#39;B&#39;；串口助手以ASCII格式发送，当通过串口SCI接收到 字符&#39;0&#39; ， LED_D400状态翻转； 字符&#39;1&#39; ，LED_D401状态翻转 。</li></ul>`,3),T=i("img",{src:I},null,-1),O=i("img",{src:d},null,-1);function F(A,X){const n=v("center");return r(),t("div",null,[E,R,c(" more "),G,e(n,null,{default:s(()=>[g,e(n,null,{default:s(()=>[l(" SCI-A寄存器 ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[P,e(n,null,{default:s(()=>[l(" LOSPCP寄存器 ")]),_:1})]),_:1}),S,C,e(n,null,{default:s(()=>[h,e(n,null,{default:s(()=>[l(" SCI-A寄存器 ")]),_:1})]),_:1}),D,e(n,null,{default:s(()=>[f,e(n,null,{default:s(()=>[l(" SCI-A框图 ")]),_:1})]),_:1}),L,e(n,null,{default:s(()=>[T,e(n,null,{default:s(()=>[l(" CH340G ")]),_:1})]),_:1}),e(n,null,{default:s(()=>[O,e(n,null,{default:s(()=>[l(" LED和KEY的IO ")]),_:1})]),_:1})])}const U=a(_,[["render",F],["__file","20.C2000的串口SCI实例.html.vue"]]);export{U as default};
