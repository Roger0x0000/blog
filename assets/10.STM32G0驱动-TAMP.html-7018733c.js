import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as o,d as u,e as a,w as i,a as n,b as s,f as r}from"./app-f6d9e5b8.js";const d="/blog/assets/blog_image/STM32G0/TAMP1.png",v="/blog/assets/blog_image/STM32G0/TAMP2.png",m="/blog/assets/blog_image/STM32G0/TAMP3.png",k="/blog/assets/blog_image/STM32G0/TAMP4.png",b="/blog/assets/blog_image/STM32G0/TAMP5.png",C={},_=n("h1",{id:"stm32g0驱动-tamp",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#stm32g0驱动-tamp","aria-hidden":"true"},"#"),s(" STM32G0驱动-TAMP")],-1),E=n("p",null,"本次实验目的是使用STM32G071RB的Tamper的backup registers。",-1),R=n("h2",{id:"配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置","aria-hidden":"true"},"#"),s(" 配置")],-1),S=n("figure",null,[n("img",{src:d,alt:'"Tamper"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"Tamper"')],-1),f=n("figure",null,[n("img",{src:v,alt:'"Tamper"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"Tamper"')],-1),h=n("figure",null,[n("img",{src:m,alt:'"Tamper"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"Tamper"')],-1),L=r(`<h2 id="关键程序" tabindex="-1"><a class="header-anchor" href="#关键程序" aria-hidden="true">#</a> 关键程序</h2><p>初始化时，通过<code>HAL_RTCEx_BKUPWrite()</code>函数写入backup registers的内容；当PC13的按键按下时，backup registers的内容会被清零。在<code>main.c</code>中添加<code>HAL_RTCEx_Tamper1EventCallback()</code>函数。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
<span class="token comment">/* USER CODE BEGIN Header */</span>
<span class="token comment">/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2022 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */</span>
<span class="token comment">/* USER CODE END Header */</span>
<span class="token comment">/* Includes ------------------------------------------------------------------*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;main.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;rtc.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;gpio.h&quot;</span></span>

<span class="token comment">/* Private includes ----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN Includes */</span>

<span class="token comment">/* USER CODE END Includes */</span>

<span class="token comment">/* Private typedef -----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PTD */</span>

<span class="token comment">/* USER CODE END PTD */</span>

<span class="token comment">/* Private define ------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PD */</span>
<span class="token comment">/* USER CODE END PD */</span>

<span class="token comment">/* Private macro -------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PM */</span>


<span class="token comment">/* USER CODE END PM */</span>

<span class="token comment">/* Private variables ---------------------------------------------------------*/</span>

<span class="token comment">/* USER CODE BEGIN PV */</span>

<span class="token comment">/* USER CODE END PV */</span>

<span class="token comment">/* Private function prototypes -----------------------------------------------*/</span>
<span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* USER CODE BEGIN PFP */</span>

<span class="token comment">/* USER CODE END PFP */</span>

<span class="token comment">/* Private user code ---------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN 0 */</span>


<span class="token comment">/* USER CODE END 0 */</span>

<span class="token comment">/**
  * @brief  The application entry point.
  * @retval int
  */</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN 1 */</span>

  <span class="token comment">/* USER CODE END 1 */</span>

  <span class="token comment">/* MCU Configuration--------------------------------------------------------*/</span>

  <span class="token comment">/* Reset of all peripherals, Initializes the Flash interface and the Systick. */</span>
  <span class="token function">HAL_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE BEGIN Init */</span>

  <span class="token comment">/* USER CODE END Init */</span>

  <span class="token comment">/* Configure the system clock */</span>
  <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE BEGIN SysInit */</span>

  <span class="token comment">/* USER CODE END SysInit */</span>

  <span class="token comment">/* Initialize all configured peripherals */</span>
  <span class="token function">MX_GPIO_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_RTC_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USER CODE BEGIN 2 */</span>

  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR0<span class="token punctuation">,</span><span class="token number">0xDEAD0001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR1<span class="token punctuation">,</span><span class="token number">0xDEAD0002</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR2<span class="token punctuation">,</span><span class="token number">0xDEAD0003</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR3<span class="token punctuation">,</span><span class="token number">0xDEAD0004</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR4<span class="token punctuation">,</span><span class="token number">0xDEAD0005</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE END 2 */</span>

  <span class="token comment">/* Infinite loop */</span>
  <span class="token comment">/* USER CODE BEGIN WHILE */</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/* USER CODE END WHILE */</span>

    <span class="token comment">/* USER CODE BEGIN 3 */</span>


  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE END 3 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
  * @brief System Clock Configuration
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  RCC_OscInitTypeDef RCC_OscInitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  RCC_ClkInitTypeDef RCC_ClkInitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">/** Configure the main internal regulator output voltage
  */</span>
  <span class="token function">HAL_PWREx_ControlVoltageScaling</span><span class="token punctuation">(</span>PWR_REGULATOR_VOLTAGE_SCALE1<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>OscillatorType <span class="token operator">=</span> RCC_OSCILLATORTYPE_HSI<span class="token operator">|</span>RCC_OSCILLATORTYPE_LSI<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIState <span class="token operator">=</span> RCC_HSI_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIDiv <span class="token operator">=</span> RCC_HSI_DIV1<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSICalibrationValue <span class="token operator">=</span> RCC_HSICALIBRATION_DEFAULT<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>LSIState <span class="token operator">=</span> RCC_LSI_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLState <span class="token operator">=</span> RCC_PLL_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLSource <span class="token operator">=</span> RCC_PLLSOURCE_HSI<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLM <span class="token operator">=</span> RCC_PLLM_DIV1<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLN <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLP <span class="token operator">=</span> RCC_PLLP_DIV2<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLQ <span class="token operator">=</span> RCC_PLLQ_DIV2<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLR <span class="token operator">=</span> RCC_PLLR_DIV2<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCC_OscConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>RCC_OscInitStruct<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Initializes the CPU, AHB and APB buses clocks
  */</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>ClockType <span class="token operator">=</span> RCC_CLOCKTYPE_HCLK<span class="token operator">|</span>RCC_CLOCKTYPE_SYSCLK
                              <span class="token operator">|</span>RCC_CLOCKTYPE_PCLK1<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>SYSCLKSource <span class="token operator">=</span> RCC_SYSCLKSOURCE_PLLCLK<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>AHBCLKDivider <span class="token operator">=</span> RCC_SYSCLK_DIV1<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>APB1CLKDivider <span class="token operator">=</span> RCC_HCLK_DIV1<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCC_ClockConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>RCC_ClkInitStruct<span class="token punctuation">,</span> FLASH_LATENCY_2<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* USER CODE BEGIN 4 */</span>

<span class="token comment">/**
  * @brief  Tamper 1 callback.
  * @param  hrtc RTC handle
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">HAL_RTCEx_Tamper1EventCallback</span><span class="token punctuation">(</span>RTC_HandleTypeDef <span class="token operator">*</span>hrtc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* Prevent unused argument(s) compilation warning */</span>
  <span class="token comment">//UNUSED(hrtc);</span>
  <span class="token function">HAL_GPIO_TogglePin</span><span class="token punctuation">(</span>IO_LED_GPIO_Port<span class="token punctuation">,</span> IO_LED_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* NOTE : This function should not be modified, when the callback is needed,
            the HAL_RTCEx_Tamper1EventCallback could be implemented in the user file
   */</span>
<span class="token punctuation">}</span>

<span class="token comment">/* USER CODE END 4 */</span>

<span class="token comment">/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN Error_Handler_Debug */</span>
  <span class="token comment">/* User can add his own implementation to report the HAL error return state */</span>
  <span class="token function">__disable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE END Error_Handler_Debug */</span>
<span class="token punctuation">}</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span>  <span class="token expression">USE_FULL_ASSERT</span></span>
<span class="token comment">/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">assert_failed</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span>file<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> line<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN 6 */</span>
  <span class="token comment">/* User can add his own implementation to report the file name and line number,
     ex: printf(&quot;Wrong parameters value: file %s on line %d\\r\\n&quot;, file, line) */</span>
  <span class="token comment">/* USER CODE END 6 */</span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* USE_FULL_ASSERT */</span></span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果" aria-hidden="true">#</a> 测试结果</h2><p>实验结果：初始化时，通过<code>HAL_RTCEx_BKUPWrite()</code>函数写入backup registers的内容；当PC13的按键按下时，backup registers的内容会被清零。</p><figure><img src="`+k+'" alt="&quot;TAMP&quot;" tabindex="0" loading="lazy"><figcaption>&quot;TAMP&quot;</figcaption></figure><figure><img src="'+b+'" alt="&quot;TAMP&quot;" tabindex="0" loading="lazy"><figcaption>&quot;TAMP&quot;</figcaption></figure>',7),I=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。")],-1),D=n("h2",{id:"参考文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文档","aria-hidden":"true"},"#"),s(" 参考文档")],-1),g={href:"https://www.st.com/content/st_com/zh/support/learning/stm32-education/stm32-online-training.html",target:"_blank",rel:"noopener noreferrer"};function P(T,O){const e=t("center"),c=t("ExternalLinkIcon");return p(),o("div",null,[_,E,u(" more "),R,S,a(e,null,{default:i(()=>[s("TAMP")]),_:1}),f,a(e,null,{default:i(()=>[s("TAMP配置")]),_:1}),h,a(e,null,{default:i(()=>[s("NVIC配置")]),_:1}),L,a(e,null,{default:i(()=>[s("实验结果")]),_:1}),I,D,n("p",null,[n("a",g,[s("STM32 Online Training"),a(c)])])])}const N=l(C,[["render",P],["__file","10.STM32G0驱动-TAMP.html.vue"]]);export{N as default};
