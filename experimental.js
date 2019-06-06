// ==UserScript==
// @name         MOBS EXP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/
// @grant        none
// @run-at document-body
// ==/UserScript==
var vt_key = ["icc"];
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
						console.log("-------");
						console.log(tmp2);
						for(var fl of vt_key)
						{
							console.log(fl);
							var rx = new RegExp(fl,"i");
							console.log(rx.test(tmp2));
							if(rx.test(tmp2))
							{
								console.log(tmp2);
								console.log(ei.parentNode);
								console.log(ei.parentNode.removeChild);
								ei.parentNode.removeChild(ei);
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