import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as a,c as d,d as o,a as e,b as n,e as s,f as m}from"./app-9edd4270.js";const v="/blog/assets/blog_image/WinForm/202201161031.png",c="/blog/assets/blog_image/WinForm/202201161032.png",t="/blog/assets/blog_image/WinForm/202201161033.png",u={},b=e("h1",{id:"winform主窗体panel中添加新的子窗体",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#winform主窗体panel中添加新的子窗体","aria-hidden":"true"},"#"),n(" WinForm主窗体Panel中添加新的子窗体")],-1),_=e("p",null,"WinForm主窗体Panel中添加新的子窗体。",-1),h=m(`<h2 id="代码说明" tabindex="-1"><a class="header-anchor" href="#代码说明" aria-hidden="true">#</a> 代码说明</h2><ul><li>WinForm主窗体Panel中添加新的子窗体，可以减少Tab控件的使用，使程序模块化；</li><li>可以更灵活的控制窗体的布局。</li></ul><h3 id="简单的winform代码示例" tabindex="-1"><a class="header-anchor" href="#简单的winform代码示例" aria-hidden="true">#</a> 简单的WinForm代码示例</h3><ul><li>代码</li></ul><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

//主窗体Panel中添加新的窗体
//1）如果用tab控件，整个窗体的控件太多，不易于我们编程；
//2）可以更灵活的控制窗体的布局。
namespace DataTable
{
    public partial class Form_Main : Form
    {
        private Form_User frmUser = new Form_User(); 

        public Form_Main()
        {
            InitializeComponent();
        }

        private void btn_Show_Click(object sender, EventArgs e)
        {
            if (frmUser != null)
            {
                frmUser.FormBorderStyle = FormBorderStyle.None; //获取或设置窗体的边框样式。
                frmUser.TopLevel = false; // TopLevel,获取或设置一个值，该值指示是否将窗体显示为顶级窗口。
                frmUser.Dock = System.Windows.Forms.DockStyle.Fill;
                frmUser.BackColor = this.panel_Form.BackColor;

                panel_Form.Controls.Clear();     //移除所有控件
                panel_Form.Controls.Add(frmUser);//添加到 Panel中
                
                frmUser.Show();     // 显示
            }
        }

        private void btn_Hide_Click(object sender, EventArgs e)
        {
            if (frmUser != null)
            {
                frmUser.Hide();
            }
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>UI</li></ul><p><img src="`+v+'" alt="布局" title="布局" loading="lazy"><br><img src="'+c+'" alt="布局" title="布局" loading="lazy"><br><img src="'+t+'" alt="布局" title="布局" loading="lazy"></p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>',8),p={href:"https://github.com/RJCodeAdvance",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/RJCodeAdvance/Modern-Media-Player-UI-C-Sharp",target:"_blank",rel:"noopener noreferrer"};function f(F,C){const i=r("ExternalLinkIcon");return a(),d("div",null,[b,_,o(" more "),h,e("p",null,[e("a",p,[n("RJ Code Advance"),s(i)])]),e("p",null,[e("a",g,[n("Modern-Media-Player-UI-C-Sharp"),s(i)])])])}const U=l(u,[["render",f],["__file","02.WinForm主窗体Panel中添加新的子窗体.html.vue"]]);export{U as default};
