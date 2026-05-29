import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Contador } from "../Contador/Contador";
import styles from "./ItemDetalle.module.css";

const ItemDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((response) => response.json())
            .then((data) => {
                const productoEncontrado = data.find(
                    (p) => p.id === parseInt(id)
                );
                setProducto(productoEncontrado);
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);

    const comprar = () => {
        alert(
            `Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito`
        );
    };
    if (cargando) {
        return (
            <h2 className={styles.loading}>
                Cargando producto...
            </h2>
        );
    }
    if (!producto) {
        return (
            <h2 className={styles.loading}>
                Producto no encontrado.
            </h2>
        );
    }
    return (

        <div className={styles.detalleContainer}>
            <div className={styles.tarjetaDetalle}>
                <div className={styles.imagenCol}>
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className={styles.imagen}
                    />
                </div>
                <div className={styles.infoCol}>
                    <h2 className={styles.nombre}>
                        {producto.nombre}
                    </h2>
                    <p className={styles.descripcion}>
                        {producto.descripcion}
                    </p>
                    <p className={styles.precio}>
                        ${producto.precio.toLocaleString("es-AR")}
                    </p>
                    <div className={styles.contadorSeccion}>
                        <Contador
                            stock={producto.stock || 10}
                            inicial={1}
                            onChange={setCantidad}
                        />
                    </div>
                    <button
                        onClick={comprar}
                        className={styles.botonComprar}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemDetalle;