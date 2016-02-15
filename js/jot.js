/*
Jot by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

(function($) {
	$.fn.extend({
		joteditor: function(options) {
			var defaults = {
				effectDuration: 5000,
				toolbar: ["bold","italic","strike","underline","clearFormat","divider","h1","h2","h3","divider","ul","ol","blockquote","divider","link","unlink","anchor","divider","image","document","embed","table","hr","divider","code"]
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
				toolDocument = "<a href='#' title='Insert Document Link' class='addDocument'><img src='jot-icons/ico-file-o.svg'></a>",
				toolEmbed = "<a href='#' title='Insert Embed Code' class='addEmbed'><img src='jot-icons/ico-share.svg'></a>",
				toolTable = "<a href='#' title='Insert Table' class='addTable'><img src='jot-icons/ico-table.svg'></a>",
				toolHr = "<a href='#' title='Insert Horizontal Line' onclick='document.execCommand(&#34;insertHorizontalRule&#34;, false, null);''><img src='jot-icons/ico-hr.svg'></a>",
				toolCode = "<a href='#' title='View Source'><img src='jot-icons/ico-code.svg'></a>",
				toolDivider = "<div class='jot-divider'></div>"

			$(this).attr('contenteditable','true').wrap('<div class="jot-wrap" id="'+uniqueId+'"></div>');
			$(this).attr('id','');
			$(this).parent().prepend('<div class="jot-toolbar"></div>').append('<textarea class="jot-result" hidden></textarea>');



			/* Build the toolbar based on set options */
			for (var i in options.toolbar) {
				switch (options.toolbar[i]) {
					case "bold":
						$(this).parent().find('.jot-toolbar').append(toolBold);
						break;
					case "italic":
						$(this).parent().find('.jot-toolbar').append(toolItalic);
						break;
					case "strike":
						$(this).parent().find('.jot-toolbar').append(toolStrike);
						break;
					case "underline":
						$(this).parent().find('.jot-toolbar').append(toolUnderline);
						break;
					case "clearFormat":
						$(this).parent().find('.jot-toolbar').append(toolClearformat);
						break;
					case "paste":
						$(this).parent().find('.jot-toolbar').append(toolPaste);
						break;
					case "h1":
						$(this).parent().find('.jot-toolbar').append(toolH1);
						break;
					case "h2":
						$(this).parent().find('.jot-toolbar').append(toolH2);
						break;
					case "h3":
						$(this).parent().find('.jot-toolbar').append(toolH3);
						break;
					case "ul":
						$(this).parent().find('.jot-toolbar').append(toolUl);
						break;
					case "ol":
						$(this).parent().find('.jot-toolbar').append(toolOl);
						break;
					case "blockquote":
						$(this).parent().find('.jot-toolbar').append(toolBlockquote);
						break;
					case "link":
						$(this).parent().find('.jot-toolbar').append(toolLink);
						break;
					case "unlink":
						$(this).parent().find('.jot-toolbar').append(toolUnlink);
						break;
					case "anchor":
						$(this).parent().find('.jot-toolbar').append(toolAnchor);
						break;
					case "image":
						$(this).parent().find('.jot-toolbar').append(toolImage);
						break;
					case "embed":
						$(this).parent().find('.jot-toolbar').append(toolEmbed);
						break;
					case "document":
						$(this).parent().find('.jot-toolbar').append(toolDocument);
						break;
					case "table":
						$(this).parent().find('.jot-toolbar').append(toolTable);
						break;
					case "hr":
						$(this).parent().find('.jot-toolbar').append(toolHr);
						break;
					case "code":
						$(this).parent().find('.jot-toolbar').append(toolCode);
						break;
					case "divider":
						$(this).parent().find('.jot-toolbar').append(toolDivider);
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
	//console.log('paste function ran');
});

function getRangeSelectedNodes(range, includePartiallySelectedContainers) {
	//console.log('getRangeSelectedNodes function ran');
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
	//console.log('getSelectedNodes function ran');
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
	//console.log('replaceWithOwnChildren function ran');
	var parent = el.parentNode;
	while (el.hasChildNodes()) {
		parent.insertBefore(el.firstChild, el);
	}
	parent.removeChild(el);
}

