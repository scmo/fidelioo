var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var moment = require('moment');

app.use(express.static('public'));

var users = {
  "1": {
    "uid": 1,
    "lastname": "John",
    "prename": "Davis",
    "phone": "708-713-7227",
    "birthdate": 570286784,
    "cardnr": "4916 1653 6574 2028",
    "address": "Moosstrasse 71",
    "place": "Altdorf",
    "state": "AR",
    "zip": 3141,
    "visits": [],
  },
  "2": {
    "uid": 2,
    "lastname": "Joy",
    "prename": "Nanney",
    "phone": "917-243-7338",
    "birthdate": 662734784,
    "cardnr": "4929 8887 7502 6543",
    "address": "Dorfweg 7",
    "place": "Zug",
    "state": "YG",
    "zip": 1126,
    "visits": [1468255158, 1486831158],
  },
  "3": {
    "uid": 3,
    "lastname": "Stephen",
    "prename": "Christensen",
    "phone": "708-713-7227",
    "birthdate": 11358016,
    "cardnr": "44485 2646 8634 9331",
    "address": "Schiffbau",
    "place": "Zurich",
    "state": "ZH",
    "zip": 1206,
    "visits": [1457714358, 1481474358],
  }
};

var usersInStore = []

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/enter-store/', function (req, res) {
  res.sendFile(__dirname + '/mock-enter-store.html');
});

app.get('/customers/', function (req, res) {
  res.json(usersInStore);
});

io.on('connection', function (socket) {
  socket.on('enters store', function (uid) {
    var user = users[uid];
    addUser(user);
    io.emit('person entered', usersInStore);
  });

  socket.on('left store', function (uid) {
    removeUser(uid);
    io.emit('person entered', usersInStore);
  });
});


function addUser(user) {
  for (i = 0; i < usersInStore.length; i++) {
    if (usersInStore[i].uid = user.uid) {
      return;
    }
  }
  user.isNew = true;
  user.arrivedAt = moment().unix();

  usersInStore.unshift(user);
}

function removeUser(){
  for (i = 0; i < usersInStore.length; i++) {
    if (usersInStore[i].uid = user.uid) {
      if (i > -1) {
        usersInStore.splice(i, 1);
      }
      return
    }
  }
}

var minutes = 2, the_interval = minutes * 60 * 1000;
setInterval(function () {
  console.log("I am doing my 5 minutes check");
  // do your stuff here
  for (i = 0; i < usersInStore.length; i++) {
    if (usersInStore[i].isNew = true && usersInStore[i].arrivedAt
            < moment().subtract(5, "minutes")) {
      usersInStore[i].isNew = false;
    }
  }
  io.emit('person entered', usersInStore);
}, the_interval);

http.listen(port, function () {
  console.log('listening on *:' + port);
});
