import './Userlist.module.css'

import { useEffect, useState } from 'react'
import { Api } from './api/api'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'

function ProductList() {
  const navigate = useNavigate()

  const[list, setList] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState('')
  const [editProduct, setProduct] = useState(null)
  const [editData, setEditData] = useState({description: '', price: '', quantity: '', image: ''})

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
  }, [navigate])

  
    const fetchList = async() => {
      try{
        const response = await Api.get('/lists')
        setList(response.data)

      }catch(err){
        setError('Erro ao carregar lista', err)
      }finally{
        setLoading(false)
      }
    }

    useEffect(() => {
    fetchList()
  }, [])

  const handleDelete = async (id) => {
    try{
      await Api.delete(`/lists/${id}`)
      setList(list.filter((u) => u.id !== id))
    }catch(err){
      setError('Erro ao deletar usuario', err)
    }
  }

  const handleEditClick = (list) => {
    setProduct(list.id)
    setEditData({description: list.description, price: list.price, quantity: list.quantity, image: list.image}) 
  }

  const handleEditChange = (e) => {
    const {name, value} = e.target
    setEditData({...editData, [name]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      const updateData = {
        description: editData.description,
        price: parseFloat(editData.price),
        quantity: parseInt(editData.quantity, 10),
        image: editData.image,
      }
      await Api.put(`/lists/${editProduct}`, updateData)
      setProduct(null)
      fetchList()
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
     <h1>Lista</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {editProduct === item.id ? (
              <form onSubmit={handleUpdate} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                 <input type="text" name='description' value={editData.description} onChange={handleEditChange} required/>
                  <input type="number" name='price' value={editData.price} onChange={handleEditChange} required/>
                  <input type="number" name='quantity' value={editData.quantity} onChange={handleEditChange} required/>
                  <input type="text" name='image' value={editData.image} onChange={handleEditChange} required/>
                  <button type='submit'>Salvar</button>
                  <button type='button' onClick={() => setProduct(null)}>Cancelar</button>
              </form>
            ) : (
              <>
               <strong>{item.description}</strong>
            <br /> 
            <i>Preço: R${item.price}</i>
            <br />
            <i>Quantidade: {item.quantity}</i>
            <br />
            <img src={item.image} alt="item" style={{width: 200, height: 'auto'}}/>
            <div style={{display: 'inline-flex', gap: '0.5 rem', marginLeft: '1rem'}}>
                  <button onClick={() => handleEditClick(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>DELETAR</button>
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

export default ProductList