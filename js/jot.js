/*
Jot by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

(function($) {
	$.fn.extend({
		joteditor: function(options) {
			var defaults = {
				effectDuration: 5000,
				toolbar: ["bold","italic","strike","underline","clearFormat","divider","h1","h2","h3","divider","ul","ol","blockquote","divider","link","unlink","anchor","divider","image","table","hr","divider","code"]
			}
/*
d8888b. db    db d888888b db      d8888b. 
88  `8D 88    88   `88'   88      88  `8D 
88oooY' 88    88    88    88      88   88 
88~~~b. 88    88    88    88      88   88 
88   8D 88b  d88   .88.   88booo. 88  .8D 
Y8888P' ~Y8888P' Y888888P Y88888P Y8888D' 
*/
			var options = $.extend(defaults, options),
				that = this,
				uniqueId = $(this).attr('id'),
				/* 
					HTML making up each individual button
					Note: Use &#34; for triple nested double quotes 
				*/
				toolBold = "<a href='#' title='bold' onclick='document.execCommand (&#34;bold&#34;, false, null);'><img src='jot-icons/ico-bold.svg'></a>",
				toolItalic = "<a href='#' title='italic' onclick='document.execCommand (&#34;italic&#34;, false, null);'><img src='jot-icons/ico-italic.svg'></a>",
				toolStrike = "<a href='#' title='strike through' onclick='document.execCommand (&#34;strikethrough&#34;, false, null);'><img src='jot-icons/ico-strike.svg'></a>",
				toolUnderline = "<a href='#' title='underline' onclick='document.execCommand (&#34;underline&#34;, false, null);'><img src='jot-icons/ico-underline.svg'></a>",
				toolClearformat = "<a href='#' title='clear formatting' class='removeFormatting'><img src='jot-icons/ico-clear-formatting.svg'></a>",
				toolH1 = "<a href='#' title='Largest Heading' onclick='wrapElement(&#34;h1&#34;,&#34;&#34;,&#34;&#34;,&#34;&#34;,&#34;"+uniqueId+"&#34;);'><img src='jot-icons/ico-h1.svg'></a>",
				toolH2 = "<a href='#' title='Medium Heading' onclick='wrapElement(&#34;h2&#34;,&#34;&#34;,&#34;&#34;,&#34;&#34;,&#34;"+uniqueId+"&#34;);'><img src='jot-icons/ico-h2.svg'></a>",
				toolH3 = "<a href='#' title='Small Heading' onclick='wrapElement(&#34;h3&#34;,&#34;&#34;,&#34;&#34;,&#34;&#34;,&#34;"+uniqueId+"&#34;);'><img src='jot-icons/ico-h3.svg'></a>",
				toolUl = "<a href='#' title='Bulleted List' onclick='insertList(&#34;li&#34;,&#34;ul&#34;,&#34;"+uniqueId+"&#34;);'><img src='jot-icons/ico-ul.svg'></a>",
				toolOl = "<a href='#' title='Numbered List' onclick='insertList(&#34;li&#34;,&#34;ol&#34;,&#34;"+uniqueId+"&#34;);'><img src='jot-icons/ico-ol.svg'></a>",
				toolBlockquote = "<a href='#' title='Blockquote' onclick='wrapElement(&#34;blockquote&#34;,&#34;&#34;,&#34;&#34;,&#34;&#34;,&#34;"+uniqueId+"&#34;);'><img src='jot-icons/ico-blockquote.svg'></a>",
				toolLink = "<a href='#' title='Link' class='addLink'><img src='jot-icons/ico-link.svg'></a>",
				toolUnlink = "<a href='#' title='Remove Link' class='removeLink'><img src='jot-icons/ico-unlink.svg'></a>",
				toolAnchor = "<a href='#' title='Anchor' class='addAnchor'><img src='jot-icons/ico-anchor.svg'></a>",
				toolImage = "<a href='#' title='Insert Image' class='addImage'><img src='jot-icons/ico-image.svg'></a>",
				toolTable = "<a href='#' title='Insert Table' class='addTable'><img src='jot-icons/ico-table.svg'></a>",
				toolHr = "<a href='#' title='Insert Horizontal Line' onclick='document.execCommand(&#34;insertHorizontalRule&#34;, false, null);''><img src='jot-icons/ico-hr.svg'></a>",
				toolCode = "<a href='#' title='View Source'><img src='jot-icons/ico-code.svg'></a>",
				toolDivider = "<div class='jot-divider'></div>"
			
			$(this).attr('contenteditable','true').wrap('<div class="jot-wrap" id="'+uniqueId+'"></div>');
			$(this).attr('id','');
			$(this).parent().prepend('<div class="jot-menu"></div>');



			/* Build the toolbar based on set options */
			for (var i in options.toolbar) {
				switch (options.toolbar[i]) {
					case "bold":
						$(this).parent().find('.jot-menu').append(toolBold);
						break;
					case "italic":
						$(this).parent().find('.jot-menu').append(toolItalic);
						break;
					case "strike":
						$(this).parent().find('.jot-menu').append(toolStrike);
						break;
					case "underline":
						$(this).parent().find('.jot-menu').append(toolUnderline);
						break;
					case "clearFormat":
						$(this).parent().find('.jot-menu').append(toolClearformat);
						break;
					case "paste":
						$(this).parent().find('.jot-menu').append(toolPaste);
						break;
					case "h1":
						$(this).parent().find('.jot-menu').append(toolH1);
						break;
					case "h2":
						$(this).parent().find('.jot-menu').append(toolH2);
						break;
					case "h3":
						$(this).parent().find('.jot-menu').append(toolH3);
						break;
					case "ul":
						$(this).parent().find('.jot-menu').append(toolUl);
						break;
					case "ol":
						$(this).parent().find('.jot-menu').append(toolOl);
						break;
					case "blockquote":
						$(this).parent().find('.jot-menu').append(toolBlockquote);
						break;
					case "link":
						$(this).parent().find('.jot-menu').append(toolLink);
						break;
					case "unlink":
						$(this).parent().find('.jot-menu').append(toolUnlink);
						break;
					case "anchor":
						$(this).parent().find('.jot-menu').append(toolAnchor);
						break;
					case "image":
						$(this).parent().find('.jot-menu').append(toolImage);
						break;
					case "table":
						$(this).parent().find('.jot-menu').append(toolTable);
						break;
					case "hr":
						$(this).parent().find('.jot-menu').append(toolHr);
						break;
					case "code":
						$(this).parent().find('.jot-menu').append(toolCode);
						break;
					case "divider":
						$(this).parent().find('.jot-menu').append(toolDivider);
						break;
					}
				}
