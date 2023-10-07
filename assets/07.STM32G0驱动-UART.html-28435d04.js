import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c as o,d as u,e as a,w as t,a as n,b as s,f as d}from"./app-9edd4270.js";const r="/blog/assets/blog_image/STM32G0/UART1.png",v="/blog/assets/blog_image/STM32G0/UART2.png",m={},k=n("h1",{id:"stm32g0驱动-uart",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#stm32g0驱动-uart","aria-hidden":"true"},"#"),s(" STM32G0驱动-UART")],-1),b=n("p",null,"本次实验目的是使用LL库初始化STM32G071RB的UART。",-1),_=n("h2",{id:"原理图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#原理图","aria-hidden":"true"},"#"),s(" 原理图")],-1),T=n("figure",null,[n("img",{src:r,alt:'"UART"',tabindex:"0",loading:"lazy"}),n("figcaption",null,'"UART"')],-1),R=d(`<h2 id="关键程序" tabindex="-1"><a class="header-anchor" href="#关键程序" aria-hidden="true">#</a> 关键程序</h2><p>在main.c初始化中添加<code>USART_Callback()</code>函数。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
<span class="token comment">/* Private user code ---------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN 0 */</span>
<span class="token comment">/**
  * @brief  Function called in case of error detected in USART IT Handler
  * @param  None
  * @retval None
  */</span>
<span class="token class-name">uint32_t</span> <span class="token function">USART_Error_Callback</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> u32Flag <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">/* Error handling example :
    - Read USART ISR register to identify flag that leads to IT raising
    - Perform corresponding error handling treatment according to flag
    */</span>
    <span class="token comment">/*!&lt; Parity error flag */</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token function">LL_USART_IsActiveFlag_PE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        u32Flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">//Clear Parity Error Flag</span>
        <span class="token function">LL_USART_ClearFlag_PE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*!&lt; Framing error flag */</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token function">LL_USART_IsActiveFlag_FE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        u32Flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> 
        <span class="token comment">//Clear Framing Error Flag</span>
        <span class="token function">LL_USART_ClearFlag_FE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">/*!&lt; Noise detected flag */</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token function">LL_USART_IsActiveFlag_NE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        u32Flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">//Clear Noise Error detected Flag</span>
        <span class="token function">LL_USART_ClearFlag_NE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*!&lt; Overrun error flag */</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token function">LL_USART_IsActiveFlag_ORE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        u32Flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">//Clear OverRun Error Flag</span>
        <span class="token function">LL_USART_ClearFlag_ORE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*!&lt; Receiver timeout flag */</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token function">LL_USART_IsActiveFlag_RTO</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        u32Flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">//Clear Receiver Time Out Flag</span>
        <span class="token function">LL_USART_ClearFlag_RTO</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> u32Flag<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> u8EnableTxTask <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> u8RxTemp<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> u8TxTemp<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">USART_Callback</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">USART_Error_Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        u8RxTemp <span class="token operator">=</span> <span class="token function">LL_USART_ReceiveData8</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">LL_USART_IsActiveFlag_RXNE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">/* RXNE flag will be cleared by reading of RDR register (done in call) */</span>
            <span class="token comment">/* Read Received character. RXNE flag is cleared by reading of RDR register */</span>
            u8RxTemp <span class="token operator">=</span> <span class="token function">LL_USART_ReceiveData8</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            u8TxTemp <span class="token operator">=</span> u8RxTemp<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
            u8EnableTxTask <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            
            <span class="token function">HAL_GPIO_TogglePin</span><span class="token punctuation">(</span>IO_LED_GPIO_Port<span class="token punctuation">,</span> IO_LED_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
	
    <span class="token keyword">if</span><span class="token punctuation">(</span>u8EnableTxTask<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/* Wait until flag is set */</span>
        <span class="token comment">//1: Data register not full                 </span>
        <span class="token comment">//1: Transmission is complete</span>
        <span class="token comment">//if((1 == LL_USART_IsActiveFlag_TXE(USART1)) &amp;&amp;(1 == LL_USART_IsActiveFlag_TC(USART1)))</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token function">LL_USART_IsActiveFlag_TXE</span><span class="token punctuation">(</span>USART1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">/* wait for tx holding register to be empty */</span>
        <span class="token punctuation">{</span>

            <span class="token comment">/* Write character in Transmit Data register.
            TXE flag is cleared by writing data in TDR register */</span>
            <span class="token function">LL_USART_TransmitData8</span><span class="token punctuation">(</span>USART1<span class="token punctuation">,</span> u8TxTemp<span class="token punctuation">)</span><span class="token punctuation">;</span>	
            u8EnableTxTask <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
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
  <span class="token function">MX_USART1_UART_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USER CODE BEGIN 2 */</span>

  <span class="token comment">/* USER CODE END 2 */</span>

  <span class="token comment">/* Infinite loop */</span>
  <span class="token comment">/* USER CODE BEGIN WHILE */</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/* USER CODE END WHILE */</span>

    <span class="token comment">/* USER CODE BEGIN 3 */</span>
    <span class="token function">USART_Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE END 3 */</span>
<span class="token punctuation">}</span>













</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果" aria-hidden="true">#</a> 测试结果</h2><p>实验结果：MCU将接收到的数据+1后，发回给上位机。</p><figure><img src="`+v+'" alt="&quot;UART&quot;" tabindex="0" loading="lazy"><figcaption>&quot;UART&quot;</figcaption></figure>',6),g=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"本人在此发布博文（包括但不限于汉字、拼音、阿拉伯字母 、图片、影像，以及前述之各种任意组合等等）均为随意敲击键盘所出，用于检验本人电脑键盘录入、屏幕显示的机械、光电性能，并不代表本人观点。如需要详查请直接与键盘发明者及生产厂商法人代表联系。")],-1),f=n("h2",{id:"参考文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文档","aria-hidden":"true"},"#"),s(" 参考文档")],-1),E={href:"https://www.st.com/content/st_com/zh/support/learning/stm32-education/stm32-online-training.html",target:"_blank",rel:"noopener noreferrer"};function U(S,A){const e=i("center"),l=i("ExternalLinkIcon");return p(),o("div",null,[k,b,u(" more "),_,T,a(e,null,{default:t(()=>[s("UART配置")]),_:1}),R,a(e,null,{default:t(()=>[s("实验结果")]),_:1}),g,f,n("p",null,[n("a",E,[s("STM32 Online Training"),a(l)])])])}const C=c(m,[["render",U],["__file","07.STM32G0驱动-UART.html.vue"]]);export{C as default};
