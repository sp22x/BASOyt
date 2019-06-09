// ==UserScript==
// @name         Block Annoying Stuff on Youtube (OLD)
// @namespace    http://sp22x.github.io
// @version      0.1
// @description  Block Annoying Stuff on Youtube
// @author       sp22x
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

var cid = null;
var vt_key = [];
var d_tl = ["breaking news","trending"];
var tmp1 = JSON.parse(localStorage.getItem("vt_key"));
var tmp2 = JSON.parse(localStorage.getItem("d_tl"));
if(tmp1)
{
    vt_key = tmp1;
}
if(tmp2)
{
    d_tl = tmp2;
}
function lsUpdate()
{
    localStorage.setItem("vt_key",JSON.stringify(vt_key));
    localStorage.setItem("d_tl",JSON.stringify(d_tl));
}
function frontpageBlocks()
{
    var v_list = Array.from(document.querySelectorAll(".ytd-grid-video-renderer"));
    for(var i of v_list)
    {
        try
        {
            for(var j of vt_key)
            {
                var rx = new RegExp(j,"i");
                var vtitle = i.querySelector("a#video-title").innerText;
                var vuser = i.querySelectorAll("a")[2].innerText;
                if((vtitle && rx.test(vtitle)) || (vuser && rx.test(vuser)))
                {
                    i.parentNode.removeChild(i);
                }
            }
        }
        catch(e){}
    }
    var d_list = Array.from(document.querySelectorAll("div ytd-item-section-renderer"));
    for(i of d_list)
    {
        for(j of d_tl)
        {
            if(i.querySelector("span"))
            {
                if(i.querySelector("span").innerText.trim().toLowerCase().indexOf(j.toLowerCase())!==-1)
                {
                    i.parentNode.removeChild(i);
                }
            }
        }
    }
}
function url_proc(url_x)
{
    if(url_x.toLowerCase() === "https://www.youtube.com/")
    {
        setTimeout(frontpageBlocks,1000);
    }
}
function fmain()
{
    url_proc(window.location.href);
}
var cid2 = null;
function k_add_vt()
{
    var resp = prompt("Add New Keyword");
    if(resp && resp.trim()!=="")
    {
        vt_key.push(resp);
        d_tl.push(resp);
        lsUpdate();
    }
}
cid2 = setInterval(function(){
    if(document.querySelector("#logo"))
    {
        var k_menu_button = document.createElement("button");
        k_menu_button.style.backgroundColor = "grey";
        k_menu_button.style.color = "white";
        k_menu_button.style.border = "none";
        k_menu_button.innerText = "Block";
        document.querySelector("#logo").after(k_menu_button);
        k_menu_button.onclick = k_add_vt;
        clearInterval(cid2);
    }
},1000);
cid = setInterval(fmain,1000);