function removeSelectedElements(tagNames) {
	//console.log('removeSelectedElements function ran');
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
	//console.log('nextNode function ran');
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
	//console.log('pasteHtmlAtCaret function ran');
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
	//console.log('isSelectionInsideElement function ran');
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
	//console.log('getSelectionHtml function ran');
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
	//console.log('wrapElement function ran');
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
		} else {
			pasteHtmlAtCaret(finalCode, '#'+uniqueId+'');
		}
		$('#'+uniqueId+'').attr('rel', '');
	}
}

// Insert BR on enter
$('div[contenteditable]').keydown(function(e) {
	//console.log('insert BR on enter function ran');
	if (e.keyCode === 13) {
		//document.execCommand('insertHTML', false, '<br>');
		if (window.getSelection && !isSelectionInsideElement("li")) {
			pasteHtmlAtCaret('<br>', '#'+uniqueId+', .mini-editor');
			return false;
		}
	}
});

/*
.88b  d88.  .d88b.  d8888b.  .d8b.  db
88'YbdP`88 .8P  Y8. 88  `8D d8' `8b 88
88  88  88 88    88 88   88 88ooo88 88
88  88  88 88    88 88   88 88~~~88 88
88  88  88 `8b  d8' 88  .8D 88   88 88booo.
YP  YP  YP  `Y88P'  Y8888D' YP   YP Y88888P
*/

startModal = function(content) {
	$('body').append('<div class="jot-modal"><div class="jot-modal-content">'+content+'</div></div>');
	$('body').css({
		overflow: 'hidden',
		height: '100vh'
	});
	$('.jot-modal').css('opacity');
	$('.jot-modal').css({
		opacity: 1,
		transform: 'scale(1)'
	})
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
	$('.jot-modal').css({
		opacity: 0,
		transform: 'scale(1.5)'
	});
	setTimeout(function(){
		$('.jot-modal').remove();
	},500);

	$('body').css({
		overflow: '',
		height: ''
	});
}

/*
.d8888.  .d8b.  db    db d88888b
88'  YP d8' `8b 88    88 88'
`8bo.   88ooo88 Y8    8P 88ooooo
  `Y8b. 88~~~88 `8b  d8' 88~~~~~
db   8D 88   88  `8bd8'  88.
`8888Y' YP   YP    YP    Y88888P
*/

var getHtml = $("#"+uniqueId+" .jot").html();
$("#"+uniqueId+" .jot-result").html(getHtml);

$("#"+uniqueId+" .jot").bind('blur keyup paste copy cut mouseup', function () {
	var getHtml = $(this).html();
	$("#"+uniqueId+" .jot-result").html(getHtml);
})

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
	closeModal();
});
$(document.body).on("click", "#link-cancel", function(event) {
	closeModal();
	$('.linkreplace').contents().unwrap();
	$('.linkreplace').remove();
});

$(document.body).on("click", ".removeLink", function(event) {
	removeSelectedElements("a");
	document.execCommand('removeFormat', false, 'null');
	return false;
});
/*
d88888b .88b  d88. d8888b. d88888b d8888b.
88'     88'YbdP`88 88  `8D 88'     88  `8D
88ooooo 88  88  88 88oooY' 88ooooo 88   88
88~~~~~ 88  88  88 88~~~b. 88~~~~~ 88   88
88.     88  88  88 88   8D 88.     88  .8D
Y88888P YP  YP  YP Y8888P' Y88888P Y8888D'
*/
$(document.body).on("click", "#"+uniqueId+" .addEmbed", function(event) {
	var currentlySelected = getSelectionHtml(),
		editorId = $(this).parents('.jot-wrap').attr('id');
	wrapElement('span','','embedreplace','', editorId);
	startModal('<h1>Add Embed</h1><br><label>Embed Code</label><input type="text" placeholder="http://www.example.com" id="embedCode" autofocus><label><a href="#" id="embed-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="embed-ok" class="jot-button">OK</a>');

	 $("#embedCode").focus();
});
$(document.body).on("click", "#embed-ok", function(event) {
	var embedCode = $('#embedCode').val();
	$('.embedreplace').replaceWith("<div class='rwd-embed' contenteditable='false' style='max-width:100%;'><div class='rwd-aspect' contenteditable='false>"+embedCode+"</div></div>");
	closeModal();
});
$(document.body).on("click", "#embed-cancel", function(event) {
	closeModal();
	$('.embedreplace').contents().unwrap();
	$('.embedreplace').remove();
});

