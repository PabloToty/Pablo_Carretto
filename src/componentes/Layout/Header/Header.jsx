import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import styles from "./Header.module.css";

function Header() {

    const [menuAbierto, setMenuAbierto] = useState(false);

    const { getCartQuantity } = useCart();
    const cantidad = getCartQuantity();

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

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

                    <Link
                        to="/"
                        onClick={cerrarMenu}
                    >
                        <button>Inicio</button>
                    </Link>

                    <Link
                        to="/productos"
                        onClick={cerrarMenu}
                    >
                        <button>Productos</button>
                    </Link>

                    <Link
                        to="/productos-bd"
                        onClick={cerrarMenu}
                    >
                        <button>ProductosBD</button>
                    </Link>

                    <Link
                        to="/nuevo-producto"
                        onClick={cerrarMenu}
                    >
                        <button>
                            Agregar Producto
                        </button>
                    </Link>

                    <Link
                        to="/carrito"
                        onClick={cerrarMenu}
                    >
                        <button>Carrito</button>
                    </Link>

                    <Link
                        to="/contacto"
                        onClick={cerrarMenu}
                    >
                        <button>Contacto</button>
                    </Link>

                </div>

            </nav>

        </header>
    );
}

export default Header;