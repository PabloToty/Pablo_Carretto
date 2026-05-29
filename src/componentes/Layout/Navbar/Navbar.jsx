import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {

    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <nav className={styles.navbar}>

            <div className={styles.logo}>
                Tu Dulce Evento
            </div>

            <ul
                className={`${styles.navLinks} ${
                    menuAbierto ? styles.active : ""
                }`}
            >

                <li>
                    <Link to="/">Inicio</Link>
                </li>

                <li>
                    <Link to="/productos">
                        Productos
                    </Link>
                </li>

                <li>
                    <Link to="/contactos">
                        Contactos
                    </Link>
                </li>

                <li>
                    <Link to="/formulario">
                        Formulario
                    </Link>
                </li>

            </ul>

            <div
                className={styles.hamburger}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

        </nav>
    );
};