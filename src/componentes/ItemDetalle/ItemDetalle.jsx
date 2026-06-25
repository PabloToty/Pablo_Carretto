import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useCart } from "../../context/CartContext";
import styles from "./ItemDetalle.module.css";

const ItemDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(0);

    const { addToCart, getCantidadActual } = useCart();

    useEffect(() => {
        if (id) {
            const docRef = doc(db, "productos", id);

            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) {
                        // 3. Guardamos los datos incluyendo el id de Firebase
                        setProducto({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch((error) => {
                    console.error("Error al cargar el detalle:", error);
                })
                .finally(() => {
                    setCargando(false);
                });
        }
    }, [id]);

    const cantidadEnCarrito = producto ? getCantidadActual(producto.id) : 0;
    const stockDisponible = producto ? (producto.stock - cantidadEnCarrito) : 0;

    const incrementar = () => {
        if (cantidad < stockDisponible) {
            setCantidad(prev => prev + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(prev => prev - 1);
        }
    };

    const comprar = () => {
        if (cantidad > 0) {
            addToCart(producto, cantidad);
            alert(`Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito`);
            setCantidad(0);
        }
    };

    if (cargando) {
        return <h2 className={styles.loading}>Cargando producto...</h2>;
    }

    if (!producto) {
        return <h2 className={styles.loading}>Producto no encontrado.</h2>;
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
                        {producto.descripcion || "Sin descripción disponible."}
                    </p>
                    <p className={styles.precio}>
                        ${producto.precio.toLocaleString("es-AR")}
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

                    <div className={styles.contadorSeccion}>
                        <div className={styles.contador}>
                            <button 
                                onClick={decrementar}
                                disabled={cantidad === 0}
                                className={styles.botonCantidad}
                            >
                                -
                            </button>
                            <span className={styles.numeroCantidad}>{cantidad}</span>
                            <button 
                                onClick={incrementar}
                                disabled={cantidad >= stockDisponible}
                                className={styles.botonCantidad}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={comprar}
                        className={styles.botonComprar}
                        disabled={stockDisponible === 0 || cantidad === 0}
                    >
                        {stockDisponible === 0 ? "Sin Stock" : "Agregar al carrito"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemDetalle;