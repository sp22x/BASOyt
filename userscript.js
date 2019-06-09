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

var cid = null, cid2 = null, cid3 = null;
var vt_key = [], d_tl = [];
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
function ls_update()
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
function add_vtkey(resp)
{
    vt_key.push(resp);
    d_tl.push(resp);
    ls_update();
}
function show_vt_box()
{
    document.querySelector("#mbox").style.visibility = "visible";
}
function add_vt_box()
{
    var mbox = document.createElement("div");
    mbox.id = "mbox";
    var mbtext = document.createElement("div");
    mbtext.innerText = "Enter new filter keyword";
    mbtext.className = "mbox-elem";
    mbtext.id = "mbtext";
    mbox.appendChild(mbtext);
    mbox.style.backgroundColor = "purple";
    mbox.style.color = "white";
    mbox.style.fontSize="4vh";
    mbox.style.width="60%";
    mbox.style.height="60%";
    mbox.style.opacity=0.8;
    mbox.style.left = "20%";
    mbox.style.top = "20%";
    mbox.style.position="fixed";
    mbox.style.zIndex = "1";
    mbox.className = "mbox-elem";
    mbox.style.visibility = "hidden";
    //------
    var mbin = document.createElement("input");
    var mbinf = function()
	{
		var tmp = this.innerText

		vt_key = vt_key.filter(function(x){
			return x!==tmp;
		});
		d_tl = d_tl.filter(function(x){
			return x!==tmp;
		});
		ls_update();
		this.parentNode.removeChild(this);
		mbtext.innerText = "Changes will be applied after you refresh the page.";
		var mbtext_rl = document.createElement("div");
		mbtext_rl.style.color = "yellow";
		mbtext_rl.innerText = "Click here to reload now.";
		mbtext_rl.onclick = function()
		{
			window.location.reload();
		}
		mbtext.appendChild(mbtext_rl);
		setTimeout(function(){
			mbtext.innerText = "Enter new filter keyword";
		},3000);
	} 
    mbin.onkeyup = function(e)
    {
        if(e.keyCode === 13)
        {
            add_vtkey(this.value);
	    	var a = document.createElement("div");
	    	a.innerText = this.value;
	    	a.style.backgroundColor = "white";
	    	a.style.border = "1px solid black";
	    	a.style.borderRadius = "2px";
	    	a.style.color = "purple";
	    	mbvtd.appendChild(a);
	    	a.className = "mbox-elem";
	    	a.onclick = mbinf;
	    	document.querySelector("#mbvtd").appendChild(a);            
            this.value = "";
        }
    }
    mbin.style.display = "block";
    mbin.style.width="90%";
    mbin.style.height="10%";
    mbin.style.fontSize="4vh";
    mbin.className = "mbox-elem";
    mbox.appendChild(mbin);
    //----
    var mbvtd = document.createElement("div");
    mbvtd.id = "mbvtd";
    mbvtd.className = "mbox-elem";
    mbvtd.style.maxHeight = "60%";
    mbvtd.style.overflowY = "scroll";
    mbox.appendChild(mbvtd);
    var qu = new Set();
    for(var i of d_tl)
    {
    	qu.add(i);
    }
    for(i of vt_key)
    {
    	qu.add(i);
    }
    for(i of qu)
    {
    	var a = document.createElement("div");
    	a.innerText = i;
    	a.style.backgroundColor = "white";
    	a.style.border = "1px solid black";
    	a.style.borderRadius = "2px";
    	a.style.color = "purple";
    	mbvtd.appendChild(a);
    	a.className = "mbox-elem";
    	a.onclick = mbinf;
    	mbvtd.appendChild(a);
    }
    //----
    document.body.appendChild(mbox);
    document.body.addEventListener("click",function(e){
        if(e.toElement.className.indexOf("mbox-elem")===-1 && mbox.style.visibility==="visible")
        {
            mbox.style.visibility = "hidden";
        }
    });
}
cid3 = setInterval(function(){
    try
    {
        add_vt_box();
        clearInterval(cid3);
    }
    catch(e){}
},1);
cid2 = setInterval(function(){
    if(document.querySelector("#logo"))
    {
        var k_menu_button = document.createElement("button");
        k_menu_button.className = "mbox-elem";
        k_menu_button.style.backgroundColor = "grey";
        k_menu_button.style.color = "white";
        k_menu_button.style.border = "none";
        k_menu_button.innerText = "Block";
        document.querySelector("#logo").after(k_menu_button);
        k_menu_button.onclick = show_vt_box;
        clearInterval(cid2);
    }
},1000);
cid = setInterval(fmain,1000);