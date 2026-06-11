import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Item.module.css";

function Item({ id, nombre, precio, stock, imagen }) {

    const [cantidad, setCantidad] = useState(0);
    const [esFavorito, setEsFavorito] = useState(false);

    const { addToCart, getCantidadActual } = useCart();
    
    const cantidadEnCarrito = getCantidadActual(id);
    const stockDisponible = stock - cantidadEnCarrito;

    const incrementar = () => {
        if (cantidad < stockDisponible) {
            setCantidad((prev) => prev + 1);
        }
    };

    const decrementar = () => {
        setCantidad((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const agregarAlCarrito = () => {
        if (cantidad === 0) {
            alert("Seleccioná al menos 1 producto");
            return;
        }

        const producto = {
            id,
            nombre,
            precio,
            stock,
            imagen
        };

        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidad(es) de ${nombre} al carrito`);
        setCantidad(0);
    };

    const marcarComoFavorito = () => {
        setEsFavorito((prev) => !prev);
    };

    return (
        <div className={styles.card}>

            <span
                className={styles.favorito}
                onClick={marcarComoFavorito}
            >
                {esFavorito ? "⭐" : "☆"}
            </span>

            <Link to={`/producto/${id}`}>
                <img
                    src={imagen}
                    alt={nombre}
                    className={styles.imagen}
                />
            </Link>
            <h3 className={styles.nombre}>
                {nombre}
            </h3>
            <p className={styles.precio}>
                ${precio.toLocaleString("es-AR")}
            </p>
            <p>
                Stock total: {stock}
            </p>
            
            {cantidadEnCarrito > 0 && (
                <p className={styles.enCarrito}>
                    Ya tienes {cantidadEnCarrito} en el carrito
                </p>
            )}

            <p className={stockDisponible === 0 ? styles.sinStock : styles.infoStock}>
                {stockDisponible > 0 
                    ? `Puedes agregar hasta ${stockDisponible} más` 
                    : "Sin stock disponible"}
            </p>

            <div className={styles.contador}>
                <button 
                    onClick={decrementar}
                    disabled={cantidad === 0}
                >
                    -
                </button>

                <span>{cantidad}</span>

                <button 
                    onClick={incrementar}
                    disabled={cantidad >= stockDisponible}
                >
                    +
                </button>
            </div>

            <button
                onClick={agregarAlCarrito}
                className={styles.boton}
                disabled={stockDisponible === 0 || cantidad === 0}
            >
                {stockDisponible === 0 ? "Sin Stock" : "Agregar al carrito"}
            </button>

        </div>
    );
}

export default Item;