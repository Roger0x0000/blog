import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o,c,d as u,e as n,w as s,a as i,b as e,f as d}from"./app-68bd1534.js";const v="/blog/assets/blog_image/PIC18/Proteus1.png",b="/blog/assets/blog_image/PIC18/Proteus2.png",m="/blog/assets/blog_image/PIC18/Proteus3.png",g="/blog/assets/blog_image/PIC18/Proteus4.png",p="/blog/assets/blog_image/PIC18/Proteus5.png",f="/blog/assets/blog_image/PIC18/Proteus6.png",F="/blog/assets/blog_image/PIC18/Proteus7.png",P="/blog/assets/blog_image/PIC18/Proteus8.png",_={},C=i("h1",{id:"mplab-x-ide和proteus-8联合仿真调试",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#mplab-x-ide和proteus-8联合仿真调试","aria-hidden":"true"},"#"),e(" MPLAB X IDE和Proteus 8联合仿真调试")],-1),h=i("p",null,"本节主要简介如何实现MPLAB X IDE和Proteus 8 Professional进行联合仿真调试。",-1),O=i("h2",{id:"安装proteus插件",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#安装proteus插件","aria-hidden":"true"},"#"),e(" 安装Proteus插件")],-1),B=i("ul",null,[i("li",null,"在MPLAB X IDE 中安装Proteus；")],-1),E=i("figure",null,[i("img",{src:v,alt:"安装Proteus插件",tabindex:"0",loading:"lazy"}),i("figcaption",null,"安装Proteus插件")],-1),T=i("figure",null,[i("img",{src:b,alt:"安装Proteus插件",tabindex:"0",loading:"lazy"}),i("figcaption",null,"安装Proteus插件")],-1),I=d(`<h2 id="新建mplab-x-ide工程" tabindex="-1"><a class="header-anchor" href="#新建mplab-x-ide工程" aria-hidden="true">#</a> 新建MPLAB X IDE工程</h2><ul><li>新建MPLAB X IDE工程，并编写以下代码；</li><li>user.c</li></ul><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>

// PIC18F46K22 Configuration Bit Settings

// &#39;C&#39; source line config statements

// CONFIG1H
#pragma config FOSC = INTIO67   // Oscillator Selection bits (Internal oscillator block)
#pragma config PLLCFG = ON      // 4X PLL Enable (Oscillator multiplied by 4)
#pragma config PRICLKEN = ON    // Primary clock enable bit (Primary clock is always enabled)
#pragma config FCMEN = OFF      // Fail-Safe Clock Monitor Enable bit (Fail-Safe Clock Monitor disabled)
#pragma config IESO = OFF       // Internal/External Oscillator Switchover bit (Oscillator Switchover mode disabled)

// CONFIG2L
#pragma config PWRTEN = ON      // Power-up Timer Enable bit (Power up timer enabled)
#pragma config BOREN = SBORDIS  // Brown-out Reset Enable bits (Brown-out Reset enabled in hardware only (SBOREN is disabled))
#pragma config BORV = 285       // Brown Out Reset Voltage bits (VBOR set to 2.85 V nominal)

// CONFIG2H
#pragma config WDTEN = OFF      // Watchdog Timer Enable bits (Watch dog timer is always disabled. SWDTEN has no effect.)
#pragma config WDTPS = 32768    // Watchdog Timer Postscale Select bits (1:32768)

// CONFIG3H
#pragma config CCP2MX = PORTC1  // CCP2 MUX bit (CCP2 input/output is multiplexed with RC1)
#pragma config PBADEN = OFF     // PORTB A/D Enable bit (PORTB&lt;5:0&gt; pins are configured as digital I/O on Reset)
#pragma config CCP3MX = PORTB5  // P3A/CCP3 Mux bit (P3A/CCP3 input/output is multiplexed with RB5)
#pragma config HFOFST = OFF     // HFINTOSC Fast Start-up (HFINTOSC output and ready status are delayed by the oscillator stable status)
#pragma config T3CMX = PORTB5   // Timer3 Clock input mux bit (T3CKI is on RB5)
#pragma config P2BMX = PORTC0   // ECCP2 B output mux bit (P2B is on RC0)
#pragma config MCLRE = EXTMCLR  // MCLR Pin Enable bit (MCLR pin enabled, RE3 input pin disabled)

// CONFIG4L
#pragma config STVREN = ON      // Stack Full/Underflow Reset Enable bit (Stack full/underflow will cause Reset)
#pragma config LVP = OFF        // Single-Supply ICSP Enable bit (Single-Supply ICSP disabled)
#pragma config XINST = OFF      // Extended Instruction Set Enable bit (Instruction set extension and Indexed Addressing mode disabled (Legacy mode))

// CONFIG5L
#pragma config CP0 = OFF        // Code Protection Block 0 (Block 0 (000800-003FFFh) not code-protected)
#pragma config CP1 = OFF        // Code Protection Block 1 (Block 1 (004000-007FFFh) not code-protected)
#pragma config CP2 = OFF        // Code Protection Block 2 (Block 2 (008000-00BFFFh) not code-protected)
#pragma config CP3 = OFF        // Code Protection Block 3 (Block 3 (00C000-00FFFFh) not code-protected)

// CONFIG5H
#pragma config CPB = OFF        // Boot Block Code Protection bit (Boot block (000000-0007FFh) not code-protected)
#pragma config CPD = OFF        // Data EEPROM Code Protection bit (Data EEPROM not code-protected)

// CONFIG6L
#pragma config WRT0 = OFF       // Write Protection Block 0 (Block 0 (000800-003FFFh) not write-protected)
#pragma config WRT1 = OFF       // Write Protection Block 1 (Block 1 (004000-007FFFh) not write-protected)
#pragma config WRT2 = OFF       // Write Protection Block 2 (Block 2 (008000-00BFFFh) not write-protected)
#pragma config WRT3 = OFF       // Write Protection Block 3 (Block 3 (00C000-00FFFFh) not write-protected)

// CONFIG6H
#pragma config WRTC = OFF       // Configuration Register Write Protection bit (Configuration registers (300000-3000FFh) not write-protected)
#pragma config WRTB = OFF       // Boot Block Write Protection bit (Boot Block (000000-0007FFh) not write-protected)
#pragma config WRTD = OFF       // Data EEPROM Write Protection bit (Data EEPROM not write-protected)

// CONFIG7L
#pragma config EBTR0 = OFF      // Table Read Protection Block 0 (Block 0 (000800-003FFFh) not protected from table reads executed in other blocks)
#pragma config EBTR1 = OFF      // Table Read Protection Block 1 (Block 1 (004000-007FFFh) not protected from table reads executed in other blocks)
#pragma config EBTR2 = OFF      // Table Read Protection Block 2 (Block 2 (008000-00BFFFh) not protected from table reads executed in other blocks)
#pragma config EBTR3 = OFF      // Table Read Protection Block 3 (Block 3 (00C000-00FFFFh) not protected from table reads executed in other blocks)

// CONFIG7H
#pragma config EBTRB = OFF      // Boot Block Table Read Protection bit (Boot Block (000000-0007FFh) not protected from table reads executed in other blocks)

// #pragma config statements should precede project file includes.
// Use project enums instead of #define for ON and OFF.

#include &lt;xc.h&gt;

#ifndef DEVICE_CONFIG_H
#define	DEVICE_CONFIG_H

#define _XTAL_FREQ 64000000

#endif	/* DEVICE_CONFIG_H */


// NOTE: To use the macros below, YOU must have previously defined _XTAL_FREQ
//#define __delay_us(x) _delay((unsigned long)((x)*(_XTAL_FREQ/4000000.0)))
//#define __delay_ms(x) _delay((unsigned long)((x)*(_XTAL_FREQ/4000.0)))


#define TurnOnLed()        {LATEbits.LATE2  = 0;}
#define TurnOffLed()       {LATEbits.LATE2  = 1;}
#define ToggleLed()        {LATEbits.LATE2  =! LATEbits.LATE2 ;}

/**
* @brief  Initial oscillator setting
* @author Roger
* @param[in]  NONE no input value
* @param[out]  NONE no output value
* @return   NONE no return value
*/
void Init_OSC(void)
{
	//Internal oscillator frequency 16MHz * 4 
    OSCCON =  0b11110000;
	OSCCON2 = 0b00000100;
    OSCTUNE = 0b01000000;	
	
    // Wait for PLL to stabilize
    while(OSCCON2bits.PLLRDY == 0)
    {

    }
}


void Init_GPIO(void)
{
    LATA = 0x00;//0 indicate GPIO initial low function
    TRISA = 0x00; //0 indicate output direction GPIO function
    ANSELA = 0x00; //0 indicate digital pin function,1 indicate analog pin function

    LATB =  0x00; 
    TRISB =  0x00;
    ANSELB =  0x00;

    LATC = 0x00;
    TRISC = 0x00;
    ANSELC = 0x00;
            
    LATD =  0x00;
    TRISD = 0x00;         
    ANSELD=  0x00;
            
    LATE =  0x00;
    TRISE =  0x00;
    ANSELE = 0x00;
}



int main(void)
{
	Init_OSC();
	Init_GPIO();


    while (1)
    {
		TurnOnLed(); 
		__delay_ms(500);
		TurnOffLed(); 
		__delay_ms(500);
    }

    return 1;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新建proteus工程" tabindex="-1"><a class="header-anchor" href="#新建proteus工程" aria-hidden="true">#</a> 新建Proteus工程</h2><figure><img src="`+m+'" alt="Proteus工程" tabindex="0" loading="lazy"><figcaption>Proteus工程</figcaption></figure>',5),R=i("figure",null,[i("img",{src:g,alt:"Proteus仿真结果",tabindex:"0",loading:"lazy"}),i("figcaption",null,"Proteus仿真结果")],-1),x=d('<h2 id="联合仿真" tabindex="-1"><a class="header-anchor" href="#联合仿真" aria-hidden="true">#</a> 联合仿真</h2><ul><li>使能Proteus的远程调试；</li></ul><figure><img src="'+p+'" alt="使能Proteus的远程调试；" tabindex="0" loading="lazy"><figcaption>使能Proteus的远程调试</figcaption></figure><ul><li>设置MPLAB X IDE的调试工具为Proteus；</li></ul><figure><img src="'+f+'" alt="调试工具为Proteus" tabindex="0" loading="lazy"><figcaption>调试工具为Proteus</figcaption></figure><ul><li>设置Proteus的路径和IP；</li></ul><figure><img src="'+F+'" alt="设置Proteus的IP" tabindex="0" loading="lazy"><figcaption>设置Proteus的IP</figcaption></figure><ul><li>联合仿真结果；</li></ul><figure><img src="'+P+'" alt="联合仿真结果" tabindex="0" loading="lazy"><figcaption>联合仿真结果</figcaption></figure><h2 id="操作视频" tabindex="-1"><a class="header-anchor" href="#操作视频" aria-hidden="true">#</a> 操作视频</h2>',10),L={href:"https://www.bilibili.com/video/BV16T4y167Bw?zw",target:"_blank",rel:"noopener noreferrer"},N=i("iframe",{height:"400",width:"600",src:"//player.bilibili.com/player.html?aid=712062621&bvid=BV16T4y167Bw&cid=232700329&page=1",scrolling:"no",border:"0",frameborder:"no",framespacing:"0",allowfullscreen:"true"},` 
`,-1);function k(S,A){const l=a("center"),r=a("ExternalLinkIcon");return o(),c("div",null,[C,h,u(" more "),O,B,E,T,n(l,null,{default:s(()=>[e("安装Proteus插件")]),_:1}),I,n(l,null,{default:s(()=>[e("Proteus工程")]),_:1}),R,n(l,null,{default:s(()=>[e("Proteus仿真结果")]),_:1}),x,i("p",null,[i("a",L,[e("Bilibili仿真视频"),n(r)])]),N])}const D=t(_,[["render",k],["__file","12.MPLAB X IDE和Proteus 8联合仿真调试.html.vue"]]);export{D as default};
