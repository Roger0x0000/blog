import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as o,d as l,e,w as t,a as n,b as s,f as u}from"./app-9edd4270.js";const d="/blog/assets/blog_image/STM32G0/ADC_2_1.png",r="/blog/assets/blog_image/STM32G0/ADC_2_2.png",v="/blog/assets/blog_image/STM32G0/ADC_2_3.png",k="/blog/assets/blog_image/STM32G0/ADC_2_4.png",m="/blog/assets/blog_image/STM32G0/STM32G030C8T_KIT.png",b="/blog/assets/blog_image/STM32G0/JTAG.png",_={},C=n("h1",{id:"stm32g0驱动-time-adc-dma方法2",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#stm32g0驱动-time-adc-dma方法2","aria-hidden":"true"},"#"),s(" STM32G0驱动-Time-ADC-DMA方法2")],-1),f=n("p",null,"本次实验目的是使用STM32G030C8Tx的Time触发ADC，ADC触发DMA，在DMA中断中保存ADC的采样的数据。",-1),E=n("h2",{id:"配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置","aria-hidden":"true"},"#"),s(" 配置")],-1),A=n("figure",null,[n("img",{src:d,alt:'"ADC"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"ADC"')],-1),I=n("figure",null,[n("img",{src:r,alt:'"ADC"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"ADC"')],-1),D=n("figure",null,[n("img",{src:v,alt:'"ADC"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"ADC"')],-1),h=n("figure",null,[n("img",{src:k,alt:'"ADC"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"ADC"')],-1),S=u(`<h2 id="关键程序" tabindex="-1"><a class="header-anchor" href="#关键程序" aria-hidden="true">#</a> 关键程序</h2><p><code>main.c</code>文件如下：</p><details class="hint-container details"><summary>详情</summary><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>

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
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAX_ADC_CHN</span>		<span class="token expression"><span class="token number">5</span></span></span>
<span class="token comment">/* USER CODE END PM */</span>

<span class="token comment">/* Private variables ---------------------------------------------------------*/</span>
ADC_HandleTypeDef hadc1<span class="token punctuation">;</span>
DMA_HandleTypeDef hdma_adc1<span class="token punctuation">;</span>

TIM_HandleTypeDef htim3<span class="token punctuation">;</span>

<span class="token comment">/* USER CODE BEGIN PV */</span>

<span class="token comment">/* USER CODE END PV */</span>

<span class="token comment">/* Private function prototypes -----------------------------------------------*/</span>
<span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_GPIO_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_DMA_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_ADC1_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_TIM3_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* USER CODE BEGIN PFP */</span>

<span class="token comment">/* USER CODE END PFP */</span>

<span class="token comment">/* Private user code ---------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN 0 */</span>
<span class="token class-name">uint16_t</span> u16AdcBuffer<span class="token punctuation">[</span>MAX_ADC_CHN<span class="token punctuation">]</span><span class="token punctuation">;</span>  
<span class="token class-name">uint16_t</span> u16AdcBackupBuffer<span class="token punctuation">[</span>MAX_ADC_CHN<span class="token punctuation">]</span><span class="token punctuation">;</span> 
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
  <span class="token function">MX_DMA_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_ADC1_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_TIM3_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USER CODE BEGIN 2 */</span>
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
  RCC_OscInitStruct<span class="token punctuation">.</span>OscillatorType <span class="token operator">=</span> RCC_OSCILLATORTYPE_HSI<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIState <span class="token operator">=</span> RCC_HSI_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIDiv <span class="token operator">=</span> RCC_HSI_DIV1<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSICalibrationValue <span class="token operator">=</span> RCC_HSICALIBRATION_DEFAULT<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLState <span class="token operator">=</span> RCC_PLL_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLSource <span class="token operator">=</span> RCC_PLLSOURCE_HSI<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLM <span class="token operator">=</span> RCC_PLLM_DIV1<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLN <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLP <span class="token operator">=</span> RCC_PLLP_DIV2<span class="token punctuation">;</span>
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

<span class="token comment">/**
  * @brief ADC1 Initialization Function
  * @param None
  * @retval None
  */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_ADC1_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

  <span class="token comment">/* USER CODE BEGIN ADC1_Init 0 */</span>

  <span class="token comment">/* USER CODE END ADC1_Init 0 */</span>

  ADC_ChannelConfTypeDef sConfig <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE BEGIN ADC1_Init 1 */</span>

  <span class="token comment">/* USER CODE END ADC1_Init 1 */</span>

  <span class="token comment">/** Configure the global features of the ADC (Clock, Resolution, Data Alignment and number of conversion)
  */</span>
  hadc1<span class="token punctuation">.</span>Instance <span class="token operator">=</span> ADC1<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>ClockPrescaler <span class="token operator">=</span> ADC_CLOCK_SYNC_PCLK_DIV2<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>Resolution <span class="token operator">=</span> ADC_RESOLUTION_12B<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>DataAlign <span class="token operator">=</span> ADC_DATAALIGN_RIGHT<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>ScanConvMode <span class="token operator">=</span> ADC_SCAN_SEQ_FIXED<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>EOCSelection <span class="token operator">=</span> ADC_EOC_SINGLE_CONV<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>LowPowerAutoWait <span class="token operator">=</span> ENABLE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>LowPowerAutoPowerOff <span class="token operator">=</span> DISABLE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>ContinuousConvMode <span class="token operator">=</span> DISABLE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>NbrOfConversion <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>DiscontinuousConvMode <span class="token operator">=</span> DISABLE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>ExternalTrigConv <span class="token operator">=</span> ADC_SOFTWARE_START<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>ExternalTrigConvEdge <span class="token operator">=</span> ADC_EXTERNALTRIGCONVEDGE_NONE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>DMAContinuousRequests <span class="token operator">=</span> DISABLE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>Overrun <span class="token operator">=</span> ADC_OVR_DATA_OVERWRITTEN<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>SamplingTimeCommon1 <span class="token operator">=</span> ADC_SAMPLETIME_1CYCLE_5<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>OversamplingMode <span class="token operator">=</span> DISABLE<span class="token punctuation">;</span>
  hadc1<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>TriggerFrequencyMode <span class="token operator">=</span> ADC_TRIGGER_FREQ_HIGH<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADC_Init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Configure Regular Channel
  */</span>
  sConfig<span class="token punctuation">.</span>Channel <span class="token operator">=</span> ADC_CHANNEL_0<span class="token punctuation">;</span>
  sConfig<span class="token punctuation">.</span>Rank <span class="token operator">=</span> ADC_RANK_CHANNEL_NUMBER<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADC_ConfigChannel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Configure Regular Channel
  */</span>
  sConfig<span class="token punctuation">.</span>Channel <span class="token operator">=</span> ADC_CHANNEL_1<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADC_ConfigChannel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Configure Regular Channel
  */</span>
  sConfig<span class="token punctuation">.</span>Channel <span class="token operator">=</span> ADC_CHANNEL_2<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADC_ConfigChannel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Configure Regular Channel
  */</span>
  sConfig<span class="token punctuation">.</span>Channel <span class="token operator">=</span> ADC_CHANNEL_3<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADC_ConfigChannel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Configure Regular Channel
  */</span>
  sConfig<span class="token punctuation">.</span>Channel <span class="token operator">=</span> ADC_CHANNEL_4<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_ADC_ConfigChannel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hadc1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE BEGIN ADC1_Init 2 */</span>

  <span class="token comment">/* USER CODE END ADC1_Init 2 */</span>

<span class="token punctuation">}</span>

<span class="token comment">/**
  * @brief TIM3 Initialization Function
  * @param None
  * @retval None
  */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_TIM3_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

  <span class="token comment">/* USER CODE BEGIN TIM3_Init 0 */</span>

  <span class="token comment">/* USER CODE END TIM3_Init 0 */</span>

  TIM_ClockConfigTypeDef sClockSourceConfig <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  TIM_MasterConfigTypeDef sMasterConfig <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE BEGIN TIM3_Init 1 */</span>

  <span class="token comment">/* USER CODE END TIM3_Init 1 */</span>
  htim3<span class="token punctuation">.</span>Instance <span class="token operator">=</span> TIM3<span class="token punctuation">;</span>
  htim3<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>Prescaler <span class="token operator">=</span> <span class="token number">63</span><span class="token punctuation">;</span>
  htim3<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>CounterMode <span class="token operator">=</span> TIM_COUNTERMODE_UP<span class="token punctuation">;</span>
  htim3<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>Period <span class="token operator">=</span> <span class="token number">199</span><span class="token punctuation">;</span>
  htim3<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>ClockDivision <span class="token operator">=</span> TIM_CLOCKDIVISION_DIV1<span class="token punctuation">;</span>
  htim3<span class="token punctuation">.</span>Init<span class="token punctuation">.</span>AutoReloadPreload <span class="token operator">=</span> TIM_AUTORELOAD_PRELOAD_DISABLE<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_TIM_Base_Init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  sClockSourceConfig<span class="token punctuation">.</span>ClockSource <span class="token operator">=</span> TIM_CLOCKSOURCE_INTERNAL<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_TIM_ConfigClockSource</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sClockSourceConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  sMasterConfig<span class="token punctuation">.</span>MasterOutputTrigger <span class="token operator">=</span> TIM_TRGO_RESET<span class="token punctuation">;</span>
  sMasterConfig<span class="token punctuation">.</span>MasterSlaveMode <span class="token operator">=</span> TIM_MASTERSLAVEMODE_DISABLE<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_TIMEx_MasterConfigSynchronization</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sMasterConfig<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE BEGIN TIM3_Init 2 */</span>

  <span class="token comment">/* USER CODE END TIM3_Init 2 */</span>

<span class="token punctuation">}</span>

