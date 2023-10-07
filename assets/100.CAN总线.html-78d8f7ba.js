import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as m,o as c,c as o,d as g,a as s,b as a,e as l,w as n,f as e}from"./app-795d25d7.js";const h="/blog/assets/blog_image/CAN/2.位速率和总线长度关系.png",d="/blog/assets/blog_image/CAN/1.CAN总线电平1.png",u="/blog/assets/blog_image/CAN/1.CAN总线电平2.png",y="/blog/assets/blog_image/CAN/1.CAN总线电平3.png",r="/blog/assets/blog_image/CAN/3.数据帧结构.png",_="/blog/assets/blog_image/CAN/3.1.帧起始和帧结束.png",f="/blog/assets/blog_image/CAN/3.2.仲裁段.png",b="/blog/assets/blog_image/CAN/3.2.1.仲裁处理.png",v="/blog/assets/blog_image/CAN/3.2.2.仲裁处理.png",C="/blog/assets/blog_image/CAN/3.3.控制段.png",x="/blog/assets/blog_image/CAN/3.4.数据段.png",N="/blog/assets/blog_image/CAN/3.5.CRC段.png",A="/blog/assets/blog_image/CAN/3.6.ACK段.png",z="/blog/assets/blog_image/CAN/4.远程帧结构.png",w="/blog/assets/blog_image/CAN/4.2.数据帧和远程帧仲裁机制.png",S="/blog/assets/blog_image/CAN/4.4.数据帧远程帧比较.png",k="/blog/assets/blog_image/CAN/5.1.误帧类型.png",R="/blog/assets/blog_image/CAN/5.错误帧结构.png",T="/blog/assets/blog_image/CAN/5.2.错误处理机制.png",I="/blog/assets/blog_image/CAN/6.过载帧结构.png",B="/blog/assets/blog_image/CAN/6.1.过载帧具体结构.png",M="/blog/assets/blog_image/CAN/7.帧间隔结构.png",D="/blog/assets/blog_image/CAN/7.1帧间隔结构.png",P="/blog/assets/blog_image/CAN/7.2帧间隔结构.png",Q="/blog/assets/blog_image/CAN/8.CAN总线发送总流程.png",X="/blog/assets/blog_image/CAN/11.TQ.png",Z="/blog/assets/blog_image/CAN/11.位时间.png",F="/blog/assets/blog_image/CAN/11.段及其作用.png",L="/blog/assets/blog_image/CAN/12.SJW.png",J="/blog/assets/blog_image/CAN/13.硬件同步.png",W="/blog/assets/blog_image/CAN/13.再同步.png",E="/blog/assets/blog_image/CAN/10.NRZ编码.png",H="/blog/assets/blog_image/CAN/9.位填充1.png",K="/blog/assets/blog_image/CAN/12.过滤器和屏蔽器.png",V="/blog/assets/blog_image/CAN/11.滤波和时序.png",Y="/blog/assets/blog_image/CAN/12.过滤器和屏蔽器2.png",O={},U=s("h1",{id:"can总线",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#can总线","aria-hidden":"true"},"#"),a(" CAN总线")],-1),q=s("p",null,"    CAN总线笔记。",-1),j=e('<h2 id="通信速率与距离" tabindex="-1"><a class="header-anchor" href="#通信速率与距离" aria-hidden="true">#</a> 通信速率与距离</h2><p>    CAN主要的应用领域是小范围实时可靠的通信网络。CAN-bus的通信距离与通信速率成反比，即通信速率越高，则通信距离越短。</p><figure><img src="'+h+'" alt="位速率和总线长度关系" tabindex="0" loading="lazy"><figcaption>位速率和总线长度关系</figcaption></figure><h2 id="总线电平" tabindex="-1"><a class="header-anchor" href="#总线电平" aria-hidden="true">#</a> 总线电平</h2>',4),G=s("strong",null,"显性电平",-1),$=s("strong",null,"隐性电平",-1),ss=e('<p><img src="'+d+'" alt="CAN总线电平" title="CAN总线电平" loading="lazy"><br><img src="'+u+'" alt="CAN总线电平" title="CAN总线电平" loading="lazy"><br><img src="'+y+'" alt="CAN总线电平" title="CAN总线电平" loading="lazy"></p><div style="display:none;"></div><h2 id="can帧类型" tabindex="-1"><a class="header-anchor" href="#can帧类型" aria-hidden="true">#</a> <strong>CAN帧类型</strong></h2><p>    目前使用最广泛的CAN-bus标准是V2.0版本，该标准在发布之初就制定了A和B两个部分，称为CAN2.0A和CAN2.0B。这两个部分的主要区别在于仲裁区域的ID码长度不同；CAN2.0A为11位ID，称为标准帧；CAN2.0B位29位ID，称为扩展帧。</p><table><thead><tr><th style="text-align:center;">帧类型</th><th style="text-align:left;">帧用途</th></tr></thead><tbody><tr><td style="text-align:center;">数据帧</td><td style="text-align:left;">用于发送节点向接收节点传送数据，是使用最多的帧类型</td></tr><tr><td style="text-align:center;">远程帧</td><td style="text-align:left;">用于接收节点向某个发送节点请求数据</td></tr><tr><td style="text-align:center;">错误帧</td><td style="text-align:left;">用于在检测出通讯错误（如校验错误）时向其他节点发出通知</td></tr><tr><td style="text-align:center;">过载帧</td><td style="text-align:left;">用于接收节点通知</td></tr><tr><td style="text-align:center;">帧间隔</td><td style="text-align:left;">用于将数据帧和远程帧与前面的帧分离开来</td></tr></tbody></table><h3 id="数据帧" tabindex="-1"><a class="header-anchor" href="#数据帧" aria-hidden="true">#</a> <strong>数据帧</strong></h3><p>    从发送节点向其他节点发送的数据信息，相当于甲方发送有内容的信件给乙方。</p><figure><img src="'+r+'" alt="数据帧结构" tabindex="0" loading="lazy"><figcaption>数据帧结构</figcaption></figure><p>    数据帧有7个段组成，数据帧的各段的功能如下：</p><ul><li>帧起始：表示数据帧开始，由1位显性位构成，共1位；</li><li>仲裁段：表示该帧的优先级； <ul><li>标准帧的仲裁段由11位ID码和1位远程帧标志位（RTR）组成，共12位；</li><li>扩展帧的仲裁段由29位ID码、1位替代远程帧请求位（SRR）、1位扩展帧标志位（IDE）和1位远程帧标志位（RTR）组成，共32位；</li></ul></li><li>控制段：表示数据段数据长度的编码和保留位，共6位；</li><li>数据段：数据内容，每个字节为8位，具体字节数在控制段中体现，最长为64位（8个字节）；</li><li>CRC段：检查帧的传输错误，范围包括从帧起始到数据段的所有内容（不包括填充位），共16位；</li><li>ACK段：其他接收节点确认该帧被正常接收，共2位；</li><li>帧结束：表示数据帧结束，共7位；</li></ul><h4 id="帧起始和帧结束" tabindex="-1"><a class="header-anchor" href="#帧起始和帧结束" aria-hidden="true">#</a> <strong>帧起始和帧结束</strong></h4><p>    帧起始：由1个显性位组成，总线空闲时，发送节点发送帧起始，其他接收节点同步于该帧起始位。</p><p>    帧结束：由7个连续的隐性位组成。</p><p>    注：总线上的电平有显性电平和隐性电平两种。总线上执行逻辑上的线“与”时，显性电平的逻辑值为“0”，隐性电平为“1”。“显性”具有“优先”的意味，只要有一个单元输出显性电平，总线上即为显性电平。并且，“隐性”具有“包容”的意味，只有所有的单元都输出隐性电平，总线上才为隐性电平。（显性电平比隐性电平更强。）。</p><figure><img src="'+_+'" alt="帧起始和帧结束" tabindex="0" loading="lazy"><figcaption>帧起始和帧结束</figcaption></figure><h4 id="仲裁段" tabindex="-1"><a class="header-anchor" href="#仲裁段" aria-hidden="true">#</a> <strong>仲裁段</strong></h4><p>    CAN-bus并没有规定节点的优先级，但通过仲裁段帧ID规定了数据帧的优先级。</p><p>    标准格式的ID有11个位，扩展格式的ID有29个位。禁止ID的高7位都为隐性。（禁止设定：ID=1111111XXXX）</p><figure><img src="'+f+'" alt="仲裁段" tabindex="0" loading="lazy"><figcaption>仲裁段</figcaption></figure><p>    CAN控制器在发送数据的同时监测数据线的电平是否与发送数据对应电平相同，如果不同，则停止发送并做其他处理。</p><figure><img src="'+b+'" alt="仲裁处理" tabindex="0" loading="lazy"><figcaption>仲裁处理</figcaption></figure><p>    假设节点A、B和C都发送相同格式相同类型的帧，如标准格式数据帧，它们竞争总线的过程如下：</p><figure><img src="'+v+'" alt="仲裁处理" tabindex="0" loading="lazy"><figcaption>仲裁处理</figcaption></figure><p>    从该分析过程得出结论是：帧ID值越小，优先级越高；</p><p>    对于同为扩展格式数据帧、标准格式远程帧和扩展格式远程帧的情况同理。</p><h4 id="控制段" tabindex="-1"><a class="header-anchor" href="#控制段" aria-hidden="true">#</a> <strong>控制段</strong></h4><p>    控制段共6位，标准帧的控制段由扩展帧标志位IDE、保留位r0和数据长度代码DLC组成；扩展帧控制段则由IDE、r1、r0和DLC组成如下图。</p><figure><img src="'+C+'" alt="控制段" tabindex="0" loading="lazy"><figcaption>控制段</figcaption></figure><h4 id="数据段" tabindex="-1"><a class="header-anchor" href="#数据段" aria-hidden="true">#</a> <strong>数据段</strong></h4><p>    一个数据帧传输的数据量为0~8个字节，数据量小，发送和接收时间短，实时性高，被干扰的概率小，抗干扰能力强。</p><figure><img src="'+x+'" alt="数据段" tabindex="0" loading="lazy"><figcaption>数据段</figcaption></figure><h4 id="crc段" tabindex="-1"><a class="header-anchor" href="#crc段" aria-hidden="true">#</a> <strong>CRC段</strong></h4><p>    CAN-bus使用CRC校验进行数据检错，CRC校验值存放于CRC段。 CRC校验段由15位CRC值和1位CRC界定符，构成如下图所示。</p><figure><img src="'+N+'" alt="CRC段" tabindex="0" loading="lazy"><figcaption>CRC段</figcaption></figure><h4 id="ack段" tabindex="-1"><a class="header-anchor" href="#ack段" aria-hidden="true">#</a> <strong>ACK段</strong></h4><p>    当一个接收节点接收的帧起始到CRC段之间的内容没发生错误时，它将在ACK段发送一个显性电平如下图所示。</p><figure><img src="'+A+'" alt="ACK段" tabindex="0" loading="lazy"><figcaption>ACK段</figcaption></figure><h3 id="远程帧" tabindex="-1"><a class="header-anchor" href="#远程帧" aria-hidden="true">#</a> <strong>远程帧</strong></h3><p>    向其他节点请求发送具有同一识别符的数据帧，相当于甲方请求乙方给自己发送一封有内容的信件。远程帧与数据帧相比，远程帧结构上无数据段，由6个段组成，同理分为标准格式和扩展格式，且远程帧标志位（RTR）为1（隐性电平）如下图（数据帧和远程帧）所示。</p><p><img src="'+r+'" alt="数据帧结构" title="数据帧结构" loading="lazy"><br><img src="'+z+'" alt="远程帧结构" title="远程帧结构" loading="lazy"></p><p>    如下图所示由于数据帧的RTR位为显性电平，远程帧的RTR位为隐性电平，所以帧格式和帧ID都相同情况下，数据帧的优先级比远程帧优先级高。</p><figure><img src="'+w+'" alt="数据帧和远程帧仲裁机制" tabindex="0" loading="lazy"><figcaption>数据帧和远程帧仲裁机制</figcaption></figure><figure><img src="'+S+'" alt="数据帧远程帧比较" tabindex="0" loading="lazy"><figcaption>数据帧远程帧比较</figcaption></figure><h3 id="错误帧" tabindex="-1"><a class="header-anchor" href="#错误帧" aria-hidden="true">#</a> <strong>错误帧</strong></h3><p>    检测到总线错误，发送错误帧。CAN-bus的错误类型共有5种,如下图所示。</p><figure><img src="'+k+'" alt="误帧类型" tabindex="0" loading="lazy"><figcaption>误帧类型</figcaption></figure><p>    当出现5种错误类型之一时，发送或接收节点将发送错误帧。错误帧的结构如下，其中错误标识分为主动错误标识和被动错误标识,如下图所示。</p><figure><img src="'+R+'" alt="错误帧结构" tabindex="0" loading="lazy"><figcaption>错误帧结构</figcaption></figure><p>    为防止自身由于某些原因导致无法正常接收的节点一直发送错误帧，干扰其他节点通信，CAN-bus规定了节点的3种状态及其行为,如下图所示。</p><figure><img src="'+T+'" alt="错误处理机制" tabindex="0" loading="lazy"><figcaption>错误处理机制</figcaption></figure>',50),as=e('<h3 id="过载帧" tabindex="-1"><a class="header-anchor" href="#过载帧" aria-hidden="true">#</a> <strong>过载帧</strong></h3><p>    过载帧用以在数据帧或远程帧之间提供附件的延时。当某个接收节点没有做好接收下一帧数据的准备时，将发送过载帧以通知发送节点；过载帧由过载标志和过载帧界定符组成如下图所示。</p><figure><img src="'+I+'" alt="过载帧结构" tabindex="0" loading="lazy"><figcaption>过载帧结构</figcaption></figure><p>    由于存在多个节点同时过载且过载帧发送有时间差问题，可能出现过载标志叠加后超过6个位的现象如下图所示。</p><figure><img src="'+B+'" alt="过载帧结构" tabindex="0" loading="lazy"><figcaption>过载帧结构</figcaption></figure><h3 id="帧间隔" tabindex="-1"><a class="header-anchor" href="#帧间隔" aria-hidden="true">#</a> <strong>帧间隔</strong></h3><p>    帧间隔用于将数据帧或远程帧和他们之前的帧分离开，但过载帧和错误帧前面不会插入帧间隔。</p><figure><img src="'+M+'" alt="帧间隔结构" tabindex="0" loading="lazy"><figcaption>帧间隔结构</figcaption></figure><p>    帧间隔过后，如果无节点发送帧，则总线进入空闲。</p><figure><img src="'+D+'" alt="帧间隔结构" tabindex="0" loading="lazy"><figcaption>帧间隔结构</figcaption></figure><p>    帧间隔过后，如果被动错误节点要发送帧，则先发送8个隐性电平的传输延迟，再发送帧。</p><figure><img src="'+P+'" alt="帧间隔结构" tabindex="0" loading="lazy"><figcaption>帧间隔结构</figcaption></figure><h2 id="can总线发送总流程" tabindex="-1"><a class="header-anchor" href="#can总线发送总流程" aria-hidden="true">#</a> <strong>CAN总线发送总流程</strong></h2><p>    CAN-Bus整个链路层处理数据的流程是如下图所示：</p><figure><img src="'+Q+'" alt="CAN总线发送总流程" tabindex="0" loading="lazy"><figcaption>帧间隔结构</figcaption></figure><h2 id="振荡器容差" tabindex="-1"><a class="header-anchor" href="#振荡器容差" aria-hidden="true">#</a> <strong>振荡器容差</strong></h2><p>    振荡器容差表示振荡器实际的频率与标称频率的偏离，CAN协议给定的最大振荡器容差为1.58%。CAN网络中每个节点都从振荡器基准取得位定时，在实际系统应用中，振荡器基准频率会由于初始的容差偏移、老化和温度的变化而偏离它的标称值，这些偏离量之和就构成了振荡器容差。</p><h2 id="位定时与同步" tabindex="-1"><a class="header-anchor" href="#位定时与同步" aria-hidden="true">#</a> <strong>位定时与同步</strong></h2><h4 id="位定时" tabindex="-1"><a class="header-anchor" href="#位定时" aria-hidden="true">#</a> <strong>位定时</strong></h4><p>    位定时是CAN总线上一个数据位的持续时间，主要用于CAN总线上各节点的通信波特率设置。同一总线上的通信波特率必须相同。因此，为了得到所需的波特率，位定时的可设置性是有必要的。</p><p>    另外，为了优化应用网络的性能，用户需要设计位定时中的采样点位置。定时参数、不同的信号传播延迟的关系。</p><h4 id="时间量子-time-quantum" tabindex="-1"><a class="header-anchor" href="#时间量子-time-quantum" aria-hidden="true">#</a> <strong>时间量子（Time Quantum）</strong></h4><figure><img src="'+X+'" alt="时间量子" tabindex="0" loading="lazy"><figcaption>时间量子</figcaption></figure>',23),ls=s("strong",null,"时间量子（时间份额）TQ",-1),ts=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mi",null,"T"),s("mi",null,"Q"),s("mo",null,"="),s("mfrac",null,[s("mn",null,"1"),s("msub",null,[s("mi",null,"f"),s("mrow",null,[s("mi",null,"C"),s("mi",null,"A"),s("mi",null,"N")])])]),s("mo",null,"="),s("mfrac",null,[s("mn",null,"1"),s("mrow",null,[s("mn",null,"8"),s("mi",null,"M"),s("mi",null,"H"),s("mi",null,"z")])]),s("mo",null,"="),s("mn",null,"0.125"),s("mi",null,"u"),s("mi",null,"s")]),s("annotation",{encoding:"application/x-tex"}," TQ = \\frac{1}{f_{CAN}} = \\frac{1}{8MHz} = 0.125us ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8778em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal"},"TQ"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.2019em","vertical-align":"-0.8804em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10764em"}},"f"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.1076em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"C"),s("span",{class:"mord mathnormal mtight"},"A"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.10903em"}},"N")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8804em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"8"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"M"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.04398em"}},"Hz")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"0.125"),s("span",{class:"mord mathnormal"},"u"),s("span",{class:"mord mathnormal"},"s")])])])])],-1),ns=s("h4",{id:"标称位时间",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#标称位时间","aria-hidden":"true"},"#"),a(),s("strong",null,"标称位时间")],-1),es=s("strong",null,"标称位时间",-1),is=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"T"),s("mrow",null,[s("mi",null,"B"),s("mi",null,"I"),s("mi",null,"T")])]),s("mo",null,"="),s("mi",null,"T"),s("mi",null,"Q"),s("mo",null,"∗"),s("mo",{stretchy:"false"},"("),s("mi",null,"S"),s("mi",null,"y"),s("mi",null,"n"),s("msub",null,[s("mi",null,"c"),s("mi",null,"S")]),s("mi",null,"e"),s("mi",null,"g"),s("mo",null,"+"),s("mi",null,"P"),s("mi",null,"r"),s("mi",null,"o"),s("msub",null,[s("mi",null,"p"),s("mi",null,"S")]),s("mi",null,"e"),s("mi",null,"g"),s("mo",null,"+"),s("mi",null,"P"),s("mi",null,"h"),s("mi",null,"a"),s("mi",null,"s"),s("msub",null,[s("mi",null,"e"),s("mi",null,"S")]),s("mi",null,"e"),s("mi",null,"g"),s("mn",null,"1"),s("mo",null,"+"),s("mi",null,"P"),s("mi",null,"h"),s("mi",null,"a"),s("mi",null,"s"),s("msub",null,[s("mi",null,"e"),s("mi",null,"S")]),s("mi",null,"e"),s("mi",null,"g"),s("mn",null,"2"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"}," T_{BIT} = TQ * (Sync_Seg + Prop_Seg +Phase_Seg1 + Phase_Seg2) ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.1389em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05017em"}},"B"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07847em"}},"I"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8778em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal"},"TQ"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"S"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"c"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05764em"}},"S")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8778em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"P"),s("span",{class:"mord mathnormal"},"ro"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"p"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05764em"}},"S")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8889em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"P"),s("span",{class:"mord mathnormal"},"ha"),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"e"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05764em"}},"S")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"P"),s("span",{class:"mord mathnormal"},"ha"),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"e"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05764em"}},"S")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),s("span",{class:"mord"},"2"),s("span",{class:"mclose"},")")])])])])],-1),ms=s("p",null,"    位时间由以下4段组成：",-1),rs=s("ul",null,[s("li",null,"同步段 Synchronization Segment (Sync_Seg)"),s("li",null,"传播时间段 Propagation Time Segment (Prop_Seg)"),s("li",null,"相位缓冲段1 Phase Buffer Segment 1 (Phase_Seg1)"),s("li",null,"相位缓冲段2 Phase Buffer Segment 2 (Phase_Seg2)")],-1),ps=s("h4",{id:"标称位速率-波特率",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#标称位速率-波特率","aria-hidden":"true"},"#"),a(),s("strong",null,"标称位速率（波特率）")],-1),cs=s("p",null,"    标称位速率为一个理想的发送器在没有重新同步的情况下每秒发送的数量。",-1),os=s("strong",null,"波特率",-1),gs=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mtext",null,"波特率"),s("mo",null,"="),s("mfrac",null,[s("mn",null,"1"),s("msub",null,[s("mi",null,"T"),s("mrow",null,[s("mi",null,"B"),s("mi",null,"I"),s("mi",null,"T")])])]),s("mo",null,"="),s("mfrac",null,[s("mn",null,"1"),s("mrow",null,[s("mn",null,"0.125"),s("mi",null,"u"),s("mi",null,"s"),s("mo",null,"∗"),s("mn",null,"16")])]),s("mo",null,"="),s("mn",null,"500"),s("mi",null,"k"),s("mi",null,"b"),s("mi",null,"p"),s("mi",null,"s")]),s("annotation",{encoding:"application/x-tex"}," 波特率 = \\frac{1}{T_{BIT}} = \\frac{1}{0.125us*16}= 500 kbps ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord cjk_fallback"},"波特率"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.1574em","vertical-align":"-0.836em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.1389em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05017em"}},"B"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07847em"}},"I"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.836em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"0.125"),s("span",{class:"mord mathnormal"},"u"),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mord"},"16")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8889em","vertical-align":"-0.1944em"}}),s("span",{class:"mord"},"500"),s("span",{class:"mord mathnormal"},"kb"),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mord mathnormal"},"s")])])])])],-1),hs=s("figure",null,[s("img",{src:Z,alt:"位时间",tabindex:"0",loading:"lazy"}),s("figcaption",null,"位时间")],-1),ds=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mi",null,"T"),s("mi",null,"Q"),s("mo",null,"="),s("mfrac",null,[s("mrow",null,[s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"Y"),s("mn",null,"1")]),s("mo",null,"−"),s("msub",null,[s("mi",null,"Y"),s("mn",null,"2")]),s("mo",{stretchy:"false"},")")]),s("mrow",null,[s("msub",null,[s("mi",null,"X"),s("mrow",null,[s("mi",null,"n"),s("mi",null,"e"),s("mi",null,"w"),s("mn",null,"1")])]),s("mo",null,"−"),s("msub",null,[s("mi",null,"X"),s("mrow",null,[s("mi",null,"n"),s("mi",null,"e"),s("mi",null,"w"),s("mn",null,"2")])])])])]),s("annotation",{encoding:"application/x-tex"}," TQ = \\frac{(Y_1-Y_2)}{X_{new1}-X_{new2}} ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8778em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal"},"TQ"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.263em","vertical-align":"-0.836em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.427em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"X"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0785em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"n"),s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"mord mtight"},"1")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"X"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0785em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"n"),s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"mord mtight"},"2")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"Y"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.2222em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"Y"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.2222em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mclose"},")")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.836em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})])])])])])],-1),us=e('<p>    可以把标称位时间分成了几个不重叠的时间片段</p><ul><li>同步段：用于同步总线上不同的节点，这一段内要有一个跳变沿。</li><li>传播时间段：用于补偿网络内的物理延时时间，是总线上输入比比较器延时和输出驱动器延时总和的两倍。</li><li>相位缓冲段1和相位缓冲段2：相位缓冲段用于补偿边沿阶段的误差，这两个段可以通过重新同步加长或者缩短。</li><li>采样点：读取总线电平并解释各位值的一个时间点，位于相位缓冲段1之后，用于计算后续位的位电平。</li></ul><figure><img src="'+F+'" alt="段及其作用" tabindex="0" loading="lazy"><figcaption>段及其作用</figcaption></figure><p>    重新同步（再同步）可能使相位段1延长或使相位段2缩短。相位缓冲段延长或缩短的上限由同步跳转宽度（ Synchronization Jump Width， SJW）给出。 SJW 值将添加给相位段1或从相位段2中减去 。</p><figure><img src="'+L+'" alt="同步跳转宽度" tabindex="0" loading="lazy"><figcaption>同步跳转宽度</figcaption></figure><h3 id="同步" tabindex="-1"><a class="header-anchor" href="#同步" aria-hidden="true">#</a> 同步</h3><h4 id="硬件同步" tabindex="-1"><a class="header-anchor" href="#硬件同步" aria-hidden="true">#</a> 硬件同步</h4><p>    接收单元在总线空闲状态检测出帧起始时进行的同步调整。在检测出边沿的地方不考虑 SJW 的值而认为是 SS 段。硬件同步的过程如下图所示：</p><figure><img src="'+J+'" alt="硬件同步" tabindex="0" loading="lazy"><figcaption>硬件同步</figcaption></figure><h3 id="再同步" tabindex="-1"><a class="header-anchor" href="#再同步" aria-hidden="true">#</a> 再同步</h3><p>    在接收过程中检测出总线上的电平变化时进行的同步调整。每当检测出边沿时，根据 SJW 值通过加长 PBS1 段，或缩短 PBS2 段，以调整同步。但如果发生了超出 SJW值的误差时，最大调整量不能超过 SJW 值。<br> 再同步如下图所示：</p><figure><img src="'+W+'" alt="硬件同步" tabindex="0" loading="lazy"><figcaption>硬件同步</figcaption></figure><h2 id="nrz编码" tabindex="-1"><a class="header-anchor" href="#nrz编码" aria-hidden="true">#</a> NRZ编码</h2>',13),ys=s("strong",null,"逻辑“1”对应高电平，逻辑“0”对应低电平。NRZ编码的特征在于，相同极性的连续位没有电平变化。",-1),_s=s("figure",null,[s("img",{src:E,alt:"NRZ编码",tabindex:"0",loading:"lazy"}),s("figcaption",null,"NRZ编码")],-1),fs=s("h2",{id:"位填充",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#位填充","aria-hidden":"true"},"#"),a(" 位填充")],-1),bs=s("p",null,"    数据传输正确的基本前提是网络中通信节点之间同步。起始位（帧起始 - SOF）的隐性至显性的跳变沿用于同步CAN报文。之后，重同步（resynchronization）机制用于保持同步，直到报文传输结束为止。",-1),vs=s("strong",null,"发送方在传输连续5个相同位后必须传输一个相反的位；即使连续5个相同位后本就是一个相反位，也需要添加填充位。",-1),Cs=e('<p>    由于位填充从以SOF的传输为开始，以CRC序列的最后一位的传输为结束，因此在传输包含8个数据字节的标准格式的数据帧时，在极限情况下，应有24个填充位。所以，理论上标准格式数据帧最多包含132位。</p><p>    “Bit Stuffing”图可以帮助您迅速理解位填充机制。</p><figure><img src="'+H+'" alt="位填充" tabindex="0" loading="lazy"><figcaption>位填充</figcaption></figure><h2 id="报文滤波" tabindex="-1"><a class="header-anchor" href="#报文滤波" aria-hidden="true">#</a> <strong>报文滤波</strong></h2><p>    报文接收过滤器和屏蔽寄存器用于决定报文组装缓冲器中的报文是否应该被装入某个接收缓冲器中。一旦一条有效的报文被接收到MAB， 报文的标识符字段就会与过滤值进行比较。如果匹配的话，该报文就会被装入相应的接收缓冲器。过滤屏蔽寄存器用于决定标识符中的哪些位将被过滤器检查。表 23-2 给出了一个真值表，从中可以看出标识符中的每个位是如何与屏蔽和过滤寄存器进行比较来确定报文是否应该被装入接收缓冲器的。屏蔽寄存器主要用于决定过滤器将应用于哪些位。如果任一屏蔽位被设置为零，无论过滤位为何值该位都会被自动接收。</p><figure><img src="'+K+'" alt="过滤器和屏蔽器" tabindex="0" loading="lazy"><figcaption>过滤器和屏蔽器</figcaption></figure>',6),xs=s("strong",null,"下图为我的Python GUI。",-1),Ns=s("figure",null,[s("img",{src:V,alt:"滤波和时序",tabindex:"0",loading:"lazy"}),s("figcaption",null,"滤波和时序")],-1),As=s("p",null,"    下图红色为上位机发送的数据，绿色为MCU应答的数据。",-1),zs=s("figure",null,[s("img",{src:Y,alt:"过滤器和屏蔽器测试",tabindex:"0",loading:"lazy"}),s("figcaption",null,"过滤器和屏蔽器测试")],-1),ws=s("h2",{id:"参考资料",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#参考资料","aria-hidden":"true"},"#"),a(),s("strong",null,"参考资料")],-1),Ss={href:"https://blog.csdn.net/liuligui5200/article/details/79030676",target:"_blank",rel:"noopener noreferrer"},ks={href:"https://elearning.vector.com/mod/page/view.php?id=4810",target:"_blank",rel:"noopener noreferrer"},Rs=s("p",null,"《CAN总线应用层协议实例解析》",-1),Ts=s("p",null,"《项目驱动：CAN—BUS现场总线基础教程》",-1),Is=s("p",null,"《北京恒润科技有限公司 CAN基础》",-1),Bs=s("p",null,"《瑞萨 CAN入门书》",-1),Ms=s("p",null,"《Microchip 精英年会CAN培训资料》",-1);function Ds(Ps,Qs){const t=m("font"),i=m("ExternalLinkIcon");return c(),o("div",null,[U,q,g(" more "),j,s("p",null,[a("    CAN 收发器根据两根总线（ CAN_High 和 CAN_Low）的电位差来判断总线电平，这种传输方式称为“差分传输”。电缆上传输的电平信号只有两种可能，分别为"),l(t,{color:"red"},{default:n(()=>[G]),_:1}),a("和"),l(t,{color:"red"},{default:n(()=>[$]),_:1}),a("，其中显性电平为逻辑0，隐性电平代表逻辑1。")]),ss,l(t,{color:"red"},{default:n(()=>[a("**注：这些错误处理的机制是由硬件自主完成的这样做的目的就是只要CAN在收到数据肯定是正确的数据。**")]),_:1}),as,s("p",null,[a("    假设CAN模块的时钟为8MHz，"),l(t,{color:"red"},{default:n(()=>[ls]),_:1}),a("计算如下：")]),ts,ns,s("p",null,[a("    "),l(t,{color:"red"},{default:n(()=>[es]),_:1}),a("计算：")]),is,ms,rs,ps,cs,s("p",null,[a("    假设标称位时间 = 16 TQ，CAN模块的时钟为8MHz，"),l(t,{color:"red"},{default:n(()=>[os]),_:1}),a("计算如下：")]),gs,hs,ds,us,s("p",null,[a("    避免故障需要处理噪声辐射和敏感性或抗干扰性。位编码对辐射发射具有重大意义。智能设计的位编码有助于显著减少辐射，但必须经常与所需的输送能力进行协调。NRZ（Non Return to Zero，不归零）位编码被用于CAN。这意味着二进制信号与物理电平的映射关系："),l(t,{color:"red"},{default:n(()=>[ys]),_:1}),a("NRZ编码能够实现极高的波特率，同时又可将辐射保持在限制范围内。但NRZ编码不是自同步的，即不具有任何同步属性。如果较长时间内没有发生电平变化，则接收方将不能保持同步。因此使用NRZ编码需要显式同步机制，但这会降低传输效率。在CAN总线中，使用位填充方法作为同步机制：发送方在传输五个相同位后，在位流中插入一个相反的位。曼彻斯特（Manchester）编码没有这种机制，因为它是自同步的。")]),_s,fs,bs,s("p",null,[a("    重同步机制基于对隐性至显性跳变沿的评估。位填充机制保证了传输过程中有足够的跳变沿。ISO 11898-1规定，"),l(t,{color:"red"},{default:n(()=>[vs]),_:1})]),Cs,s("p",null,[a("    当设置过滤器为0x00000000屏蔽器为0x1FFFFFF0，就会接受ID为0x00000000~0x0000000F的数据帧或远程帧。"),l(t,{color:"red"},{default:n(()=>[xs]),_:1})]),Ns,As,zs,ws,s("p",null,[s("a",Ss,[a("CAN总线报文浅析"),l(i)])]),s("p",null,[s("a",ks,[a("CAN的推动因素"),l(i)])]),Rs,Ts,Is,Bs,Ms])}const Fs=p(O,[["render",Ds],["__file","100.CAN总线.html.vue"]]);export{Fs as default};
