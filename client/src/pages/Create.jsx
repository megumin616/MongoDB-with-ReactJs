import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault(); // ป้องกันพฤติกรรมเริ่มต้นของการส่งฟอร์ม
        try {
            const response = await fetch('http://localhost:3031/user', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({name, email, phone})
            })
            const data = await response.json();
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }
  return (
    <div>
        <h1>Create Data</h1>

        <form onSubmit={handleSubmit} className='form-container'>
            <input onChange={handleName} placeholder='name...'/>
            <input onChange={handleEmail} className='form' placeholder='email...'/>
            <input onChange={handlePhone} placeholder='phone...'/>
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}
