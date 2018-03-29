document.getElementById("step1-button").onclick = function() {
  var json = document.getElementById("step1-textarea").value;
  var json_obj = JSON.parse(json);
  var data_list = json_obj["data"];
  var item = data_list[0];
  var keys = Object.keys(item);
  set_step2_list(keys);
};

function set_step2_list(keys) {
  for(key in keys) {
    add_step2_item(key,value);
  }
}

function add_step2_item(key,value) {
  var li = document.createElement("li")
  li.innerHTML = key + ': <select name="' + key + '"><option value="text">テキスト</option><option value="thumb">画像</option><option value="url">URL</option><option value="date">日付</option><option value="number">数値</option></select>';
  document.getElementById("step2-list").appendChild(li);
}
