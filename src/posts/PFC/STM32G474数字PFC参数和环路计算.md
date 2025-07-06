---
# 你可以自定义封面图片
#cover: /assets/images/cover2.jpg
# 这是页面的图标
icon: pen-to-square
# 这是文章的标题
title: STM32G474数字PFC参数和环路计算
# 这是侧边栏的顺序
order: 2
author: 口袋数字电源
# 设置写作时间
date: 2025-07-07
# 一个页面可以有多个分类
category:
  - PFC
# 一个页面可以有多个标签
tag:
  - PFC
  - PI
# 此页面会出现在星标文章中
star: true
# 此页面会在文章列表置顶
sticky: false
---

本文主要介绍PFC的环路计算。


<!-- more -->

## 参数计算

    待添加。

## 工作原理

    待添加。

## PI补偿器计算

    待添加。

## PFC环路计算

<center>
<img src="/assets/blog_image/PFC/PFC_block1.png">
<center> PFC升压转换器电流环和电压环</center>
</center>

### 电流环路计算

<center>
<img src="/assets/blog_image/PFC/PFC_block2.png">
<center> 电流环</center>
</center>

从上图可以得到，

$T_i(s)$的传递函数如下：

$$
T_i(s) = H_i(s) \cdot K_{iSense}\cdot ADC \cdot DPWM \cdot G_{i}(s)
$$

未补偿的回路的传递函数如下：

$$
\frac{T_i(s)}{G_{i}(s)} = H_i(s) \cdot K_{iSense}\cdot ADC \cdot DPWM
$$

占空比到电感电流$\frac{i_L}{d}$的传递函数，

$$
H_i(s) = \frac{V_o}{s \cdot L}
$$

电感电流采样的增益（采样电阻乘以运放的放大倍数）：

$$
K_{iSense} = R_{sense}  \cdot K_{OpAmp}
$$

ADC转换的增益（12位的ADC左移3位变成15位的）：

$$
ADC = \frac{2^{15} - 1}{3.3}
$$

PWM模块的增益：

$$
DPWM = \frac{1}{DPWM  Counts}
$$

MCU 使用的是高分辨率的PWM，PWM 的时钟为170MHz× 16 \= 2720MHz，Buck 的开关频率为60kHz，所以PWM 的周期寄存器（DPWM  Counts）为45333.。

‍

硬件的采样电路如下：


<center>
<img src="/assets/blog_image/PFC/PFC_block3.png">
<center> 功率回路</center>
</center>

<center>
<img src="/assets/blog_image/PFC/PFC_block4.png">
<center> 电流采样</center>
</center>

<center>
<img src="/assets/blog_image/PFC/PFC_block5.png">
<center> 电压采样</center>
</center>


根据上面的硬件参数，使用Python画出传递函数的伯德图如下：

<center>
<img src="/assets/blog_image/PFC/PFCiLoop1.png">
<center> 未补偿的回路的传递函数的伯德图</center>
</center>


开发板的程序中的PI补偿器的参数如下：

```C
/*
    fc = 2000 Hz
    fz = 1678.1992623545598 Hz
    fp0 = 1630.6002043566411 Hz
    wz = 10544.43694774579
    wp0 = 10245.363245897679
    Ts = 1.6666666666666667e-05
    Ti = 9.483673760444668e-05
    Kp = 0.9716368258134402
    Ki = 0.17075605409829467

 */
//电流环 PI 参数
#define  I_KP   (float)(0.9716368258134402)
#define  I_KI   (float)(0.17075605409829467)
```

$$
G_{iComp} = \omega_{p0} \cdot \frac{1+ \frac{s}{\omega_{z1}}}{s}
$$

其中PI 补偿器的极点和零点分别为：

$$
f_{p0} = 1630.6002043566411Hz ， f_{z1} = 1678.1992623545598Hz , (   \omega = 2\cdot \pi \cdot f)
$$

未补偿的回路$Gi_{Uncomp}$、PI补偿器$Gi_{Comp}$和补偿后$Gi_{Loop}$的伯德图如下：

其中补偿后$Gi_{Loop}$的穿越频率为2kHz。

<center>
<img src="/assets/blog_image/PFC/PFCiLoop2.png">
<center> 电流环的伯德图</center>
</center>

获得上面电流环伯德图的Python代码如下：

