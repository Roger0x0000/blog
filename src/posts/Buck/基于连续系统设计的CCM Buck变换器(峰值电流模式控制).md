---
# 你可以自定义封面图片
#cover: /assets/images/cover2.jpg
# 这是页面的图标
icon: pen-to-square
# 这是文章的标题
title: 基于连续系统设计的CCM Buck变换器(峰值电流模式控制)
# 这是侧边栏的顺序
order: 2
author: 口袋数字电源
# 设置写作时间
date: 2025-07-06
# 一个页面可以有多个分类
category:
  - Buck
# 一个页面可以有多个标签
tag:
  - Buck
  - 2P2Z
# 此页面会出现在星标文章中
star: true
# 此页面会在文章列表置顶
sticky: false
---

本节主要介绍峰值电流模式Buck变换器的基本计算和SIMPLIS（Mindi）仿真。

仿真文件在开发板的资料中。

<!-- more -->

## 峰值电流模式

<center>
<img src="/assets/blog_image/Buck/峰值电流模式对比.jpg">
<center>峰值电流模式模拟与数字电源方块图对比</center>
</center>


上图峰电流模拟控制的Buck变换器包含了两个回路：

+ 外回路（电压控制回路）

此外回路类似电压模式下的电压控制回路。在电压模式下，Vcomp与“锯齿波”进行比较，然后产生占空比，换言之，Vcomp意义上就是“占空比”，直接控制电源输出。

而峰值电流模式下，Vcomp与“电感储能电流”进行比较，然后产生占空比，但有一点非常不一样，此时Vcomp意义上变成了“电感电流参考命令$I_{L(REF)}$”，真正决定“占空比”大小的，是电感电流的反馈信号，也就是电感电流本身，通过电流回路直接决定占空比，不再是电压回路直接决定占空比。

+ 内回路（电感电流控制回路）

此内回路将Vcomp（亦即$I_{L(REF)}$）与“电感储能电流”进行比较，然后产生占空比，直接控制电源输出。

从以上的说明，更白话一点，可以这么理解，内回路（电感电流控制回路）负责稳定电感电流，也就是控制对象就是一颗电感而已，不包含电容（一阶系统），此时电感形同一个纯电流源；外回路（电压控制回路）负责稳定电容电压，也就是控制对象是一个可调电流源与一颗电容，不直接包含电感（亦如同一阶系统），此时电容形同一个纯电压源。

其中电感电流的爬升斜率正比于输入电压$V_s$，因此输入电压改变时，直接影响占空比，即快速的对输入电压的响应，因此峰值电流模式，特别适合用在相对输入变化苛刻的应用，能极快消除输入电压变化而衍生的暂态响应。简化峰值电流控制模式如下图所示。



<center>
<img src="/assets/blog_image/Buck/峰值电流Buck等效电路.jpg">
<center>峰值电流模式Buck变换器等效电路图</center>
</center>

## 斜坡补偿


+ 次谐波震荡

<center>
<img src="/assets/blog_image/Buck/次谐波震荡示意图.png" >
<center> 次谐波震荡示意图 </center>
</center>

当$I_L$等于$V_{Comp}(=I_{REF})$时，PWM开关信号关闭（降至0V），直到新的周期开始，PWM开关信号再次输出驱动信号。

假设$V_{Comp}$并没有改变的情况下，$I_L$持续顶到$V_{Comp}$后关闭PWM，周而复始，直到占空比大于50%时，系统会开始出现如上图所示的不稳定现象，此不稳定现象被称之为次谐波震荡。

其明显表现为PWM占空比开始呈现一大一小的状态，并且无法停止，直到“某条件”的到来，后面再讨论“某条件”是什么。

当次谐波震荡发生时，$I_L$频率转变成$f_{PWM}$的一半（一大一小PWM组合成另一个频率）。$I_{L(AVG)}$平均值不再是稳定值，延伸此现象，电容上的电压纹波主要就是与$I_L$成正比，因此输出电压会多出此频率的电压纹波，此电压纹波频率是$f_{PWM}$的一半，并且无法使用控制的方法解决，严重影响输出电压的品质。


> 实际案例中常见PWM占空比尚未达到50%，但却发现次谐波震荡已经开始？这是由于实际案例中，电感电流经过电流反馈电路后，发生失真的现象，导致次谐波震荡的发生时间点提前至占空比50%之前，甚至是40%也是有可能的。

