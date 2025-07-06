---
# 你可以自定义封面图片
#cover: /assets/images/cover2.jpg
# 这是页面的图标
icon: pen-to-square
# 这是文章的标题
title: 基于连续系统设计的CCM Buck变换器(电压模式控制)
# 这是侧边栏的顺序
#order: 3
author: 口袋数字电源
# 设置写作时间
date: 2025-07-01
# 一个页面可以有多个分类
category:
  - Buck
# 一个页面可以有多个标签
tag:
  - Buck
  - 3P3Z
# 此页面会出现在星标文章中
star: true
# 此页面会在文章列表置顶
sticky: false
---

本文主要介绍Buck的参数的计算和电压模式控制的Buck仿真。

仿真文件在开发板的资料中。

<!-- more -->



## 参数计算

<center>
<img src="/assets/blog_image/Buck/Buck_HW1.png">
<center> Biricha Digital Power</center>
</center>

参考Biricha数字电源培训文档，Buck的电感为$22uH$，Buck输出电容为$440uF$。

### Buck参数定义：

定义输入电压的的范围如下：

$Vin_{nom} = 12V , Vin_{max} = 12V , Vin_{min} = 12V$

定义输出电压的的范围如下：

$Vout_{nom} = 5V , Vout_{max} = 5V , Vout_{min} = 5V$

定义输出的额定电流和最大电流：

$Iout_{nom} = 3.5A , Iout_{max} = 3.5A$

定义工作频率：

$f_{switch} = 100kHz$

### Buck电感计算


Buck模式下，输入最大电压和最小输出电压的条件下，计算最小占空比：

$$ D_{min} = \frac{Vout_{min}}{Vin_{max}} = 41.667 \%$$

Buck模式下，定义电感电流波动量（为了兼容Biricha文档的电感量，取40%）：

$$ \Delta I_L = 0.40 \cdot Iout_{nom} =1.4A$$

Buck模式下，最小的电感计算：

$$Lmin_{Buck} = \frac{Vout_{min}}{\Delta I_L \cdot f_{switch}} \cdot( 1- D_{min}) = 20.833uH$$

综合上述计算结果，留有一定余量 取Buck电感：

$$ L_{BB} = 22uH$$



### Buck输出电容计算

定义输出纹波电压（为了兼容Biricha文档的电容，取0.1%）：

$$ \Delta Vout =5V \cdot 0.1\% =  0.005V$$

Buck模式下，计算出输出电容：

$$Cmin_{Buck} = \frac{Vout_{min} \cdot (1 - \frac{Vout_{min}}{Vin_{max}})}{8 \cdot L_{BB} \cdot \Delta Vout \cdot ( f_{switch})^2} = 331.439 uF$$

选择两个220uF的电容作为总输出电容：

$$C_{BB}= 440 uF$$



### MOSFET选型