/* Right click Embed */
$(document).on('contextmenu', '#'+uniqueId+' .rwd-embed', function (event) {
	event.preventDefault();
	var getembed = $(this).html();
	removeJotContext();
   $(this).attr('id','jot-selected-embed');
   $('<div class="jot-context-menu"><div class="jot-context-heading">Embed Position</div><a href="#" class="jot-set-embed-left"><img src="jot-icons/ico-img-left.svg">Wrapped Left</a><a href="#" class="jot-set-embed-right"><img src="jot-icons/ico-img-right.svg">Wrapped Right</a><a href="#" class="jot-set-embed-center"><img src="jot-icons/ico-img-center.svg">Centered</a><a href="#" class="jot-set-embed-inline"><img src="jot-icons/ico-img-inline.svg">Inline</a><div class="jot-context-heading">Embed Properties</div>    <a href="#" class="removeEmbed"><img src="jot-icons/ico-times.svg">Delete Embed</a><a href="#" class="jot-embed-properties"><img src="jot-icons/ico-sliders.svg">Properties</a></div>')
		.appendTo("#"+uniqueId+"")
		.css({
		top: (event.pageY - 13) + "px",
		left: (event.pageX + 7) + "px"
	});
   return false;
});

$(document.body).on("click", ".removeEmbed", function(event) {
	$('#jot-selected-embed').remove();
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-embed-left", function(event) {
	$('#jot-selected-embed').removeClass('img-left img-right img-center img-inline').addClass('img-left');
	$('#jot-selected-embed').attr('id','');
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-embed-right", function(event) {
	$('#jot-selected-embed').removeClass('img-left img-right img-center img-inline').addClass('img-right');
	$('#jot-selected-embed').attr('id','');
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-embed-center", function(event) {
	$('#jot-selected-embed').removeClass('img-left img-right img-center img-inline').addClass('img-center');
	$('#jot-selected-embed').attr('id','');
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-embed-inline", function(event) {
	$('#jot-selected-embed').removeClass('img-left img-right img-center img-inline').addClass('img-inline');
	$('#jot-selected-embed').attr('id','');
});
/* Properties */
$(document.body).on("click", "#"+uniqueId+" .jot-embed-properties", function(event) {
	var currentEmbedCode = $('#jot-selected-embed .rwd-aspect').html(),
		currentEmbedWidth = $('#jot-selected-embed')[0].style.width;
	startModal('<h1>Embed Properties</h1><br>Max Width</label><input type="text" value="'+currentEmbedWidth+'" placeholder="px or %" id="jot-embed-width"><a href="#" id="embed-update-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="embed-update-ok" class="jot-button">OK</a>');
});