::: details
```Python
from telnetlib import PRAGMA_HEARTBEAT
import numpy as np
import matplotlib.pyplot as plt
import control as ctrl
import math
import scipy

print("Scipy version is ",scipy.__version__) 
print("Control version is ",ctrl.__version__)

s = ctrl.tf('s')

Vin = 24.0        # 输入电压
Vout = 40.0       # 输出电压
Pout = 40.0       # 输出功率    
Co = 2*1000.0e-6  # 输出电容 2000uF
L = 220e-6  #uH   # 电感 
f_PWM = 60e3      # 开关频率 60kHz

Iout = Pout/Vout  # 计算输出电流
Rload = Vout/Iout # 计算输出负载电阻
D = 1-Vin/Vout    # 占空比

fclock = 170e6*16 # MCU的PWM模块的时钟 170MHz*16 

PWM_Period_Reg = fclock/f_PWM   # 计算周期寄存器
DPWM  = 1/ PWM_Period_Reg       # PWM模块的增益  DPWM
Gain_PWM_dB = 20*math.log10(DPWM )  

R_Sense = 0.015             # 电流才电阻
KopAmp = (3.3/0.2)          # 电流采样的运算放大器的倍数 
KiSense = R_Sense*KopAmp    # 电流采样的增益
KvSense = ((2.0e3)/(51.0+30e3+2.0e3)) # 电压采样的增益
Kadc = 32767.0/3.3  # ADC 增益， 12位ADC左移3位，变成15位ADC  2^15= 32768


def Current_Plant():
    """
    fc = 2000 Hz
    fz = 1678.1992623545598 Hz
    fp0 = 1630.6002043566411 Hz
    wz = 10544.43694774579
    wp0 = 10245.363245897679
    Ts = 1.6666666666666667e-05
    Ti = 9.483673760444668e-05
    Kp = 0.9716368258134402
    Ki = 0.17075605409829467
    """
    # 填充PI补偿器参数
    f_p0 = 1630.6002043566411
    w_p0 = 2*np.pi*f_p0

    f_z1 = 1678.1992623545598
    w_z1 = 2*np.pi*f_z1

    # PI 补偿器传递函数
    GiComp = w_p0*((1+s/w_z1)/(s))
    # 占空比到电感电流 的传递函数
    Hi = (Vout/(s*L)) #近似传递函数
    
    #  The total transport delay is approximated by a first-order Pade polynomial:
    Td = (1/f_PWM)/2
    Gtd = (1- (s*Td)/2)/(1+ (s*Td)/2) #延时传递函数,（没有使用）
    # 未补偿环路传递函数为：
    GiUncomp = (Hi)*(KiSense*Kadc*DPWM ) 
    GiLoop = GiUncomp*GiComp

    f = np.logspace(2, 5, 1000)
    w = 2 * np.pi * f
    # 画传递函数的伯德图
    mag,phase,omega=ctrl.bode_plot(GiUncomp,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Gi_{Uncomp}$')
    mag,phase,omega=ctrl.bode_plot(GiComp,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Gi_{Comp}$')
    mag,phase,omega=ctrl.bode_plot(GiLoop,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Gi_{Loop}$')

    fig = plt.gcf()
    axes = fig.get_axes()
    axes[0].set_title('Current Frequency Response')  

    plt.legend()
    plt.show()

Current_Plant()
```
:::


### 电压环路计算


<center>
<img src="/assets/blog_image/PFC/PFCvLoop1.png">
<center> 电压环</center>
</center>

从上图可以得到，

$T_v(s)$的传递函数如下：

$$
T_v(s) = H_v(s) \cdot K_{VoSense}\cdot ADC \cdot G_{v}(s) \cdot V_{inFeed} \cdot \frac{i_L}{I_{ref}}
$$

未补偿的回路的传递函数如下：

$$
\frac{T_v(s)}{ G_{v}(s)} = H_v(s) \cdot K_{VoSense}\cdot ADC  \cdot V_{inFeed} \cdot \frac{i_L}{I_{ref}}
$$

电感电流到输出电压$\frac{V_o}{i_L}$的传递函数如下：

$$
H_v(s) = \frac{R_o}{s\cdot C_o \cdot R_o +1} \cdot \frac{V_{in}}{V_{o}}
$$

输出电压的采样增益为：

$$
K_{VoSense} = ((2.0e3)/(51.0+30e3+2.0e3))
$$

ADC转换的增益（12位的ADC左移3位变成15位的）：

$$
ADC = \frac{2^{15} - 1}{3.3}
$$

输入电压前馈的增益：

$$
V_{inFeed} = \frac{V_{in}\cdot K_{VinSense} \cdot ADC}{V_{max}^2} =  \frac{V_{in}\cdot K_{VinSense} \cdot ADC}{(\sqrt{2}\cdot V_{in}\cdot K_{VinSense} \cdot ADC)^2}
$$

电感电流采样的增益（采样电阻乘以运放的放大倍数）：

$$
K_{iSense} = R_{sense}  \cdot K_{OpAmp}
$$

参考电流到电感电流($\frac{i_L}{I_{ref}}$)的传递函数

$$
\frac{i_L}{I_{ref}} =\frac{1}{K_{iSense} \cdot ADC_i}
$$

根据上面的硬件参数，使用Python画出传递函数的伯德图如下：

<center>
<img src="/assets/blog_image/PFC/PFCvLoop2.png">
<center> 未补偿的回路的传递函数的伯德图</center>
</center>


开发板的程序中的PI补偿器的参数如下：

```C
/*
    fz = 5.873697418240959 Hz
    fp0 = 1.0 Hz
    wz = 36.905529317110265
    wp0 = 6.283185307179586
    Ts = 0.0001
    Ti = 0.02709621074412762
    Kp = 0.1702505132277443
    Ki = 0.0006283185307179586
*/
//电压环 PI 参数
#define  V_KP   (float)(0.1702505132277443)
#define  V_KI   (float)(0.0006283185307179586)
```



