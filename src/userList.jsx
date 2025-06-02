import './Userlist.module.css'

import { useEffect, useState } from 'react'
import { Api } from './api/api'
import { Menu } from './components/menu'
function UserList() {
  const[users, setUsers] = useState([])
  const[list, setList] = useState([])
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

  useEffect(() => {
    async function fetchList(){
      try{
        const response = await Api.get('/lists')
        setList(response.data)
        // console.log(response.data)
      }catch(err){
        setError('Erro ao carregar lista', err)
      }finally{
        setLoading(false)
      }
    }

    fetchList()
  }, [])

  if (loading) return <p>carregando usuarios.....</p>
  if (error) return <p>{error}</p>

  return (
    <section>
      <Menu/>
    <div style={{padding: '2rem', color: 'white'}}> 
       <h1>Usuários</h1>
        <ul>
          {users.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - <i>{item.email}</i>
            </li>
          ))}
        </ul>
    </div>
     <div style={{padding: '2rem', color: 'white'}}> 
     <h1>Lista</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <strong>{item.description}</strong>
            <br /> 
            <i>Preço: R${item.price}</i>
            <br />
            <i>Quantidade: {item.quantity}</i>
            <br />
            <img src={item.image} alt="item" style={{width: 200, height: 'auto'}}/>
          </li>
        ))}
      </ul>
  </div>
  </section>
  )
}

export default UserList
