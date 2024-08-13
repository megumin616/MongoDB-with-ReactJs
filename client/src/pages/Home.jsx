import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [userData, setUserData] = useState([])

  const navigate = useNavigate();

  const handleShowData = async () => {
    const response = await fetch('http://localhost:3031/users')
    const data = await response.json()

    if(!data) {
      console.log('Fetch data fail')
    } else {
      setUserData(data)
    }
  }

  const handleDelete = (_id) => {
    fetch(`http://localhost:3031/user/${_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (response.ok) {
            // ถ้า response เป็นไปได้ด้วยดี, reload หน้าใหม่
            window.location.reload();
        } else {
            // ถ้า response ไม่เป็นไปด้วยดี, แสดง error
            console.log("Failed to delete");
        }
    })
    .catch((error) => console.log(error));
}


//เหลือส่วนแก้ไข

  return (
    <>
      <div>
        <button onClick={() => navigate('/create')}>CreateData</button>
        <h1>MongoDB with React js</h1>

        <div>
          <button onClick={handleShowData}>ShowData</button>
          {userData && userData.map((val, key) => (
            <div className='detail-user' key={key}>
              <h2>{val.name}</h2>
              <h2>{val.email}</h2>
              <h2>{val.phone}</h2>
              <button onClick={() => handleDelete(val._id)}>delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
