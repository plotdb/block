var wrap, serialize, deserialize, locate;
wrap = function(n){
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
  node = wrap(n);
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
deserialize = function(n){
  var queue;
  queue = [];
  return Promise.resolve().then(function(){
    var _;
    _ = function(n){
      var node, i$, ref$, len$, c, ret;
      if (n.type === 'text') {
        return document.createTextNode(n.value);
      } else if (n.type === 'block') {
        return function(){
          var node;
          node = document.createElement('div');
          node.textContent = "loading...";
          queue.push(debounce(2000).then(function(){
            return blockManager.get({
              name: n.name,
              version: n.version
            });
          }).then(function(b){
            return b.instantiate().then(function(ret){
              var that, x$;
              if (that = node.parentNode) {
                x$ = that;
                x$.insertBefore(ret.node, node);
                x$.removeChild(node);
                return x$;
              } else {
                return ret;
              }
            });
          })['catch'](function(){
            console.log("block-manager.get failed in deserialize ( " + n.name + "@" + n.version + " )");
            return node.innerText = "load fail.";
          }));
          return node;
        }();
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
        ret = _(c);
        if (ret) {
          node.appendChild(ret);
        }
      }
      return node;
    };
    return _(n);
  }).then(function(node){
    return {
      node: node,
      promise: Promise.all(queue)
    };
  });
};
locate = function(op, data, root){
  var n, obj, dd, i$, i, ref$, to$, j, p;
  n = obj = root;
  dd = data;
  for (i$ = op.p.length - 1; i$ >= 0; --i$) {
    i = i$;
    if ((ref$ = op.p[i]) === 'attr' || ref$ === 'style' || ref$ === 'cls' || ref$ === 'child' || ref$ === 'name' || ref$ === 'value' || ref$ === 'type') {
      break;
    }
  }
  for (i$ = 0, to$ = i - 1; i$ < to$; ++i$) {
    j = i$;
    p = op.p[i];
    obj = p === 'child' ? obj.childNodes : obj;
    dd = dd[p];
  }
  switch (op.p[i]) {
  case 'name':
  case 'value':
  case 'type':
    return deserialize(dd).then(function(arg$){
      var node, promise;
      node = arg$.node, promise = arg$.promise;
      obj.parentNode.insertBefore(node, obj);
      return obj.parentNode.removeChild(obj);
    });
  case 'style':
    obj.setAttribute('style', '');
    return dd.style.map(function(it){
      return obj.style[it[0]] = it[1];
    });
  case 'cls':
    return obj.setAttribute('class', dd.cls.join(' '));
  case 'attr':
    Array.from(obj.attributes).map(function(it){
      var ref$;
      if (!dd.attr[it.name] && !((ref$ = it.name) === 'block' || ref$ === 'style' || ref$ === 'class')) {
        return obj.removeAttribute(it.name);
      }
    });
    return dd.attr.map(function(it){
      return obj.setAttribute(it[0], it[1]);
    });
  case 'child':
    if (op.ld) {
      obj.removeChild(obj.childNodes[op.p[i + 1]]);
    }
    if (op.li) {
      return deserialize(op.li).then(function(arg$){
        var node, promise;
        node = arg$.node, promise = arg$.promise;
        return obj.insertBefore(node, obj.childNodes[op.p[i + 1]]);
      });
    }
  }
};