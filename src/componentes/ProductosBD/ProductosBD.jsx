import React, { useState, useEffect } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Item from '../Item/Item';
import styles from './ProductosBD.module.css';

const ProductosBD = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const productosDB = collection(db, "productos")
        
        getDocs(productosDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, []);

    return (
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>Productos desde Base de Datos</h1>
            <div className={styles.grilla}>
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
};

export default ProductosBD;