<span class="token comment">/**
  * Enable DMA controller clock
  */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_DMA_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

  <span class="token comment">/* DMA controller clock enable */</span>
  <span class="token function">__HAL_RCC_DMA1_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* DMA interrupt init */</span>
  <span class="token comment">/* DMA1_Channel1_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>DMA1_Channel1_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>DMA1_Channel1_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token comment">/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_GPIO_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  GPIO_InitTypeDef GPIO_InitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">/* GPIO Ports Clock Enable */</span>
  <span class="token function">__HAL_RCC_GPIOA_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">__HAL_RCC_GPIOB_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/*Configure GPIO pin Output Level */</span>
  <span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span>GPIOB<span class="token punctuation">,</span> GPIO_PIN_4<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/*Configure GPIO pin : PB4 */</span>
  GPIO_InitStruct<span class="token punctuation">.</span>Pin <span class="token operator">=</span> GPIO_PIN_4<span class="token punctuation">;</span>
  GPIO_InitStruct<span class="token punctuation">.</span>Mode <span class="token operator">=</span> GPIO_MODE_OUTPUT_PP<span class="token punctuation">;</span>
  GPIO_InitStruct<span class="token punctuation">.</span>Pull <span class="token operator">=</span> GPIO_NOPULL<span class="token punctuation">;</span>
  GPIO_InitStruct<span class="token punctuation">.</span>Speed <span class="token operator">=</span> GPIO_SPEED_FREQ_LOW<span class="token punctuation">;</span>
  <span class="token function">HAL_GPIO_Init</span><span class="token punctuation">(</span>GPIOB<span class="token punctuation">,</span> <span class="token operator">&amp;</span>GPIO_InitStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token comment">/* USER CODE BEGIN 4 */</span>
<span class="token comment">/**
  * @brief  Period elapsed callback in non-blocking mode
  * @param  htim TIM handle
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">HAL_TIM_PeriodElapsedCallback</span><span class="token punctuation">(</span>TIM_HandleTypeDef <span class="token operator">*</span>htim<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">uint32_t</span> u32TimeCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">//200us</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>htim<span class="token operator">-&gt;</span>Instance<span class="token operator">==</span>TIM3<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">++</span>u32TimeCnt <span class="token operator">&gt;=</span> <span class="token number">2500</span><span class="token punctuation">)</span><span class="token comment">//500ms</span>
        <span class="token punctuation">{</span>
            
            <span class="token function">HAL_GPIO_TogglePin</span><span class="token punctuation">(</span>IO_LED_GPIO_Port<span class="token punctuation">,</span> IO_LED_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
            u32TimeCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*!&lt; ADC group regular conversion start */</span>
    ADC1<span class="token operator">-&gt;</span>CR <span class="token operator">|=</span> ADC_CR_ADSTART<span class="token punctuation">;</span> 
  <span class="token comment">/* NOTE : This function should not be modified, when the callback is needed,
            the HAL_TIM_PeriodElapsedCallback could be implemented in the user file
   */</span>
<span class="token punctuation">}</span>



