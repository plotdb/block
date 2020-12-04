 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (Array, JSON, Math, blockLoader, cssLoader, decache, escape, parentName, prefix, scriptLoader, version) {;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fldui.pug";
if(!ctrl) var ctrl = {};
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Fchevron-down.pug";





;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Fspinner.pug";





;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["nbr"] = pug_interp = function(count){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
for (var i = 0; i < count; i++)
{
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cbr\u003E";
}
};
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!decache) { decache = (version? "?v=" + version : ""); }
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
scriptLoader.config = (config ? config : {});
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if (!scriptLoader.url[url]) {
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
scriptLoader.url[url] = true;
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if (/^https?:\/\/./.exec(url)) {
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!cssLoader) { cssLoader = {url: {}}; }
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
cssLoader.config = (config ? config : {});
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if (!cssLoader.url[url]) {
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
cssLoader.url[url] = true;
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";










;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var b64img = {};
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAQAICRAEAOw=="
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["lorem"] = pug_interp = function(len,ln){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = loremtext[ln || 'en'].substring(0,len)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";













;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";















































;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_mixins["ldPaletteEditor"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldp\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"colors\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"edit\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-6\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldColorPicker no-border no-palette\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-6\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"row mb-2\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-8\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cselect class=\"form-control form-control-local-sm\" value=\"rgb\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Coption value=\"rgb\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "RGB\u003C\u002Foption\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Coption value=\"hsl\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "HSL\u003C\u002Foption\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Coption value=\"hcl\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "HCL\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-4 pl-0\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control form-control-local-sm value\" placeholder=\"Hex Value\" data-tag=\"hex\" style=\"margin:0\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var configs = [["Red", "Green", "Blue", "rgb", "active"], ["Hue", "Saturation", "Luminance", "hsl",""], ["Hue", "Chroma", "Luminance", "hcl",""]];
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
// iterate configs
;(function(){
  var $$obj = configs;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var config = $$obj[pug_index2];
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["row","config",config[4]], [false,false,true]), false, true)+pug_attr("data-tag", config[3], true, true)) + "\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-8\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[0]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[1]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[2]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-4\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var config = $$obj[pug_index2];
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["row","config",config[4]], [false,false,true]), false, true)+pug_attr("data-tag", config[3], true, true)) + "\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-8\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[0]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[1]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[2]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-4\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





























































































































