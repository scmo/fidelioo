var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

var users = {  
   "1":{  
      "uid":1,
      "lastname":"John",
      "prename":"Davis",
      "phone":"708-713-7227",
      "birthdate":570286784,
      "cardnr":"4916 1653 6574 2028",
      "address":"785 Woodridge Lane",
      "place":"Memphis",
      "state":"TN",
      "zip":38141,
      "visits": [],
   },
   "2":{  
      "uid":2,
      "lastname":"Joy",
      "prename":"Nanney",
      "phone":"917-243-7338",
      "birthdate":662734784,
      "cardnr":"4929 8887 7502 6543",
      "address":"1863 Turkey Pen Road",
      "place":"Columbia",
      "state":"NY",
      "zip":11206,
     "visits": [],
   },
   "3":{  
      "uid":3,
      "lastname":"Stephen",
      "prename":"Christensen",
      "phone":"708-713-7227",
      "birthdate":11358016,
      "cardnr":"44485 2646 8634 9331",
      "address":"509 Kemper Lane",
      "state":"NY",
      "zip":11206,
     "visits": [],
   }
};

var usersInStore = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/enter-store/', function(req, res){
  res.sendFile(__dirname + '/mock-enter-store.html');
});


io.on('connection', function(socket){
  socket.on('enters store', function(uid){
    var user = users[uid];
    user.isNew = true;
    // setTimeout(toggleIsNew(), 500);
    usersInStore.unshift(user);

  	io.emit('person entered', usersInStore);
  });
});

// function toggleIsNew() {
//   console.log("asdf");
//   for (i = 0; i < usersInStore.length; i++) {
//     // if (usersInStore[i].isNew){
//     //   usersInStore[i].isNew = false;
//     //   console.log(usersInStore);
//     // }
//   }
// }



http.listen(port, function(){
  console.log('listening on *:' + port);
});