/* Update Image Properties */
$(document.body).on("click", "#embed-update-ok", function(event) {
	var updateEmbedwidth = $('#jot-embed-width').val();
	$('#jot-selected-embed').css('width',updateEmbedwidth);
	closeModal();
});
$(document.body).on("click", "#embed-update-cancel", function(event) {
	closeModal();
	$('#jot-selected-embed').attr('id','');
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
	startModal('<h1>Add Anchor</h1><br><label>Unique Anchor Name</label><input type="text" id="anchorName" autofocus><a href="#" id="anchor-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="anchor-ok" class="jot-button">OK</a>');
	 $("#anchorName").focus();
});
$(document.body).on("click", "#anchor-ok", function(event) {
	var aName = $('#anchorName').val(),
		aCombined = '<div id="'+aName+'" class="anchor" contenteditable="false"></div>';
	$('.anchorreplace').replaceWith(aCombined);
	closeModal();
});
$(document.body).on("click", "#anchor-cancel", function(event) {
	closeModal();
	$('.anchorreplace').contents().unwrap();
	$('.anchorreplace').remove();
});
/* Right click anchor */
$(document).on('contextmenu', '#'+uniqueId+' .jot .anchor', function (event) {
	event.preventDefault();
	removeJotContext();
	$(this).addClass('jot-selected-anchor');
	$('<div class="jot-context-menu"><a href="#" class="remove-anchor"><img src="jot-icons/ico-times.svg">Delete Anchor</a><a href="#" class="anchor-settings"><img src="jot-icons/ico-sliders.svg">Anchor Settings</a></div>')
		.appendTo("#"+uniqueId+"")
		.css({
		top: (event.pageY - 13) + "px",
		left: (event.pageX + 7) + "px"
	});
	return false;
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
	startModal('<h1>Add Image</h1><br><form id="image-insert-form" enctype="multipart/form-data" method="post"><label>Select Image</label><input type="file" name="image" id="imagebrowse"><label>Image Description</label><input type="text" name="description" id="imagealt" autofocus><input type="hidden" name="filetype" value="image" /><input type="hidden" name="submit" value="1" /><a href="#" id="img-cancel" class="jot-button-cancel">Cancel</a><input type="submit" name="go" class="jot-button" id="img-ok" value="Ok"></form>');
});
$(document).on('submit','form#image-insert-form',function(event){
	event.preventDefault();
	event.stopImmediatePropagation();
	// Show spinner
	$('#img-ok').remove();
	$('#image-insert-form').append('<a href="#" class="jot-button jot-load-btn"><img class="jot-spin" src="jot-icons/ico-spinner-white.svg"></a>');
	// Get form data
	formData = new FormData($(this)[0]);
	// Upload
	var request = $.ajax({
		url: 'upload.php',
		type: 'POST',
		data: formData,
		contentType: false,
		processData: false,
		dataType: 'json',
	});
	// After Upload
	request.done(function(returndata){
		console.log("done");
		// If there's a problem.
		if(returndata.error_msg!=''){
			//show error message
			alert(returndata.error_msg);
			$('.jot-load-btn').remove();
			$('#image-insert-form').append('<input type="submit" name="go" class="jot-button" id="img-ok" value="Ok">');
		}
		else {
			console.log("no error");
			//put together image
			uploaded_tag = '<img src="'+returndata.new_file+'" class="img-inline" alt="'+returndata.file_description+'" />';
			// Insert Image
			$('.imagereplace').replaceWith(uploaded_tag);
			// Finish up
			closeModal();
			//save page
			//savePage();
		}
	});
});

$(document.body).on("click", "#img-cancel", function(event) {
	// remove placeholder if selected text
	$('.imagereplace').contents().unwrap();
	// remove empty placeholder
	$('.imagereplace').remove();
	closeModal();
});

/* Right click Image */
$(document).on('contextmenu', '#'+uniqueId+' .jot img', function (event) {
	event.preventDefault();
	removeJotContext();
   $(this).attr('id','jot-selected-img');
   $('<div class="jot-context-menu"><div class="jot-context-heading">Image Position</div><a href="#" class="jot-set-img-left"><img src="jot-icons/ico-img-left.svg">Wrapped Left</a><a href="#" class="jot-set-img-right"><img src="jot-icons/ico-img-right.svg">Wrapped Right</a><a href="#" class="jot-set-img-center"><img src="jot-icons/ico-img-center.svg">Centered</a><a href="#" class="jot-set-img-inline"><img src="jot-icons/ico-img-inline.svg">Inline</a><div class="jot-context-heading">Image Properties</div><a href="#" class="jot-img-properties"><img src="jot-icons/ico-sliders.svg">Properties</a></div>')
		.appendTo("#"+uniqueId+"")
		.css({
		top: (event.pageY - 13) + "px",
		left: (event.pageX + 7) + "px"
	});
   return false;
});