/*
 .o88b.  .d88b.  d8888b. d88888b 
d8P  Y8 .8P  Y8. 88  `8D 88'     
8P      88    88 88oobY' 88ooooo 
8b      88    88 88`8b   88~~~~~ 
Y8b  d8 `8b  d8' 88 `88. 88.     
 `Y88P'  `Y88P'  88   YD Y88888P 
*/
// Force plain text paste
$('[contenteditable]').on('paste', function(e) {
	e.preventDefault();
	var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
	document.execCommand('insertText', false, text);
	console.log('paste function ran');
});

function getRangeSelectedNodes(range, includePartiallySelectedContainers) {
	console.log('getRangeSelectedNodes function ran');
	var node = range.startContainer;
	var endNode = range.endContainer;
	var rangeNodes = [];

	// Special case for a range that is contained within a single node
	if (node == endNode) {
		rangeNodes = [node];
	} else {
		// Iterate nodes until we hit the end container
		while (node && node != endNode) {
			rangeNodes.push(node = nextNode(node));
		}

		// Add partially selected nodes at the start of the range
		node = range.startContainer;
		while (node && node != range.commonAncestorContainer) {
			rangeNodes.unshift(node);
			node = node.parentNode;
		}
	}

	// Add ancestors of the range container, if required
	if (includePartiallySelectedContainers) {
		node = range.commonAncestorContainer;
		while (node) {
			rangeNodes.push(node);
			node = node.parentNode;
		}
	}

	return rangeNodes;
}

