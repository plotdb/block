 (function() { function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "hello world!\u003C\u002Fh5\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "this is a sample block.\u003C\u002Fp\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "h5 {\n  background: #f00;\n}\n\u003C\u002Fstyle\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fsample\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "({\n  init: function(opt){\n    var div, this$ = this;\n    opt == null && (opt = {});\n    this.root = opt.root;\n    div = document.createElement(\"div\");\n    this.root.appendChild(div);\n    console.log('init!');\n    this.c = 0;\n    return setInterval(function(){\n      div.innerText = this$.c;\n      return this$.c++;\n    }, 1000);\n  }\n});\u003C\u002Fscript\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 