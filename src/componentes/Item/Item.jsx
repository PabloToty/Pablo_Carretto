import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";

function Item({ id, nombre, precio, imagen }) {

    const [cantidad, setCantidad] = useState(0);

    const [esFavorito, setEsFavorito] = useState(false);

    const incrementar = () => {
        setCantidad((prev) => prev + 1);
    };

    const decrementar = () => {
        setCantidad((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const comprar = () => {

        if (cantidad === 0) {
            alert("Seleccioná al menos 1 producto");
            return;
        }

        alert(`Agregaste ${cantidad} unidad(es) de ${nombre} al carrito`);
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

            <div className={styles.contador}>

                <button onClick={decrementar}>
                    -
                </button>

                <span>{cantidad}</span>

                <button onClick={incrementar}>
                    +
                </button>

            </div>

            <button
                onClick={comprar}
                className={styles.boton}
            >
                Comprar
            </button>

        </div>
    );
}

export default Item;