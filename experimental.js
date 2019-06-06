// ==UserScript==
// @name         (Experimental) Block Annoying Stuff on Youtube
// @namespace    http://sp22x.github.io
// @version      0.1
// @description  Block Annoying Stuff on Youtube
// @author       sp22x
// @match        https://www.youtube.com/
// @grant        none
// @run-at document-body
// ==/UserScript==
var vt_key = ["icc","cricket"];
var targetNode = document.body;
var config = { attributes: true, childList: true, subtree: true };
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
    	if(mutation.type==="childList" && mutation.addedNodes.length)
    	{
			var tmp = Array.from(mutation.addedNodes);
			for(var ei of tmp)
			{
				try
				{
					if(ei.tagName && ei.tagName.toLowerCase()==="ytd-grid-video-renderer")
					{
						var tmp2 = Array.from(ei.querySelectorAll("a")).map(function(e){return e.innerText;}).join(" ").trim();
						console.log("-----");
						console.log(tmp2);
						for(var fl of vt_key)
						{
							var rx = new RegExp(fl,"i");
							if(rx.test(tmp2))
							{
                                console.log(fl);
                                ei.style.display = "none";
                                ei.style.visibility = "hidden";
								console.log(ei.style.display);
                                console.log(ei);
                            }
						}

					}
				}
				catch(e){console.log(e);}
			}
    	}
    }
};

var observer = new MutationObserver(callback);
observer.observe(targetNode, config);