;pug_debug_line = 93;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 97;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var anikit = {"groupName":["No Animation","Popular Animation","Repeat Animation","Transition"],"members":[[["static","static"]],[["blink","blink"],["bounce","bounce"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["breath","breath"],["fade","fade"],["flip-h","flip (horizontally)"],["float-btt-in","float-in (bottom to top)"],["slide-ltr","slide (left to right)"],["spin","spin"],["tremble","tremble"]],[["beat","beat"],["blink","blink"],["blur","blur"],["bounce","bounce"],["bounceAlt","bounceAlt"],["breath","breath"],["clock","clock"],["coin-h","coin (horizontally)"],["coin-v","coin (vertically)"],["cycle","cycle"],["cycle-alt","cycle-alt"],["damage","damage"],["dim","dim"],["fade","fade"],["flip","flip"],["flip-h","flip (horizontally)"],["flip-v","flip (vertically)"],["float","float"],["heartbeat","heartbeat"],["hit","hit"],["jelly","jelly"],["jelly-alt","jelly-alt"],["jingle","jingle"],["jump","jump"],["measure","measure"],["metronome","metronome"],["move-btt","move (bottom to top)"],["move-fade-btt","move faded (bottom to top)"],["move-fade-ltr","move faded (left to right)"],["move-fade-rtl","move faded (right to left)"],["move-fade-ttb","move faded (top to bottom)"],["move-ltr","move (left to right)"],["move-rtl","move (right to left)"],["move-ttb","move (top to bottom)"],["orbit","orbit"],["pulse","pulse"],["rubber-h","rubber (horizontally)"],["rubber-v","rubber (vertically)"],["rush-btt","rush (bottom to top)"],["rush-ltr","rush (left to right)"],["rush-rtl","rush (right to left)"],["rush-ttb","rush (top to bottom)"],["shake-h","shake (horizontally)"],["shake-v","shake (vertically)"],["shiver","shiver"],["skew","skew"],["skew-alt","skew-alt"],["slide-btt","slide (bottom to top)"],["slide-ltr","slide (left to right)"],["slide-rtl","slide (right to left)"],["slide-ttb","slide (top to bottom)"],["smash","smash"],["spin","spin"],["spin-fast","spin-fast"],["squeeze","squeeze"],["surprise","surprise"],["swim","swim"],["swing","swing"],["tick","tick"],["tick-alt","tick-alt"],["tremble","tremble"],["vortex","vortex"],["vortex-alt","vortex-alt"],["wander-h","wander (horizontally)"],["wander-v","wander (vertically)"],["wrench","wrench"]],[["blur-in","blur-in"],["blur-out","blur-out"],["bounce-alt-in","bounce-alt-in"],["bounce-alt-out","bounce-alt-out"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["fade-in","fade-in"],["fade-out","fade-out"],["fall-btt-in","fall-in (bottom to top)"],["fall-ltr-in","fall-in (left to right)"],["fall-rtl-in","fall-in (right to left)"],["fall-ttb-in","fall-in (top to bottom)"],["flip-h-in","flip-in (horizontally)"],["flip-h-out","flip-out (horizontally)"],["flip-v-in","flip-in (vertically)"],["flip-v-out","flip-out (vertically)"],["float-btt-in","float-in (bottom to top)"],["float-btt-out","float-out (bottom to top)"],["float-ltr-in","float-in (left to right)"],["float-ltr-out","float-out (left to right)"],["float-rtl-in","float-in (right to left)"],["float-rtl-out","float-out (right to left)"],["float-ttb-in","float-in (top to bottom)"],["float-ttb-out","float-out (top to bottom)"],["grow-btt-in","grow-in (bottom to top)"],["grow-btt-out","grow-out (bottom to top)"],["grow-ltr-in","grow-in (left to right)"],["grow-ltr-out","grow-out (left to right)"],["grow-rtl-in","grow-in (right to left)"],["grow-rtl-out","grow-out (right to left)"],["grow-ttb-in","grow-in (top to bottom)"],["grow-ttb-out","grow-out (top to bottom)"],["jump-alt-in","jump-alt-in"],["jump-alt-out","jump-alt-out"],["jump-in","jump-in"],["jump-out","jump-out"],["power-off","power-off"],["power-on","power-on"],["rush-btt-in","rush-in (bottom to top)"],["rush-ltr-in","rush-in (left to right)"],["rush-rtl-in","rush-in (right to left)"],["rush-ttb-in","rush-in (top to bottom)"],["slide-btt-in","slide-in (bottom to top)"],["slide-btt-out","slide-out (bottom to top)"],["slide-ltr-in","slide-in (left to right)"],["slide-ltr-out","slide-out (left to right)"],["slide-rtl-in","slide-in (right to left)"],["slide-rtl-out","slide-out (right to left)"],["slide-ttb-in","slide-in (top to bottom)"],["slide-ttb-out","slide-out (top to bottom)"],["spring-btt-in","spring-in (bottom to top)"],["spring-ltr-in","spring-in (left to right)"],["spring-rtl-in","spring-in (right to left)"],["spring-ttb-in","spring-in (top to bottom)"],["throw-btt-in","throw-in (bottom to top)"],["throw-ltr-in","throw-in (left to right)"],["throw-rtl-in","throw-in (right to left)"],["throw-ttb-in","throw-in (top to bottom)"],["vortex-alt-in","vortex-alt-in"],["vortex-alt-out","vortex-alt-out"],["vortex-in","vortex-in"],["vortex-out","vortex-out"],["zoom-in","zoom-in"],["zoom-out","zoom-out"]]],"group":{"static":[["static","static"]],"popular":[["blink","blink"],["bounce","bounce"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["breath","breath"],["fade","fade"],["flip-h","flip (horizontally)"],["float-btt-in","float-in (bottom to top)"],["slide-ltr","slide (left to right)"],["spin","spin"],["tremble","tremble"]],"repeat":[["beat","beat"],["blink","blink"],["blur","blur"],["bounce","bounce"],["bounceAlt","bounceAlt"],["breath","breath"],["clock","clock"],["coin-h","coin (horizontally)"],["coin-v","coin (vertically)"],["cycle","cycle"],["cycle-alt","cycle-alt"],["damage","damage"],["dim","dim"],["fade","fade"],["flip","flip"],["flip-h","flip (horizontally)"],["flip-v","flip (vertically)"],["float","float"],["heartbeat","heartbeat"],["hit","hit"],["jelly","jelly"],["jelly-alt","jelly-alt"],["jingle","jingle"],["jump","jump"],["measure","measure"],["metronome","metronome"],["move-btt","move (bottom to top)"],["move-fade-btt","move faded (bottom to top)"],["move-fade-ltr","move faded (left to right)"],["move-fade-rtl","move faded (right to left)"],["move-fade-ttb","move faded (top to bottom)"],["move-ltr","move (left to right)"],["move-rtl","move (right to left)"],["move-ttb","move (top to bottom)"],["orbit","orbit"],["pulse","pulse"],["rubber-h","rubber (horizontally)"],["rubber-v","rubber (vertically)"],["rush-btt","rush (bottom to top)"],["rush-ltr","rush (left to right)"],["rush-rtl","rush (right to left)"],["rush-ttb","rush (top to bottom)"],["shake-h","shake (horizontally)"],["shake-v","shake (vertically)"],["shiver","shiver"],["skew","skew"],["skew-alt","skew-alt"],["slide-btt","slide (bottom to top)"],["slide-ltr","slide (left to right)"],["slide-rtl","slide (right to left)"],["slide-ttb","slide (top to bottom)"],["smash","smash"],["spin","spin"],["spin-fast","spin-fast"],["squeeze","squeeze"],["surprise","surprise"],["swim","swim"],["swing","swing"],["tick","tick"],["tick-alt","tick-alt"],["tremble","tremble"],["vortex","vortex"],["vortex-alt","vortex-alt"],["wander-h","wander (horizontally)"],["wander-v","wander (vertically)"],["wrench","wrench"]],"transition":[["blur-in","blur-in"],["blur-out","blur-out"],["bounce-alt-in","bounce-alt-in"],["bounce-alt-out","bounce-alt-out"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["fade-in","fade-in"],["fade-out","fade-out"],["fall-btt-in","fall-in (bottom to top)"],["fall-ltr-in","fall-in (left to right)"],["fall-rtl-in","fall-in (right to left)"],["fall-ttb-in","fall-in (top to bottom)"],["flip-h-in","flip-in (horizontally)"],["flip-h-out","flip-out (horizontally)"],["flip-v-in","flip-in (vertically)"],["flip-v-out","flip-out (vertically)"],["float-btt-in","float-in (bottom to top)"],["float-btt-out","float-out (bottom to top)"],["float-ltr-in","float-in (left to right)"],["float-ltr-out","float-out (left to right)"],["float-rtl-in","float-in (right to left)"],["float-rtl-out","float-out (right to left)"],["float-ttb-in","float-in (top to bottom)"],["float-ttb-out","float-out (top to bottom)"],["grow-btt-in","grow-in (bottom to top)"],["grow-btt-out","grow-out (bottom to top)"],["grow-ltr-in","grow-in (left to right)"],["grow-ltr-out","grow-out (left to right)"],["grow-rtl-in","grow-in (right to left)"],["grow-rtl-out","grow-out (right to left)"],["grow-ttb-in","grow-in (top to bottom)"],["grow-ttb-out","grow-out (top to bottom)"],["jump-alt-in","jump-alt-in"],["jump-alt-out","jump-alt-out"],["jump-in","jump-in"],["jump-out","jump-out"],["power-off","power-off"],["power-on","power-on"],["rush-btt-in","rush-in (bottom to top)"],["rush-ltr-in","rush-in (left to right)"],["rush-rtl-in","rush-in (right to left)"],["rush-ttb-in","rush-in (top to bottom)"],["slide-btt-in","slide-in (bottom to top)"],["slide-btt-out","slide-out (bottom to top)"],["slide-ltr-in","slide-in (left to right)"],["slide-ltr-out","slide-out (left to right)"],["slide-rtl-in","slide-in (right to left)"],["slide-rtl-out","slide-out (right to left)"],["slide-ttb-in","slide-in (top to bottom)"],["slide-ttb-out","slide-out (top to bottom)"],["spring-btt-in","spring-in (bottom to top)"],["spring-ltr-in","spring-in (left to right)"],["spring-rtl-in","spring-in (right to left)"],["spring-ttb-in","spring-in (top to bottom)"],["throw-btt-in","throw-in (bottom to top)"],["throw-ltr-in","throw-in (left to right)"],["throw-rtl-in","throw-in (right to left)"],["throw-ttb-in","throw-in (top to bottom)"],["vortex-alt-in","vortex-alt-in"],["vortex-alt-out","vortex-alt-out"],["vortex-in","vortex-in"],["vortex-out","vortex-out"],["zoom-in","zoom-in"],["zoom-out","zoom-out"]]}};
;pug_debug_line = 98;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";























































































;pug_debug_line = 111;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";














































;pug_debug_line = 117;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix = function(n) { return (!n?[]:(Array.isArray(n)?n:[n])).map(function(it){ return `${prefix.currentName}$${it}`; }).join(' ');}
;pug_debug_line = 118;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_mixins["scope"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 119;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var prentName = prefix.currentName;
;pug_debug_line = 120;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = name;
;pug_debug_line = 121;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
if (attributes.class && /naked-scope/.exec(attributes.class)) {
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
}
else {
;pug_debug_line = 124;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"ld-scope": pug_escape(name || '')},attributes]), true)) + "\u003E";
;pug_debug_line = 125;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 126;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = parentName;
};
;pug_debug_line = 127;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fblock\u002Fweb\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["css"]("/assets/lib/bootstrap/main/css/bootstrap.min.css");
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["css"]("/assets/lib/bootstrap.ldui/main/bootstrap.ldui.min.css");
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "html,\nbody {\n  width: 100%;\n  height: 100%;\n}\n*[contenteditable=true] {\n  outline: none;\n}\n#caret {\n  animation: 1s linear blink infinite;\n}\n*[editable]:empty:before {\n  display: inline;\n  opacity: 0.5;\n  content: \"_\";\n}\n.highlighttoolbar {\n  z-index: 99999;\n  position: fixed;\n  border: 1px solid #ddd;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  border-radius: 0.25em;\n  padding: 0.5em 1em;\n  opacity: 0;\n  background: #fff;\n  transition: opacity 0.15s ease-in-out;\n}\n@-moz-keyframes highlight-edit {\n  0% {\n    border-color: #1fc;\n  }\n  50% {\n    border-color: #2eb;\n  }\n  100% {\n    border-color: #1fc;\n  }\n}\n@-webkit-keyframes highlight-edit {\n  0% {\n    border-color: #1fc;\n  }\n  50% {\n    border-color: #2eb;\n  }\n  100% {\n    border-color: #1fc;\n  }\n}\n@-o-keyframes highlight-edit {\n  0% {\n    border-color: #1fc;\n  }\n  50% {\n    border-color: #2eb;\n  }\n  100% {\n    border-color: #1fc;\n  }\n}\n@keyframes highlight-edit {\n  0% {\n    border-color: #1fc;\n  }\n  50% {\n    border-color: #2eb;\n  }\n  100% {\n    border-color: #1fc;\n  }\n}\n@-moz-keyframes highlight-hover {\n  0% {\n    border-color: #1af;\n  }\n  50% {\n    border-color: #28e;\n  }\n  100% {\n    border-color: #1af;\n  }\n}\n@-webkit-keyframes highlight-hover {\n  0% {\n    border-color: #1af;\n  }\n  50% {\n    border-color: #28e;\n  }\n  100% {\n    border-color: #1af;\n  }\n}\n@-o-keyframes highlight-hover {\n  0% {\n    border-color: #1af;\n  }\n  50% {\n    border-color: #28e;\n  }\n  100% {\n    border-color: #1af;\n  }\n}\n@keyframes highlight-hover {\n  0% {\n    border-color: #1af;\n  }\n  50% {\n    border-color: #28e;\n  }\n  100% {\n    border-color: #1af;\n  }\n}\n@-moz-keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  70% {\n    opacity: 1;\n  }\n  71% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  70% {\n    opacity: 1;\n  }\n  71% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-o-keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  70% {\n    opacity: 1;\n  }\n  71% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  70% {\n    opacity: 1;\n  }\n  71% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-secondary mr-2\" ld=\"highlight-delete\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Delete\u003C\u002Fdiv\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-secondary\" ld=\"highlight-clone\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Clone\u003C\u002Fdiv\u003E";
},
attributes: {"class": "highlighttoolbar"}
}, "highlight");
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" id=\"blocktmp\"\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv ld=\"block-sample\" data-name=\"content\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ch2" + (pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Heading\u003C\u002Fh2\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["lorem"](200);
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cscript type=\"application\u002Fjson\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "{\n  \"editable\": false\n}\n\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv ld=\"block-sample\" data-name=\"list\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group\"\u003E";
;pug_debug_line = 73;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
// iterate ["John","Joe","Jack","Jenny"]
;(function(){
  var $$obj = ["John","Joe","Jack","Jenny"];
  if ('number' == typeof $$obj.length) {
      for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
        var name = $$obj[$index];
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item d-flex\"\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = $index) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;
      var name = $$obj[$index];
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item d-flex\"\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = $index) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv ld=\"block-sample\" data-name=\"image\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cimg src=\"https:\u002F\u002Fi.pinimg.com\u002F236x\u002Fd3\u002F91\u002F7d\u002Fd3917d9b9e29f236e3138b491f9189ab.jpg\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv ld=\"block-sample\" data-name=\"table\"\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctable class=\"table\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "ID\u003C\u002Fth\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Name\u003C\u002Fth\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Score\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
// iterate ["John","Joe","Jack","Jenny"]
;(function(){
  var $$obj = ["John","Joe","Jack","Jenny"];
  if ('number' == typeof $$obj.length) {
      for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
        var name = $$obj[$index];
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = $index) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = (Math.random() * 100).toFixed(2)) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;
      var name = $$obj[$index];
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = $index) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = (Math.random() * 100).toFixed(2)) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" id=\"sample\"\u003E";
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 90;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ch3" + (pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Hello\u003C\u002Fh3\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "hihi\u003C\u002Fdiv\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctable" + (" class=\"d-block border\""+" contenteditable=\"false\""+pug_attr("editable", true, true, true)+pug_attr("draggable", true, true, true)) + "\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "HIHI\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block\"\u003E";
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "blah\u003C\u002Fdiv\u003E";
;pug_debug_line = 96;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"btn btn-outline-secondary\""+pug_attr("editable", true, true, true)+pug_attr("draggable", true, true, true)) + "\u003E";
;pug_debug_line = 96;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "hello\u003C\u002Fdiv\u003E";
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block\"\u003E";
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "bhalh\u003C\u002Fdiv\u003E";
;pug_debug_line = 98;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"btn btn-outline-secondary\""+pug_attr("editable", true, true, true)+pug_attr("draggable", true, true, true)) + "\u003E";
;pug_debug_line = 98;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "hello\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 100;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" id=\"d2\""+pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + " ";
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "nested\u003C\u002Fspan\u003E";
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cspan class=\"btn btn-primary\" editable=\"true\"\u003E";
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Hi\u003C\u002Fspan\u003E";
;pug_debug_line = 104;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 104;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "editable\u003C\u002Fspan\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 105;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" id=\"d3\""+pug_attr("editable", true, true, true)) + "\u003E";
;pug_debug_line = 105;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "nested ( lv2 )\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 108;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-1024 rwd mx-auto my-4 bg-white h-100\"\u003E";
;pug_debug_line = 109;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 110;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-2\"\u003E";
;pug_debug_line = 111;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 111;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "Blocks\u003C\u002Fh2\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"card mb-2\""+pug_attr("block", true, true, true)+" draggable=\"true\" data-name=\"table@0.0.1\"") + "\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "table\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"card mb-2\""+pug_attr("block", true, true, true)+" draggable=\"true\" data-name=\"image@0.0.1\"") + "\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "image\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"card mb-2\""+pug_attr("block", true, true, true)+" draggable=\"true\" data-name=\"list@0.0.1\"") + "\u003E";
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "list\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"card mb-2\""+pug_attr("block", true, true, true)+" draggable=\"true\" data-name=\"content@0.0.1\"") + "\u003E";
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "content\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-5\"\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "editor 1\u003C\u002Fh2\u003E";
;pug_debug_line = 119;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 120;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"editor\" id=\"editor1\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 122;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-5\"\u003E";
;pug_debug_line = 123;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 123;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "editor 2\u003C\u002Fh2\u003E";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 125;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"editor\" id=\"editor2\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["nbr"](50);
;pug_debug_line = 128;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/sharedb-wrapper/main/client.bundle.min.js");
;pug_debug_line = 129;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/bootstrap.native/main/bootstrap-native.min.js");
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/bootstrap.ldui/main/bootstrap.ldui.min.js");
;pug_debug_line = 131;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/@loadingio/debounce.js/main/debounce.min.js");
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/@loadingio/ldquery/main/ldq.min.js");
;pug_debug_line = 133;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/ldview/main/ldview.min.js");
;pug_debug_line = 134;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/ldcover/main/ldcv.min.js");
;pug_debug_line = 135;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/domtool.js");
;pug_debug_line = 136;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/assets/lib/ot-json0/main/ot-json0.js");
;pug_debug_line = 137;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/contenteditable/index.js");
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/editor/caret.js");
;pug_debug_line = 139;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/editor/drag.js");
;pug_debug_line = 140;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/editor/block.js");
;pug_debug_line = 141;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/editor/contenteditable.js");
;pug_debug_line = 142;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/editor/highlight.js");
;pug_debug_line = 144;pug_debug_filename = "src\u002Fpug\u002Feditor\u002Findex.pug";
pug_mixins["script"]("/js/editor/copy-paste.js");
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"Array" in locals_for_with?locals_for_with.Array:typeof Array!=="undefined"?Array:undefined,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"blockLoader" in locals_for_with?locals_for_with.blockLoader:typeof blockLoader!=="undefined"?blockLoader:undefined,"cssLoader" in locals_for_with?locals_for_with.cssLoader:typeof cssLoader!=="undefined"?cssLoader:undefined,"decache" in locals_for_with?locals_for_with.decache:typeof decache!=="undefined"?decache:undefined,"escape" in locals_for_with?locals_for_with.escape:typeof escape!=="undefined"?escape:undefined,"parentName" in locals_for_with?locals_for_with.parentName:typeof parentName!=="undefined"?parentName:undefined,"prefix" in locals_for_with?locals_for_with.prefix:typeof prefix!=="undefined"?prefix:undefined,"scriptLoader" in locals_for_with?locals_for_with.scriptLoader:typeof scriptLoader!=="undefined"?scriptLoader:undefined,"version" in locals_for_with?locals_for_with.version:typeof version!=="undefined"?version:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 