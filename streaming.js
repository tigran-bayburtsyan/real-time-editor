/**
 * Created by tigran on 5/3/15.
 */

module.exports = {
    documentStream: function(io, document_model, document_id) {
        var nsp = io.of('/' + document_id);
        nsp.on('connection', function(socket){
            socket.on('set_document', function (data) {
                document_model.findById(document_id, function(err, doc) {
                    if(err) {
                        socket.emit('error_console', {msg: err.message});
                    }
                    else {
                        doc.title = data.title;
                        doc.content = data.content;
                        doc.notes = data.notes;
                        doc.save(function (err2) {
                            if(err) {
                                socket.emit('error_console', {msg: err.message});
                            }
                            else {
                                nsp.emit('update_document', data);
                            }
                        });
                    }
                });
            });
        });
    },
    documentListStream: function(io, document_model) {
        var nsp = io.of('/docs');
        nsp.on('connection', function(socket) {
            socket.on('create_document', function(data){
                document_model.create({
                    title: data.title,
                    notes: []
                }, function(err, elem){
                    if(err) {
                        socket.emit('error_console', {msg: err.message})
                    }
                    else {
                        nsp.emit("new_document", {id: elem.id, title: elem.title});
                    }
                });
            });
        });
    }
};