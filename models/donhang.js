const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const donhang = new Schema({
    madh: String,
    ngaylap: {type: Date, default: Date.now, transform: v => v.getDate() + "/" + v.getMonth() + "/" + v.getFullYear()},
    matk: String,
    hinhthucthanhtoan: String,
    vanchuyen: String,
    makm: Array,
    tongtien: Number,
    tiengiam: Number,
    thongtinnguoinhan: String,
    tinhtrangthanhtoan: String,
    tinhtrangdonhang: String,
    ds_sach: [{
      masach: String,
      tensach: String,
      giaban: Number,
      giagiam: Number,
      hinhanh: String,
      soluong: Number,
    }],
  });
  
module.exports = mogoose.model('donhangs',donhang)