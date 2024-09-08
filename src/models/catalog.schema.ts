import * as mongoose from 'mongoose';


const parentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    }
})

const catalogSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
    },
    address:{
        type:String,
        required:true,
        minLength:10,
        maxLength:200
    },
    parents:{
        type:[parentSchema]
    },
    birthday:{
        type:Date,
        reuqired:true
    }
})

export default mongoose.model("catalog", catalogSchema)