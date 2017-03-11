var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


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
      "zip":38141
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
      "zip":11206
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
      "zip":11206
   }
};

app.get('/', function(req, res){
	console.log("asdfadsf");
  res.sendFile(__dirname + '/index.html');
});
app.get('/enter-store/', function(req, res){

  res.sendFile(__dirname + '/mock-enter-store.html');
});

io.on('connection', function(socket){
  socket.on('enters store', function(uid){
  	io.emit('person entered', users[uid]);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
