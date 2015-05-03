/**
 * Created by tigran on 5/3/15.
 */

var express = require('express')
    , app = express()
    , server = require('http').Server(app)
    , io = require('socket.io')(server)
    , bodyParser = require('body-parser');

app.use( bodyParser.json());    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.set('view engine', 'ejs');
app.use('/front', express.static('front'));
app.get('/', function (req, res) {
    res.render("index");
});

var room_last_content = {};
io.on('connection', function (socket) {
    var sock_room;
    socket.on('doc_name', function(data){
        sock_room = data.name;
        socket.join(data.name);
        socket.emit('set_update', room_last_content[sock_room]);
    });

    socket.on('update_text', function (data) {
        room_last_content[sock_room] = data;
        io.to(sock_room).emit('set_update', data);
    });
});

var s = server.listen(3000, function () {
    var host = s.address().address;
    var port = s.address().port;
    console.log('Server is started at %s:%s', host, port);
});
