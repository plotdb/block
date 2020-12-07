var deserialize, nodeToJson, serialize, serializeHtmlCode, resolveRequiredPackages, blockInstance, block, bm;
deserialize = function(n){
  var node, i$, ref$, len$, c, ret;
  if (n.type === 'text') {
    return document.createTextNode(n.value);
  } else if (n.type === 'block') {
    return deserialize(n.tree);
  }
  node = document.createElement(n.name);
  n.attr.filter(function(it){
    return it && it[0];
  }).map(function(p){
    return node.setAttribute(p[0], p[1]);
  });
  n.style.filter(function(it){
    return it && it[0];
  }).map(function(p){
    return node.style[p[0]] = p[1];
  });
  if (n.cls && n.cls.length) {
    node.classList.add.apply(node.classList, n.cls.filter(function(it){
      return it;
    }));
  }
  for (i$ = 0, len$ = (ref$ = n.child || []).length; i$ < len$; ++i$) {
    c = ref$[i$];
    ret = deserialize(c);
    if (ret) {
      node.appendChild(ret);
    }
  }
  return node;
};
nodeToJson = function(n){
  var name, style, i, attr, v, cls;
  name = n.nodeName.toLowerCase();
  if (name === '#text') {
    return {
      type: 'text',
      value: n.nodeValue
    };
  }
  style = n.style
    ? (function(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = n.style.length; i$ < to$; ++i$) {
        i = i$;
        results$.push(i);
      }
      return results$;
    }()).map(function(it){
      return [n.style[it], n.style[n.style[it]]];
    })
    : [];
  attr = n.attributes
    ? (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = n.attributes).length; i$ < len$; ++i$) {
        v = ref$[i$];
        results$.push([v.nodeName, v.nodeValue]);
      }
      return results$;
    }()).filter(function(it){
      var ref$;
      return !((ref$ = it[0]) === 'style' || ref$ === 'class');
    })
    : [];
  cls = n.classList
    ? (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = n.classList).length; i$ < len$; ++i$) {
        v = ref$[i$];
        results$.push(v);
      }
      return results$;
    }())
    : [];
  return {
    type: 'tag',
    name: name,
    style: style,
    attr: attr,
    cls: cls
  };
};
serialize = function(n){
  var node, child, i$, to$, i, ret;
  node = nodeToJson(n);
  child = [];
  if (!n.childNodes) {
    return;
  }
  for (i$ = 0, to$ = n.childNodes.length; i$ < to$; ++i$) {
    i = i$;
    ret = serialize(n.childNodes[i]);
    child.push(ret);
  }
  node.child = child;
  return node;
};
serializeHtmlCode = function(html){
  var div;
  div = document.createElement("div");
  div.innerHTML = html;
  return serialize(div);
};
resolveRequiredPackages = function(n){
  var ret, i$, ref$, len$, c;
  ret = [];
  if (n.type === 'block') {
    ret.push({
      name: n.name,
      version: n.version
    });
  }
  for (i$ = 0, len$ = (ref$ = n.child).length; i$ < len$; ++i$) {
    c = ref$[i$];
    ret = ret.concat(resolveRequiredPackages(c));
  }
  return ret;
};
blockInstance = function(opt){
  opt == null && (opt = {});
  this.opt = opt;
  this.block = opt.block;
  return this;
};
blockInstance.prototype = import$(Object.create(Object.prototype), {
  getDom: function(){
    return deserialize(this.block.obj);
  }
});
block = function(opt){
  this.opt = opt;
  this.name = opt.name;
  this.version = opt.version;
  this.raw = opt.raw;
  this.obj = serializeHtmlCode(opt.raw);
  return this;
};
block.prototype = import$(Object.create(Object.prototype), {
  getDom: function(){
    return deserialize(this.obj);
  },
  create: function(){
    return new blockInstance({
      block: this
    });
  }
});
bm = {
  cache: {},
  reload: function(n){
    return this.get(n, true);
  },
  get: function(n, force){
    var ret, p, this$ = this;
    force == null && (force = false);
    ret = {};
    n = Array.isArray(n)
      ? n
      : [n];
    p = n.map(function(pkgName){
      return Promise.resolve().then(function(){
        var that, ref$, name, version;
        if (that = this$.cache[pkgName]) {
          return Promise.resolve(that);
        }
        ref$ = pkgName.split('@'), name = ref$[0], version = ref$[1];
        return ld$.fetch("/blocks/" + name + "/index.html", {
          method: 'GET'
        }, {
          type: 'text'
        }).then(function(it){
          var b;
          return ret[name] = this$.cache[pkgName] = b = new block({
            raw: it,
            name: name,
            version: version
          });
        });
      });
    });
    return Promise.all(p).then(function(){
      return ret;
    });
  }
};
bm.get(['list@0.0.1', 'quiz@0.0.1']).then(function(it){
  var i$, i, ret, dom;
  console.log('ok1', it);
  for (i$ = 0; i$ < 10; ++i$) {
    i = i$;
    ret = it.list.create();
    dom = ret.getDom();
    document.body.appendChild(dom);
  }
  ret = resolveRequiredPackages(it.list.obj);
  console.log(ret);
  return bm.reload(['list@0.0.1']);
}).then(function(){
  return console.log('ok2');
})['catch'](function(e){
  return console.log(e);
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}