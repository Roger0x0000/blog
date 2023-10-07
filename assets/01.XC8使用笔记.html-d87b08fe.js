import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c,d as i,a as n,b as s,e,f as l}from"./app-795d25d7.js";const r={},d=n("h1",{id:"xc8使用笔记",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#xc8使用笔记","aria-hidden":"true"},"#"),s(" XC8使用笔记")],-1),u=n("h2",{id:"xc8-简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#xc8-简介","aria-hidden":"true"},"#"),s(" XC8 简介")],-1),k=n("p",null,"MPLAB XC8 C 编译器是一种独立式的优化 ISO C90 （通常称为 ANSI C）编译器。它支持所有 8 位 PIC® 单片机： PIC10、 PIC12、 PIC16 和 PIC18 系列器件，以及 PIC14000器件。该编译器可用于几种流行的操作系统，包括 32 位和 64 位 Windows®（不包括 WindowsServer）、 Linux® 和 Mac OS® X。该编译器提供了 3 种工作模式：免费 （ Free）、标准 （ Standard）或专业 （ PRO）。标准和专业工作模式是许可模式，需要使用一个序列号来启用它们。无许可证的客户可以使用免费模式。基本的编译器操作、支持的器件和可用的存储器在所有模式之间是相同的。这些模式之间的差别仅在于编译器采用的优化级别。",-1),m=l(`<h2 id="xc8的优化级别" tabindex="-1"><a class="header-anchor" href="#xc8的优化级别" aria-hidden="true">#</a> XC8的优化级别</h2><ul><li>0 - Do not optimize. The compiler’s goal is to reduce the cost of compilation and to make debugging produce the expected results.</li><li>1 - Optimize. Optimizing compilation takes somewhat longer, and a lot more host memory for a large function. The compiler tries to reduce code size and execution time.</li><li>2 - Optimize even more. The compiler performs nearly all supported optimizations that do not involve a space-speed trade-off.</li><li>3 - Optimize yet more favoring speed (superset of O2).</li><li>s - Optimize yet more favoring size (superset of O2).</li></ul><p>编译器在Free模式下，只支持优化级别0、1和2。</p><table><thead><tr><th style="text-align:center;">优化级别</th><th style="text-align:center;">Free</th><th style="text-align:center;">PRO</th></tr></thead><tbody><tr><td style="text-align:center;">0</td><td style="text-align:center;">✔</td><td style="text-align:center;">✔</td></tr><tr><td style="text-align:center;">1</td><td style="text-align:center;">✔</td><td style="text-align:center;">✔</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">✔</td><td style="text-align:center;">✔</td></tr><tr><td style="text-align:center;">3</td><td style="text-align:center;">✘</td><td style="text-align:center;">✔</td></tr><tr><td style="text-align:center;">s</td><td style="text-align:center;">✘</td><td style="text-align:center;">✔</td></tr></tbody></table><h2 id="将变量分配到固定地址" tabindex="-1"><a class="header-anchor" href="#将变量分配到固定地址" aria-hidden="true">#</a> 将变量分配到固定地址</h2><p>变量可以通过使用 __at() 构造放置在绝对地址处。基于堆栈的 （auto 和函数参数）变量无法使用 __at() 说明符。</p><p>测试代码如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span>
<span class="token punctuation">{</span>
    <span class="token class-name">uint8_t</span> Buf<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">/* Key-value buffer */</span>
    <span class="token class-name">uint8_t</span> Read<span class="token punctuation">;</span>       <span class="token comment">/* Buffer read pointer */</span>
    <span class="token class-name">uint8_t</span> Write<span class="token punctuation">;</span>      <span class="token comment">/* Buffer write pointer */</span>
<span class="token punctuation">}</span>KEY_FIFO_ST<span class="token punctuation">;</span>

<span class="token keyword">static</span> KEY_FIFO_ST stKey <span class="token function">__at</span><span class="token punctuation">(</span><span class="token number">0x200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		
<span class="token keyword">int</span> scanMode <span class="token function">__at</span><span class="token punctuation">(</span><span class="token number">0x100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> KeysFlash<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">__at</span><span class="token punctuation">(</span><span class="token number">0x2800</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token char">&#39;r&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;s&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;d&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//Map文件</span>
<span class="token comment">//_scanMode                  (abs)        000100</span>
<span class="token comment">//_stKey                     (abs)        000200</span>
<span class="token comment">//Name                      Link     Load   Length Selector   Space Scale</span>
<span class="token comment">//_KeysFlash_const          2800     2800        4     1400       0</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下给出了将变量分配到非默认段的示例。这会将段 <code>myData</code> 放置在地址 0x200 处，将段 <code>myCode</code> 放置在链接器类表示的 0x2800 至<br> 0x2900 范围中的任意位置。<br> Extra linker options（XC8 Linker --&gt;Additional options --&gt; Extra linker options）的内容如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token operator">-</span>Xlinker <span class="token operator">-</span>pmyData<span class="token operator">=</span><span class="token number">0200</span>h <span class="token operator">-</span>Xlinker <span class="token operator">-</span>pmyCode<span class="token operator">=</span>MYCODE <span class="token operator">-</span>Xlinker <span class="token operator">-</span>AMYCODE<span class="token operator">=</span><span class="token number">2800</span>h<span class="token operator">-</span><span class="token number">2900</span>h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试代码如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">__section</span><span class="token punctuation">(</span><span class="token string">&quot;myData&quot;</span><span class="token punctuation">)</span> scanMode <span class="token operator">=</span> <span class="token number">0x01</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token function">__section</span><span class="token punctuation">(</span><span class="token string">&quot;myCode&quot;</span><span class="token punctuation">)</span>  KeysFlash<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token char">&#39;r&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;s&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;d&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//Map文件</span>
<span class="token comment">//_scanMode                        myData       000200</span>
<span class="token comment">//</span>
<span class="token comment">//_KeysFlash     		CODE           	28FC	0000	4</span>
<span class="token comment">//__end_of_KeysFlash               myCode       002900</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将函数分配到固定地址" tabindex="-1"><a class="header-anchor" href="#将函数分配到固定地址" aria-hidden="true">#</a> 将函数分配到固定地址</h2><p>以下给出了将函数分配到非默认段的示例。</p><p>Extra linker options（XC8 Linker --&gt;Additional options --&gt; Extra linker options）的内容如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token operator">-</span>Xlinker <span class="token operator">-</span>pmyFunctionCode<span class="token operator">=</span><span class="token number">3000</span>h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试代码如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">asm</span><span class="token punctuation">(</span><span class="token string">&quot;GLOBAL _FunctionCode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token number">0</span></span></span>
<span class="token keyword">void</span> <span class="token function">FunctionCode</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token function">__at</span><span class="token punctuation">(</span><span class="token number">0x30000</span><span class="token punctuation">)</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
<span class="token keyword">void</span>  <span class="token function">__section</span><span class="token punctuation">(</span><span class="token string">&quot;myFunctionCode&quot;</span><span class="token punctuation">)</span><span class="token function">FunctionCode</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">asm</span><span class="token punctuation">(</span><span class="token string">&quot;goto 0x3820&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//Map文件</span>
<span class="token comment">//__pmyFunctionCode         myFunctionCode 003000</span>
<span class="token comment">//_FunctionCode     CODE    3000	0000	6</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h2>`,19),h={href:"https://mu.microchip.com",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/microchip-pic-avr-examples",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/microchip-pic-avr-tools",target:"_blank",rel:"noopener noreferrer"},_={href:"http://www.microchip.com.cn",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.microchip.com/development-tools/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.microchip.com/en-us/development-tools-tools-and-software/mplab-xc-compilers",target:"_blank",rel:"noopener noreferrer"},f={href:"https://microchipdeveloper.com/",target:"_blank",rel:"noopener noreferrer"},x={href:"http://www.microchip.com.tw/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.microchip.com/SWLibraryWeb/product.aspx?product=SMPS%20Control%20Library",target:"_blank",rel:"noopener noreferrer"};function w(F,M){const a=o("ExternalLinkIcon");return p(),c("div",null,[d,u,k,i(" more "),m,n("p",null,[n("a",h,[s("Microchip University"),e(a)])]),n("p",null,[n("a",v,[s("Microchip PIC & AVR Examples"),e(a)])]),n("p",null,[n("a",b,[s("Microchip PIC&AVR Tools"),e(a)])]),n("p",null,[n("a",_,[s("Microchip 工程师社区"),e(a)])]),n("p",null,[n("a",y,[s("Development Tools"),e(a)])]),n("p",null,[n("a",g,[s("XC Compilers"),e(a)])]),n("p",null,[n("a",f,[s("Developer Help"),e(a)])]),n("p",null,[n("a",x,[s("Microchip Taiwan"),e(a)])]),n("p",null,[n("a",C,[s("Microchip SMPS Control Library"),e(a)])])])}const E=t(r,[["render",w],["__file","01.XC8使用笔记.html.vue"]]);export{E as default};
