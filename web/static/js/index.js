// Generated by LiveScript 1.3.1
/*
do
  name: "..."
  type: "..."
  version: ..." ( block only )
  value: "..."
  attr: [[name, value], ...]
  style: [[name, value], ...]
  cls: [c1, c2, ... ]
  child: [...]

node <-> json 互存資料

(node / json)._block: runtime data. should not be serialized / stored
 - store block item directly, or store an uuid for identifying / looking up block item, which contains:
   - obj: block instance, if applicable
   - cls: block class, if applicable
   - node: node counterpart for json
   - json: json counterpart for node
      

serialize - html to json
deserialize - json to html
locate - 

 - block 以 html/css/js 撰寫. 經編輯器由 html 轉成 json ( serialize )
 - block json 由編輯器依用戶指示插入 page json 中.
   - page json 的操作以 op 方式儲存與傳遞.
   - 收到 op 後
     - 先用來更新 json. 
     - 依 op 算出更新的範圍. 重製其下的元件:
       - 更新 style 或 attr
       - 更改標籤名稱.
       - 刪除 / 新增標籤
   - 由於元素可能會隨時新增或刪除, block js 需要妥善處理這一塊.
*/
var lc, wrap, serialize, deserialize, locate, update, opt, je, b, nt, nt2, ops, opsIn;
lc = {
  json: {}
};
Array.from(document.querySelectorAll('button')).map(function(it){
  return it.addEventListener('click', function(){
    return alert('ok');
  });
});
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
  console.log(op.p, op);
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
  console.log(op.p[i], op.p[i + 1], i);
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
      console.log(op.ld, i);
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
update = function(ops){
  ops == null && (ops = []);
  if (!ops.length) {
    return deserialize(lc.json).then(function(arg$){
      var node, promise;
      node = arg$.node, promise = arg$.promise;
      out.innerHTML = "";
      return out.appendChild(node);
    });
  } else {
    return ops.map(function(o){
      return locate(o, lc.json, out.childNodes[0]);
    });
  }
};
opt = {
  onChange: function(){
    var newObj, ops;
    newObj = je.get();
    ops = json0OtDiff(lc.json, newObj);
    sharedb.types.defaultType.apply(lc.json, ops);
    return update(ops);
  }
};
je = new JSONEditor(editor, opt);
/*
block = (opt = {}) ->
  @name = opt.name
  @tree = serialize opt.root
  block-manager.add name, @
  @
block.prototype = Object.create(Object.prototype) <<< do
  instantiate: (data) -> deserialize(if data? => data else @tree)
*/
b = new block({
  name: 'two-button',
  root: ld$.find('[block]', 0)
});
blockManager.add({
  name: "two-button",
  version: "0.0.1",
  block: b
});
lc.json = nt = JSON.parse(JSON.stringify(b.tree));
nt2 = JSON.parse(JSON.stringify(b.tree));
ops = [
  {
    p: ['child', 4],
    li: {
      type: 'block',
      name: "two-button",
      version: "0.0.1"
    }
  }, {
    p: ['child', 5],
    li: {
      type: 'block',
      name: "sample",
      version: "0.0.1"
    }
  }, {
    p: ['style', 0],
    li: ["background", "yellow"]
  }, {
    p: ['cls', 0],
    li: "text-danger"
  }, {
    p: ['attr', 0],
    li: ["data-name", "blah"]
  }, {
    p: ['attr', 0],
    ld: ["data-name", "blah"]
  }, {
    p: ['child', 5],
    ld: {
      type: 'block',
      name: "sample",
      version: "0.0.1"
    }
  }
];
je.set(lc.json);
update();
opsIn = function(ops, source){
  source == null && (source = true);
  sharedb.types.defaultType.apply(lc.json, ops);
  je.set(lc.json);
  return update(ops);
};
debounce(1000).then(function(){
  return opsIn([ops[0]]);
}).then(function(){
  return ld$.find('button').map(function(it){
    return it.addEventListener('click', function(){
      return alert('ok');
    });
  });
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[1]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[2]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[3]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[4]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[5]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[6]]);
}).then(function(){
  return debounce(1000);
});