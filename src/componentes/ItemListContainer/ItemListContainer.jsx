import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Item from '../Item/Item';
import styles from './ItemListContainer.module.css';

const ItemListContainer = ({ destacados }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const productosRef = collection(db, "productos");

        const q = destacados 
            ? query(productosRef, where("destacado", "==", true))
            : productosRef;

        getDocs(q)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                );
            })
            .catch((err) => {
                console.error("Error al obtener productos:", err);
                setError(err.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [destacados]);

    if (cargando) return <h2 className={styles.loading}>Cargando productos...</h2>;
    if (error) return <h2 className={styles.error}>Error: {error}</h2>;

    return (
        <section className={styles.contenedor}>
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
        </section>
    );
};

export default ItemListContainer;