/* Left */
$(document.body).on("click", "#"+uniqueId+" .jot-set-img-left", function(event) {
	$('#jot-selected-img').removeClass('img-left img-right img-center img-inline').addClass('img-left');
	$('#jot-selected-img').attr('id','');
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-img-right", function(event) {
	$('#jot-selected-img').removeClass('img-left img-right img-center img-inline').addClass('img-right');
	$('#jot-selected-img').attr('id','');
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-img-center", function(event) {
	$('#jot-selected-img').removeClass('img-left img-right img-center img-inline').addClass('img-center');
	$('#jot-selected-img').attr('id','');
});
$(document.body).on("click", "#"+uniqueId+" .jot-set-img-inline", function(event) {
	$('#jot-selected-img').removeClass('img-left img-right img-center img-inline').addClass('img-inline');
	$('#jot-selected-img').attr('id','');
});
/* Properties */
$(document.body).on("click", "#"+uniqueId+" .jot-img-properties", function(event) {
	var currentImgsize = $('#jot-selected-img').attr('width'),
		currentImgalt = $('#jot-selected-img').attr('alt');
	startModal('<h1>Image Properties</h1><br><label>Max Width</label><input type="text" value="'+currentImgsize+'" placeholder="px or %" id="jot-img-width"><label>Description</label><input type="text" id="jot-img-alt" value="'+currentImgalt+'"><a href="#" id="img-update-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="img-update-ok" class="jot-button">OK</a>');
});
/* Update Image Properties */
$(document.body).on("click", "#img-update-ok", function(event) {
	var updateImgwidth = $('#jot-img-width').val(),
		updateImgalt = $('#jot-img-alt').val();
	$('#jot-selected-img').attr('width',updateImgwidth).attr('alt',updateImgalt);
	closeModal();
});
$(document.body).on("click", "#img-update-cancel", function(event) {
	closeModal();
	$('#jot-selected-img').attr('id','');
});

/*
d8888b.  .d88b.   .o88b. .d8888.
88  `8D .8P  Y8. d8P  Y8 88'  YP
88   88 88    88 8P      `8bo.
88   88 88    88 8b        `Y8b.
88  .8D `8b  d8' Y8b  d8 db   8D
Y8888D'  `Y88P'   `Y88P' `8888Y'
*/

$(document.body).on("click", "#"+uniqueId+" .addDocument", function(event) {

	var currentlySelected = getSelectionHtml(),
		editorId = $(this).parents('.jot-wrap').attr('id');
	wrapElement('span','','docreplace','', editorId);
	startModal('<h1>Add Document Link</h1><br><form id="document-insert-form" enctype="multipart/form-data"><label>Select Document</label><input type="file" name="image" id="docbrowse"><label>Document Link Text</label><input type="text" value="'+currentlySelected+'" name="description" id="doc-text" autofocus><input type="hidden" name="filetype" value="document" /><input type="hidden" name="submit" value="1" /><a href="#" id="doc-cancel" class="jot-button-cancel">Cancel</a><input type="submit" class="jot-button" id="doc-ok" value="Ok"></form>');
});
$(document).on('submit','form#document-insert-form',function(event){
	event.preventDefault();
	event.stopImmediatePropagation();
	// Show spinner
	$('#doc-ok').remove();
	$('#document-insert-form').append('<a href="#" class="jot-button jot-load-btn"><img class="jot-spin" src="jot-icons/ico-spinner-white.svg"></a>');
	// Get form data
	formData = new FormData($(this)[0]);
	// Upload
	var request = $.ajax({
		url: 'upload.php',
		type: 'POST',
		data: formData,
		contentType: false,
		processData: false,
		dataType: 'json',
	});
	// After Upload
	request.done(function(returndata){
		// If there's a problem.
		if(returndata.error_msg!=''){
			//show error message
			alert("Sorry, the file did not upload correctly.");
			$('.jot-load-btn').remove();
			$('#image-insert-form').append('<input type="submit" class="jot-button" id="doc-ok" value="Ok">');
		}
		else {
			//put together image
			uploaded_tag = '<a href="'+returndata.new_file+'" title="'+returndata.file_description+'" target="_blank">'+returndata.file_description+'</a>';
			// Insert Image
			$('.docreplace').replaceWith(uploaded_tag);
			// Finish up
			closeModal();
			//save page
			//savePage();
		}
	});
});

