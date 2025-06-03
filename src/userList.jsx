import './Userlist.module.css'

import { useEffect, useState } from 'react'
import { Api } from './api/api'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'
function UserList() {
  const navigate = useNavigate()
  const [editUserId, setEditUserId] = useState(null)
  const [editData, setEditData] = useState({name: '', email: '', password: ''})
  const[users, setUsers] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState('')


  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
  }, [navigate])



     const fetchUsers = async () => {
      try{
        const response = await Api.get('/users')
        setUsers(response.data)
     
      }catch(err){
        setError('Erro ao carregar usuarios', err)
      }finally{
        setLoading(false)
      }
    }

    
    useEffect(() => {
      fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    try{
      await Api.delete(`/users/${id}`)
      setUsers(users.filter((u) => u.id !== id))
    }catch(err){
      setError('Erro ao deletar usuario', err)
    }
  }

  const handleEditClick = (user) => {
    setEditUserId(user.id)
    setEditData({name: user.name, email: user.email, password: ''}) //nao vai mostrar a senha antiga 
  }

  const handleEditChange = (e) => {
    const {name, value} = e.target
    setEditData({...editData, [name]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      await Api.put(`/users/${editUserId}`, editData)
      setEditUserId(null)
      fetchUsers()
    }catch(err){
      setError('Erro ao deletar usuario', err)
    }
  }
  if (loading) return <p>carregando usuarios.....</p>
  if (error) return <p>{error}</p>

  return (
    <section>
      <Menu/>
    <div style={{padding: '2rem', color: 'white'}}> 
       <h1>Usuários</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{marginTop: '2rem', marginLeft: '1rem'}}>
              {editUserId === user.id ? (
                <form onSubmit={handleUpdate} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <input type="text" name='name' value={editData.name} onChange={handleEditChange} required/>
                  <input type="email" name='email' value={editData.email} onChange={handleEditChange} required/>
                  <input type="password" name='password' value={editData.password} onChange={handleEditChange} placeholder='Nova senha' required/>
                  <button type='submit'>Salvar</button>
                  <button type='button' onClick={() => setEditUserId(null)}>Cancelar</button>
                </form>
              ) : ( 
              <>
                <strong>{user.name}</strong> - <i>{user.email}</i>
                <div style={{display: 'inline-flex', gap: '0.5 rem', marginLeft: '1rem'}}>
                  <button onClick={() => handleEditClick(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>DELETAR</button>
                </div>
                </>
              )}
            </li>
          ))}
        </ul>
    </div>
  </section>
  )
}

export default UserList