function getSelectedNodes() {
	console.log('getSelectedNodes function ran');
	var nodes = [];
	if (window.getSelection) {
		var sel = window.getSelection();
		for (var i = 0, len = sel.rangeCount; i < len; ++i) {
			nodes.push.apply(nodes, getRangeSelectedNodes(sel.getRangeAt(i), true));
		}
	}
	return nodes;
}

function replaceWithOwnChildren(el) {
	console.log('replaceWithOwnChildren function ran');
	var parent = el.parentNode;
	while (el.hasChildNodes()) {
		parent.insertBefore(el.firstChild, el);
	}
	parent.removeChild(el);
}

function removeSelectedElements(tagNames) {
	console.log('removeSelectedElements function ran');
	var tagNamesArray = tagNames.toLowerCase().split(",");
	getSelectedNodes().forEach(function(node) {
		if (node.nodeType == 1 &&
			tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
			// Remove the node and replace it with its children
			replaceWithOwnChildren(node);
		}
	});
}

/*find next node */
function nextNode(node) {
	console.log('nextNode function ran');
	if (node.hasChildNodes()) {
		return node.firstChild;
	} else {
		while (node && !node.nextSibling) {
			node = node.parentNode;
		}
		if (!node) {
			return null;
		}
		return node.nextSibling;
	}
}

$(document.body).on("click", ".removeFormatting", function(event) {
	removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote,figure");
	document.execCommand('removeFormat', false, 'null');
	return false;
});

// Paste At Caret Function	
function pasteHtmlAtCaret(html, selector) {
	console.log('pasteHtmlAtCaret function ran');
	var sel, range, parent, node = null;

	if (document.selection) {
		node = document.selection.createRange().parentElement();
	} else {
		var selection = window.getSelection();
		if (selection.rangeCount > 0) {
			node = selection.getRangeAt(0).startContainer;
			if (node !== $(node).closest(selector).get(0)) {
				node = node.parentNode;
			}
		}
	}



	if (node && $(node).closest(selector).length > 0 && window.getSelection) {
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(),
				node, lastNode;
			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);

			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		document.selection.createRange().pasteHTML(html);
	} else {
		console.log('PasteHTMLAt Caret **FAILED**');
	}
}
// Is within element? function
function isSelectionInsideElement(tagName) {
	console.log('isSelectionInsideElement function ran');
	var sel, containerNode;
	tagName = tagName.toUpperCase();
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.rangeCount > 0) {
			containerNode = sel.getRangeAt(0).commonAncestorContainer;
		}
	} else if ((sel = document.selection) && sel.type != "Control") {
		containerNode = sel.createRange().parentElement();
	}
	while (containerNode) {
		if (containerNode.nodeType == 1 && containerNode.tagName == tagName) {
			return true;
		}
		containerNode = containerNode.parentNode;
	}
	return false;
}

// Return selected HTML
function getSelectionHtml() {
	console.log('getSelectionHtml function ran');
	var html = "";
	if (typeof window.getSelection != "undefined") {
		var sel = window.getSelection();
		if (sel.rangeCount) {
			var container = document.createElement("div");
			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
				container.appendChild(sel.getRangeAt(i).cloneContents());
			}
			html = container.innerHTML;
		}
	} else if (typeof document.selection != "undefined") {
		if (document.selection.type == "Text") {
			html = document.selection.createRange().htmlText;
		}
	}
	return html;
}

// Wrap Selection
wrapElement = function(elem, parentElem, elemClass, parentClass, editorId) {
	console.log('wrapElement function ran');
	var element = elem
	sel = window.getSelection(),
	isAlready = isSelectionInsideElement(elem);
	$('#'+uniqueId+'').attr('rel', '' + sel + '');

	if (isAlready) {
		removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote");
		document.execCommand('removeFormat', false, 'null');
	} else if (sel.rangeCount) {
		var selected = $('#'+uniqueId+'').attr('rel');
		if (parentElem) {
			finalCode = '<' + parentElem + ' class="'+elemClass+'"><' + element + '>' + selected + '</' + element + '></' + parentElem + '>'
		} else {
			finalCode = '<' + element + ' class="'+elemClass+'">' + selected + '</' + element + '>'
		}
		range = sel.getRangeAt(0);
		range.deleteContents();
		removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote");
		if (editorId) {
			pasteHtmlAtCaret(finalCode, '#'+editorId+'');
			console.log('1');
		} else {
			pasteHtmlAtCaret(finalCode, '#'+uniqueId+'');
			console.log('2');
		}
		$('#'+uniqueId+'').attr('rel', '');
	}
}