$$
G_{vComp} = \omega_{p0} \cdot \frac{1+ \frac{s}{\omega_{z1}}}{s}
$$

其中PI 补偿器的极点和零点分别为：
$$
f_{p0} = 1.0 Hz ， f_{z1} = 5.873697418240959 Hz , (   \omega = 2\cdot \pi \cdot f)
$$

未补偿的回路$Gv_{Uncomp}$、PI补偿器$Gv_{Comp}$和补偿后$Gv_{Loop}$的伯德图如下：

其中补偿后$Gv_{Loop}$的穿越频率约为9.5Hz。

<center>
<img src="/assets/blog_image/PFC/PFCvLoop3.png">
<center> 电压环的伯德图</center>
</center>


获得上面伯德图的Python代码如下：

::: details
```Python

from telnetlib import PRAGMA_HEARTBEAT
import numpy as np
import matplotlib.pyplot as plt
import control as ctrl
import math
import scipy

print("Scipy version is ",scipy.__version__) 
print("Control version is ",ctrl.__version__)

s = ctrl.tf('s')

Vin = 24.0        # 输入电压
Vout = 40.0       # 输出电压
Pout = 40.0       # 输出功率    
Co = 2*1000.0e-6  # 输出电容 2000uF
L = 220e-6  #uH   # 电感 
f_PWM = 60e3      # 开关频率 60kHz

Iout = Pout/Vout  # 计算输出电流
Rload = Vout/Iout # 计算输出负载电阻
D = 1-Vin/Vout    # 占空比

fclock = 170e6*16 # MCU的PWM模块的时钟 170MHz*16 

PWM_Period_Reg = fclock/f_PWM   # 计算周期寄存器
DPWM  = 1/ PWM_Period_Reg       # PWM模块的增益  DPWM
Gain_PWM_dB = 20*math.log10(DPWM )  

R_Sense = 0.015             # 电流才电阻
KopAmp = (3.3/0.2)          # 电流采样的运算放大器的倍数 
KiSense = R_Sense*KopAmp    # 电流采样的增益
KvSense = ((2.0e3)/(51.0+30e3+2.0e3)) # 电压采样的增益
Kadc = 32767.0/3.3  # ADC 增益， 12位ADC左移3位，变成15位ADC  2^15= 32768

def Voltage_Plant():

    """
    fz = 5.873697418240959 Hz
    fp0 = 1.0 Hz
    wz = 36.905529317110265
    wp0 = 6.283185307179586
    Ts = 0.0001
    Ti = 0.02709621074412762
    Kp = 0.1702505132277443
    Ki = 0.0006283185307179586
    
    """
    # 填充PI补偿器参数
    f_p0 = 1.0
    w_p0 = 2*np.pi*f_p0

    f_z1 = 5.873697418240959
    w_z1 = 2*np.pi*f_z1

    # PI 补偿器传递函数
    GvComp = w_p0*((1+s/w_z1)/(s))

    # 输出电压和输入电压的采样增益
    KvoutSense = KvSense
    KvinSense = KvSense 
    # 输入电压前馈的增益
    VinFeed = (Vin*KvinSense*Kadc)/((np.sqrt(2)*Vin*KvinSense*Kadc)*(np.sqrt(2)*Vin*KvinSense*Kadc))
    # 参考电流到电感电流的传递函数
    iL_divide_Iref = 1/(KiSense*Kadc)
    
    # 电感电流到输出电压的传递函数如下
    Ro = Rload # 负载
    Hv =  ((Ro)/(s*Co*Ro+1))*((Vin)/(Vout))

    # 未补偿环路传递函数为：
    GvUncomp = (Hv)*(KvoutSense*Kadc*VinFeed*iL_divide_Iref) 
    # 补偿后环路传递函数为：
    GvLoop = GvComp*Hv

    f = np.logspace(0, 3, 1000)
    w = 2 * np.pi * f
    # 画传递函数的伯德图
    mag,phase,omega=ctrl.bode_plot(GvUncomp,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Gv_{Uncomp}$')
    mag,phase,omega=ctrl.bode_plot(GvComp,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Gv_{Comp}$')
    mag,phase,omega=ctrl.bode_plot(GvLoop,w,dB=True,Hz=True,deg=True,plot=True,label=r'$Gv_{Loop}$')

    fig = plt.gcf()
    axes = fig.get_axes()
    axes[0].set_title('Voltage Frequency Response')  
    plt.legend()
    plt.show()


Voltage_Plant()
```
:::


## 环路测量

可以使用Bode100，在电流采样的R29电阻两端注入信号，测量电流环；在电压采样的R21两端注入信号，测量电压环。


## 参考文档

[1] [Digital PFC CCM boost converter 300 W design example using XMC1400 microcontroller](https://www.infineon.com/dgdl/Infineon-Digital+PFC+CCM+Boost+Converter+-+300W+Design+Example+Using+XMC+1400-AN-v01_00-EN.pdf?fileId=5546d462584d1d4a015886d4dcaa5ea4)




:::tip
本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。
:::
