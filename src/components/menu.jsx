import { useState } from "react";
import { useNavigate } from "react-router"
import styles from "./menu.module.css"
import imagem from "../assets/whatssapp-big-logo.png"
export const Menu = () => {
    const navigate = useNavigate();
    const[open, setOpen] = useState(false)

    const goToUsers = () => navigate("/userList")
    const goToDashboard = () => navigate("/dashboard")
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return(
        <nav className={open ? styles.navBar : styles.navBarClosed}>
        <img src={imagem} alt="Logo" onClick={() => setOpen(prev => !prev)}/>
        <p onClick={goToDashboard}>Dashboard</p>
        <p>Criar usuario</p>
        <p onClick={goToUsers}>Lista de usuario</p>
        <p>Criar produto</p>
        <p>Lista de produtos</p>
        <p onClick={logout}>Sair</p>
        </nav>
    )
}