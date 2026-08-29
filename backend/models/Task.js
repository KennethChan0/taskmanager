
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true,trim: true,},
    price: {type:Number, required:true,min:0,},
    category: {type:String, required:true,trim: true},
    description: { type: String, required:false,trim: true},
    photo: {type:String, required: false}
});

module.exports = mongoose.model('Task', taskSchema);