$(document.body).on("click", "#doc-cancel", function(event) {
	closeModal();
	// remove placeholder if selected text
	$('.docreplace').contents().unwrap();
	// remove empty placeholder
	$('.docreplace').remove();
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
	startModal('<h1>Add Table</h1><br><div class="jot-col-wrap"><div class="jot-col-50"><label>Rows</label><input type="number" min="1" step="1" id="rows" autofocus><label>Columns</label><input type="number" min="1" step="1" id="columns"></div><div class="jot-col-50"><label>Table Width</label><input type="text" value="100%" placeholder="px or %" id="tWidth"></div></div><a href="#" id="table-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="table-ok" class="jot-button">OK</a>');
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
	closeModal();
});

/* Cancel Adding A Table*/
$(document.body).on("click", "#table-cancel", function(event) {
	closeModal();
	$('.tablereplace').contents().unwrap();
});

/* Right click table cell */
$(document).on('contextmenu', '#'+uniqueId+' .jot td', function (event) {
	event.preventDefault();
	removeJotContext();
	$(this).attr('id','jot-selected-cell');
	$('<div class="jot-context-menu"><div class="jot-context-heading">Cell Properties</div><a href="#" class="insert-row-before"><img src="jot-icons/ico-insert-row-before.svg">Insert Row Before</a><a href="#" class="insert-row-after"><img src="jot-icons/ico-insert-row-after.svg">Insert Row After</a><a href="#" class="remove-row"><img src="jot-icons/ico-remove-row.svg">Delete Row</a><a href="#" class="insert-col-before"><img src="jot-icons/ico-insert-col-before.svg">Insert Column Before</a><a href="#" class="insert-col-after"><img src="jot-icons/ico-insert-col-after.svg">Insert Column After</a><a href="#" class="remove-col"><img src="jot-icons/ico-remove-col.svg">Delete Column</a><div class="jot-context-heading">Table Properties</div><a href="#" class="remove-table"><img src="jot-icons/ico-times.svg">Delete Table</a><a href="#" class="table-settings"><img src="jot-icons/ico-sliders.svg">Table Settings</a></div>')
		.appendTo("#"+uniqueId+"")
		.css({
		top: (event.pageY - 13) + "px",
		left: (event.pageX + 7) + "px"
	});
	return false;
});

// Add Row After
$(document.body).on("click", "#"+uniqueId+" .insert-row-after", function(event) {
	$('#jot-selected-cell').parents('table').attr('id', 'jot-selected-table');
	var whichOne = $('#jot-selected-cell').parent().index(),
		cols = $('#jot-selected-table tr:first-of-type td').length;

	$('<tr id="selectedRow"></tr>').insertAfter("#jot-selected-table tbody tr:eq(" + whichOne + ")");
	for (var i = 0; i < cols; i++) {
		$('#selectedRow').append('<td>&nbsp;</td>');
	}
	$('#selectedRow, #jot-selected-cell, #jot-selected-table').removeAttr('id');
	event.preventDefault();
});

// Add Row Before
$(document.body).on("click", "#"+uniqueId+" .insert-row-before", function(event) {
	console.log('test');
	$('#jot-selected-cell').parents('table').attr('id', 'jot-selected-table');
	var whichOne = $('#jot-selected-cell').parent().index(),
		cols = $('#jot-selected-table tr:first-of-type td').length;

	$('<tr id="selectedRow"></tr>').insertBefore("#jot-selected-table tbody tr:eq(" + whichOne + ")");
	for (var i = 0; i < cols; i++) {
		$('#selectedRow').append('<td>&nbsp;</td>');
	}
	$('#selectedRow, #jot-selected-cell, #jot-selected-table').removeAttr('id');
	event.preventDefault();
});

