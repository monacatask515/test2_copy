function addTodoPicture() {
    navigator.camera.getPicture(addTodo, function() {
        alert("Failed to get camera.");
    }, {
        quality : 50,
        destinationType : Camera.DestinationType.FILE_URI,
        targetWidth : 100,
        targetHeight : 100
    });
}
function addTodo(camera_url) {
    var title = $("#todo-title").val();
    var body = $("#todo-body").val();
    var img_tag = "";
    if (camera_url) {
        img_tag = "<img src='" + camera_url + "'>";
    }
    $.mobile.changePage($("todohome.html"));
    $("#todo-list").append("<li>" + img_tag + "<h3>" + title + "</h3><p>" + body + "</p></li>");
    $("#todo-list").listview('refresh');
};




//メニューリストを下から表示
var app = {};

ons.ready(function () {
  ons.createElement('action-sheet.html', { append: true })
    .then(function (sheet) {
      app.showFromTemplate = sheet.show.bind(sheet);
      app.hideFromTemplate = sheet.hide.bind(sheet);
    });
});

app.showFromObject = function () {
  ons.openActionSheet({
    title: 'menu',
    cancelable: true,
    buttons: [
      '保存',
      '完了タスクへ',
      {
        label: '削除',
        modifier: 'destructive'
      },
      {
        label: 'Cancel',
        icon: 'md-close'
      }
    ]
  }).then(function (index) { console.log('index: ', index) })
};
