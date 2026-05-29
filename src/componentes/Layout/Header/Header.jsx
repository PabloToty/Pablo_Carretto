import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {

    const [cantidad, setCantidad] = useState(0);
    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {
        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        setCantidad(carrito.length);
    }, []);

    return (
        <header className={styles.header}>

            <div className={styles.headerTop}>

                <div className={styles.branding}>

                    <img
                        src="https://i.ibb.co/rR2WP7T1/Logo.jpg"
                        alt="Tu Dulce Evento"
                        className={styles.logo}
                    />

                    <h1 className={styles.title}>
                        Tu Dulce Evento
                    </h1>

                </div>

                <Link
                    to="/carrito"
                    className={styles.carrito}
                >
                    <span aria-label="Carrito">
                        🛒
                    </span>

                    {cantidad > 0 && (
                        <span className={styles.badge}>
                            {cantidad}
                        </span>
                    )}
                </Link>

            </div>

            <nav className={styles.nav}>

                <div
                    className={styles.hamburger}
                    onClick={() =>
                        setMenuAbierto(!menuAbierto)
                    }
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div
                    className={`${styles.navLinks} ${
                        menuAbierto
                            ? styles.active
                            : ""
                    }`}
                >

                    <Link to="/">
                        <button>Inicio</button>
                    </Link>

                    <Link to="/productos">
                        <button>Productos</button>
                    </Link>

                    <Link to="/nuevo-producto">
                        <button>
                            Agregar Producto
                        </button>
                    </Link>

                    <Link to="/carrito">
                        <button>Carrito</button>
                    </Link>

                    <Link to="/contacto">
                        <button>Contacto</button>
                    </Link>

                </div>

            </nav>

        </header>
    );
}

export default Header;