var getNext, showSelectedNodes;
getNext = function(n){
  var that;
  if (n.childNodes && n.childNodes.length) {
    return n.childNodes[0];
  }
  if (that = n.nextSibling) {
    return that;
  }
  for (;;) {
    n = n.parentNode;
    if (!n) {
      return null;
    }
    if (that = n.nextSibling) {
      return that;
    }
  }
};
showSelectedNodes = function(sel){
  var range, start, end, cur, i$, i, results$ = [];
  range = sel.getRangeAt(0);
  start = range.startContainer;
  end = range.endContainer;
  if (start.nodeType !== Element.TEXT_NODE) {
    start = start.childNodes[range.startOffset];
  }
  if (end.nodeType !== Element.TEXT_NODE) {
    end = end.childNodes[range.endOffset];
  }
  cur = start;
  for (i$ = 0; i$ < 100; ++i$) {
    i = i$;
    cur = getNext(cur);
    if (!cur || cur === end) {
      break;
    }
  }
  return results$;
};
document.addEventListener('copy', function(e){
  var sel;
  sel = document.getSelection();
  showSelectedNodes(sel);
  e.clipboardData.setData('text/plain', sel.toString().toUpperCase());
  return e.preventDefault();
});
document.addEventListener('paste', function(e){
  var data;
  data = e.clipboardData.getData('text/html');
  document.execCommand('insertText', false, data);
  return e.preventDefault();
});