import { useNavigate } from "react-router";
import { Menu } from "./components/menu";
import { useEffect, useState } from "react";
import { Api } from "./api/api"
import styles from './Dashboard.module.css'

function Dashboard(){
    const navigate = useNavigate();
    const[userCount, setUserCount] = useState(0)
    const[productCount, setProductCount] = useState(0)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(!storedUser) navigate('/')
    }, [navigate])

    useEffect(() => {
        async function fetchData() {
            try{
                const[usersRes, productsRes] = await Promise.all([
                    Api.get('/users'),
                    Api.get('/lists'),
                ])
                setUserCount(usersRes.data.length)
                setProductCount(productsRes.data.length)
            }catch(err){
                console.error("Erro ao buscar dados do dashboard", err)
            }
        }
        fetchData()
    }, [])
    

    console.log(userCount, productCount)
    return(
        <section>
            <Menu/>
            <div className={styles.wrapNav}>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Criar produto</p>
            </div>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Lista de produtos - ({productCount} produtos)</p>
            </div>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Criar usuário</p>
            </div>
            <div className={styles.wrapItem} onClick={() => navigate('/userList')}>
                <p>Lista de usuário - ({userCount} usuário)</p>
            </div>
            </div>
        </section>

    )

}

export default Dashboard