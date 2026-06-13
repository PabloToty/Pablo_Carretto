import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Item from "../../componentes/Item/Item";
import styles from './TarjetaProducto.module.css';

function TarjetaProducto({ Mensaje, Destacados = false }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productosRef = collection(db, "productos");

        const q = Destacados 
            ? query(productosRef, where("destacado", "==", true))
            : productosRef;

        getDocs(q)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return { ...doc.data() }
                    })
                );
            })
            .catch((err) => {
                console.error("Error al cargar productos de Firebase:", err);
                setError(err.message);
            })
            .finally(() => {
                setCargando(false);
            });

    }, [Destacados]);

    if (cargando) return <p className={styles.loading}>Cargando productos...</p>;

    if (error) return <p className={styles.error}>Error: {error}</p>;

    return (
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>
                {Mensaje}
            </h1>

            <div className={styles.grid}>
                {productos.map((producto) => (
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