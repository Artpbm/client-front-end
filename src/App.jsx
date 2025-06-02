import { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router'
import style from './App.module.css'
import { Api } from './api/api'


function App() {

  const Navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassoword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storageUser = localStorage.getItem('user')
    if(storageUser){
      setUser(JSON.parse(storageUser))
      Navigate('/dashboard')
    }
  }, [Navigate])

 const handleLogin = async(e) => {
  e.preventDefault()
  try{
    const response = await Api.post('/login', {email, password}) 
    const user = response.data

    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    Navigate('/dashboard')
    console.log(response.data)
  } catch (error){
    setMessage('Erro no login: ' + (error.response.data?.message || 'Verifique os dados'))
  }
 }

  return (
    <div className={style.wrapLogin}>
   
    <div className={style.wrapImg}>
    <div className={style.degrade}>

    </div>
    </div>
      <div className={style.wrapForm}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder='senha' value={password} onChange={(e) => setPassoword(e.target.value)} required/>
        <button type='submit'>Entrar</button>
        <p>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default App
