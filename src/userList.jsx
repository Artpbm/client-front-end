import './Userlist.module.css'

import { useEffect, useState } from 'react'
import { Api } from './api/api'

function UserList() {
  const[users, setUsers] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState('')

  useEffect(() => {
    async function fetchUsers(){
      try{
        const response = await Api.get('/users')
        setUsers(response.data)
        // console.log(response.data)
      }catch(err){
        setError('Erro ao carregar usuarios', err)
      }finally{
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])
  if (loading) return <p>carregando usuarios.....</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{padding: '2rem'}}> 
       <h1>Lista de Usuários</h1>
        <ul>
          {users.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - <i>{item.email}</i>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default UserList