那么所谓“某条件”到底是什么呢？

当系统稳定时，每一周期内的电感电流$I_L$，其起始值与结束时的电流值会保持一致，如下图（a）。

此时占空比D:

$D = \frac{S_f}{S_r + S_f}$


<center>
<img src="/assets/blog_image/Buck/次谐波震荡条件.png" >
<center> 次谐波震荡条件 </center>
</center>

当电感电流$I_L$结束时的电流值“大于”起始值时，系统开始震荡，并且无法收敛，如上图(b)。其中，$I_{L(Min)}$指系统静态稳定时，电感最小电流，参考图(a)。


而$\delta(n)$则定义为$I_{L(Min)}$减电感初始电流$I_{L(Init)}$，即：参考图(b)。

$$\delta(n) = I_{L(Min)} - I_{L(Init)}$$

而$\delta(n+1)$则定义为电感最终电流$I_{L(End)}$减$I_{L(Min)}$，即：参考图(b)。

$$\delta(n+1) = I_{L(End)} - I_{L(Min)}$$

所以产生震荡的条件便是：

**单一PWM周期内，当发生$\delta(n+1)$ “大于” $\delta(n)$ 时，系统开始震荡，其关系式如下：**

$$\delta(n) =-\delta(n+1) \frac{S_f}{S_r}$$

其中电感电流上升斜率为$S_r$，电感电流下降斜率为$S_f$，当系统在$V_{Comp}$上加入一个负斜率补偿，使系统趋于稳定，如下图。

<center>
<img src="/assets/blog_image/Buck/次谐波震荡与斜率补偿.png" >
<center> 次谐波震荡与斜率补偿 </center>
</center>



系统引入的斜率补偿定义为$S_c$。

引入此$S_c$斜率后，静态稳定条件下，占空比D的计算不变，$D = \frac{S_f}{S_r + S_f}$。但震荡状态下的$\delta(n)$需要修正为：


$$\delta(n) = -\delta(n+1) \cdot \frac{S_f - S_c}{S_r + S_c}$$


系统开始震荡的条件为$\delta(n+1)$ “大于” $\delta(n)$ ，上式可以归纳出的稳定条件为：

$$\frac{S_f - S_c}{S_r + S_c}<1$$



加入斜率补偿后，系统稳定下的占空比为$D_M$，则$S_c$的稳定条件为：

$$D_M = \frac{S_f}{S_r + S_f}$$

$$S_c > \frac{S_f\cdot (2 \cdot D_{M} - 1)}{2 \cdot D_{M}}$$


至此，我们就能通过$S_c > \frac{S_f\cdot (2 \cdot D_{M} - 1)}{2 \cdot D_{M}}$，反算便能得知，斜率补偿$S_c$的实际数值大小需要多大，才能让系统恢复稳定状态。



注意一点，$S_c > \frac{S_f\cdot (2 \cdot D_{M} - 1)}{2 \cdot D_{M}}$只针对Buck架构，若使用其他架构，例如Boost、SEPIC等，需要则$S_c > \frac{S_r\cdot (2 \cdot D_{M} - 1)}{2 \cdot (1 - D_{M})}$


聪明的你，是否也想到一个有趣的问题？



在$V_{Comp}$加上一个负斜率解决次谐波震荡问题，那么是否可以反过来，在反馈信号上加上一个正斜率信号，同样达到$S_c$的稳定条件，可行吗？

答案是肯定的，可行，并且可实现！


<center>
<img src="/assets/blog_image/Buck/斜率补偿引入位置.png" >
<center> 斜率补偿引入位置 </center>
</center>


参考上图，斜率补偿的引入位置，有两个地方可供设计者依据实际状况而选择，一者至于是$V_{Comp}$的位置上，加上“负”斜率补偿，$V_{Comp}$变成非直线的反锯齿波；另一位置可以置于反馈位置上，加上“正”斜率补偿，使电感电流斜率加大，两种方法都可以在同样的占空比下，关闭PWM输出，达到稳定系统的目的。

>实际案例中，斜率补偿并非一定是负斜率或者正斜率，主要根据设计者放置的位置所决定，千万别死背一种！


