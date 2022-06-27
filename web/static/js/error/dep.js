window.run = function(){
  var a, b, e, lde;
  a = 1;
  b = 2;
  if (a === 1) {
    e = new Error();
    lde = new lderror(5566);
    throw lde;
    return import$(lderror.reject(1234), "123");
  }
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
