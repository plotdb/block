 (function() { function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 bg-light text-dark text-center p-4 align-items-center justify-content-center d-flex\" style=\"background:url(\u002Fassets\u002Fimg\u002Fblock\u002FDSC_7126.jpg) center center; background-size:cover\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Some Powerful Words\u003C\u002Fh1\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cp class=\"mb-4\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "a little more details about this project, better with one to two sentence.\u003C\u002Fp\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-danger\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Flanding\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Get Started Now\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 