常见计算补偿器斜率还有两种方法：

+ 引入一个斜率补偿，使得谐振峰值的Q值可以减少至1；
+ 引入一个斜坡补偿，并使其斜率为电感电流下降斜率的50%，这也是当前最常被选用的简单方法。

此处引用Ridley博士相关论文研究结论。

<center>
<img src="/assets/blog_image/Buck/斜率补偿Vc_pp.png" >
<center> 斜率补偿Vc_pp </center>
</center>

假设$V_{C\_PP}$为斜率补偿$S_c$的峰值电压，参考上图，其表示式为：

$$V_{C\_PP} = - \frac{(0.18-D)\cdot k_{iL}\cdot T_{PWM}\cdot V_S \cdot n^2}{L}$$

其中：

$k_{iL}$为电感电流反馈增益，假设使用比流器（互感器）方式，其圈数比为1:100，比流器的输出电阻为20Ω，则$k_{iL}$为$20/100 = 0.2$。

$T_{PWM}$为PWM周期时间，假设为1/350kHz。


$V_S$为输入电压，假设为8V。

$n$为架构本身主变压器的圈数比，假设非隔离，没有变压器，$n=1$。

$L$为架构主电感，假设为56uH。

$D$为占空比，假设输出为5V，D约为62.5%。

求得$V_{C\_PP}$：

$$V_{C\_PP} = - \frac{(0.18-D)\cdot k_{iL}\cdot T_{PWM}\cdot V_S \cdot n^2}{L}=36.33mV$$

一般建议增加设计裕量2~2.5倍，因此建议$V_{C\_PP}$约90mV。

假设在电感电流反馈信号上加上“正”斜坡补偿，使电感电流斜率加大，如下图。


<center>
<img src="/assets/blog_image/Buck/正斜率补偿方式.png" >
<center> 正斜率补偿方式 </center>
</center>


上图是一种最典型的补偿线路方式，只需要一个二极管和一组RC充电线路。二极管用来快速放电，RC则是利用PWN驱动电压对RC充电，进而产生一个RC充电上升斜率电压，此上升斜率电压将原本的电流反馈信号垫高，其充电RC常数的换算公式如下：

$$V_{C\_PP} = V_o \cdot(1 - e^{-\frac{T_{PWM}}{R_{SC}\cdot C_{SC}}})$$


$R_{SC}$建议至少产生100uA的电流以上，假设驱动电压为5V，建议$R_{SC} \leq \frac{5V}{100uA}$，取4.99kΩ。


移动式子$V_{C\_PP} = V_o \cdot(1 - e^{-\frac{T_{PWM}}{R_{SC}\cdot C_{SC}}})$，可得$C_{SC}$的计算公式：

$$C_{SC} \leq \frac{-T_{PWM}}{R_{SC} \cdot ln(1-\frac{V_{C\_PP}}{V_o})} $$

代入求解，可得$C_{SC}$约需 $\leq  31.24nF$，可以取常见的27nF。




**此时是否有个疑问？补偿有效很容易验证，但补偿的设计裕量怎么验证是否足够？**

<center>
<img src="/assets/blog_image/Buck/斜坡补偿波特图.png" >
<center> 斜坡补偿波特图 </center>
</center>


>我们可以使用波特图来做最后的验证，上图中有两种曲线，虚线指Plant但不含斜率补偿控制，实线部分则是同样的Plant且含斜率补偿控制。此例假设$f_{PWM}$为PWM开关频率等于350kHz，在上图中可以找到奈奎斯特频率$F_N = \frac{f_{PWM}}{2}=175kHz$。此频率下，若未做斜率补偿，增益将有机会回到0dB，造成系统震荡，而震荡频率就是$F_N$，也就是$\frac{f_{PWM}}{2}$。建议读者测量伯德图，并且确认$F_N$频率点，其增益是否接近0dB，即可判断斜率补偿是否成功，或者裕量是否足够。


建议设计裕量可以预留$-10dB ~ -20dB$。


## 传递函数

<center>
<img src="/assets/blog_image/Buck/峰值电流模式Buck.png" >
<center> 峰值电流模式Buck变换器 </center>
</center>


其中：

