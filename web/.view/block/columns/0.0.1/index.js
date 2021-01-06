 (function() { function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
// iterate [1,2,3]
;(function(){
  var $$obj = [1,2,3];
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var i = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 m-4\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cimg class=\"w-100 mb-2\" src=\"\u002Fassets\u002Fimg\u002Fblock\u002FDSC_7126.jpg\"\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Feature ";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var i = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 m-4\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cimg class=\"w-100 mb-2\" src=\"\u002Fassets\u002Fimg\u002Fblock\u002FDSC_7126.jpg\"\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Feature ";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fblock\u002Fcolumns\u002F0.0.1\u002Findex.pug";
pug_html = pug_html + "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 