可以使用[Power Stage Designer 5](https://www.ti.com.cn/tool/cn/POWERSTAGE-DESIGNER) （或者仿真）查看MOSFET的电流和电压大小选择合适的MOSFET。



<center>
<img src="/assets/blog_image/Buck/PowerStageDesigner_Buck1.png">
<center> Power Stage Designer 5 的Buck电路</center>
</center>

<center>
<img src="/assets/blog_image/Buck/PowerStageDesigner_Buck2.png">
<center>Power Stage Designer 5 Buck电路的Q1波形</center>
</center>

假设电路上的MOSFET的最大电流为5A，则MOSFET选型的为最大电流2倍裕量以上（防止短路下电流过大冲击损坏），即选择大于10A的MOSFET。

MOSFET选型的额定耐压大于最大输入电压的1.25倍裕量（防止尖峰击穿），即选择大于$1.25 \cdot 12V = 15V$的MOSFET。

我们选择BSC0702LS-HXY，其参数如下：

$$V_{DS} = 60V , I_{D} = 125A , R_{DS(ON)}<2.9mΩ @ V_{GS}=10V$$

考虑到自然冷的情况，为尽量降低导通损耗和开关损耗，应用时选择导通内阻尽量小，且Coss较小的MOSFET。



### Buck变换器实例

综上Buck变换器电路参数：$Vin=12V，Vout=5.0V，Iout=3.5A，Vramp=1V，fs=200kHz，L=22uH，C=440uF，C_{ESR}=31mΩ（Biricha文档的数值）$。

根据上面的已经参数，可以计算出以下参数。

**直流增益**

$$ DC_{Gain}=20\cdot log_{10}(\frac{V_{in}}{V_{ramp}})=20\cdot log_{10}(\frac{12}{1})=21.58dB$$

**谐振双极点**

$$f_{LC} = \frac{1}{2\cdot \pi \sqrt{L \cdot C}} = 1617Hz$$

**ESR零点**

$$f_{Z\_ESR} = \frac{1}{2\cdot \pi  \cdot R_{ESR}\cdot C_{o}} = 11668Hz$$


计算的Python代码如下：

::: details
```Python
import math

# 电感参数
L = 22 * math.pow(10,-6) #uH
R_L = 0
# 电容参数
C = 220 * math.pow(10,-6)*2.0 #uF
R_C = 31*math.pow(10,-3) #mR


f_LC = 1/(2*math.pi*math.sqrt(L*C))
f_ESR = 1/(2*math.pi*R_C*C)
print("f_LC",f_LC)
print("f_ESR",f_ESR)
print("Gain",20*math.log10(12.0/1.0))

"""
f_LC 1617.642144129948
f_ESR 11668.250959816376
Gain 21.5836249209525
"""
```
:::


## 传递函数


Buck的精确传递函数：

$$G_{plant}(s)= V_{in}\cdot\frac{R_C\cdot C\cdot \ s +1}{(1+\frac{R_C}{R_{LOAD}})\cdot L \cdot C\cdot s^2 + (\frac{L}{R_{LOAD}} + R_L \cdot C+ R_C \cdot C+\frac{R_L\cdot R_C}{R_{LOAD}} \cdot C)\cdot s+ (1+\frac{R_L}{R_{LOAD}})}  $$


其中，$R_C$为输出电容的等效串联电阻，$R_L$为电感的等效串联电阻，$R_{load}$为负载电阻。因为$R_{L}≪R_{load}$，因此计算时，通常是可以被忽略的。所以近似传递函数如下：


$$
\begin{aligned}
G_{plant}(s) &\approx V_{in}\cdot \frac{1+ \frac{s}{\omega_{Z\_{ESR}}}}{1+\frac{\omega_{LC}\cdot  L}{R_{LOAD}}\cdot(\frac{s}{\omega_{LC}})+(\frac{s}{\omega_{LC}})^2} \\
&= V_{in}\cdot \frac{1+ \frac{s}{\omega_{Z\_{ESR}}}}{1+2\xi\cdot(\frac{s}{\omega_{LC}})+(\frac{s}{\omega_{LC}})^2} \\
&= V_{in}\cdot \frac{1+ \frac{s}{\omega_{Z\_{ESR}}}}{1+\frac{1}{Q}\cdot(\frac{s}{\omega_{LC}})+(\frac{s}{\omega_{LC}})^2} 
\end{aligned}
$$

其中：

$f_{z_{ESR}} = \frac{\omega_{Z\_{ESR}}}{2 \pi} = \frac{1}{2 \pi\cdot  R_C \cdot C}$

$f_{LC} = \frac{\omega_{LC}}{2 \pi} = \frac{1}{2 \pi\cdot  \sqrt{L\cdot C}}$

$\xi = \frac{\omega_{LC}\cdot  L}{2\cdot R_{LOAD}}$

$Q = \frac{ R_{LOAD}}{\omega_{LC}\cdot  L}$



### Plant 伯德图


根据上面的传递函数，可以使用Python画Plant的伯德图。



<center>
<img src="/assets/blog_image/Buck/BuckPythonOpenLoopBode1.png">
<center>Plant 传递函数的伯德图</center>
</center>

获得上面伯德图的Python代码如下。

::: details
```Python
import numpy as np
import matplotlib.pyplot as plt
import control as ctrl
import math
import scipy

print("Scipy version is ",scipy.__version__) 
print("Control version is ",ctrl.__version__)

def buck_bode():
    s = ctrl.tf('s')
    # 电感参数
    L = 22 * math.pow(10,-6) #uH
    R_L = 0
    # 电容参数
    C = 440 * math.pow(10,-6) #uF
    R_C = 31*math.pow(10,-3) #mF
    #输入和输出电压
    Vin = 12
    Vout = 5.0
    #稳态占空比
    D = Vout/Vin
    #额定负载
    Iout = 3.5
    R_load = Vout/Iout
    Pout = Iout*Vout

    f_ESR = 1/(2*np.pi*R_C*C)
    w_ESR = 2*np.pi*f_ESR
    f_LC = 1/(2*np.pi*np.sqrt(L*C))
    w_LC = 2*np.pi*f_LC
    # 近似传递函数
    Gplant_approx = Vin * (1+s/w_ESR)/(1+((w_LC*L)/(R_load)*(s/w_LC)) + (s/w_LC)*(s/w_LC)   )

    # 精确传递函数
    Gplant_accurate = Vin * (R_C*C*s+1)/((1+R_C/R_load)*L*C*s*s + (L/R_load + R_L*C+R_C*C+(R_L*R_L/R_load)*C)*s + (1+R_L/R_load))

    print("f_LC = %gHz f_ESR = %gHz)"%(f_LC,f_ESR))

    #Bode 图绘制
    f = np.logspace(2, 5, 1000)
    w = 2 * np.pi * f
    mag0,phase0,omega0=ctrl.bode_plot(Gplant_approx,w,dB=True,Hz=True,deg=True,plot=True,label=r'$G_{plant\_approx}$')
    mag0,phase0,omega0=ctrl.bode_plot(Gplant_accurate,w,dB=True,Hz=True,deg=True,plot=True,label=r'$G_{plant\_accurate}$')
    ax1, ax2 = plt.gcf().axes  # get subplot axes

    y1_limit = (ax1.get_ylim())
    ax1.vlines(f_LC, y1_limit[0], y1_limit[1], linestyles ="--", colors ="r")
    ax1.vlines(f_ESR, y1_limit[0], y1_limit[1], linestyles ="--", colors ="g")    



    y2_limit = (ax2.get_ylim())
    ax2.vlines(f_LC, y2_limit[0], y2_limit[1], linestyles ="--", colors ="r")
    ax2.vlines(f_ESR, y2_limit[0], y2_limit[1], linestyles ="--", colors ="g")

    plt.legend(loc ="lower left") 
    plt.show()

buck_bode()

"""
Scipy version is  1.14.1
Control version is  0.10.1
f_LC = 1617.64Hz f_ESR = 11668.3Hz)
"""
```
:::

### 理想开环传递函数


一个理想的$T_{OL}(s)$应具备以下条件:


1. P.M (Phase Margin 相位裕度)：增益为0dB时，相位与-180度的差量。必须至少有45度的裕度。
2. G.M (Gain Margin 增益裕度)：相位-180度时，增益与0dB的差量，一般最好有10dB的裕度。
3. P.M(Phase Margin 相位裕度)最好能调整，以便微调响应速度与系统灵敏度。
4. 最终输出电压与参考电压的误差必须尽可能小。



换句话说，最终$T_{OL}(s)$呈现出来的理想伯德图，需要符合上述条件。

反着来看，针对“最终输出电压与参考电压的误差必须尽可能达到小”，即$T_{OL}(s)$最终是一个积分器。

积分器的传递函数如下：

$$T_{OL}(s)=\frac{V_{err}(s)}{V_{out}(s)}=-\frac{Z_f}{Z_i}=-\frac{\frac{1}{s\cdot C_1}}{R_1}=-\frac{1}{s\cdot C_1\cdot R_1}$$

一个典型的OPA积分器,当频率接近零时，增益可以接近无穷大。这就意味着，直流稳态时，一点点小的误差都可以被放大并累加，控制系统就能根据这个放大后的误差去调整控制量，然而常有工程师对“无穷大”一次产生疑惑，放大这么多倍，输出还能收到控制？不是发散了？


关键在于，对一个电源控制系统而言，被放大的是系统输入的相对差值=（Vref-Vout）。当此差值因放大而收到控制，最终还是会趋近于0，而对于0放大无穷倍还是0。


频率低于$\frac{1}{2\cdot \pi R_1 \cdot C_1}$之前，整体增益都是正的，也就是输入信号被放大的意思。直到频率等于$\frac{1}{2\cdot \pi R_1 \cdot C_1}$时，增益等于0dB，也就是1倍的意思。再之后，当频率高于$\frac{1}{2\cdot \pi R_1 \cdot C_1}$，增益为负，输出信号开始缩小（或者衰减），频率越高，衰减越多。


<center>
<img src="/assets/blog_image/Buck/OPA积分器.png" >
<center> OPA积分器 </center>
</center>

<center>
<img src="/assets/blog_image/Buck/OPA积分器Bode.png" >
<center> OPA积分器伯德图 </center>
</center>


此时$T_{OL}(s)$传递函数为：

$$T_{OL}(s)=\frac{\omega_0}{s}$$

增益分析如同前面说明，扰动频率高于$f_c$之前，系统输入的相对差值=（Vref-Vout）对会被放大并控制。符合理想$T_{OL}(s)$的几个条件之一：


+ 最终输出电压与参考电压的误差必须尽可能小。




那么此时G.M. 与P.M. 多少呢？

上图的OPA积分器伯德图中，P.M.为$|-180 \degree -(-90 \degree) |= 90\degree$

G.M.则是无法直接得知，因为系统并没有发生$-180 \degree$的位置，当然这是理想，实际情况下，系统在高频处最终会发生$-180 \degree$的情况，此处暂时不讨论，至少G.M.可以肯定是足够的，又符合了下列两个条件：


+ P.M (Phase Margin 相位裕度)：增益为0dB时，相位与-180度的差量。必须至少有45度的裕度。
  
+ G.M (Gain Margin 增益裕度)：相位-180度时，增益与0dB的差量，一般最好有10dB的裕度。
  


接下来的问题是，如何符合最后一个条件：


+ P.M(Phase Margin 相位裕度)最好能调整，以便微调响应速度与系统灵敏度。



假设P.M.设计目标是70°，那么我们就需要想办法在$f_c$频率点，使其相位能够多“延迟”（90°-70°）=20°。是否还记得零极点的定义和特性？简单复习一下：在系统中放置一个极点，意味着对系统的某个频段减少增益，增加相位延迟现象。而在系统中放置一个零点，意味着对系统的某个频段增加增益，减少相位延迟现象。

你是否联想到什么了呢？是的！既然需要延迟相位，在$T_{OL}(s)$中，除了积分器，那就再加一个极点如何？结果如下图所示。


<center>
<img src="/assets/blog_image/Buck/理想开环传递函数1.png" >
<center> 理想开环传递函数伯德图 </center>
</center>

在系统中摆放一个高频极点（$f_{HFP}$：High Frequency Pole）后，其相位在$\frac{f_{HFP}}{10}$开始产生衰减，递减幅度是每十倍频衰减45°。其相位在$10 \cdot f_{HFP}$的时候衰减90°，整体相位落后至180°。

当$f_{HFP}$摆放得当，增益曲线经过$f_{c}$频率时，恰好再衰减20°。即可得到想要的P.M.设计目标=70°。G.M.也可以从上图中快速得知，并且符合设计规范。此时$T_{OL}(s)$已经符合前面所列的几个条件。成为了一个理想的$T_{OL}(s)$，其传递函数如下：

$$T_{OL}(s) = \frac{\omega_0}{s} \cdot \frac{1}{1+\frac{s}{\omega_{HFP}}}$$

上式可以看出，一个理想的$T_{OL}(s)$,其实就是包含着两个极点（$\omega_0 ， \omega_{HFP}$）的传递函数。


接下来我们可以进行计算几个重要频率，首先计算频宽$\omega_c$：

$$\omega_c = 2\pi  \cdot f_c$$

接着计算$\omega_{HFP}$:(其中-110°部分，可以根据实际应用进行调整)

$$\omega_{HFP} = - \frac{\omega_c }{tan(-110\degree - (-90\degree))} = - \frac{\omega_c }{tan(-20\degree )}$$

最后计算$\omega_0$，也就是一开始放置的积分器频率。

$$\omega_0 = \omega_c \cdot \sqrt{1+(\frac{\omega_c}{\omega_{HFP}})^2}$$

### 零极点对消法

<center>
<img src="/assets/blog_image/Buck/电源系统闭环框图.png" >
<center> 理想开环传递函数 </center>
</center>

+ $C(s)$是补偿器。
+ $H(s)$是控制对象。
+ $G(s)$是反馈环节。
+ $T(s)$是整体的开环传递函数。

$$T(s) = C(s) \cdot G(s) \cdot H(s) =  C(s) \cdot G_{plant}(s)$$

$$\begin{aligned}

T(s) &=\frac{\omega_0}{s} \cdot \frac{1}{1+\frac{s}{\omega_{HFP}}}\\
&=\bigg[ \frac{\omega_{p0}}{s} \cdot \frac{(1+\frac{s}{\omega_{z1}})}{(1+\frac{s}{\omega_{p1}})}\cdot \frac{(1+\frac{s}{\omega_{z2}})}{(1+\frac{s}{\omega_{p2}})}\bigg] \cdot \bigg[ V_{in}\cdot \frac{1+ \frac{s}{\omega_{Z\_{ESR}}}}{1+\frac{1}{Q}\cdot(\frac{s}{\omega_{LC}})+(\frac{s}{\omega_{LC}})^2} \bigg]

\end{aligned}$$


<center>
<img src="/assets/blog_image/Buck/零极点对消法2.png" >
</center>



上图零极点对消后，可以得到。

$$\omega_0 = \omega_{p0}\cdot V_{in}=\frac{\omega_0}{ V_{in}}\cdot V_{in}$$

$$\omega_{HFP} =  \frac{\omega_c }{tan(90\degree -PM)}$$


### 补偿器设计


环路设计目标：

1. 控制环路的穿越频率$f_c = 1kHz$

2. 相位裕度$PM = 50^\circ$

III型补偿器参数：


$$H_3(s)=\frac{\omega_{p0}}{s} \cdot \frac{(1+\frac{s}{\omega_{z1}})}{(1+\frac{s}{\omega_{p1}})}\cdot \frac{(1+\frac{s}{\omega_{z2}})}{(1+\frac{s}{\omega_{p2}})}$$


参考设计步骤如下：

1. $f_{z1} = f_{z2} = f_{LC} = \frac{1}{2 \pi\cdot  \sqrt{L\cdot C}}$  

2. $f_{p1} = f_{z\_{ESR}} = \frac{1}{2 \pi\cdot  R_C \cdot C}$

3. $f_{p2} = \frac{f_s}{2}$

4. $f_{p0} = \frac{f_c}{Vin}$

5. 为了得到设计目标的$f_c$和PM，需要对步骤3中的计算得到的$f_{p2}$和步骤4中计算得到的$f_{p0}$不断微调，最终是设计目标$f_c$和PM的一个择中选择。



<center>
<img src="/assets/blog_image/Buck/CloseLoopPython1.png" >
</center>


获得上面Bode图的Python参考代码如下：


::: details
```Python

import numpy as np
import matplotlib.pyplot as plt
import control as ctrl
import math
import scipy

print("Scipy version is ",scipy.__version__) 
print("Control version is ",ctrl.__version__)

def buck_bode(K_w_p0,K_w_p2):
    s = ctrl.tf('s')
    # 电感参数
    L = 22 * math.pow(10,-6) #uH
    R_L = 0
    # 电容参数
    C = 440 * math.pow(10,-6) #uF
    R_C = 31*math.pow(10,-3) #mF
    #输入和输出电压
    Vin = 12.0
    Vout = 5.0
    #稳态占空比
    D = Vout/Vin
    #额定负载

    Iout = 3.5
    R_load = Vout/Iout
    Vramp = 1

    f_ESR = 1/(2*np.pi*R_C*C)
    w_ESR = 2*np.pi*f_ESR
    f_LC = 1/(2*np.pi*np.sqrt(L*C))
    w_LC = 2*np.pi*f_LC
    # 近似传递函数
    Gplant_approx = Vin * (1+s/w_ESR)/(1+((w_LC*L)/(R_load)*(s/w_LC)) + (s/w_LC)*(s/w_LC)   )

    # 精确传递函数
    Gplant_accurate = Vin * (R_C*C*s+1)/((1+R_C/R_load)*L*C*s*s + (L/R_load + R_L*C+R_C*C+(R_L*R_L/R_load)*C)*s + (1+R_L/R_load))
    
    print("DC_Gain",str(20*math.log10(Vin/Vramp)))
    print("f_LC = %gHz f_ESR =  %gHz)"%(f_LC,f_ESR))

    # 设计目标 
    f_sw = 100e3
    fc = 1e3
    PM = 50
    
    # 补偿器设计
    # 步骤1
    f_z1 = f_LC
    f_z2 = f_LC
    w_z1 = 2*np.pi*f_z1
    w_z2 = 2*np.pi*f_z2
    # 步骤2
    f_p1 = f_ESR
    w_p1 = 2*np.pi*f_p1
    # 步骤3
    f_p2 = f_sw/2
    # w_p2 = 2*np.pi*f_p2
    w_p2 = K_w_p2 * 2*np.pi*f_p2 #乘以迭代系数

    # 步骤4
    f_p0 = fc/Vin
    #w_p0 = 2*np.pi*f_p0
    w_p0 = K_w_p0 * 2*np.pi*f_p0 #乘以迭代系数
    #步骤5，反复迭代f_p2和f_p0
    # III型补偿器
    Gcontrol = (w_p0/s)*((1+s/w_z1)*(1+s/w_z2))/((1+s/w_p1)*(1+s/w_p2))

    # 近似开环传递函数
    T_approx = Gplant_approx*Gcontrol
    # 精确开环传递函数
    T_accurate = Gplant_accurate*Gcontrol

    #相位裕度打印
    gm,pm,wgc,wpc = ctrl.margin(T_approx)

    f_pc = wpc/(2*np.pi)
    print("Phase margin: PM = %g °(at %g Hz)"%(pm,f_pc))

    #Bode 图绘制
    f = np.logspace(1, 6, 1000)
    w = 2 * np.pi * f

    mag0,phase0,omega0=ctrl.bode_plot(Gplant_approx,w,dB=True,Hz=True,deg=True,plot=True,label=r'$G_{plant\_approx}$')
    mag1,phase1,omega1=ctrl.bode_plot(Gcontrol,w,dB=True,Hz=True,deg=True,plot=True,label=r'$C_{control}$')
    mag2,phase2,omega2=ctrl.bode_plot(T_approx,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Total_{\_approx}$')

    #打印补偿器的传递函数
    #print(Gcontrol)

    print("f_z1 =",w_z1/( 2*np.pi))
    print("f_z2 =",w_z2/( 2*np.pi))
    print("f_p0 =",w_p0/( 2*np.pi))
    print("f_p1 =",w_p1/( 2*np.pi))
    print("f_p2 =",w_p2/( 2*np.pi))

    plt.legend(loc ="lower left") 
    plt.show()


buck_bode(K_w_p0 = 1,K_w_p2 = 1)


"""
Scipy version is  1.14.1
Control version is  0.10.1
DC_Gain 21.5836249209525
f_LC = 1617.64Hz f_ESR =  11668.3Hz)
Phase margin: PM = 30.8714 °(at 2466.61 Hz)

f_z1 = 1617.642144129948
f_z2 = 1617.642144129948
f_p0 = 83.33333333333333
f_p1 = 11668.250959816376
f_p2 = 50000.0
"""
```
:::


上面代码计算得到的环路结果如下：

> Phase margin: PM = 30.8714 °(at 2466.61 Hz) <br>

修改代码中fp0和fp2的位置，计算得到的环路结果如下：

> buck_bode(K_w_p0 = 3.0,K_w_p2 = 6.0)
> Phase margin: PM = 50.3122 °(at 4096.86 Hz)
> f_z1 = 1617.642144129948
> f_z2 = 1617.642144129948
> f_p0 = 249.99999999999997
> f_p1 = 11668.250959816376
> f_p2 = 300000.0 <br>



可以根据实际电路测量的伯德图，修改零点和极点的位置得到想要的环路结果。


## 电路仿真


打开开发板资料中的1.VMC_OP_Closed Loop的Mindi仿真文件（也可以使用SIMetrix-SIMPLIS软件打开），然后修改通过键盘F11，最后修改$f_{p0}和f_{p2}$的位置和Python中的一致。运行仿真的结果如下： 

<center>
<img src="/assets/blog_image/Buck/SIMPLIS_BuckVMC1.png" >
</center>

> Phase margin: PM = 50.229 °(at 3.94285 kHz)

接近上面Python计算的数值

> Phase margin: PM = 50.3122 °(at 4096.86 Hz)


## 参考文档

[1] CBB024D硬件计算

[2] 混合式数位与全数位电源控制实战

[3] 开关电源控制环路设计

[4] Designing Stable Digital Power Supplies
‍
[[5]基于Python - 实操电源系统环路设计（Ⅲ型补偿器）](https://www.bilibili.com/video/BV1kS4y1G7sA/?spm_id_from=333.999.0.0)


:::tip
本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。
:::
