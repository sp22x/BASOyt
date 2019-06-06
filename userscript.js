// ==UserScript==
// @name         Block Annoying Stuff on Youtube
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
var vt_key = ["avengers","marvel","spider(-| )*man","x-*men","cricket","icc","(angry )*prash","espn","cricinfo","eminem","emiway","chanchlani","carryminati","mrbeast","taarak","pubg","men in black","crime patrol","kapil sharma","dhoni","kohli"];
var d_titles = ["breaking news","trending","carryminati","mrbeast","chanchlani"];
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
        for(j of d_titles)
        {
            if(i.querySelector("span"))
            {
                if(i.querySelector("span").innerText.trim().toLowerCase() === j)
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
cid = setInterval(fmain,1000);