// Insert BR on enter
$('div[contenteditable]').keydown(function(e) {
	console.log('insert BR on enter function ran');
	if (e.keyCode === 13) {
		//document.execCommand('insertHTML', false, '<br>');
		if (window.getSelection && !isSelectionInsideElement("li")) {
			pasteHtmlAtCaret('<br>', '#'+uniqueId+', .mini-editor');
			return false;
		}
	}
});

// Modal Function
startModal = function(content) {
	$('body').append('<div class="jot-modal"><div class="jot-modal-content">'+content+'</div></div>');
	
}
/* Need a way to remove extra markup 
$(document).keyup(function(e) {
	if ($('.jot-modal').is(':visible')) {
		if (event.which == 27) {
			closeModal();
		}
	}
});
*/
closeModal = function(){
	$('.jot-modal').remove();
}


/*
db      d888888b .d8888. d888888b 
88        `88'   88'  YP `~~88~~' 
88         88    `8bo.      88    
88         88      `Y8b.    88    
88booo.   .88.   db   8D    88    
Y88888P Y888888P `8888Y'    YP 
*/

insertList = function (elem, parentElem, editorId){
	var sel = window.getSelection(),
		selHTML = getSelectionHtml(),
		isAlready = isSelectionInsideElement(elem);

	if (isAlready && parentElem == 'ul') {
		document.execCommand('insertUnorderedList', false, null);
	} else if (isAlready && parentElem == 'ol') {
		document.execCommand('insertOrderedList', false, null);
	} else if (sel.rangeCount) {
		pasteHtmlAtCaret('<'+parentElem+' ><'+elem+'>'+selHTML+'</'+elem+'></'+parentElem+'>','#'+editorId+'');
		range = sel.getRangeAt(0);
		range.deleteContents();
	}
}

/*
db      d888888b d8b   db db   dD 
88        `88'   888o  88 88 ,8P' 
88         88    88V8o 88 88,8P   
88         88    88 V8o88 88`8b   
88booo.   .88.   88  V888 88 `88. 
Y88888P Y888888P VP   V8P YP   YD 
*/
$(document.body).on("click", "#"+uniqueId+" .addLink", function(event) {
	var currentlySelected = getSelectionHtml(),
		editorId = $(this).parents('.jot-wrap').attr('id');
	wrapElement('span','','linkreplace','', editorId);
	startModal('<h1>Add Link</h1><br><label>URL</label><input type="text" placeholder="http://www.example.com" id="linkURL" autofocus><label>Text</label><input type="text" placeholder="Link Text" id="linkText" value="'+currentlySelected+'"><a href="#" id="link-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="link-ok" class="jot-button">OK</a>');
	 $("#linkUrl").focus();
});
$(document.body).on("click", "#link-ok", function(event) {
	var lUrl = $('#linkURL').val(),
		lText = $('#linkText').val(),
		lCombined = '<a href="'+lUrl+'">'+lText+'</a>';
	$('.linkreplace').replaceWith(lCombined);
	$('.jot-modal').remove();
});
$(document.body).on("click", "#link-cancel", function(event) {
	$('.jot-modal').remove();
	$('.linkreplace').contents().unwrap();
});

