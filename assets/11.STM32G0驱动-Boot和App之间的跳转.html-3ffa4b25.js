import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as l,d as u,a as n,b as s,e as a,w as r,f as p}from"./app-1990fe92.js";const d="/blog/assets/blog_image/STM32G0/Boot_App_Boot1.png",v="/blog/assets/blog_image/STM32G0/Boot_App_App1.png",k="/blog/assets/blog_image/STM32G0/Boot_App3.png",m="/blog/assets/blog_image/STM32G0/Boot_App1.png",b="/blog/assets/blog_image/STM32G0/Boot_App2.png",_={},C=n("h1",{id:"stm32g0驱动-boot和app之间的跳转",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#stm32g0驱动-boot和app之间的跳转","aria-hidden":"true"},"#"),s(" STM32G0驱动-Boot和App之间的跳转")],-1),E=n("p",null,"本次实验目的是实现STM32G071RB的Boot和App之间的来回跳转。",-1),f=p('<h2 id="boot程序" tabindex="-1"><a class="header-anchor" href="#boot程序" aria-hidden="true">#</a> Boot程序</h2><ol><li>Boot设置</li></ol><figure><img src="'+d+`" alt="&quot;Boot&quot;" tabindex="0" loading="lazy"><figcaption>&quot;Boot&quot;</figcaption></figure><ol start="2"><li>Boot代码</li></ol><p>Boot中，LED每100ms翻转一次，程序在Boot中运行5s后跳转到App中。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
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
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;gpio.h&quot;</span></span>

<span class="token comment">/* Private includes ----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN Includes */</span>

<span class="token comment">/* USER CODE END Includes */</span>

<span class="token comment">/* Private typedef -----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PTD */</span>
<span class="token keyword">typedef</span> <span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>pFunction<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
<span class="token comment">/* USER CODE END PTD */</span>

<span class="token comment">/* Private define ------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PD */</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">BOOT_VECT_TAB_OFFSET</span> <span class="token expression"><span class="token number">0x00000</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">APP_VECT_TAB_OFFSET</span>  <span class="token expression"><span class="token number">0x10000</span></span></span>

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

pFunction Jump_To_Application<span class="token punctuation">;</span>


<span class="token keyword">void</span> <span class="token function">Main_Jump_To_Application</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> JumpAddress<span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> AppAddress <span class="token operator">=</span> <span class="token number">0x8010000</span><span class="token punctuation">;</span> 

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">(</span>__IO <span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>AppAddress<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0x2FFE0000</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0x20000000</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">HAL_NVIC_DisableIRQ</span><span class="token punctuation">(</span>SysTick_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">__disable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Interrupting disabled.</span>

        <span class="token comment">/* Jump to user application */</span>
        <span class="token comment">//用户代码区第二个字为程序开始地址(复位地址)</span>
        JumpAddress <span class="token operator">=</span> <span class="token operator">*</span><span class="token punctuation">(</span>__IO <span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>AppAddress <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Jump_To_Application <span class="token operator">=</span> <span class="token punctuation">(</span>pFunction<span class="token punctuation">)</span>JumpAddress<span class="token punctuation">;</span>

        <span class="token comment">/* Initialize user application&#39;s Stack Pointer */</span>
        <span class="token comment">//初始化堆栈指针(用户代码区的第一个字用于存放栈顶地址)</span>
        <span class="token function">__set_MSP</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">(</span>__IO <span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>AppAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">/* Jump to application */</span>
        <span class="token function">Jump_To_Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token comment">/* USER CODE END 0 */</span>

<span class="token comment">/**
  * @brief  The application entry point.
  * @retval int
  */</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN 1 */</span>
	<span class="token keyword">static</span> <span class="token class-name">uint32_t</span> u32TimeCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token function">__disable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Interrupting disabled.</span>
	SCB<span class="token operator">-&gt;</span>VTOR <span class="token operator">=</span> FLASH_BASE <span class="token operator">|</span> BOOT_VECT_TAB_OFFSET<span class="token punctuation">;</span> <span class="token comment">/* Vector Table Relocation in Internal FLASH */</span>
    
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
  <span class="token comment">/* USER CODE BEGIN 2 */</span>

	<span class="token function">__enable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  	<span class="token comment">// Interrupting enabled.</span>
  <span class="token comment">/* USER CODE END 2 */</span>

  <span class="token comment">/* Infinite loop */</span>
  <span class="token comment">/* USER CODE BEGIN WHILE */</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/* USER CODE END WHILE */</span>

    <span class="token comment">/* USER CODE BEGIN 3 */</span>
    <span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">HAL_GPIO_TogglePin</span><span class="token punctuation">(</span>LED_ON_HOP_GPIO_Port<span class="token punctuation">,</span> LED_ON_HOP_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">++</span>u32TimeCnt<span class="token operator">&gt;</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token comment">//5000ms</span>
    <span class="token punctuation">{</span>
        u32TimeCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token function">Main_Jump_To_Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
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
  RCC_OscInitStruct<span class="token punctuation">.</span>OscillatorType <span class="token operator">=</span> RCC_OSCILLATORTYPE_HSI<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIState <span class="token operator">=</span> RCC_HSI_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIDiv <span class="token operator">=</span> RCC_HSI_DIV1<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSICalibrationValue <span class="token operator">=</span> RCC_HSICALIBRATION_DEFAULT<span class="token punctuation">;</span>
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


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="app程序" tabindex="-1"><a class="header-anchor" href="#app程序" aria-hidden="true">#</a> App程序</h2><ol><li>App设置</li></ol><figure><img src="`+v+`" alt="&quot;Boot&quot;" tabindex="0" loading="lazy"><figcaption>&quot;Boot&quot;</figcaption></figure><ol start="2"><li>App代码</li></ol><p>App中，LED每1000ms翻转一次，程序在App中运行10s后跳转到Boot中。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
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
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;adc.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;dma.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;rtc.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;tim.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usart.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;gpio.h&quot;</span></span>

<span class="token comment">/* Private includes ----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN Includes */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;hw_flash.h&quot;</span></span>
<span class="token comment">/* USER CODE END Includes */</span>

<span class="token comment">/* Private typedef -----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PTD */</span>
<span class="token keyword">typedef</span> <span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>pFunction<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
<span class="token comment">/* USER CODE END PTD */</span>

<span class="token comment">/* Private define ------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PD */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAX_ADC_CHN</span>		<span class="token expression"><span class="token number">5</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">BOOT_VECT_TAB_OFFSET</span> <span class="token expression"><span class="token number">0x00000</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">APP_VECT_TAB_OFFSET</span>  <span class="token expression"><span class="token number">0x10000</span></span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">ENABLE_INT</span><span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token function">__set_PRIMASK</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> </span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">DISABLE_INT</span><span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token function">__set_PRIMASK</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> </span></span>

<span class="token comment">/* USER CODE END PD */</span>

<span class="token comment">/* Private macro -------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PM */</span>

<span class="token comment">/* USER CODE END PM */</span>

<span class="token comment">/* Private variables ---------------------------------------------------------*/</span>

<span class="token comment">/* USER CODE BEGIN PV */</span>
<span class="token class-name">uint16_t</span> u16AdcBuffer<span class="token punctuation">[</span>MAX_ADC_CHN<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> u8EnableTxTask <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> u8RxTemp<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> u8TxTemp<span class="token punctuation">;</span>

<span class="token comment">/* USER CODE END PV */</span>

<span class="token comment">/* Private function prototypes -----------------------------------------------*/</span>
<span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* USER CODE BEGIN PFP */</span>
pFunction Jump_To_Boot<span class="token punctuation">;</span>


<span class="token keyword">void</span> <span class="token function">Main_Jump_To_Boot</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">uint32_t</span> JumpAddress<span class="token punctuation">;</span>
	<span class="token class-name">uint32_t</span> AppAddress <span class="token operator">=</span> <span class="token number">0x08000000</span><span class="token punctuation">;</span> 



    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">(</span>__IO <span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>AppAddress<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0x2FFE0000</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0x20000000</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Interrupting disabled.</span>
        <span class="token function">DISABLE_INT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        SysTick<span class="token operator">-&gt;</span>CTRL <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        SysTick<span class="token operator">-&gt;</span>LOAD <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        SysTick<span class="token operator">-&gt;</span>VAL <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token function">HAL_RCC_DeInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        NVIC<span class="token operator">-&gt;</span>ICER<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">0xFFFFFFFF</span><span class="token punctuation">;</span> <span class="token comment">//Interrupt Clear Enable Register</span>
        NVIC<span class="token operator">-&gt;</span>ICPR<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">0xFFFFFFFF</span><span class="token punctuation">;</span>	<span class="token comment">//Interrupt Clear Pending Register </span>
    
        
        <span class="token function">HAL_NVIC_DisableIRQ</span><span class="token punctuation">(</span>SysTick_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">HAL_TIM_Base_MspDeInit</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">HAL_TIM_Base_MspDeInit</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">HAL_RTC_MspDeInit</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token function">__disable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  

        <span class="token comment">/* Jump to user application */</span>
        <span class="token comment">//用户代码区第二个字为程序开始地址(复位地址)</span>
        JumpAddress <span class="token operator">=</span> <span class="token operator">*</span><span class="token punctuation">(</span>__IO <span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>AppAddress <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Jump_To_Boot <span class="token operator">=</span> <span class="token punctuation">(</span>pFunction<span class="token punctuation">)</span>JumpAddress<span class="token punctuation">;</span>

        <span class="token comment">/* Initialize user application&#39;s Stack Pointer */</span>
        <span class="token comment">//初始化堆栈指针(用户代码区的第一个字用于存放栈顶地址)</span>
        <span class="token function">__set_MSP</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">(</span>__IO <span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>AppAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    
        <span class="token comment">//System Flash memory mapped at 0x00000000</span>
        <span class="token function">__HAL_SYSCFG_REMAPMEMORY_SYSTEMFLASH</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/* Jump to application */</span>
        <span class="token function">Jump_To_Boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
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

  <span class="token keyword">static</span> <span class="token class-name">uint32_t</span> u32TimeCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token function">__disable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Interrupting disabled.</span>
  SCB<span class="token operator">-&gt;</span>VTOR <span class="token operator">=</span> FLASH_BASE <span class="token operator">|</span> APP_VECT_TAB_OFFSET<span class="token punctuation">;</span> <span class="token comment">/* Vector Table Relocation in Internal FLASH */</span>
  
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
  <span class="token function">MX_DMA_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_ADC1_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_RTC_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_TIM3_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USER CODE BEGIN 2 */</span>

  <span class="token comment">/* Run the ADC calibration */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADCEx_Calibration_Start</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/* Calibration Error */</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">HAL_ADC_Start_DMA</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>u16AdcBuffer<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span>MAX_ADC_CHN<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
	
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_TIM_Base_Start_IT</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">)</span><span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
	

  <span class="token function">__enable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  	<span class="token comment">// Interrupting enabled.</span>
	
	
  <span class="token comment">/* USER CODE END 2 */</span>

  <span class="token comment">/* Infinite loop */</span>
  <span class="token comment">/* USER CODE BEGIN WHILE */</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR0<span class="token punctuation">,</span><span class="token number">0xDEAD0001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR1<span class="token punctuation">,</span><span class="token number">0xDEAD0002</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR2<span class="token punctuation">,</span><span class="token number">0xDEAD0003</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR3<span class="token punctuation">,</span><span class="token number">0xDEAD0004</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_RTCEx_BKUPWrite</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hrtc<span class="token punctuation">,</span>RTC_BKP_DR4<span class="token punctuation">,</span><span class="token number">0xDEAD0005</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/* USER CODE END WHILE */</span>

    <span class="token comment">/* USER CODE BEGIN 3 */</span>

    <span class="token function">HAL_GPIO_TogglePin</span><span class="token punctuation">(</span>LED_ON_HOP_GPIO_Port<span class="token punctuation">,</span> LED_ON_HOP_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">++</span>u32TimeCnt<span class="token operator">&gt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">//10000ms</span>
    <span class="token punctuation">{</span>
        <span class="token function">Main_Jump_To_Boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        u32TimeCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
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
  * @brief  Conversion complete callback in non-blocking mode.
  * @param hadc ADC handle
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">HAL_ADC_ConvCpltCallback</span><span class="token punctuation">(</span>ADC_HandleTypeDef<span class="token operator">*</span> hadc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>ADC1 <span class="token operator">==</span> hadc<span class="token operator">-&gt;</span>Instance<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//HAL_GPIO_TogglePin(LED_ON_HOP_GPIO_Port, LED_ON_HOP_Pin);</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">HAL_ADC_Start_DMA</span><span class="token punctuation">(</span>hadc<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>u16AdcBuffer<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span>MAX_ADC_CHN<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
<span class="token comment">/**
  * @brief  ADC error callback in non-blocking mode
  *         (ADC conversion with interruption or transfer by DMA).
  * @note   In case of error due to overrun when using ADC with DMA transfer
  *         (HAL ADC handle parameter &quot;ErrorCode&quot; to state &quot;HAL_ADC_ERROR_OVR&quot;):
  *         - Reinitialize the DMA using function &quot;HAL_ADC_Stop_DMA()&quot;.
  *         - If needed, restart a new ADC conversion using function
  *           &quot;HAL_ADC_Start_DMA()&quot;
  *           (this function is also clearing overrun flag)
  * @param hadc ADC handle
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">HAL_ADC_ErrorCallback</span><span class="token punctuation">(</span>ADC_HandleTypeDef <span class="token operator">*</span>hadc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* Prevent unused argument(s) compilation warning */</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>ADC1 <span class="token operator">==</span> hadc<span class="token operator">-&gt;</span>Instance<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">HAL_ADC_Start_DMA</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>u16AdcBuffer<span class="token punctuation">,</span>MAX_ADC_CHN<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* NOTE : This function should not be modified. When the callback is needed,
            function HAL_ADC_ErrorCallback must be implemented in the user file.
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



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hex合并" tabindex="-1"><a class="header-anchor" href="#hex合并" aria-hidden="true">#</a> Hex合并</h2>`,13),S={href:"http://srecord.sourceforge.net/download.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://sourceforge.net/projects/srecord/files/",target:"_blank",rel:"noopener noreferrer"},h=p('<figure><img src="'+k+`" alt="&quot;Boot&quot;" tabindex="0" loading="lazy"><figcaption>&quot;Boot&quot;</figcaption></figure><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>srec_cat<span class="token punctuation">.</span>exe <span class="token operator">-</span>Output_Block_Size<span class="token operator">=</span><span class="token number">16</span>  STM32G071RB_Boot<span class="token punctuation">.</span>hex <span class="token operator">-</span>Intel STM32G071RB<span class="token punctuation">.</span>hex <span class="token operator">-</span>Intel <span class="token operator">-</span>o MergedHexFile<span class="token punctuation">.</span>hex <span class="token operator">-</span>Intel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果" aria-hidden="true">#</a> 测试结果</h2><p>使用STM32CubeProgrammer将MergedHexFile.hex烧录到MCU，测试的结果如下：</p><ol><li><p>Boot中，LED每100ms翻转一次，程序在Boot中运行5s后跳转到App中。</p></li><li><p>App中，LED每1000ms翻转一次，程序在App中运行10s后跳转到Boot中。</p></li></ol><figure><img src="`+m+'" alt="&quot;Boot&quot;" tabindex="0" loading="lazy"><figcaption>&quot;Boot&quot;</figcaption></figure><figure><img src="'+b+'" alt="&quot;Boot&quot;" tabindex="0" loading="lazy"><figcaption>&quot;Boot&quot;</figcaption></figure>',7),I=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。")],-1),L=n("h2",{id:"参考文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文档","aria-hidden":"true"},"#"),s(" 参考文档")],-1),D={href:"https://www.st.com/content/st_com/zh/support/learning/stm32-education/stm32-online-training.html",target:"_blank",rel:"noopener noreferrer"};function A(O,g){const e=t("ExternalLinkIcon"),i=t("center");return o(),l("div",null,[C,E,u(" more "),f,n("p",null,[s("将需要合并的Boot和App的hex文件放置于同一目录下，使用"),n("a",S,[s("SRecord"),a(e)]),s("的srec_cat.exe将两个文件合并。")]),n("p",null,[n("a",R,[s("SRecord下载链接"),a(e)])]),h,a(i,null,{default:r(()=>[s("实验结果")]),_:1}),I,L,n("p",null,[n("a",D,[s("STM32 Online Training"),a(e)])])])}const T=c(_,[["render",A],["__file","11.STM32G0驱动-Boot和App之间的跳转.html.vue"]]);export{T as default};
