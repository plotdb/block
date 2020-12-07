/*
do
  name: "..."
  type: "..."
  version: ..." ( block only )
  value: "..."
  attr: [[name, value], ...]
  style: [[name, value], ...]
  cls: [c1, c2, ... ]
  child: [...]

node <-> json 互存資料

(node / json)._block: runtime data. should not be serialized / stored
 - store block item directly, or store an uuid for identifying / looking up block item, which contains:
   - obj: block instance, if applicable
   - cls: block class, if applicable
   - node: node counterpart for json
   - json: json counterpart for node
      

serialize - html to json
deserialize - json to html
locate - 

 - block 以 html/css/js 撰寫. 經編輯器由 html 轉成 json ( serialize )
 - block json 由編輯器依用戶指示插入 page json 中.
   - page json 的操作以 op 方式儲存與傳遞.
   - 收到 op 後
     - 先用來更新 json. 
     - 依 op 算出更新的範圍. 重製其下的元件:
       - 更新 style 或 attr
       - 更改標籤名稱.
       - 刪除 / 新增標籤
   - 由於元素可能會隨時新增或刪除, block js 需要妥善處理這一塊.
*/
var lc, update, opt, je, b, nt, nt2, ops, opsIn;
lc = {
  json: {}
};
Array.from(document.querySelectorAll('button')).map(function(it){
  return it.addEventListener('click', function(){
    return alert('ok');
  });
});
update = function(ops){
  ops == null && (ops = []);
  if (!ops.length) {
    return deserialize(lc.json).then(function(arg$){
      var node, promise;
      node = arg$.node, promise = arg$.promise;
      out.innerHTML = "";
      return out.appendChild(node);
    });
  } else {
    return ops.map(function(o){
      return locate(o, lc.json, out.childNodes[0]);
    });
  }
};
opt = {
  onChange: function(){
    var newObj, ops;
    newObj = je.get();
    ops = json0OtDiff(lc.json, newObj);
    sharedb.types.defaultType.apply(lc.json, ops);
    return update(ops);
  }
};
je = new JSONEditor(editor, opt);
b = new block({
  name: 'two-button',
  root: ld$.find('[block]', 0)
});
blockManager.add({
  name: "two-button",
  version: "0.0.1",
  block: b
});
lc.json = nt = JSON.parse(JSON.stringify(b.tree));
nt2 = JSON.parse(JSON.stringify(b.tree));
ops = [
  {
    p: ['child', 4],
    li: {
      type: 'block',
      name: "two-button",
      version: "0.0.1"
    }
  }, {
    p: ['child', 5],
    li: {
      type: 'block',
      name: "sample",
      version: "0.0.1"
    }
  }, {
    p: ['style', 0],
    li: ["background", "yellow"]
  }, {
    p: ['cls', 0],
    li: "text-danger"
  }, {
    p: ['attr', 0],
    li: ["data-name", "blah"]
  }, {
    p: ['attr', 0],
    ld: ["data-name", "blah"]
  }, {
    p: ['child', 5],
    ld: {
      type: 'block',
      name: "sample",
      version: "0.0.1"
    }
  }
];
je.set(lc.json);
update();
opsIn = function(ops, source){
  source == null && (source = true);
  sharedb.types.defaultType.apply(lc.json, ops);
  je.set(lc.json);
  return update(ops);
};
debounce(1000).then(function(){
  return opsIn([ops[0]]);
}).then(function(){
  return ld$.find('button').map(function(it){
    return it.addEventListener('click', function(){
      return alert('ok');
    });
  });
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[1]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[2]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[3]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[4]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[5]]);
}).then(function(){
  return debounce(1000);
}).then(function(){
  return opsIn([ops[6]]);
}).then(function(){
  return debounce(1000);
});