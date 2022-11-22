const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memorySchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    title:{
        type: String
    },
    description:{
        type: String
    },
    avatar: {
        type: String
    },
    // the memoryPhoto string is the string that will be stored in AWS 
    memoryPhoto: {
        type: Buffer
    }
}, {
    tmestamps: true
});

memorySchema.methods.toJSON = function(){
    const result = this.toObject();
    delete result.photo;
    return result
}; 


module.exports = mongoose.model('Memory', memorySchema); 