var getCaretRangeText, setVrcaret, range;
getCaretRangeText = function(arg$){
  var node, x, y, range, ref$, idx, min, i$, to$, i, box, tx, ty, dist;
  node = arg$.node, x = arg$.x, y = arg$.y, range = arg$.range;
  if (!range) {
    range = document.createRange();
  }
  ref$ = [-1, undefined], idx = ref$[0], min = ref$[1];
  for (i$ = 0, to$ = node.length + 1; i$ < to$; ++i$) {
    i = i$;
    range.setStart(node, i);
    box = range.getBoundingClientRect();
    tx = box.x + box.width / 2;
    ty = box.y + box.height / 2;
    dist = Math.pow(tx - x, 2) + Math.pow(ty - y, 2);
    if (!(min != null) || dist < min) {
      ref$ = [i, dist], idx = ref$[0], min = ref$[1];
    }
  }
  range.setStart(node, idx);
  range.setEnd(node, idx + 2);
  return range;
};
setVrcaret = function(range, node){
  var nbox, box, x$;
  nbox = node.getBoundingClientRect();
  box = range.getBoundingClientRect();
  x$ = vrcaret.style;
  x$.left = box.x + "px";
  x$.top = box.y + "px";
  x$.height = box.height + "px";
  x$.width = "1px";
  return x$;
};
ld$.find('[customeditable=true]').map(function(node){
  return node.addEventListener('click', function(evt){
    return console.log('ok', evt.clientX, evt.clientY);
  });
});
ld$.find('#mask', 0).addEventListener('click', function(evt){
  var range;
  range = getCaretRangeText({
    node: pp.childNodes[0],
    x: evt.clientX,
    y: evt.clientY
  });
  return setVrcaret(range, pp);
});
range = getCaretRangeText({
  node: pp.childNodes[0],
  x: 985,
  y: 146
});
console.log(range);
setVrcaret(range, pp);