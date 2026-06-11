import React, { useState, useEffect } from 'react';
import styles from './TarjetaProducto.module.css';
import Item from "../../componentes/Item/Item";

function TarjetaProducto({ Mensaje, Destacados = false }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        fetch('/data/productos.json')

            .then((respuesta) => {

                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }

                return respuesta.json();
            })

            .then((datos) => {
                setProductos(datos);
            })

            .catch((error) => {
                setError(error.message);
            })

            .finally(() => {
                setCargando(false);
            });

    }, []);

    if (cargando) return <p>Cargando productos...</p>;

    if (error) return <p>Error: {error}</p>;

    const productosAFiltrar = Destacados
        ? productos.filter((producto) => producto.destacado === true)
        : productos;

    return (

        <div className={styles.contenedor}>

            <h1 className={styles.titulo}>
                {Mensaje}
            </h1>

            <div className={styles.grid}>

                {productosAFiltrar.map((producto) => (

                    <Item
                        key={producto.id}
                        id={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        stock={producto.stock}
                        imagen={producto.imagen}
                    />

                ))}

            </div>

        </div>
    );
}

export default TarjetaProducto;