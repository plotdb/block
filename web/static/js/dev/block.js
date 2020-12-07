var blockManager, block;
blockManager = {
  hash: {},
  add: function(arg$){
    var name, version, block, ref$;
    name = arg$.name, version = arg$.version, block = arg$.block;
    return ((ref$ = this.hash)[name] || (ref$[name] = {}))[version] = block;
  },
  get: function(opt){
    var ref$, n, v, json, this$ = this;
    opt == null && (opt = {});
    ref$ = [opt.name, opt.version], n = ref$[0], v = ref$[1];
    if (!(n && v)) {
      return Promise.reject(new ldError(1015));
    }
    if (((ref$ = this.hash)[n] || (ref$[n] = {}))[v] != null) {
      return this.hash[n][v]
        ? Promise.resolve(this.hash[n][v])
        : Promise.reject(new Error(new ldError(404)));
    }
    json = {
      dependency: [opt]
    };
    json = {
      name: opt.name,
      version: opt.version
    };
    return ld$.fetch("/block", {
      method: 'POST'
    }, {
      json: json,
      type: 'json'
    }).then(function(ret){
      var b;
      ret == null && (ret = {});
      if (!(ret.name && ret.version)) {
        return Promise.reject(new ldError(1015));
      }
      this$.add({
        name: ret.name,
        version: ret.version,
        block: b = new block(ret)
      });
      return b;
    });
  }
};
block = function(opt){
  var div;
  opt == null && (opt = {});
  this.opt = opt;
  this.name = opt.name;
  if (opt.root) {
    this.tree = serialize(opt.root);
  } else if (opt.files && opt.files["index.html"]) {
    div = document.createElement("div");
    div.innerHTML = opt.files["index.html"];
    this.tree = serialize(div);
  }
  blockManager.add(name, this);
  return this;
};
block.prototype = import$(Object.create(Object.prototype), {
  /*
  should return block-instance
  真的建一個 DOM 出來. 初始化?
  可能的事件:
   - before insert ( 編輯用 )
   - init
   - after insert ( 編輯用 )
   - before remove ( 編輯用 )
   - destroy
   - after remove ( 編輯用 )
   - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
  */
  instantiate: function(data){
    return deserialize(data != null
      ? data
      : this.tree);
  }
});
/*
block-inst = ->
  @

block-inst.prototype = Object.create(Object.prototype) <<< {}
  pub: (name, data) ->
    ???.on name, data

  get-dom: ->
  get-block: ->
  init: ->
*/
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}