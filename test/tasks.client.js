
// Data model
var Task = persistence.define('Task', {
    name: "TEXT",
    done: "TEXT",
    lastChange: "DATE"
});

persistence.connect('taskdemo', 'database', 5 * 1024 * 1024, '1.0');
persistence.schemaSync();

function syncAll() {
  persistence.sync.synchronize('/recentChanges', Task, function(conflicts, updatesToPush, callback) {
      console.log(conflicts);
      callback();
    });
}


function addTask() {
  var t = new Task();
  t.name = "Some new local task";
  t.lastChange = new Date();
  persistence.add(t);
  persistence.flush();
}