$(document.body).on("click", ".removeLink", function(event) {
	removeSelectedElements("a");
	document.execCommand('removeFormat', false, 'null');
	return false;
});
/*
 .d8b.  d8b   db  .o88b. db   db  .d88b.  d8888b. 
d8' `8b 888o  88 d8P  Y8 88   88 .8P  Y8. 88  `8D 
88ooo88 88V8o 88 8P      88ooo88 88    88 88oobY' 
88~~~88 88 V8o88 8b      88~~~88 88    88 88`8b   
88   88 88  V888 Y8b  d8 88   88 `8b  d8' 88 `88. 
YP   YP VP   V8P  `Y88P' YP   YP  `Y88P'  88   YD 
*/
$(document.body).on("click", "#"+uniqueId+" .addAnchor", function(event) {
	var currentlySelected = getSelectionHtml(),
		editorId = $(this).parents('.jot-wrap').attr('id');
	wrapElement('span','','anchorreplace','', editorId);
	startModal('<h1>Add Anchor</h1><br><label>Anchor Name</label><input type="text" id="anchorName" autofocus><a href="#" id="anchor-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="anchor-ok" class="jot-button">OK</a>');
	 $("#anchorName").focus();
});
$(document.body).on("click", "#anchor-ok", function(event) {
	var aName = $('#anchorName').val(),
		aCombined = '<div id="'+aName+'" class="anchor" contenteditable="false"></div>';
	$('.anchorreplace').replaceWith(aCombined);
	$('.jot-modal').remove();
});
$(document.body).on("click", "#anchor-cancel", function(event) {
	$('.jot-modal').remove();
	$('.anchorreplace').contents().unwrap();
});
/*
d888888b .88b  d88.  d888b  
  `88'   88'YbdP`88 88' Y8b 
   88    88  88  88 88      
   88    88  88  88 88  ooo 
  .88.   88  88  88 88. ~8~ 
Y888888P YP  YP  YP  Y888P
*/
document.execCommand("enableObjectResizing", false, false);
$(document.body).on("click", "#"+uniqueId+" .addImage", function(event) {
	var currentlySelected = getSelectionHtml(),
		editorId = $(this).parents('.jot-wrap').attr('id');
	wrapElement('span','','imagereplace','', editorId);
	startModal('<h1>Add Image</h1><br><label>Select Image</label><input type="file" id="imagebrowse"><label>Image Description</label><input type="text" id="imagealt" autofocus><a href="#" id="anchor-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="anchor-ok" class="jot-button">OK</a>');
});
/*
d888888b  .d8b.  d8888b. db      d88888b 
`~~88~~' d8' `8b 88  `8D 88      88'     
   88    88ooo88 88oooY' 88      88ooooo 
   88    88~~~88 88~~~b. 88      88~~~~~ 
   88    88   88 88   8D 88booo. 88.     
   YP    YP   YP Y8888P' Y88888P Y88888P 
*/
$(document.body).on("click", "#"+uniqueId+" .addTable", function(event) {
	var currentlySelected = getSelectionHtml(),
		editorId = $(this).parents('.jot-wrap').attr('id');
	wrapElement('span','','tablereplace','', editorId);
	startModal('<h1>Add Table</h1><br><div class="jot-col-wrap"><div class="jot-col-50"><label>Rows</label><input type="number" min="1" step="1" id="rows" autofocus><label>Columns</label><input type="number" min="1" step="1" id="columns"></div><div class="jot-col-50"><label>Table Width</label><input type="text" value="100%" id="tWidth"></div></div><a href="#" id="table-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="table-ok" class="jot-button">OK</a>');
	 $("#linkUrl").focus();
});
$(document.body).on("click", "#table-ok", function(event) {
	var tRows = $('#rows').val(),
		tColumns = $('#columns').val(),
		tWidth = $('#tWidth').val(),
		table = '<table class="rwd-table" width="'+tWidth+'"><tbody>';

	for (var i = 1; i <= tRows; i++) {
		table += '<tr>';
		for (var j = 1; j <= tColumns; j++) {
			table += '<td>&nbsp;</td>';
		}
		table += '</tr>';
	}
	table += '</tbody></table>';

	$('.tablereplace').replaceWith(table);
	$('.jot-modal').remove();
});
$(document.body).on("click", "#table-cancel", function(event) {
	$('.jot-modal').remove();
	$('.tablereplace').contents().unwrap();
});

$('.jot td').bind("contextmenu",function(e){
   $(this).attr('id','selectedCell');
   
   return false;
}); 


		}
	});
})(jQuery);