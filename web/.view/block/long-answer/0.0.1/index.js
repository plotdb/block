 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"form-long-answer my-4\""+pug_attr("ld-scope", true, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Leave your comment here.\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-relative\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"5\" ld=\"input-field edit-panel\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 bg-light rounded p-3 text-break d-none\" ld=\"preview-panel\" style=\"min-height:200px\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-2\" ld=\"if-markdown-enabled\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center text-sm text-muted mr-4\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cinput class=\"mr-1\" type=\"checkbox\" ld=\"use-markdown\"\u002F\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "啟用 Markdown 語法 ( ";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fmarkdown.tw\u002F\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "語法說明\u003C\u002Fa\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + " )\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"if-markdown\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center text-sm text-muted mr-4\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cinput class=\"mr-1\" type=\"checkbox\" ld=\"toggle-preview\"\u002F\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "預覽\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none flex-grow-1 mt-4\" ld=\"edit-only\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-nowrap d-flex align-items-center\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "顯示並提供 Markdown 選項給填表者\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch ml-2\" ld=\"markdown-enabled\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fstyle\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flong-answer\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "({\n  update: function(){},\n  render: function(){\n    return this.view.render();\n  },\n  init: function(arg$){\n    var root, mode, view, this$ = this;\n    root = arg$.root, mode = arg$.mode;\n    mode = 'edit';\n    this.block = {};\n    return this.view = view = new ldView({\n      root: root,\n      action: {\n        input: {\n          \"use-markdown\": function(arg$){\n            var node, ref$;\n            node = arg$.node;\n            ((ref$ = this$.block).value || (ref$.value = {})).useMarkdown = node.checked;\n            this$.update();\n            return view.render();\n          },\n          \"input-field\": function(arg$){\n            var node, ref$;\n            node = arg$.node;\n            ((ref$ = this$.block).value || (ref$.value = {})).content = node.value;\n            return this$.update();\n          },\n          \"toggle-preview\": function(arg$){\n            var node;\n            node = arg$.node;\n            this$.preview = !!node.checked;\n            return view.render();\n          }\n        },\n        click: {\n          \"markdown-enabled\": function(arg$){\n            var node, evt, ref$;\n            node = arg$.node, evt = arg$.evt;\n            ((ref$ = this$.block).config || (ref$.config = {})).markdownEnabled = !((ref$ = this$.block).config || (ref$.config = {})).markdownEnabled;\n            this$.update();\n            return this$.render();\n          }\n        }\n      },\n      handler: {\n        \"edit-only\": function(arg$){\n          var node;\n          node = arg$.node;\n          return node.classList.toggle('d-none', mode !== 'edit');\n        },\n        \"input-field\": function(arg$){\n          var node, ref$;\n          node = arg$.node;\n          return node.value = ((ref$ = this$.block).value || (ref$.value = {})).content || '';\n        },\n        \"markdown-enabled\": function(arg$){\n          var node, ref$;\n          node = arg$.node;\n          return node.classList.toggle('on', !!((ref$ = this$.block).config || (ref$.config = {})).markdownEnabled);\n        },\n        \"preview-panel\": function(arg$){\n          var node, ref$;\n          node = arg$.node;\n          node.classList.toggle('d-none', !this$.preview);\n          if (this$.preview) {\n            return node.innerHTML = DOMPurify.sanitize(marked(((ref$ = this$.block).value || (ref$.value = {})).content || ''));\n          }\n        },\n        \"edit-panel\": function(arg$){\n          var node;\n          node = arg$.node;\n          return node.classList.toggle('d-none', !!this$.preview);\n        },\n        \"if-markdown\": function(arg$){\n          var node, ref$;\n          node = arg$.node;\n          return node.classList.toggle('d-none', !((ref$ = this$.block).value || (ref$.value = {})).useMarkdown);\n        },\n        \"if-markdown-enabled\": function(arg$){\n          var node, ref$;\n          node = arg$.node;\n          return node.classList.toggle('d-none', !((ref$ = this$.block).config || (ref$.config = {})).markdownEnabled);\n        }\n      }\n    });\n  }\n});\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 