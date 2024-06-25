import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DataSchema = new Schema({
_id: {type: String},
    creator: String,
    title: String,
     message: String,
     tags: String,
     img: {
        data: Buffer,
        contentType: String
      },
     likesCounter: {
      type: [String], 
      default: []
     }
    
});

export const DataModel = mongoose.model('postData', DataSchema);