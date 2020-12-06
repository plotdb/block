// Generated by LiveScript 1.3.1
(function(){
  var blockManager, blockClass, blockInstance;
  blockManager = function(opt){
    opt == null && (opt = {});
    this.hash = {};
    this.apiUrl = opt.url;
    return this;
  };
  blockManager.prototype = import$(Object.create(Object.prototype), {
    add: function(arg$){
      var name, version, block, ref$;
      name = arg$.name, version = arg$.version, block = arg$.block;
      return ((ref$ = this.hash)[name] || (ref$[name] = {}))[version] = block;
    },
    get: function(opt){
      var ref$, n, v, this$ = this;
      opt == null && (opt = {});
      ref$ = [opt.name, opt.version || 'latest'], n = ref$[0], v = ref$[1];
      if (!(n && v)) {
        return Promise.reject(new ldError(1015));
      }
      if (((ref$ = this.hash)[n] || (ref$[n] = {}))[v] != null && !opt.force) {
        return this.hash[n][v]
          ? Promise.resolve(this.hash[n][v])
          : Promise.reject(new Error(new ldError(404)));
      }
      return ld$.fetch(this.apiUrl, {
        method: 'POST'
      }, {
        json: {
          name: opt.name,
          version: opt.version
        },
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
          block: b = new blockClass(ret)
        });
        return b;
      });
    }
  });
  blockClass = function(opt){
    var div;
    opt == null && (opt = {});
    this.opt = opt;
    this.name = opt.name;
    if (opt.root) {
      this.datadom = datadom.serialize(opt.root);
    } else if (opt.files && opt.files["index.html"]) {
      div = document.createElement("div");
      div.innerHTML = opt.files["index.html"];
      this.datadom = datadom.serialize(div);
    }
    return this;
  };
  blockClass.prototype = import$(Object.create(Object.prototype), {
    getDom: function(){
      return datadom.deserialize(this.datadom);
    },
    getDatadom: function(){
      return JSON.parse(JSON.stringify(this.datadom));
    },
    create: function(){
      return new blockInstance({
        block: this
      });
    }
  });
  blockInstance = function(opt){
    opt == null && (opt = {});
    this.block = opt.block;
    this.datadom = this.block.getDatadom();
    this.dom = datadom.deserialize(this.datadom);
    return this;
  };
  blockInstance.prototype = import$(Object.create(Object.prototype), {
    getDom: function(){
      return this.dom;
    },
    getDatadom: function(){
      return this.datadom;
    }
  });
  /*
  可能的事件:
   - before insert ( 編輯用 )
   - init
   - after insert ( 編輯用 )
   - before remove ( 編輯用 )
   - destroy
   - after remove ( 編輯用 )
   - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
  */
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
