import{_ as x}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c,d as r,a as i,b as n,e as l,f as a}from"./app-4799cfad.js";const v={},u=i("h1",{id:"crc-16-ccitt算法",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#crc-16-ccitt算法","aria-hidden":"true"},"#"),n(" CRC-16-CCITT算法")],-1),m=i("ul",null,[i("li",null,"The CRC-16-CCITT polynomial is 0x1021."),i("li",null,"The initial register value must be 0xFFFF")],-1),b=a(`<h2 id="查表" tabindex="-1"><a class="header-anchor" href="#查表" aria-hidden="true">#</a> 查表</h2><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>    /*
    * This is a fork of the CRC16 library COPYRIGHT(c) Emilie Laverge
    * published at [https://developer.mbed.org/users/EmLa/code/CRC16/]
    *
    * Modified by Zoltan Hudak to implement CRC16-CCITT
    * using the polynomial 0x1021: X^16 + X^15 + X^2 + 1.
    * Default initial CRC value = 0x0000
    */

    UInt16[] crc16_ccitt_table = {
        0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x60C6, 0x70E7, 
        0x8108, 0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF, 
        0x1231, 0x0210, 0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7, 0x62D6, 
        0x9339, 0x8318, 0xB37B, 0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE, 
        0x2462, 0x3443, 0x0420, 0x1401, 0x64E6, 0x74C7, 0x44A4, 0x5485, 
        0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE, 0xF5CF, 0xC5AC, 0xD58D, 
        0x3653, 0x2672, 0x1611, 0x0630, 0x76D7, 0x66F6, 0x5695, 0x46B4, 
        0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D, 0xC7BC, 
        0x48C4, 0x58E5, 0x6886, 0x78A7, 0x0840, 0x1861, 0x2802, 0x3823, 
        0xC9CC, 0xD9ED, 0xE98E, 0xF9AF, 0x8948, 0x9969, 0xA90A, 0xB92B, 
        0x5AF5, 0x4AD4, 0x7AB7, 0x6A96, 0x1A71, 0x0A50, 0x3A33, 0x2A12, 
        0xDBFD, 0xCBDC, 0xFBBF, 0xEB9E, 0x9B79, 0x8B58, 0xBB3B, 0xAB1A, 
        0x6CA6, 0x7C87, 0x4CE4, 0x5CC5, 0x2C22, 0x3C03, 0x0C60, 0x1C41, 
        0xEDAE, 0xFD8F, 0xCDEC, 0xDDCD, 0xAD2A, 0xBD0B, 0x8D68, 0x9D49, 
        0x7E97, 0x6EB6, 0x5ED5, 0x4EF4, 0x3E13, 0x2E32, 0x1E51, 0x0E70, 
        0xFF9F, 0xEFBE, 0xDFDD, 0xCFFC, 0xBF1B, 0xAF3A, 0x9F59, 0x8F78, 
        0x9188, 0x81A9, 0xB1CA, 0xA1EB, 0xD10C, 0xC12D, 0xF14E, 0xE16F, 
        0x1080, 0x00A1, 0x30C2, 0x20E3, 0x5004, 0x4025, 0x7046, 0x6067, 
        0x83B9, 0x9398, 0xA3FB, 0xB3DA, 0xC33D, 0xD31C, 0xE37F, 0xF35E, 
        0x02B1, 0x1290, 0x22F3, 0x32D2, 0x4235, 0x5214, 0x6277, 0x7256, 
        0xB5EA, 0xA5CB, 0x95A8, 0x8589, 0xF56E, 0xE54F, 0xD52C, 0xC50D, 
        0x34E2, 0x24C3, 0x14A0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 
        0xA7DB, 0xB7FA, 0x8799, 0x97B8, 0xE75F, 0xF77E, 0xC71D, 0xD73C, 
        0x26D3, 0x36F2, 0x0691, 0x16B0, 0x6657, 0x7676, 0x4615, 0x5634, 
        0xD94C, 0xC96D, 0xF90E, 0xE92F, 0x99C8, 0x89E9, 0xB98A, 0xA9AB, 
        0x5844, 0x4865, 0x7806, 0x6827, 0x18C0, 0x08E1, 0x3882, 0x28A3, 
        0xCB7D, 0xDB5C, 0xEB3F, 0xFB1E, 0x8BF9, 0x9BD8, 0xABBB, 0xBB9A, 
        0x4A75, 0x5A54, 0x6A37, 0x7A16, 0x0AF1, 0x1AD0, 0x2AB3, 0x3A92, 
        0xFD2E, 0xED0F, 0xDD6C, 0xCD4D, 0xBDAA, 0xAD8B, 0x9DE8, 0x8DC9, 
        0x7C26, 0x6C07, 0x5C64, 0x4C45, 0x3CA2, 0x2C83, 0x1CE0, 0x0CC1, 
        0xEF1F, 0xFF3E, 0xCF5D, 0xDF7C, 0xAF9B, 0xBFBA, 0x8FD9, 0x9FF8, 
        0x6E17, 0x7E36, 0x4E55, 0x5E74, 0x2E93, 0x3EB2, 0x0ED1, 0x1EF0
    };

    UInt16 calc_crc16_table(byte[] input, int length)
    {
        UInt16 crc = 0xFFFF; 

        for (int i = 0; i &lt; length; i++)
        {
            UInt16 tableValue = crc16_ccitt_table[((crc &gt;&gt; 8) ^ input[i]) &amp; 0xFF];

            crc = (UInt16)((crc &lt;&lt; 8) ^ tableValue);
        }

        return crc;
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数计算" tabindex="-1"><a class="header-anchor" href="#函数计算" aria-hidden="true">#</a> 函数计算</h2><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>    static UInt16 gen_crc16(byte[] u8Array, UInt16 u16Size)
    {
        UInt16 crcmask = 0xFFFF;
        UInt16 crcxor = 0;
        UInt16 polynom = 0x1021;
        UInt16 i, j, c, bit;
        UInt16 crc = 0x84CF, crchighbit = 0x8000;

        for (i = 0; i &lt; u16Size; i++)
        {

            c = u8Array[i];
            for (j = 0x80; j!=0; j &gt;&gt;= 1)
            {

                bit = (UInt16)(crc &amp; crchighbit);
                crc &lt;&lt;= 1;
                if ((c &amp; j)!= 0)
                {
                    crc |= 1;
                }
                if (bit != 0)
                {
                    crc ^= polynom;
                }
            }
        }
        crc = (UInt16)(crc &amp; 0xffff);
        for (i = 0; i &lt; 16; i++)
        {

            bit = (UInt16)(crc &amp; crchighbit);
            crc &lt;&lt;= 1;
            if (bit != 0)
            { 
                crc ^= polynom; 
            }
        }

        crc ^= crcxor;
        crc &amp;= crcmask;
        return (crc);
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h1>`,5),t={href:"https://os.mbed.com/users/hudakz/code/CRC16_CCITT/file/6ecc3a64bf7b/CRC16_CCITT.cpp/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.cnblogs.com/libra13179/p/7591907.html",target:"_blank",rel:"noopener noreferrer"};function o(F,E){const e=s("ExternalLinkIcon");return d(),c("div",null,[u,m,r(" more "),b,i("p",null,[i("a",t,[n("CRC16_CCITT"),l(e)])]),i("p",null,[i("a",C,[n("CRC16-CCITT C语言代码"),l(e)])])])}const D=x(v,[["render",o],["__file","103.CRC-16-CCITT算法.html.vue"]]);export{D as default};
