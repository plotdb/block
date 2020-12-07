var dragger;
dragger = function(opt){
  var root;
  opt == null && (opt = {});
  this.opt = opt;
  root = opt.root;
  this.root = root = typeof root === 'string'
    ? document.querySelector(root)
    : root ? root : null;
  import$(this, {
    dragging: false,
    caret: null,
    src: null
  });
  this.caret = {
    box: null,
    range: null
  };
  this.evtHandler = {};
  this.init();
  return this;
};
import$(dragger, {
  list: [],
  add: function(it){
    return this.list.push(it);
  },
  init: function(){
    var this$ = this;
    if (this.inited) {
      return;
    }
    this.inited = true;
    document.addEventListener('mousedown', function(e){
      var n;
      n = e.target;
      while (n) {
        if (n.hasAttribute && n.hasAttribute('draggable')) {
          break;
        }
        n = n.parentNode;
      }
      if (n) {
        return this$.list.map(function(it){
          return it.dragInit(n);
        });
      }
    });
    document.addEventListener('dragover', function(e){
      var n;
      n = e.target;
      while (n) {
        if (n.hasAttribute && n.hasAttribute('editable')) {
          break;
        }
        n = n.parentNode;
      }
      if (n) {
        return this$.list.map(function(it){
          return it.dropInit(n);
        });
      }
    });
    document.addEventListener('dragover', function(evt){
      return this$.list.map(function(it){
        return it.dragover({
          evt: evt
        });
      });
    });
    return document.addEventListener('drop', function(evt){
      return this$.list.map(function(it){
        return it.drop({
          evt: evt
        });
      });
    });
  }
});
dragger.ghost = new Image();
dragger.ghost.src = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"15\" viewBox=\"0 0 20 15\">\n  <rect x=\"0\" y=\"0\" width=\"20\" height=\"15\" fill=\"rgba(0,0,0,.5)\"/>\n</svg>");
dragger.prototype = import$(Object.create(Object.prototype), {
  on: function(n, cb){
    var ref$;
    return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
  },
  fire: function(n){
    var v, res$, i$, to$, ref$, len$, cb, results$ = [];
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    v = res$;
    for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
      cb = ref$[i$];
      results$.push(cb.apply(this, v));
    }
    return results$;
  },
  init: function(){
    var this$ = this;
    dragger.init();
    dragger.add(this);
    ld$.find(this.root, '[draggable]').map(function(n){
      return this$.dragInit(n);
    });
    ld$.find(this.root, '[editable]').map(function(n){
      return this$.dropInit(n);
    });
    this.caret.box = document.createElement("div");
    import$(this.caret.box.style, {
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
    return document.body.appendChild(this.caret.box);
  },
  dropInit: function(n){
    var this$ = this;
    if ((n._editor || (n._editor = {})).dropInited) {
      return;
    }
    if (!ld$.parent(n, null, this.root)) {
      return;
    }
    (n._edtior || (n._edtior = {})).dropInited = true;
    n.addEventListener('drop', function(e){
      var json, data;
      if (json = e.dataTransfer.getData('application/json')) {
        data = JSON.parse(json);
      }
      this$.dragging = false;
      return e.preventDefault();
    });
    return n.addEventListener('dragover', function(e){
      return e.preventDefault();
    });
  },
  dragInit: function(n){
    var this$ = this;
    if ((n._editor || (n._editor = {})).dragInited) {
      return;
    }
    if (!ld$.parent(n, null, this.root)) {
      return;
    }
    (n._editor || (n._editor = {})).dragInited = true;
    n.setAttribute('draggable', true);
    return n.addEventListener('dragstart', function(e){
      this$.src = n;
      e.dataTransfer.setData('application/json', JSON.stringify({}));
      e.dataTransfer.setDragImage(dragger.ghost, 10, 10);
      this$.dragging = true;
      return e.stopPropagation();
    });
  },
  render: function(range){
    var ref$, box;
    this.caret.range = range;
    if (!range) {
      return ref$ = this.caret.box.style, ref$.display = 'none', ref$.opacity = 0, ref$;
    } else {
      box = range.getBoundingClientRect();
      return import$(this.caret.box.style, {
        left: box.x + "px",
        top: box.y + "px",
        width: '1px',
        height: box.height + "px",
        display: 'block',
        opacity: 1
      });
    }
  },
  dragover: function(arg$){
    var evt, ret;
    evt = arg$.evt;
    if (!ld$.parent(evt.target, null, this.root)) {
      return this.render(null);
    }
    ret = caretRange({
      node: this.root,
      x: evt.clientX,
      y: evt.clientY
    });
    return this.render(ret.range);
  },
  drop: function(arg$){
    var evt, range, sc, so, ta, n, data, json, text, this$ = this;
    evt = arg$.evt;
    range = this.caret.range;
    this.render(null);
    if (!(range && ld$.parent(evt.target, null, this.root))) {
      return;
    }
    sc = range.startContainer;
    so = range.startOffset;
    ta = sc.nodeType === Element.TEXT_NODE
      ? sc
      : sc.childNodes[so];
    if (!(n = this.src)) {
      data = (json = evt.dataTransfer.getData('application/json'))
        ? JSON.parse(json)
        : {};
      if (data.type === 'block') {
        return blocktmp.get({
          name: data.data.name
        }).then(function(dom){
          return deserialize(dom);
        }).then(function(ret){
          ta.parentNode.insertBefore(ret.node, ta);
          return this$.fire('change');
        })['catch'](function(it){
          return console.log(it);
        });
      }
    } else {
      if (ld$.parent(ta, null, n)) {
        return;
      }
      if (ta.nodeType === Element.TEXT_NODE) {
        n.parentNode.removeChild(n);
        text = ta.textContent;
        [document.createTextNode(text.substring(0, so)), n, document.createTextNode(text.substring(so))].map(function(it){
          return ta.parentNode.insertBefore(it, ta);
        });
        ta.parentNode.removeChild(ta);
      } else {
        n.parentNode.removeChild(n);
        ta.parentNode.insertBefore(n, ta);
      }
      return this.fire('change');
    }
  }
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}