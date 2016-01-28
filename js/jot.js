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
				toolClearformat = "<a href='#' title='clear formatting' id='removeFormatting'><img src='jot-icons/ico-clear-formatting.svg'></a>",
				toolH1 = "<a href='#' title='Largest Heading' onclick='wrapElement(&#34;h1&#34;);'><img src='jot-icons/ico-h1.svg'></a>",
				toolH2 = "<a href='#' title='Medium Heading'><img src='jot-icons/ico-h2.svg'></a>",
				toolH3 = "<a href='#' title='Small Heading'><img src='jot-icons/ico-h3.svg'></a>",
				toolUl = "<a href='#' title='Bulleted List'><img src='jot-icons/ico-ul.svg'></a>",
				toolOl = "<a href='#' title='Numbered List'><img src='jot-icons/ico-ol.svg'></a>",
				toolBlockquote = "<a href='#' title='Blockquote'><img src='jot-icons/ico-blockquote.svg'></a>",
				toolLink = "<a href='#' title='Link'><img src='jot-icons/ico-link.svg'></a>",
				toolUnlink = "<a href='#' title='Remove Link'><img src='jot-icons/ico-unlink.svg'></a>",
				toolAnchor = "<a href='#' title='Anchor'><img src='jot-icons/ico-anchor.svg'></a>",
				toolImage = "<a href='#' title='Insert Image'><img src='jot-icons/ico-image.svg'></a>",
				toolTable = "<a href='#' title='Insert Table'><img src='jot-icons/ico-table.svg'></a>",
				toolHr = "<a href='#' title='Insert Horizontal Line'><img src='jot-icons/ico-hr.svg'></a>",
				toolCode = "<a href='#' title='View Source'><img src='jot-icons/ico-link.svg'></a>",
				toolDivider = "<div class='jot-divider'></div>"
			
			$(this).attr('contenteditable','plaintext-only').wrap('<div class="jot-wrap"></div>');
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

			// Force plain text paste
			$('[contenteditable]').on('paste', function(e) {
				e.preventDefault();
				var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
				document.execCommand('insertText', false, text);
			});

			function getRangeSelectedNodes(range, includePartiallySelectedContainers) {
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
				var parent = el.parentNode;
				while (el.hasChildNodes()) {
					parent.insertBefore(el.firstChild, el);
				}
				parent.removeChild(el);
			}
			function removeSelectedElements(tagNames) {
				var tagNamesArray = tagNames.toLowerCase().split(",");
				getSelectedNodes().forEach(function(node) {
					if (node.nodeType == 1 &&
						tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
						// Remove the node and replace it with its children
						replaceWithOwnChildren(node);
					}
				});
			}

			$(document.body).on("click", "#removeFormatting", function(event) {
				removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote,figure");
				document.execCommand('removeFormat', false, 'null');
				return false;
			});
// Paste At Caret Function	
	function pasteHtmlAtCaret(html, selector) {
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
		message('Please click where you want to insert, and try again.','warn');
	}
}
			// Is within element? function
function isSelectionInsideElement(tagName) {
	var sel, containerNode;
	tagName = tagName.toUpperCase();
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.rangeCount > 0) {
			containerNode = sel.getRangeAt(0).commonAncestorContainer;
		}
	} else if ( (sel = document.selection) && sel.type != "Control" ) {
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
			wrapElement = function (elem, parentElem){
				var element = elem
					sel = window.getSelection(),
					isAlready = isSelectionInsideElement(elem);
				$('.editor-text').attr('rel',''+sel+'');
					
				if (isAlready) {
					removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote");
					document.execCommand('removeFormat', false, 'null');
				} else if (sel.rangeCount) {
					var selected = $('.editor-text').attr('rel');
					if (parentElem === undefined) {
						finalCode = '<'+element+'>'+selected+'</'+element+'>'
					} else {
						finalCode = '<'+parentElem+'><'+element+'>'+selected+'</'+element+'></'+parentElem+'>'
					}
					range = sel.getRangeAt(0);
					range.deleteContents();
					removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote");
					//range.insertNode(document.createTextNode(finalCode));
					pasteHtmlAtCaret(finalCode,'.editor-text');
					$('.editor-text').attr('rel','');
				}
			}

			// Insert BR on enter
			$('div[contenteditable]').keydown(function(e) {
				if (e.keyCode === 13) {
					//document.execCommand('insertHTML', false, '<br>');
					 if (window.getSelection && !isSelectionInsideElement("li")) {
						pasteHtmlAtCaret('<br>','.editor-text, .mini-editor');
						return false;
					}
				}
			});

		}
	});
})(jQuery);