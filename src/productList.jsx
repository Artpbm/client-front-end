import './Userlist.module.css'

import { useEffect, useState } from 'react'
import { Api } from './api/api'
import { Menu } from './components/menu'

function ProductList() {
  const[list, setList] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState('')

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

export default ProductList