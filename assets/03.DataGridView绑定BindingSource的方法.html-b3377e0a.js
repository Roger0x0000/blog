import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as s,d,a as i,b as a,f as l}from"./app-9edd4270.js";const r="/blog/assets/blog_image/WinForm/202205112321.png",v={},c=i("h1",{id:"datagridview绑定bindingsource的方法",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#datagridview绑定bindingsource的方法","aria-hidden":"true"},"#"),a(" DataGridView绑定BindingSource的方法")],-1),t=i("p",null,"DataGridView绑定BindingSource的方法。",-1),u=l(`<h2 id="_1-代码" tabindex="-1"><a class="header-anchor" href="#_1-代码" aria-hidden="true">#</a> 1.代码</h2><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

// DataGridView绑定BindingSource的方法

namespace DataTable
{
    public partial class Form1 : Form
    {
        class Mask
        {
            public string Name { get; set; }
            public float Price { get; set; }
        }

        List&lt;Mask&gt; List_DataSource = new List&lt;Mask&gt;();
        BindingSource BindingSourceData = new BindingSource();


        public Form1()
        {
            InitializeComponent();
        }


        private void Form1_Load(object sender, EventArgs e)
        {

            List_DataSource.Add(new Mask() { Name = &quot;医用口罩&quot;, Price = 5 });
            List_DataSource.Add(new Mask() { Name = &quot;N95&quot;, Price = 10 });

            BindingSourceData.DataSource = List_DataSource;
            dgv_Message.DataSource = BindingSourceData; //绑定到数据集合

            dgv_Message.Columns[0].Width = 200;//设置列宽度
            dgv_Message.Columns[1].Width = 170;//设置列宽度
            //设置对齐方式
            dgv_Message.Columns[0].DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
        }

        private void dgv_Message_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            BindingSourceData.EndEdit();//所指向的对象BindingSourceData的值会进行更新
        }

        private void btn_Test_Click(object sender, EventArgs e)
        {
            List_DataSource[0].Price++;
            List_DataSource[1].Price+=2;
            //如果数据架构已更改，则为 true;如果只有值发生了更改，则为 false。
            BindingSourceData.ResetBindings(false);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+r+'" alt="DataGridView_BindingSource" tabindex="0" loading="lazy"><figcaption>DataGridView</figcaption></figure>',3);function m(o,b){return n(),s("div",null,[c,t,d(" more "),u])}const S=e(v,[["render",m],["__file","03.DataGridView绑定BindingSource的方法.html.vue"]]);export{S as default};
