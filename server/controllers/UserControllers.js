// นำเข้า UserModel จากไฟล์ models/UserModel
const UserModel = require('../models/UserModel')

// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
module.exports.getUser = async (req, res) => {
    try {
        // ค้นหาผู้ใช้ทั้งหมดในฐานข้อมูล
        const userData = await UserModel.find()
        // ส่งข้อมูลผู้ใช้กลับไปพร้อมกับสถานะ 200 (OK)
        res.status(200).send(userData)
    } catch (error) {
        // จัดการข้อผิดพลาดกรณีที่มีปัญหาในการดึงข้อมูล
        console.log(error)
        res.status(500).send({ error: error, message: "Something went wrong!" });
    }
}

// ฟังก์ชันสำหรับการบันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
module.exports.saveUser = async (req, res) => {
    // ดึงข้อมูล name, email, phone จาก body ของคำขอ
    const { name, email, phone } = req.body

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    UserModel.create({ name, email, phone })
        .then((data) => {
            // หากการสร้างสำเร็จ ส่งสถานะ 201 (Created) พร้อมกับข้อมูลผู้ใช้ที่สร้าง
            console.log("Created user successfully.")
            res.status(201).send(data)
        })
        .catch((error) => {
            // จัดการข้อผิดพลาดกรณีที่มีปัญหาในการสร้างผู้ใช้
            console.log({ error: error, message: "Something went wrong!" });
            res.status(500).send({ error: error, message: "Something went wrong!" });
        })
}

// ฟังก์ชันสำหรับการอัปเดตข้อมูลผู้ใช้ที่มีอยู่ในฐานข้อมูล
module.exports.updateUser = async (req, res) => {
    // ดึง ID ของผู้ใช้จากพารามิเตอร์
    const { id } = req.params
    // ดึงข้อมูล name, email, phone จาก body ของคำขอ
    const { name, email, phone } = req.body

    // ค้นหาและอัปเดตผู้ใช้ตาม ID และข้อมูลใหม่
    UserModel.findByIdAndUpdate(id, { name, email, phone }, { new: true })
        .then((data) => {
            if (data) {
                // หากการอัปเดตสำเร็จ ส่งข้อมูลผู้ใช้ที่อัปเดตกลับไป
                console.log('Updated user successfully.')
                res.json(data)
            } else {
                // หากไม่พบผู้ใช้ที่มี ID ดังกล่าว ส่งสถานะ 404 (Not Found)
                res.status(404).send({ message: 'User not found' })
            }
        })
        .catch((error) => {
            // จัดการข้อผิดพลาดกรณีที่มีปัญหาในการอัปเดตผู้ใช้
            console.log({ error: error, message: "Something went wrong!" });
            res.status(500).send({ error: error, message: "Something went wrong!" });
        })
}

// ฟังก์ชันสำหรับการลบผู้ใช้จากฐานข้อมูล
module.exports.deleteUser = (req, res) => {
    // ดึง ID ของผู้ใช้จากพารามิเตอร์
    const { id } = req.params

    // ค้นหาและลบผู้ใช้ตาม ID
    UserModel.findByIdAndDelete(id)
        .then(() => {
            // หากการลบสำเร็จ ส่งสถานะ 204 (No Content) เพื่อบอกว่าลบสำเร็จแต่ไม่มีเนื้อหาส่งกลับ
            res.status(204).send("Deleted user successfully.")
        })
        .catch((error) => {
            // จัดการข้อผิดพลาดกรณีที่มีปัญหาในการลบผู้ใช้
            console.log(error)
            res.status(500).send({ error: error, message: "Something went wrong!" });
        })
}
