var json0, lc, transport, tp;
json0 = require("ot-json0");
lc = {
  active: null
};
document.addEventListener('click', function(e){
  var p, range;
  p = ld$.parent(e.target, '[editable]');
  if (lc.active === p) {
    return;
  }
  if (lc.active) {
    lc.active.setAttribute('contenteditable', false);
  }
  lc.active = p;
  if (!p) {
    return;
  }
  p.setAttribute('contenteditable', true);
  ld$.find(p, '[editable]').map(function(it){
    return it.setAttribute('contenteditable', false);
  });
  range = caretRange({
    node: p,
    x: e.clientX,
    y: e.clientY
  });
  return setCaret(range.range);
});
transport = function(opt){
  var this$ = this;
  opt == null && (opt = {});
  this.opt = opt;
  this.root = opt.root;
  this.output = opt.output;
  this.state = {
    old: {},
    cur: {},
    tree: {}
  };
  this.root.addEventListener('input', debounce(500, function(){
    return this$.update();
  }));
  return this;
};
transport.prototype = import$(Object.create(Object.prototype), {
  update: function(){
    var t1, ret, this$ = this;
    t1 = Date.now();
    ret = serialize(this.root);
    this.state.old = this.state.cur;
    this.state.cur = ret;
    ret = json0OtDiff(this.state.old, this.state.cur);
    ret = json0.type.apply(this.state.tree, ret);
    return deserialize(this.state.tree).then(function(arg$){
      var node, t2;
      node = arg$.node;
      this$.output.innerHTML = "";
      this$.output.appendChild(node);
      t2 = Date.now();
      return console.log("elapsed: ", t2 - t1);
    });
  }
});
tp = new transport({
  root: ld$.find('#input', 0),
  output: ld$.find('#output', 0)
});
tp.update();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}