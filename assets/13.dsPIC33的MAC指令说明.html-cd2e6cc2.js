import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as u,c as r,d as o,e as n,w as e,a as l,b as s,f as v}from"./app-795d25d7.js";const c="/blog/assets/blog_image/dsPIC/数字补偿器运算.png",_="/blog/assets/blog_image/dsPIC/数字格式_整数与小数.png",m="/blog/assets/blog_image/dsPIC/有符合小数格式.png",b="/blog/assets/blog_image/dsPIC/CORCON_内核控制寄存器.png",f="/blog/assets/blog_image/dsPIC/累加器正常饱和.png",C="/blog/assets/blog_image/dsPIC/MAC指令例子.png",g="/blog/assets/blog_image/dsPIC/MAC指令语法.png",x={},A=l("h1",{id:"dspic33的mac指令说明",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#dspic33的mac指令说明","aria-hidden":"true"},"#"),s(" dsPIC33的MAC指令说明")],-1),h=l("p",null,"MAC（相乘并累加）指令常用于数字补偿器的运算。",-1),p=l("img",{src:c},null,-1),q=l("p",null,"dsPIC33中数字补偿器的运算经常使用的是Q格式，如Q15。",-1),V=l("img",{src:_},null,-1),Q=l("img",{src:m},null,-1),W=l("p",null,"MAC指令使用前都会先设置CORCON（内核控制寄存器）=0x00C0（为小数乘法，普通饱和模式）。",-1),H=l("img",{src:b},null,-1),P=l("img",{src:f},null,-1),B=l("img",{src:C},null,-1),N=l("img",{src:g},null,-1),I=v(`<p>使用Python验证MAC指令例子。</p><details class="hint-container details"><summary>详情</summary><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
def Hex_to_Q15(hexVal):
    Buffer = 0
    if(hexVal &gt; ((2**(15)) - 1)):
        Buffer = hexVal - (2**(16))
    else:
        Buffer = hexVal

    return Buffer

def Hex_to_Q15_float(hexVal):
    intVal = Hex_to_Q15(hexVal)
    fVal = intVal/(2**(15))
    return fVal


def Hex_to_Q31(hexVal):
    Buffer = 0
    if(hexVal &gt; ((2**(31)) - 1)):
        Buffer = hexVal - (2**(32))
    else:
        Buffer = hexVal

    return Buffer

def Hex_to_Q31_float(hexVal):
    intVal = Hex_to_Q31(hexVal)
    fVal = intVal/(2**(31))
    return fVal


def float_to_Q31_String(fVal):

    intVal = int(fVal*(2**(31)))
    strReturn = &quot;&quot;
    if(intVal &gt;= 0):
        strReturn = &quot;0x&quot;+&quot;{:08X}&quot;.format(intVal)
    else:
        strReturn = &quot;0x&quot;+&quot;{:08X}&quot;.format((2**(32))+intVal)
    return strReturn



W4 = 0xA022
W5 = 0xB900
ACCA = 0x0012000000

print(&quot;W4(int) = &quot;,Hex_to_Q15(W4))
print(&quot;W5(int) = &quot;,Hex_to_Q15(W5))
print(&quot;ACCA(int) = &quot;,Hex_to_Q31(ACCA))

print(&quot;W4(float) = &quot;,Hex_to_Q15_float(W4))
print(&quot;W5(float) = &quot;,Hex_to_Q15_float(W5))
print(&quot;ACCA(float) = &quot;,Hex_to_Q31_float(ACCA))

ACCA = Hex_to_Q31_float(ACCA) + Hex_to_Q15_float(W4) * Hex_to_Q15_float(W5)
print(&quot;New ACCA(float) = &quot;,(ACCA))
print(&quot;New ACCA(hex) = &quot;,float_to_Q31_String(ACCA))


&quot;&quot;&quot;
W4(int) =  -24542
W5(int) =  -18176
ACCA(int) =  301989888
W4(float) =  -0.74896240234375
W5(float) =  -0.5546875
ACCA(float) =  0.140625
New ACCA(float) =  0.5560650825500488
New ACCA(hex) =  0x472D2400
&quot;&quot;&quot;


···

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,2);function M(R,w){const i=d("center"),t=d("font");return u(),r("div",null,[A,h,o(" more "),n(i,null,{default:e(()=>[p,n(i,null,{default:e(()=>[s(" 数字补偿器运算 ")]),_:1})]),_:1}),q,n(i,null,{default:e(()=>[V,n(i,null,{default:e(()=>[s(" 整数与小数 ")]),_:1})]),_:1}),n(i,null,{default:e(()=>[Q,n(i,null,{default:e(()=>[s(" 有符合小数格式 ")]),_:1})]),_:1}),W,n(i,null,{default:e(()=>[H,n(i,null,{default:e(()=>[s(" CORCON内核控制寄存器 ")]),_:1})]),_:1}),n(i,null,{default:e(()=>[P,n(i,null,{default:e(()=>[s(" 累加器正常饱和 ")]),_:1})]),_:1}),n(t,{color:"red"},{default:e(()=>[s("**MAC指令例子如下：**")]),_:1}),n(i,null,{default:e(()=>[B,n(i,null,{default:e(()=>[s(" MAC指令例子 ")]),_:1})]),_:1}),n(i,null,{default:e(()=>[N,n(i,null,{default:e(()=>[s(" MAC指令语法 ")]),_:1})]),_:1}),I])}const S=a(x,[["render",M],["__file","13.dsPIC33的MAC指令说明.html.vue"]]);export{S as default};
