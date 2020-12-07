var json0, store, editor, ed1;
json0 = require("ot-json0");
store = {
  state: {
    old: {},
    cur: {},
    tree: {}
  },
  get: function(){
    return JSON.parse(JSON.stringify(this.state.tree));
  },
  set: function(it){
    this.state.tree = JSON.parse(JSON.stringify(it));
    return this.state.cur = JSON.parse(JSON.stringify(it));
  },
  add: function(it){
    return (this.list || (this.list = [])).push(it);
  },
  notify: function(ops, source){
    return (this.list || (this.list = [])).map(function(it){
      if (source !== it) {
        return it.opsIn(ops);
      }
    });
  },
  update: function(ops, source){
    var ret;
    ret = json0.type.apply(this.state.tree, ops);
    return this.notify(ops, source);
  }
};
store.set(serialize(ld$.find('#sample > div', 0)));
editor = function(opt){
  var this$ = this;
  opt == null && (opt = {});
  this.opt = opt;
  this.root = opt.root;
  this.active = null;
  this.state = {
    old: {},
    cur: {},
    tree: {}
  };
  this.root.addEventListener('input', debounce(500, function(){
    return this$.opsOut();
  }));
  this.dragger = new dragger({
    root: opt.root
  });
  this.dragger.on('change', debounce(350, function(){
    return this$.opsOut();
  }));
  this.init();
  return this;
};
import$(editor, {
  inited: false,
  init: function(){
    var this$ = this;
    if (this.inited) {
      return;
    }
    document.addEventListener('click', function(e){
      return this$.onclick(e);
    });
    return this.inited = true;
  },
  list: [],
  add: function(it){
    return (this.list || (this.list = [])).push(it);
  },
  getMode: function(){
    return this.highlight.curMode;
  },
  setHighlight: function(it){
    return this.highlight = it;
  },
  onclick: function(e){
    var ret;
    ret = (this.list || (this.list = [])).map(function(it){
      return it.onclick(e);
    }).reduce(function(a, b){
      return a || b;
    }, false);
    if (ret) {
      this.highlight.mode('edit');
      return;
    }
    this.highlight.mode('hover');
    return this.list.map(function(it){
      return it.toggle(false);
    });
  }
});
editor.prototype = import$(Object.create(Object.prototype), {
  init: function(){
    editor.init();
    editor.add(this);
    store.add(this);
    this.state.tree = store.get();
    this.state.cur = store.get();
    return this.opsIn();
  },
  toggle: function(v){
    if (!this.active) {
      return;
    }
    return this.active.setAttribute('contenteditable', v);
  },
  onclick: function(e){
    var p, sel, r, range;
    p = ld$.parent(e.target, '[editable]');
    if (!ld$.parent(p, null, this.root)) {
      return;
    }
    if (editor.getMode() === 'edit') {
      return true;
    }
    if (this.active && this.active !== p) {
      this.active.setAttribute('contenteditable', false);
    }
    this.active = p;
    if (!p) {
      return;
    }
    p.setAttribute('contenteditable', true);
    sel = window.getSelection();
    if (sel.rangeCount) {
      r = sel.getRangeAt(0);
      if (!sel.isCollapsed && ld$.parent(r.commonAncestorContainer, null, this.active)) {
        return true;
      }
    }
    ld$.find(p, '[editable]').map(function(it){
      return it.setAttribute('contenteditable', false);
    });
    range = caretRange({
      node: p,
      x: e.clientX,
      y: e.clientY
    });
    setCaret(range.range);
    return true;
  },
  opsOut: function(){
    var ret, ops;
    ret = serialize(this.root.childNodes[0]);
    this.state.old = this.state.cur;
    this.state.cur = ret;
    ops = json0OtDiff(this.state.old, this.state.cur);
    json0.type.apply(this.state.tree, ops);
    return store.update(ops, this);
  },
  opsIn: function(ops){
    var this$ = this;
    ops == null && (ops = []);
    json0.type.apply(this.state.cur, ops);
    json0.type.apply(this.state.tree, ops);
    return deserialize(this.state.tree).then(function(arg$){
      var node;
      node = arg$.node;
      this$.root.innerHTML = "";
      return this$.root.appendChild(node);
    });
  }
});
ed1 = new editor({
  root: ld$.find('#editor1', 0)
});
debounce(1000).then(function(){
  var ed2;
  return ed2 = new editor({
    root: ld$.find('#editor2', 0)
  });
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}