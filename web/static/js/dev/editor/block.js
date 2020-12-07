var ghost, blocktmp;
ghost = new Image();
ghost.src = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"15\" viewBox=\"0 0 20 15\">\n  <rect x=\"0\" y=\"0\" width=\"20\" height=\"15\" fill=\"rgba(0,0,0,.5)\"/>\n</svg>");
ld$.find('[block]').map(function(n){
  return n.addEventListener('dragstart', function(evt){
    var id, ref$, name, version, payload;
    id = this.getAttribute('data-name');
    ref$ = id.split('@'), name = ref$[0], version = ref$[1];
    payload = {
      type: 'block',
      data: {
        name: name,
        version: version
      }
    };
    evt.dataTransfer.setData('application/json', JSON.stringify(payload));
    return evt.dataTransfer.setDragImage(ghost, 10, 10);
  });
});
blocktmp = {
  get: function(arg$){
    var name, version;
    name = arg$.name, version = arg$.version;
    return new Promise(function(res, rej){
      var n, config, data;
      if (!(n = ld$.find("[ld=block-sample][data-name=" + name + "]", 0))) {
        return rej(new Error("no block found"));
      }
      n = n.cloneNode(true);
      config = {};
      ld$.find(n, 'script').map(function(it){
        if (it.getAttribute('type') === 'application/json') {
          import$(config, JSON.parse(it.textContent));
        }
        return it.parentNode.removeChild(it);
      });
      n.removeAttribute('block-sample');
      if (config.editable) {
        n.setAttribute('editable', true);
      }
      n.setAttribute('draggable', true);
      data = serialize(n);
      return res({
        tree: tree,
        config: config
      });
    });
  }
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}