<span class="token comment">/**
  * @brief  Conversion complete callback in non-blocking mode.
  * @param hadc ADC handle
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">HAL_ADC_ConvCpltCallback</span><span class="token punctuation">(</span>ADC_HandleTypeDef<span class="token operator">*</span> hadc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    
    <span class="token keyword">if</span><span class="token punctuation">(</span>ADC1 <span class="token operator">==</span> hadc<span class="token operator">-&gt;</span>Instance<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      
    <span class="token punctuation">}</span>

    u16AdcBackupBuffer<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> u16AdcBuffer<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    u16AdcBackupBuffer<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> u16AdcBuffer<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    u16AdcBackupBuffer<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> u16AdcBuffer<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    u16AdcBackupBuffer<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> u16AdcBuffer<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    u16AdcBackupBuffer<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> u16AdcBuffer<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>



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



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="hint-container tip"><p class="hint-container-title">提示</p><p>本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。</p></div><h2 id="原理图" tabindex="-1"><a class="header-anchor" href="#原理图" aria-hidden="true">#</a> 原理图</h2><figure><img src="`+m+'" alt="&quot;ADC&quot;" tabindex="0" loading="lazy"><figcaption>&quot;ADC&quot;</figcaption></figure>',6),L=n("figure",null,[n("img",{src:b,alt:'"JTAG"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"JTAG"')],-1);function O(g,R){const a=p("center");return c(),o("div",null,[C,f,l(" more "),E,A,e(a,null,{default:t(()=>[s("ADC配置")]),_:1}),I,e(a,null,{default:t(()=>[s("Time配置")]),_:1}),D,e(a,null,{default:t(()=>[s("DMA配置")]),_:1}),h,e(a,null,{default:t(()=>[s("NVIC配置")]),_:1}),S,e(a,null,{default:t(()=>[s("原理图")]),_:1}),L,e(a,null,{default:t(()=>[s("仿真接口图")]),_:1})])}const M=i(_,[["render",O],["__file","09.STM32G0驱动-Time-ADC-DMA方法2 .html.vue"]]);export{M as default};
