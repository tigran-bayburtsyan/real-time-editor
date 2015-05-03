/**
 * Created by tigran on 5/3/15.
 */

module.exports = {
    getDocumentModel: function(mongoose) {
        var TextDocumentSchema = new mongoose.Schema({
            title: String,
            content: String,
            notes: [String],
            updated_at: { type: Date, default: Date.now }
        });
        return mongoose.model('TextDocument', TextDocumentSchema);
    }
};