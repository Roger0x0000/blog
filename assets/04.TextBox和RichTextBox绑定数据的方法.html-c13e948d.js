import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,d,a as i,b as l,f as v}from"./app-02156c45.js";const a="/blog/assets/blog_image/WinForm/20220514095806.png",r={},c=i("h1",{id:"textbox和richtextbox绑定数据的方法",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#textbox和richtextbox绑定数据的方法","aria-hidden":"true"},"#"),l(" TextBox和RichTextBox绑定数据的方法")],-1),u=i("p",null,"TextBox和RichTextBox绑定数据的方法",-1),m=v(`<h2 id="_1-form代码" tabindex="-1"><a class="header-anchor" href="#_1-form代码" aria-hidden="true">#</a> 1.Form代码</h2><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {

        MainViewMode class_MainViewMode = new MainViewMode();


        public Form1()
        {
            InitializeComponent();
        }



        private void Form1_Load(object sender, EventArgs e)
        {
           

            #region 测试
            /************************************************
             * 第一个值：要绑定到TextBox的什么地方
             * 第二个值：数据源是什么
             * 第三个值：应该取数据源的什么属性
             * 第四个值：是否开启数据格式化
             * 第五个值：在什么时候启用数据源绑定
             * *********************************************/
  
            textBox1.DataBindings.Add(&quot;Text&quot;, class_MainViewMode, &quot;TextBoxLog&quot;, true, DataSourceUpdateMode.OnPropertyChanged);
            richTextBox1.DataBindings.Add(&quot;Text&quot;, class_MainViewMode, &quot;RichTextBoxLog&quot;);

            #endregion

        }

       
        private void buttonShow_Click(object sender, EventArgs e)
        {
            MessageBox.Show(&quot;TextBoxLog:&quot; + class_MainViewMode.TextBoxLog + &quot;\\n&quot; + &quot;RichTextBoxLog:&quot; + class_MainViewMode.RichTextBoxLog);
        }

        private void buttonUpdate_Click(object sender, EventArgs e)
        {
            Random rnd = new Random();


            class_MainViewMode.TextBoxLog = rnd.Next(0, 50000).ToString();
            class_MainViewMode.RichTextBoxLog = rnd.Next(0, 50000).ToString();

        }
    }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-mainviewmode类代码" tabindex="-1"><a class="header-anchor" href="#_2-mainviewmode类代码" aria-hidden="true">#</a> 2.MainViewMode类代码</h2><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace WindowsFormsApp1
{
    public class MainViewMode : INotifyPropertyChanged
    {
        public MainViewMode()
        {
            TextBoxLog = &quot;Log1&quot;;
            RichTextBoxLog = &quot;Log2&quot;;
        }
        public event PropertyChangedEventHandler PropertyChanged;

        private string _TextBoxLog = string.Empty;
        public string TextBoxLog
        { 
            get { return _TextBoxLog; }
            set {
                if ((false == string.IsNullOrEmpty(value)) &amp;&amp; (value != _TextBoxLog))
                {
                    _TextBoxLog = value;
                    NotifyPropertyChanged(() =&gt; TextBoxLog);
                }
                else
                {

                }
            }
        }



        private string _RichTextBoxLog;
        public string RichTextBoxLog
        {
            get { return _RichTextBoxLog; }
            set
            {
                _RichTextBoxLog = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(&quot;RichTextBoxLog&quot;));
            }
        }




        public void NotifyPropertyChanged&lt;T&gt;(Expression&lt;Func&lt;T&gt;&gt; property)
        {
            if (PropertyChanged != null)
            {
                var memberExpression = property.Body as MemberExpression;

                if (memberExpression != null)
                {
                    PropertyChanged.Invoke(this, new PropertyChangedEventArgs(memberExpression.Member.Name));
                }
                else
                {

                }
            }
            else
            {

            }
        }

    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+a+'" alt="Form" tabindex="0" loading="lazy"><figcaption>Form</figcaption></figure>',5);function o(t,b){return e(),s("div",null,[c,u,d(" more "),m])}const p=n(r,[["render",o],["__file","04.TextBox和RichTextBox绑定数据的方法.html.vue"]]);export{p as default};
