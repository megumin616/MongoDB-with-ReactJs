// นำเข้า Router จาก Express
const { Router } = require('express')
// นำเข้าฟังก์ชันที่เกี่ยวข้องจากไฟล์ UserControllers
const { getUser, saveUser, updateUser, deleteUser } = require('../controllers/UserControllers')

// สร้างอินสแตนซ์ของ Router
const router = Router()

// กำหนดเส้นทางสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', getUser)
// กำหนดเส้นทางสำหรับการบันทึกผู้ใช้ใหม่
router.post('/user', saveUser)
// กำหนดเส้นทางสำหรับการอัปเดตข้อมูลผู้ใช้ที่มีอยู่ตาม ID
router.put('/user/:id', updateUser)   //อย่าลืมว่า ไอดี ของ mongodb จะเป็นข้อความยาวๆ ที่สร้างอัตโนมัต
// กำหนดเส้นทางสำหรับการลบผู้ใช้ตาม ID
router.delete('/user/:id', deleteUser)

// ส่งออก router เพื่อให้สามารถใช้งานในไฟล์อื่น ๆ ได้
module.exports = router
