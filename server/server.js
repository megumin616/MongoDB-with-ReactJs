// นำเข้า Express framework สำหรับสร้างเว็บแอปพลิเคชัน
const express = require('express')
// นำเข้า Mongoose library สำหรับการเชื่อมต่อและจัดการ MongoDB
const mongoose = require('mongoose')
// นำเข้า dotenv library เพื่อโหลดค่าตัวแปรสภาพแวดล้อมจากไฟล์ .env
require('dotenv').config()
// นำเข้า CORS middleware เพื่อจัดการ Cross-Origin Resource Sharing
const cors = require('cors')

// นำ router เข้า หลังจากสร้างส่วนอื่นๆเสร็จ
const routers = require('./routes/Route')

// สร้างแอปพลิเคชัน Express
const app = express()

const PORT = process.env.PORT  //port
const MONGO = process.env.MONGO_RUI  //link connect mongodb

app.use(express.json())
app.use(cors())
app.use(routers)

//connect MongoDB
mongoose.connect(MONGO)
.then(() => console.log("MongoDB Connected..."))
.catch((err) => console.log(err))

//run server
app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`)
}) 