/**
 * Created by tigran on 5/3/15.
 */

var express = require('express')
    , app = express()
    , server = require('http').Server(app)
    , io = require('socket.io')(server)
    , documentStream = require('./streaming')
    , mongoose = require('mongoose')
    , models = require('./model')
    , ObjectId = mongoose.Types.ObjectId
    , bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/real-time-editor');

var textDocument = models.getDocumentModel(mongoose);

app.use( bodyParser.json());    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render("index");
});

app.get('/docs', function (req, res) {
    textDocument.find({}, function (err, docs) {

    });
});

app.get('/document/:id', function (req, res) {
    textDocument.findById(req.params.id, function(err, elem){
        if(err) {
            res.send(err.message);
        }
        else {
            textDocument.find({}, function (err, docs) {
                res.render("index", { docs: docs , document: elem })
            });
        }
    });
});

var s = server.listen(3000, function () {
    var host = s.address().address;
    var port = s.address().port;
    console.log('Server is started at %s:%s', host, port);
});
