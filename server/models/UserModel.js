// นำเข้า mongoose
const mongoose = require('mongoose');

// สร้าง schema สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
    name: String,  // กำหนดฟิลด์ name เป็นชนิด String
    email: String, // กำหนดฟิลด์ email เป็นชนิด String
    phone: Number  // กำหนดฟิลด์ phone เป็นชนิด Number
});

// สร้างและส่งออกโมเดล Users โดยใช้ userSchema
module.exports = mongoose.model("Users", userSchema);
