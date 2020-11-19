// Generated by LiveScript 1.3.1
var highlightHandler, hlh;
highlightHandler = function(opt){
  opt == null && (opt = {});
  this.opt = opt;
  this.box = null;
  this.tgt = null;
  this.menu = opt.menu;
  this.target = opt.target;
  return this;
};
highlightHandler.prototype = import$(Object.create(Object.prototype), {
  isToggled: function(){
    return this.toggled;
  },
  toggle: function(v, e){
    var ref$, box, ref1$, ref2$, ref3$;
    this.toggled = v = v != null
      ? v
      : !this.isToggled();
    if (!v) {
      return ref$ = this.menu.style, ref$.opacity = 0, ref$.pointerEvents = 'none', ref$;
    }
    box = this.menu.getBoundingClientRect();
    return ref$ = this.menu.style, ref$.opacity = 1, ref$.pointerEvents = 'auto', ref$.left = ((ref1$ = (ref3$ = e.clientX - box.width / 2) > 0 ? ref3$ : 0) < (ref2$ = window.innerWidth - box.width) ? ref1$ : ref2$) + "px", ref$.top = ((ref1$ = (ref3$ = e.clientY - box.height / 2) > 0 ? ref3$ : 0) < (ref2$ = window.innerHeight - box.height) ? ref1$ : ref2$) + "px", ref$;
  },
  mode: function(it){
    var name;
    name = "highlight-" + it;
    this.box.style.animation = name + " 1s infinite";
    this.blend.style.opacity = it === 'edit' ? 1 : 0;
    return this.mask.style.opacity = it === 'edit' ? 1 : 0;
  },
  poll: function(){
    var this$ = this;
    this.render(this.tgt);
    return setTimeout(function(){
      return this$.poll();
    }, 500);
  },
  init: function(){
    var style, this$ = this;
    setInterval(function(){
      return this$.render(this$.tgt);
    }, 500);
    this.box = document.createElement('div');
    this.blend = document.createElement('div');
    this.mask = document.createElement('div');
    this.tgt = null;
    import$(this.mask.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,.8)',
      mixBlendMode: 'hard-light',
      zIndex: 5,
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity .15s ease-in-out'
    });
    style = {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      opacity: 0,
      transition: "all .15s ease-in-out"
    };
    import$(this.box.style, style);
    import$(this.blend.style, style);
    document.body.appendChild(this.box);
    document.body.appendChild(this.mask);
    this.mask.appendChild(this.blend);
    this.mode('hover');
    document.addEventListener('mouseover', function(e){
      var node;
      if (!ld$.parent(e.target, null, this$.target)) {
        return;
      }
      if (this$.isToggled()) {
        return;
      }
      if (!(node = ld$.parent(e.target, '[editable]'))) {
        return;
      }
      return this$.render(node);
    });
    document.addEventListener('click', function(e){
      return this$.toggle(false);
    });
    document.addEventListener('contextmenu', function(e){
      this$.toggle(true, e);
      return e.preventDefault();
    });
    this.view = new ldView({
      root: this.menu,
      action: {
        click: {
          'highlight-delete': function(){
            var tgt, prev;
            tgt = this$.tgt;
            if (!(tgt && tgt.parentNode)) {
              return;
            }
            prev = tgt.previousSibling || tgt.parentNode;
            if (!prev.hasAttribute('editable')) {
              prev = null;
            }
            tgt.parentNode.removeChild(tgt);
            this$.tgt = prev;
            return this$.render(prev);
          },
          'highlight-clone': function(){
            var tgt, cloned;
            tgt = this$.tgt;
            if (!(tgt && tgt.parentNode)) {
              return;
            }
            cloned = tgt.cloneNode(true);
            tgt.parentNode.insertBefore(cloned, tgt.nextSibling);
            this$.tgt = cloned;
            return this$.render(cloned);
          }
        }
      }
    });
    return this.poll();
  },
  update: function(){
    return this.render(this.tgt);
  },
  render: function(n){
    var box, p, style;
    this.tgt = n;
    if (!n) {
      this.box.style.opacity = 0;
      this.blend.style.opacity = 0;
      return;
    }
    box = n.getBoundingClientRect();
    p = 6;
    style = {
      left: (box.x - p) + "px",
      top: (box.y - p) + "px",
      width: (box.width + p * 2) + "px",
      height: (box.height + p * 2) + "px",
      opacity: 0.5,
      border: '3px solid #2be',
      borderRadius: '5px'
    };
    import$(this.box.style, style);
    return import$(this.blend.style, {
      left: box.x + "px",
      top: box.y + "px",
      width: box.width + "px",
      height: box.height + "px",
      opacity: 1,
      border: '3px solid transparent',
      background: '#999'
    });
  }
});
hlh = new highlightHandler({
  target: ld$.find('#input', 0),
  menu: ld$.find('[ld-scope=highlight]', 0)
});
editor.setHighlight(hlh);
hlh.init();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}