var dragging, draggingCaret, draggingSrc, ghost, dropInit, dragInit, draggingRender, dragBox, node;
dragging = false;
draggingCaret = null;
draggingSrc = null;
ghost = new Image();
ghost.src = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"15\" viewBox=\"0 0 20 15\">\n  <rect x=\"0\" y=\"0\" width=\"20\" height=\"15\" fill=\"rgba(0,0,0,.5)\"/>\n</svg>");
dropInit = function(n){
  if (n.dropInited) {
    return;
  }
  n.dropInited = true;
  n.addEventListener('drop', function(e){
    var data;
    data = JSON.parse(e.dataTransfer.getData('application/json'));
    dragging = false;
    return e.preventDefault();
  });
  return n.addEventListener('dragover', function(e){
    return e.preventDefault();
  });
};
dragInit = function(n){
  if (n.dragInited) {
    return;
  }
  n.dragInited = true;
  n.setAttribute('draggable', true);
  return n.addEventListener('dragstart', function(e){
    draggingSrc = n;
    e.dataTransfer.setData('application/json', JSON.stringify({}));
    e.dataTransfer.setDragImage(ghost, 10, 10);
    dragging = true;
    return e.stopPropagation();
  });
};
draggingRender = function(range){
  var ref$, box;
  draggingCaret = range;
  if (!range) {
    return ref$ = dragBox.style, ref$.display = 'none', ref$.opacity = 0, ref$;
  } else {
    box = range.getBoundingClientRect();
    return import$(dragBox.style, {
      left: box.x + "px",
      top: box.y + "px",
      width: '1px',
      height: box.height + "px",
      display: 'block',
      opacity: 1
    });
  }
};
document.addEventListener('dragover', function(e){
  var n;
  n = e.target;
  while (n) {
    if (n.getAttribute) {
      if (n.hasAttribute('editable')) {
        break;
      }
    }
    n = n.parentNode;
  }
  if (!n) {
    return;
  }
  return dropInit(n);
});
document.addEventListener('mousedown', function(e){
  var n;
  n = e.target;
  while (n) {
    if (n.getAttribute) {
      if (n.hasAttribute('draggable')) {
        break;
      }
    }
    n = n.parentNode;
  }
  if (!n) {
    return;
  }
  return dragInit(n);
});
dragBox = document.createElement("div");
import$(dragBox.style, {
  position: 'fixed',
  left: 0,
  top: 0,
  opacity: 0,
  display: 'none',
  border: '2px solid #f0f',
  pointerEvents: 'none',
  transition: "opacity .15s ease-in-out",
  animation: "blink .4s linear infinite"
});
document.body.appendChild(dragBox);
node = ld$.find('#editor1', 0);
document.addEventListener('drop', function(e){
  var n, sc, so, ta, text;
  if (!((n = draggingSrc) && draggingCaret)) {
    return;
  }
  sc = draggingCaret.startContainer;
  so = draggingCaret.startOffset;
  draggingRender(null);
  ta = sc.nodeType === Element.TEXT_NODE
    ? sc
    : sc.childNodes[so];
  if (ld$.parent(ta, null, n)) {
    return;
  }
  if (ta.nodeType === Element.TEXT_NODE) {
    n.parentNode.removeChild(n);
    text = ta.textContent;
    [document.createTextNode(text.substring(0, so)), n, document.createTextNode(text.substring(so))].map(function(it){
      return ta.parentNode.insertBefore(it, ta);
    });
    return ta.parentNode.removeChild(ta);
  } else {
    n.parentNode.removeChild(n);
    return ta.parentNode.insertBefore(n, ta);
  }
});
document.addEventListener('dragover', function(e){
  var ret;
  if (!dragging) {
    return;
  }
  ret = caretRange({
    node: node,
    x: e.clientX,
    y: e.clientY
  });
  return draggingRender(ret.range);
});
ld$.find('[draggable]').map(function(n){
  return dragInit(n);
});
ld$.find('[editable]').map(function(n){
  return dropInit(n);
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}