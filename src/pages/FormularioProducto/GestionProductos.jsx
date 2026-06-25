import styles from "./GestionProductos.module.css";

function GestionProductos({ productos, handleEdit, handleDelete }) {
    if (productos.length === 0) {
        return (
            <div className={styles.contenedorVacio}>
                <p>No hay productos registrados aún.</p>
            </div>
        );
    }

    return (
        <div className={styles.contenedorGestion}>
            <h2 className={styles.subtitulo}>Panel de Gestión de Inventario</h2>
            <div className={styles.tablaContenedor}>
                <table className={styles.tabla}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((prod) => (
                            <tr key={prod.idFirebase} className={styles.fila}>
                                <td>{prod.id}</td>
                                <td>
                                    <img 
                                        src={prod.imagen || "https://via.placeholder.com/50"} 
                                        alt={prod.nombre} 
                                        className={styles.miniImagen}
                                    />
                                </td>
                                <td className={styles.nombreCelda}>{prod.nombre}</td>
                                <td><span className={styles.badge}>{prod.categoria}</span></td>
                                <td className={styles.precio}>${prod.precio}</td>
                                <td>
                                    <span className={prod.stock > 0 ? styles.conStock : styles.sinStock}>
                                        {prod.stock} u.
                                    </span>
                                </td>
                                <td className={styles.acciones}>
                                    <button
                                        className={styles.botonEditar}
                                        onClick={( ) => handleEdit(prod)}
                                        title="Editar producto"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className={styles.botonEliminar}
                                        onClick={() => handleDelete(prod.idFirebase)}
                                        title="Eliminar producto"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GestionProductos;