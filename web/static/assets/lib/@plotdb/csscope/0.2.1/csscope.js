// Generated by LiveScript 1.6.0
(function(){
  var csscope, slice$ = [].slice;
  csscope = function(a, b){
    if (!csscope['default']) {
      csscope['default'] = new csscope.converter();
    }
    return csscope['default'].convert(a, b);
  };
  csscope.converter = function(opt){
    opt == null && (opt = {});
    this.scopeTest = opt.scopeTest;
    this.node = document.createElement("style");
    this.iframe = document.createElement("iframe");
    this.iframe.style.display = 'none';
    this.iframe.src = 'about:blank';
    document.body.appendChild(this.iframe);
    this.iframe.contentDocument.body.appendChild(this.node);
    return this;
  };
  csscope.converter.prototype = import$(Object.create(Object.prototype), {
    getNames: function(rules, defs){
      var i$, len$, rule;
      defs == null && (defs = {});
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        if (rule.name) {
          defs[rule.name] = true;
        } else if (rule.cssRules) {
          this.getNames(rule.cssRules, defs);
        }
      }
      return defs;
    },
    _convert: function(rules, scope, scopeTest, defs){
      var ret, i$, len$, rule, sel, code;
      defs == null && (defs = {});
      ret = "";
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        if (rule.style && defs[rule.style.animationName]) {
          rule.style.animationName = scope + "__" + rule.style.animationName;
        }
        if (rule.selectorText) {
          if (!scopeTest) {
            sel = rule.selectorText.split(',').map(fn$).map(fn1$).join(',');
          } else {
            sel = rule.selectorText.split(',').map(fn2$).map(fn3$).join(',');
          }
          ret += "" + sel + " {\n  " + Array.from(rule.style).map(fn4$).join(';') + "\n}";
          rule.selectorText = sel;
        } else if (rule.name) {
          sel = rule.name.split(',').map(fn5$).map(fn6$).join(',');
          rule.name = sel;
          ret += "@keyframes " + sel + " {\n  " + Array.from(rule.cssRules).map(fn7$).join('\n') + "\n}";
        } else if (rule.cssRules) {
          code = this._convert(rule.cssRules, scope, scopeTest, defs);
          ret += "@media " + rule.conditionText + " {\n  " + code + "\n}";
        }
      }
      return ret;
      function fn$(it){
        return it.trim();
      }
      function fn1$(it){
        if (it === ":scope") {
          return scope;
        } else {
          return scope + " " + it;
        }
      }
      function fn2$(it){
        return it.trim();
      }
      function fn3$(it){
        var ref$, h, t;
        if (it === ":scope") {
          return scope;
        }
        ref$ = it.split(' ').map(function(it){
          return it.trim();
        }).filter(function(it){
          return it;
        }), h = ref$[0], t = slice$.call(ref$, 1);
        return (scope + " :not(" + scopeTest + ") " + it + ",") + (scope + " > :not(" + scopeTest + ")" + h + " " + t.join(' '));
      }
      function fn4$(it){
        return it + ":" + rule.style[it];
      }
      function fn5$(it){
        return it.trim();
      }
      function fn6$(it){
        return scope + "__" + it;
      }
      function fn7$(it){
        return it.cssText;
      }
    },
    convert: function(a, b, c){
      var opt, ref$, css, scope, scopeTest, ret, defs;
      ref$ = opt = typeof a === 'object'
        ? a
        : {
          css: b,
          scope: a,
          scopeTest: c
        }, css = ref$.css, scope = ref$.scope, scopeTest = ref$.scopeTest;
      if (!scopeTest) {
        scopeTest = this.scopeTest;
      }
      this.node.textContent = css;
      ret = "";
      defs = this.getNames(this.node.sheet.rules, {});
      ret = this._convert(this.node.sheet.rules, scope, scopeTest, defs);
      return ret;
    }
  });
  csscope.manager = function(){
    this.attrName = "csscope";
    this.converter = new csscope.converter();
    this.counter = 0;
    this.init();
    return this;
  };
  csscope.manager.prototype = import$(Object.create(Object.prototype), {
    init: function(){
      if (this.inited) {
        return;
      }
      this.inited = true;
      this.styleNode = document.createElement('style');
      this.styleNode.setAttribute('type', 'text/css');
      this.styleNode.setAttribute('data-name', "csscope.manager");
      this.styleContent = [];
      return document.body.appendChild(this.styleNode);
    },
    scope: function(node, url){
      var ret;
      ret = this.get(url);
      return node.setAttribute(ret.name, ret.value);
    },
    get: function(url){
      var ret, this$ = this;
      url = Array.isArray(url)
        ? url
        : [url];
      ret = url.map(function(it){
        return this$.scope[it];
      }).join(' ');
      return ret = {
        name: this.attrName,
        value: ret
      };
    },
    load: function(urls, scopeTest){
      var this$ = this;
      urls = Array.isArray(urls)
        ? urls
        : [urls];
      return Promise.all(urls.map(function(url){
        this$.scope[url] = "csscope-" + (this$.counter++) + "-" + Math.random().toString(36).substring(2);
        return ld$.fetch(url, {
          method: "GET"
        }, {
          type: 'text'
        }).then(function(css){
          var ret;
          ret = converter.convert({
            css: css,
            scope: "[" + this$.attrName + "=" + this$.scope[url] + "]",
            scopeTest: scopeTest
          });
          return this$.styleContent.push(ret);
        });
      })).then(function(){
        return this$.styleNode.textContent = this$.styleContent.join('\n');
      }).then(function(){
        return this$.get(urls);
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = csscope;
  }
  if (typeof window != 'undefined' && window !== null) {
    window.csscope = csscope;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
