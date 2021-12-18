const mogoose = require('mongoose')
const Schema = mogoose.Schema;
const ObjectId=Schema.ObjectId

const Book = new Schema({
  masach:String,
  theloai:String,
  danhsach:String,  
  hinhanh:String,
  tensach:String,
  tacgia:String,
  nxb:String,
  namxb:String,
  hinhthuc:String,
  mota:String,
  giaban:Number, 
  giamgia:Number,
  sodanhgia:String,
  sobinhchon:String,
  soluongton:String,
  soluongdaban: String,
  giagoc:String,
  });

module.exports = mogoose.model('Book',Book)