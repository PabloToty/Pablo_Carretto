import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
    const { cart, clearCart, getCartTotal, removeItem, updateQuantity } = useCart();

    const finalizarCompra = () => {
        alert("¡Gracias por tu compra!");
        clearCart();
    };

    if (cart.length === 0) {
        return (
            <div className={styles.vacio}>
                <h1>El carrito está vacío</h1>
                <p>Agregá productos para continuar la compra.</p>
                <Link to="/productos" className={styles.botonVolver}>
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.contenedor}>

            <h1 className={styles.titulo}>
                Carrito de Compras
            </h1>

            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>

                            <td>
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className={styles.imagen}
                                />
                            </td>

                            <td>
                                {item.nombre}
                            </td>

                            <td>
                                <div className={styles.controlesCantidad}>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className={styles.botonCantidad}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    
                                    <span className={styles.numeroCantidad}>{item.quantity}</span>
                                    
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className={styles.botonCantidad}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        +
                                    </button>
                                </div>
                                {item.quantity >= item.stock && (
                                    <p className={styles.errorStock}>
                                        Límite de stock
                                    </p>
                                )}
                            </td>

                            <td>
                                $
                                {item.precio.toLocaleString("es-AR")}
                            </td>

                            <td>
                                $
                                {(item.precio * item.quantity)
                                    .toLocaleString("es-AR")}
                            </td>

                            <td>
                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className={styles.botonEliminar}
                                >
                                    Eliminar
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.total}>

                <h2>
                    Total a pagar: $
                    {getCartTotal().toLocaleString("es-AR")}
                </h2>

                <div className={styles.accionesFinales}>
                    <button
                        onClick={clearCart}
                        className={styles.botonVaciar}
                    >
                        Vaciar Carrito
                    </button>

                    <Link 
                        to="/" 
                        onClick={finalizarCompra}
                        className={styles.botonFinalizar}
                    >
                        Finalizar Compra
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Cart;