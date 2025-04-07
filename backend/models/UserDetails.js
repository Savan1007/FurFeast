const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
    name:{type: String},
    phone:{type:String},
    address:{type: String}
},{_id:false})

module.exports = UserDetailsSchema