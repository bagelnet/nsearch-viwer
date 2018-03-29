window.onload = function() {
document.getElementById("step1-button").onclick = function() {
  var json_obj = get_json();
  var data_list = json_obj["data"];
  var item = data_list[0];
  var keys = Object.keys(item);
  document.getElementById("step2-list").innerHTML = "";
  set_step2_list(keys);
};
document.getElementById("step2-button").onclick = function() {
 var list = document.getElementById("step2-list").children;
 types = {};
 for (i=0;i<list.length; i++) {
   var item = list[i].getElementsByTagName("select")[0];
   types[item.name] = item.value;
 }
 document.getElementById("step3-list").innerHTML = "";
 var json = document.getElementById("step1-textarea").value;
 set_step3_list(get_json(),types)
};
};

function get_json() {
  var json = document.getElementById("step1-textarea").value;
  return json_obj = JSON.parse(json);
}

function set_step2_list(keys) {
  for(key in keys) {
    add_step2_item(keys[key],key);
  }
}

function add_step2_item(key,value) {
  var li = document.createElement("li")
  li.innerHTML = key + ': <select name="' + key + '"><option value="text">テキスト</option><option value="thumb">画像</option><option value="date">日付</option><option value="hidden">(非表示)</option></select>';
  document.getElementById("step2-list").appendChild(li);
}

function set_step3_list(json,types) {
   var data = json["data"]
   for (i in data) {
     add_step3_item(data[i],types);
   }
}

function add_step3_item(item,types) {
  html = "";
  for (key in types) {
    html += get_html_text(key, item[key], types[key]);
  }
  var div = document.createElement("div")
  div.className = "contents"
  div.innerHTML = html
  document.getElementById("step3-list").appendChild(div);
}

function get_html_text(key,value,type) {
  switch (types[key]) {
    case "thumb":
      var html = '<img class="thumb" src="' + value + '">';
      break;
    case "date":
      var d = new Date(value);
      var html = "<p>"+d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+"</p>";
      break;
    case "hidden":
      var html = "";
      break;
    default:
      var html = "<p>" + value + "</p>";
  }
  return html;
}
