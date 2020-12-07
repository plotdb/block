var felib, lm, module;
console.log('init');
felib = function(){
  this.scope = {};
  return this;
};
felib.prototype = import$(Object.create(Object.prototype), {
  context: function(url, func){
    var stacks, scopes, i$, to$, i, ref$, stack, scope, k, lresult$, results$ = [];
    url = Array.isArray(url)
      ? url
      : [url];
    stacks = [];
    scopes = [];
    for (i$ = 0, to$ = url.length; i$ < to$; ++i$) {
      i = i$;
      ref$ = [{}, this.scope[url[i]] || {}], stack = ref$[0], scope = ref$[1];
      for (k in scope) {
        stack[k] = window[k];
        window[k] = scope[k];
      }
      stacks.push(stack);
      scopes.push(scope);
    }
    func();
    for (i$ = scopes.length - 1; i$ >= 0; --i$) {
      i = i$;
      lresult$ = [];
      scope = scopes[i];
      stack = stacks[i];
      for (k in scope) {
        lresult$.push(window[k] = stack[k]);
      }
      results$.push(lresult$);
    }
    return results$;
  },
  load: function(url){
    var ret, this$ = this;
    url = Array.isArray(url)
      ? url
      : [url];
    ret = {};
    return new Promise(function(res, rej){
      var _;
      _ = function(list, idx){
        var items, i$, to$, i;
        items = [];
        for (i$ = idx, to$ = list.length; i$ < to$; ++i$) {
          i = i$;
          items.push(list[i]);
          if (list[i].async != null && !list[i].async) {
            break;
          }
        }
        if (!items.length) {
          return res(ret);
        }
        return Promise.all(items.map(function(it){
          return this$._load(it.url || it).then(function(it){
            return import$(ret, it);
          });
        })).then(function(){
          return this$.context(items.map(function(it){
            return it.url || it;
          }), function(){
            return _(list, idx + items.length);
          });
        });
      };
      return _(url, 0);
    });
  },
  _load: function(url){
    var this$ = this;
    return new Promise(function(res, rej){
      var script, hash, k, ref$, v;
      script = document.createElement("script");
      hash = {};
      for (k in ref$ = window) {
        v = ref$[k];
        hash[k] = v;
      }
      script.onerror = function(){
        return rej();
      };
      script.onload = function(){
        var scope, k, ref$, v;
        this$.scope[url] = scope = {};
        for (k in ref$ = window) {
          v = ref$[k];
          if (hash[k] != null || !(window[k] != null)) {
            continue;
          }
          scope[k] = window[k];
          window[k] = undefined;
        }
        return res(scope);
      };
      script.setAttribute('src', url);
      return document.body.appendChild(script);
    });
  }
});
lm = new felib();
module = {
  lib: [
    {
      url: "https://d3js.org/d3.v4.js",
      async: false
    }, "https://d3js.org/d3-format.v2.min.js", "https://d3js.org/d3-array.v2.min.js", "https://d3js.org/topojson.v2.min.js", {
      url: "https://d3js.org/d3-color.v1.min.js",
      async: false
    }, "https://d3js.org/d3-interpolate.v1.min.js", "https://d3js.org/d3-scale-chromatic.v1.min.js", "https://d3js.org/d3-dispatch.v2.min.js", "https://d3js.org/d3-quadtree.v2.min.js", "https://d3js.org/d3-timer.v2.min.js", "https://d3js.org/d3-force.v2.min.js"
  ]
};
lm.load(module.lib).then(function(it){
  return console.log('loaded', it);
});
/*
lm.load 'https://d3js.org/d3.v6.min.js'
  .then ->
    lm.load '/js/test.js'
  .then -> 
    lm.context 'https://d3js.org/d3.v6.min.js', ->
      console.log d3
      lm.load '/js/test2.js'
        .then ->
          console.log it
          lm.context '/js/test.js', ->
            lm.context '/js/test2.js', ->
              console.log testObj, test2Obj
            console.log testObj, test2Obj
          console.log testObj, test2Obj
        .then ->
          lm.context <[/js/test.js /js/test2.js]>, -> console.log testObj, test2Obj
*/
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}