+ $V_{in}$为输入电压，单位V(伏特)
+ $V_{o}$为输出电压，单位V(伏特)
+ $L$为电感，单位H(亨)
+ $C$为电容，单位F(法拉)
+ $R_C$为电容的等效串联电阻，单位Ω(欧姆)
+ $T_S$开关周期，单位s(秒)
+ $R$为负载电阻，单位Ω(欧姆)
+ $R_i$为电感的电流互感器的增益，单位Ω(欧姆)
+ $S_e$为斜坡补偿的斜率
+ $S_n$为电感电流的上升斜率
+ $S_f$为电感电流的下降斜率

### 精确的传递函数


$$H(s) = H_{dc}\cdot F_p(s) \cdot F_h(s)$$

其中：

$H_{dc}$为DC增益，$F_p(s)$功率级小信号模型，$F_h(s)$为高频传递函数。


$$H_{dc} = \frac{R}{R_i} \cdot \frac{1}{1+\frac{R\cdot T_s \cdot(m_c \cdot D^{'} - 0.5)}{L}}$$

$$F_p(s) = \frac{1+s \cdot C \cdot R_c}{1+\frac{s}{\omega_p}}$$

$$F_h(s) = \frac{1}{1+\frac{s}{\omega_n \cdot Q_p}+\frac{s^2}{\omega_n^2 }}$$



$$\omega_p = \frac{1}{C \cdot R}+\frac{T_s (m_c \cdot D^{'} - 0.5)}{L \cdot C}$$



$$\omega_n = \frac{\pi}{T_s}$$

$$Q_p = \frac{1}{\pi(m_c \cdot D^{'}-0.5)}$$

$$m_c = 1+\frac{S_e}{S_n}$$

### 近似的传递函数

**近似的传递函数1**

$$H(s) \approx A_{VC} \cdot \frac{1+\frac{s}{\omega_Z}}{(1+\frac{s}{\omega_P}) \cdot (1+\frac{s}{\omega_L})}$$



$A_{VC} \approx \frac{R}{R_i}$

$\omega_P \approx \frac{1}{C \cdot R}$

$\omega_L = \frac{K_m \cdot R_i}{L}$

$K_m \approx \frac{V_{in}}{V_{slope}}$ at  D = 0.5

$V_{slope} = \frac{V_{out}\cdot R_i \cdot T_s}{L}$

$\omega_Z \approx \frac{1}{C \cdot R_C}$


**近似的传递函数2**

$$H(s) \approx \frac{R}{R_i} \cdot \frac{1+s\cdot R_{c} \cdot C}{1+s\cdot (R_{c}+R) \cdot C} = \frac{R}{R_i} \cdot\frac{1+\frac{s}{\omega_z}}{1+\frac{s}{\omega_p}}$$


$w_z = \frac{1}{C \cdot R_c}$

$w_p = \frac{1}{C \cdot (R_c+R)}\approx  \frac{1}{C \cdot R}$

>Plant中有一个极点和一个零点。

>$f_p =\frac{1}{2\cdot \pi \cdot R \cdot C}$，$f_p$与R成反比，所以当负载变动时，会使系统低频增益跟着变动。负载最重（R最小）时，$f_p$达到最高$f_{p(Max)}$；反之，负载最轻（R最大）时，$f_p$达到最低$f_{p(Min)}$。所以系统低频增益是一个区域范围，实际位置主要由负载R决定（负载越重低频增益越低）。


<center>
<img src="/assets/blog_image/Buck/负载和增益的关系.png" >
<center> 负载和增益的关系的伯德图 </center>
</center>



### Plant 伯德图


根据上面的传递函数，可以使用Python画Plant的伯德图。



<center>
<img src="/assets/blog_image/Buck/Buck_PCM_OpenLoop_Python.png">
<center>Plant 传递函数的伯德图</center>
</center>

获得上面伯德图的Python代码如下。

::: details
```Python

import numpy as np
import matplotlib.pyplot as plt
import control as ctrl
import math

#推荐使用 control 0.8.3

def buck_bode(Vin_Input,Rload):
    s = ctrl.tf('s')
    # 电感参数
    L = 22 * math.pow(10,-6) #uH
    R_L = 0*math.pow(10,-3) #m
    # 电容参数
    Co = 440 * math.pow(10,-6) #uF
    Rc = 31*math.pow(10,-3) #m   capacitor ESR (Equivalent Series Resistance) in ohm
    #输入和输出电压
    Vin = Vin_Input
    Vout = 5.0
    #稳态占空比
    D = Vout/Vin
    Dp = 1-D
    #额定负载

    R = Rload   # load resistance in ohm
    fs = 100e3
    Ts = 1/fs

    #Gi = 10     # 电流放大倍数
    #Rs = 20e-3  # 20mΩ   
    #Ri = Gi*Rs  # inductor current sense transformer gain in ohm
    Ri = 1.0*0.020*10.0

    Se = 0.5 # slope of compensation ramp
    Sn = 1.0 # rising slope of inductor current
    Mc = 1+Se/Sn
    #Mc = (1+ np.pi/2)/(np.pi*(1-D))
    wp = 1/(Co*R) + (Ts*(Mc*Dp-0.5))/(L*Co)
    wn = np.pi/Ts
    Qp = 1/(np.pi*(Mc*Dp-0.5))

    Hdc = (R/Ri)*(1/(1+R*Ts*(Mc*Dp-0.5)/L))
    Fp = (1+s*Co*Rc)/(1+s/wp)
    Fh = 1/(1+s/(wn*Qp)+(s*s)/(wn*wn))
    Gc_plant1 = Hdc*Fp*Fh  # 精确的传递函数

    Vslope = (Vout*Ri*Ts)/L
    print("Vslope = ",Vslope)
    Km = Vin/Vslope
    A_VG = (R/Ri)
    w_p = 1/(Co*R)
    w_L = (Km*Ri)/L
    w_z = 1/(Co*Rc)
    Gc_plant2 = A_VG*(1+s/w_z)/((1+s/w_p)*(1+s/w_L))  # 近似传递函数


    Gc_plant3 = (R/Ri)*(1+s*Rc*Co)/(1+s*(Rc+R)*Co)    # 近似传递函数

    #Bode 图绘制
    f = np.logspace(1, 6, 1000)
    w = 2 * np.pi * f

    mag0,phase0,omega0=ctrl.bode_plot(Gc_plant1,w,dB=True,Hz=True,deg=True,plot=True,label="H1: " +r'$M_{c}=$'+str(round(Mc,4))+r', $Q_{p}=$'+str(round(Qp,4)))
    mag1,phase1,omega1=ctrl.bode_plot(Gc_plant2,w,dB=True,Hz=True,deg=True,plot=True,label="H2: " + r'$M_{c}=$'+str(round(Mc,4))+r', $Q_{p}=$'+str(round(Qp,4)))
    mag2,phase2,omega2=ctrl.bode_plot(Gc_plant3,w,dB=True,Hz=True,deg=True,plot=True,label="H3: " + r'$M_{c}=$'+str(round(Mc,4))+r', $Q_{p}=$'+str(round(Qp,4)))
    #plt.legend(loc ="lower right") 
    #plt.show()

buck_bode(12.0,1.5) #12V,1.5ohm


plt.legend(loc ="lower right") 
ax1, ax2 = plt.gcf().axes  # get subplot axes
ax1.set_title("Peak Current Mode Control of Buck")

plt.show()
```
:::


### 补偿器设计


从近似的传递函数2中，建议看出系统是一个单极点系统，因此补偿器只需要一个零点与其对消即可。所以多数选择Type2补偿器，包含两个极点一个零点。

若需要更高的相位提升裕度，可以选择Type3补偿器，包含三个极点两个零点。

下面以Type2补偿器为例。

+ 补偿器有两个极点$f_{p0}$和$f_{p1}$，一个零点$f_{z1}$；
+ Plant中有一个极点$f_p$和一个零点$f_z$。


>补偿器的原点极点$f_{p0}$：决定直流增益（DC Gain）和系统穿越频率$f_c$

>补偿器的零点$f_{z1}$：对消Plant传递函数中的低频极点$f_p$

>补偿器的极点$f_{p1}$：对消Plant传递函数中的电容ESR的零点$f_z$

在此，提供一个通用的快速设计顺序参考：（注意这个方法通常可以得到70~75°的P.M.，但是仅指模拟控制，不包含数字控制导致的相位损失，并且也不包含奈奎斯特频率导致的二次相位损失，因此此方法不适合需要精准P.M.的场合）


1. 设置穿越频率$f_c$。
   
>通常模拟控制最大$f_c$频率是$\frac{f_{PWM}}{10}$，而数字控制则建议最大$f_c$频率是$\frac{f_{PWM}}{20}$。

2. 设置补偿控制器的零点$f_{z1}$

>可设置在Plant传递函数中低频的极点$f_p$，$\omega_p = \frac{1}{C \cdot R}$，$f_{z1}=f_p=\frac{1}{2\cdot \pi \cdot R \cdot C}；$

>另一个建议是可以放置在$f_{z1}=\frac{f_c}{5}$，据此P.M.可以有所提升。

3. 设置补偿控制器的极点$f_{p1}$

>可设置在Plant传递函数中电容ESR的零点$f_z$，$w_z = \frac{1}{C \cdot R_c}$，$f_{p1}=f_z=\frac{1}{2\cdot \pi \cdot R_c \cdot C}；$


4. 设置补偿控制器的原点极点$f_{p0}$

>$f_{p0}=\frac{1.23\cdot f_c \cdot R_i\cdot (L+0.32 \cdot R\cdot T_s) \cdot  \sqrt{1- 4\cdot f_c^2 \cdot T_s^2  +16  \cdot f_c^4 \cdot T_s^4 }\cdot \sqrt{1+\frac{39.48 \cdot C^2 \cdot f_c^2 \cdot L^2 \cdot R^2}{(L+0.32\cdot R \cdot T_s)^2}}}{2\cdot \pi \cdot L \cdot R}$ 


5. 设置斜坡补偿

>参考前面的斜坡补偿内容。

以上五个步骤，可以快速完成一般降压类型变换器的峰值电流控制的补偿器。




下面我们使用Python进行补偿器的计算。

<center>
<img src="/assets/blog_image/Buck/Buck_PCM_CloseLoop_Type2.png" >
<center> 峰值电流模式Buck变换器的近似伯德图 </center>
</center>


获得上面Bode图的Python参考代码如下：


::: details
```Python

import numpy as np
import matplotlib.pyplot as plt
import control as ctrl
import math

#推荐使用 control 0.8.3

def buck_bode(Vin_Input,Rload):
    s = ctrl.tf('s')
    # 电感参数
    L = 22 * math.pow(10,-6) #uH
    R_L = 0*math.pow(10,-3) #m
    # 电容参数
    Co = 440 * math.pow(10,-6) #uF
    Rc = 31*math.pow(10,-3) #m   capacitor ESR (Equivalent Series Resistance) in ohm
    #输入和输出电压
    Vin = Vin_Input
    Vout = 5.0
    #稳态占空比
    D = Vout/Vin
    Dp = 1-D
    #额定负载

    R = Rload   # load resistance in ohm
    fs = 100e3
    Ts = 1/fs

    #Gi = 10     # 电流放大倍数
    #Rs = 20e-3  # 20mΩ   
    #Ri = Gi*Rs  # inductor current sense transformer gain in ohm
    Ri = 1.0*0.020*10.0


    Vslope = (Vout*Ri*Ts)/L
    print("Vslope = ",Vslope)
    Km = Vin/Vslope
    A_VG = (R/Ri)
    w_p = 1/(Co*R)
    w_L = (Km*Ri)/L
    w_z = 1/(Co*Rc)
    Gc_plant2 = A_VG*(1+s/w_z)/((1+s/w_p)*(1+s/w_L))

    Gc_plant = (R/Ri)*(1+s*Rc*Co)/(1+s*(Rc+R)*Co)

    # 步骤1 设置穿越频率f_c
    fc = 5e3
    # 步骤2 设置补偿控制器的零点
    #f_z1 = fc*(1/5)
    f_z1 = 1/(2*math.pi*Rload*Co)
    # 步骤3 设置补偿控制器的极点
    f_esr = 1/(2*np.pi*Rc*Co)
    f_p1 = f_esr
    # 步骤4 设置补偿控制器的原点极点f_{p0}
    f_p0 = (1.23*fc*Ri*(L+0.32*R*Ts) * np.sqrt(1-4*(fc*fc)*(Ts*Ts)+16*(fc**4)*(Ts**4))* np.sqrt(1+(39.48*Co*Co*fc*fc*L*L*R*R)/((L+0.32*R*Ts)*(L+0.32*R*Ts))))/(2*np.pi*L*R)

    print("f_z1 =",f_z1)
    print("f_p1 =",f_p1)
    print("f_p0 =",f_p0)

    #步骤5 斜坡补偿计算
    n = 1
    V_cpp = -((0.18-D)*Ri*Ts*Vin*n*n)/(L)
    print("V_cpp = %g mV"%(V_cpp*1000.0))
    print("2.5*V_cpp = %g V"%(2.5*V_cpp))
    V_cpp = 2.5*V_cpp
    #V_cpp = 0.090 
    print("V_cpp = %g V"%(V_cpp))
    V_Driver = 5.0
    Rsc = V_Driver/(100e-6) #100uA
    print("Rsc = %g k ohm"%(Rsc/1000)) #50k ohm
    Rsc = 4.99e3  #Rsc 取 4.99kohm 
    print("Rsc = %g  ohm"%(Rsc)) # ohm
    Csc = (-Ts)/(Rsc*math.log((1-V_cpp/Vout))) #math.log(x)就是数学中的ln(x) 
    print("Csc = %g nF"%(Csc*1e9))
    Csc = 27*1e-9
    print("Csc = %g nF"%(Csc*1e9))
    #Csc取 27nF

    w_p0 = 2*np.pi*f_p0      # DC gain of type 2 compensator
    w_z1 = 2*np.pi*f_z1      # frequency of type2 zero
    w_p1 = 2*np.pi*f_p1      # frequency of type2 pole1
    H_Type2 = (w_p0/s)*(1+s/w_z1)/(1+s/w_p1)

    #Bode 图绘制
    f = np.logspace(1, 6, 1000)
    w = 2 * np.pi * f


    H_Total = Gc_plant2*H_Type2

    #相位裕度打印
    gm,pm,wgc,wpc = ctrl.margin(H_Total)

    f_pc = wpc/(2*np.pi)
    print("Phase margin: PM = %g °(at %g Hz)"%(pm,f_pc))
    
    mag2,phase2,omega2=ctrl.bode_plot(Gc_plant2,w,dB=True,Hz=True,deg=True,plot=True,label="Plant")
    mag2,phase2,omega2=ctrl.bode_plot(H_Type2,w,dB=True,Hz=True,deg=True,plot=True,label="Type2")
    mag2,phase2,omega2=ctrl.bode_plot(H_Total,w,dB=True,Hz=True,deg=True,plot=True,label="Total")
    
    
    #plt.legend(loc ="lower right") 
    #plt.show()

buck_bode(12.0,1.50) #12V,1.5ohm


plt.legend(loc ="lower right") 
ax1, ax2 = plt.gcf().axes  # get subplot axes
ax1.set_title("Peak Current Mode Control of Buck")

plt.show()

"""
Vslope =  0.4545454545454546
f_z1 = 241.14385316953843
f_p1 = 11668.250959816376
f_p0 = 2697.2688625161745
V_cpp = 258.182 mV
2.5*V_cpp = 0.645455 V
V_cpp = 0.645455 V
Rsc = 50 k ohm
Rsc = 4990  ohm
Csc = 14.4989 nF
Csc = 27 nF
Phase margin: PM = 64.4591 °(at 18252.6 Hz)
"""
```
:::


上面代码计算得到的环路结果如下：

> Phase margin: PM = 64.4591 °(at 18252.6 Hz) <br>

可以根据实际电路测量的伯德图，修改零点和极点的位置得到想要的环路结果。


## 电路仿真


打开开发板资料中的2.PCMC_OP_Closed Loop的Mindi仿真文件（也可以使用SIMetrix-SIMPLIS软件打开），然后修改通过键盘F11，最后修改参数和Python中的一致（如负载）。运行仿真的结果如下： 

> Phase margin: PM = 55.25 °(at 14.6 kHz)

<center>
<img src="/assets/blog_image/Buck/Buck_PCM_CloseLoop_SIMPLIS1png.png" >
</center>



## 参考文档

[1] CBB024D硬件计算

[2] 混合式数位与全数位电源控制实战

[3] 开关电源控制环路设计

[4] Designing Stable Digital Power Supplies
‍

:::tip
本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。
:::
