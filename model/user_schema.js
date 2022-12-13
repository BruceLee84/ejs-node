const mongoose = require('mongoose');

const mongoosepaginate = require('mongoose-paginate');

const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new  mongoose.Schema({
    id:{type:Number, require:true},
    username:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true}
})

// userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('userdetail', userSchema)