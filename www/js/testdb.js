// $(function(){

  var dbName = 'Test1';
  var version = '1.0';
  var displayName = 'Test1';
  var estimatedSize = 65536;

// テーブル作成
  function createTableIfNotExists(){
    var db = openDB();
    db.transaction(
      function(trans){
        trans.executeSql(
          'CREATE TABLE IF NOT EXISTS task '
          + '( id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '
          + '  tasktitle TEXT NOT NULL,'
          + '  description TEXT NOT NULL,'
          + '  date BLOB NOT NULL,'
          + '  remind BLOB NOT NULL,'
          + '  tag TEXT NOT NULL,'
          + '  priority BLOB NOT NULL);'
        );
      }
    );
  }

// テーブル登録
  function save(){
    var tasktitle = document.getElementById('tasktitle').value;
    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var remind = document.getElementById('remind').value;
    var tag = document.getElementById('tag').value;
    var priority = $("#select_test").val();
    alert(tasktitle);
    alert(description);
    alert(date);
    alert(remind);
    alert(tag);
    alert(priority);
    
    myNavigator.popPage()
    var db = openDB();
    db.transaction(
      function(trans){
        trans.executeSql(
          "INSERT INTO task (tasktitle, description, date, remind, tag, priority) VALUES(?, ?, ?, ?, ?, ?)", [tasktitle, description, date, remind, tag, priority]
        );
    　}
    );
  }
  
// テーブル削除
  function dropData(){
    var db = openDB();
    db.transaction(
      function(trans){
        trans.executeSql(
          'DROP TABLE task'
        );
        alert("テーブルを削除しました");
      }
    );
  }

// テーブル取得
  function getData(){
    var db = openDB();
    db.transaction(
      function(trans){
        trans.executeSql(
          'SELECT * FROM task;',
          [],
          function(trans, r){
            for(var i=0; i<r.rows.length; i++){
              alert(
                'id=' + r.rows.item(i).id
                + ' tasktitle=' + r.rows.item(i).tasktitle
                + ' description=' + r.rows.item(i).description
                + ' date=' + r.rows.item(i).date
                + ' remind=' + r.rows.item(i).remind
                + ' tag=' + r.rows.item(i).tag
                + ' priority=' + r.rows.item(i).priority
              );
            }
          }
        );
      }
    );
  }


  function openDB(){
    return openDatabase(
      dbName,
      version,
      displayName,
      estimatedSize);
  }

//テーブル取得実行
 function dbcreatetest(){
    createTableIfNotExists();
    // insertData();
    getData();
  }
  
   function dbcleartest(){
       dropData();
  }

//   $('#button2').click(function(){
//     insertData();
//   });
// 
//   $('#button3').click(function(){
//     getData();
//   });
// });



  function Test(){
    document.myForm.mySelect.options;
    alert(option);
  }
  

//データをテーブルとして変数resultへ反映
  function Select_table(){
    var db = openDB();
    db.transaction(
      function(trans){
        trans.executeSql(
          'SELECT * FROM task;',
          [],
          function(trans, r){
            
                // 結果のクリア
                var d = document.getElementById('TopListView');
                while (d.firstChild) {
                    d.removeChild(d.firstChild);
                }
            
                // 取得データを表示
                for (var i = 0; i < r.rows.length; i++){
                    
                    var tasktitle = r.rows.item(i).tasktitle;
                    var description = r.rows.item(i).description;
                    var date = r.rows.item(i).date;
                    var remind = r.rows.item(i).remind;
                    var tag = r.rows.item(i).tag;
                    var priority = r.rows.item(i).priority;
                
                    $li = $("<li class='ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child'><a href='#' class='show'><h3 class='ui-li-heading'></h3></a><p class='ui-li-desc'></p><p1 class='ui-li-desc'></p1><p3 class='ui-li-desc'></p3><p4 class='ui-li-desc'></p4></li>");
                    $li.find("h3").text(tasktitle);
                    $li.find("p").text(description);
                    $li.find("p1").text(date);
                    $li.find("p2").text(remind);
                    $li.find("p3").text(tag);
                    $li.find("p4").text(priority);
                    $("#TopListView").prepend($li);
                 }
                if (r.length == 0) {
                    $li = $("<li>メモがありません</li>");
                    $("#TopListView").prepend($li);
                }
            }
         );
        }
    );
                $("#TopListView").listview('refresh');  // Call refresh after manipulating list
    }

// ■11/18現在未編集↓
      
    function search(){
    var search = document.getElementById('search').value;
    var db = openDB();
    db.transaction(
      function(trans){
        trans.executeSql(
          "SELECT * FROM task WHERE id = (?);",
          [search],
          function(trans, r){
            
                // 結果のクリア
                var d = document.getElementById('result');
                while (d.firstChild) {
                    d.removeChild(d.firstChild);
                }
                
                for (var i = 0; i < r.rows.length; i++){
                    
                    var tasktitle = r.rows.item(i).tasktitle;
                    var description = r.rows.item(i).description;
                    var date = r.rows.item(i).date;
                    var priority = r.rows.item(i).priority;
                
                    $li = $("<li class='ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child'><a href='#' class='show'><h3 class='ui-li-heading'></h3><p class='ui-li-desc'></p></a><a href='#' class='delete'>Delete</a></li>");
                    $li.find("h3").text(tasktitle);
                    $li.find("p").text(description);
                    $li.find("p").text(date);
                    $li.find("p").text(priority);
                    $("#result").prepend($li);
                 }
                if (d.length == 0) {
                    $li = $("<li>メモがありません</li>");
                    $("#result").prepend($li);
        
                }
            }
        );
                $("#result").listview('refresh');  // Call refresh after manipulating list

       }
    );
}

// ■一括起動用

 function save_return(){
    createTableIfNotExists();
    save();
    Select_table();
  }