// Delete Row
$(document.body).on("click", "#"+uniqueId+" .remove-row", function(event) {
	if ($('#jot-selected-cell').parents('thead').length ){
		$('#jot-selected-cell').parents('thead').fadeOut(500, function() {
			$(this).remove();
		});
	} else {
		$('#jot-selected-cell').parents('tr').fadeOut(500, function() {
			$(this).remove();
		});
	}
	event.preventDefault();
});

// Add Column After
$(document.body).on("click", "#"+uniqueId+" .insert-col-after", function(event) {
	$('#jot-selected-cell').parents('table').attr('id', 'jot-selected-table');
	var whichOne = $('#jot-selected-cell').index(),
		rows = $('#jot-selected-table tr').length;

	$('#jot-selected-table tr').each(function() {
		$('<td>&nbsp;</td>').insertAfter($(this).find('td:eq(' + whichOne + ')'));
		$('<th>&nbsp;</th>').insertAfter($(this).find('th:eq(' + whichOne + ')'));
	});

	$('#selected, #jot-selected-table').removeAttr('id');
	event.preventDefault();
});

// Add Column Before
$(document.body).on("click", "#"+uniqueId+" .insert-col-before", function(event) {
	$('#jot-selected-cell').parents('table').attr('id', 'jot-selected-table');
	var whichOne = $('#jot-selected-cell').index(),
		rows = $('#jot-selected-table tr').length;

	$('#jot-selected-table tr').each(function() {
		$('<td>&nbsp;</td>').insertBefore($(this).find('td:eq(' + whichOne + ')'));
		$('<th>&nbsp;</th>').insertBefore($(this).find('th:eq(' + whichOne + ')'));
	});

	$('#selected, #jot-selected-table').removeAttr('id');
	event.preventDefault();
});

// Delete Col
$(document.body).on("click", "#"+uniqueId+" .remove-col", function(event) {
	$('#jot-selected-cell').parents('table').attr('id', 'jot-selected-table');
	var whichOne = $('#jot-selected-cell').index();
	$('#jot-selected-table tr').find("td:eq(" + whichOne + ")").fadeOut(500, function() {
		$(this).remove();
	});
	$('#jot-selected-table thead tr').find("th:eq(" + whichOne + ")").fadeOut(500, function() {
		$(this).remove();
	});
	$('#selected, #jot-selected-table').removeAttr('id');
	event.preventDefault();
});

// Delete Entire Table
$(document.body).on("click", "#"+uniqueId+" .remove-table", function(event) {
	var r = confirm("Are you sure you want to delete the whole table?");
	if (r == true) {
		$('#jot-selected-cell').parents('table').fadeOut(500, function() {
			$(this).remove();
		});
	}
	event.preventDefault();
});

// Table Properties
$(document.body).on("click", "#"+uniqueId+" .table-settings", function(event) {
	$('#jot-selected-cell').parents('table').attr('id', 'jot-selected-table');
	var currentTableWidth = $('#jot-selected-table').attr('width');
	startModal('<h1>Table Properties</h1><br><label>Max Width</label><input type="text" value="'+currentTableWidth+'" placeholder="px or %" id="jot-table-width"><a href="#" id="table-update-cancel" class="jot-button-cancel">Cancel</a><a href="#" id="table-update-ok" class="jot-button">OK</a>');
	 $("#linkUrl").focus();
	event.preventDefault();
});

/* Update Properties */
$(document.body).on("click", "#table-update-ok", function(event) {
	var updateTablewidth = $('#jot-table-width').val();
	$('#jot-selected-table').attr('width',updateTablewidth);
	closeModal();
});

/* Cancel Update Properties */
$(document.body).on("click", "#table-update-cancel", function(event) {
	closeModal();
});

$(document.body).on("click", ".jot-toolbar a, .jot-modal a, .jot-modal button, .jot-context-menu a", function(event) {
	event.preventDefault();
});

// Remove the menu
$(document).bind("click", function (event) {
	removeJotContext();
});

function removeJotContext(){
	$('.jot-context-menu').remove();
	$('#jot-selected-cell').attr('id','');
}

		}
	});
})(jQuery);
