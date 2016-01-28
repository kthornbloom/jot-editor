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
		message('Please click where you want to insert, and try again.', 'warn');
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
wrapElement = function(elem, parentElem) {
	var element = elem
	sel = window.getSelection(),
	isAlready = isSelectionInsideElement(elem);
	$('.editor-text').attr('rel', '' + sel + '');

	if (isAlready) {
		removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote");
		document.execCommand('removeFormat', false, 'null');
	} else if (sel.rangeCount) {
		var selected = $('.editor-text').attr('rel');
		if (parentElem === undefined) {
			finalCode = '<' + element + '>' + selected + '</' + element + '>'
		} else {
			finalCode = '<' + parentElem + '><' + element + '>' + selected + '</' + element + '></' + parentElem + '>'
		}
		range = sel.getRangeAt(0);
		range.deleteContents();
		removeSelectedElements("h1,h2,h3,h4,h5,h6,blockquote");
		//range.insertNode(document.createTextNode(finalCode));
		pasteHtmlAtCaret(finalCode, '.editor-text');
		$('.editor-text').attr('rel', '');
	}
}

// Insert BR on enter
$('div[contenteditable]').keydown(function(e) {
	if (e.keyCode === 13) {
		//document.execCommand('insertHTML', false, '<br>');
		if (window.getSelection && !isSelectionInsideElement("li")) {
			pasteHtmlAtCaret('<br>', '.editor-text, .mini-editor');
			return false;
		}
	}
});