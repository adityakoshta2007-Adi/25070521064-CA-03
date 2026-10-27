import mongoose from 'mongoose';
const questSchema = new mongoose.Schema({title:{type:String,required:true,trim:true},category:{type:String,default:'Mind'},description:{type:String,default:''},difficulty:{type:String,enum:['Easy','Medium','Hard'],default:'Easy'},xp:{type:Number,default:50,min:0},status:{type:String,enum:['Available','In Progress','Completed'],default:'Available'},dueDate:{type:String,default:''},userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}}, {timestamps:true});
export default mongoose.model('Quest',questSchema);
