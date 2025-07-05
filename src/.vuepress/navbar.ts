import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    "intro",
    "/posts/",
	"/kits/",
    {
        text: "数字电源开发板",
        icon: "star",
        children: [
            {
                text: "Buck数字电源开发板",
                icon: "link",
                link: "https://item.taobao.com/item.htm?id=812182316855&ltk2=1751435471197wfzjgiaj81600lyf22xqq&sku_properties=5919063%3A14198304&spm=a21xtw.29178619.0.0",
            },
            {
                text: "Buck-Boost数字电源开发板",
                icon: "link",
                link: "https://item.taobao.com/item.htm?abbucket=18&detail_redpacket_pop=true&id=940186646234&ltk2=1751435426855x72w7bbpen0w1jigi6rpmq&ns=1&priceTId=2147849317514354167707212e1bef&query=%E6%95%B0%E5%AD%97%E7%94%B5%E6%BA%90%E5%BC%80%E5%8F%91%E6%9D%BF&skuId=6011490299281&spm=a21n57.1.hoverItem.9&utparam=%7B%22aplus_abtest%22%3A%22e78fcf69a3173bb583c01ff68042f646%22%7D&xxc=taobaoSearch"
            },
            {
                text: "PFC数字电源开发板",
                icon: "link",
                link: "https://item.taobao.com/item.htm?id=920530458957&ltk2=1751435488322k3i9k6zpaxrajon8nkfy7n&sku_properties=5919063%3A14198304&spm=a21xtw.29178619.0.0",
            },
        ]
    }
]);
