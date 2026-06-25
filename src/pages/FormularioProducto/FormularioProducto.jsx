import styles from "./FormularioProducto.module.css";

function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarCambioImagen,
    manejarEnvio,
    productoAEditar
}) {
    return (
        <div className={styles.container}>
            <form
                className={styles.formulario}
                onSubmit={manejarEnvio}
            >
                <h2 className={styles.titulo}>
                    {productoAEditar
                        ? "Editar Producto"
                        : "Agregar Nuevo Producto"}
                </h2>

                {}
                <div className={styles.gridCampos}>
                    <div className={styles.campo}>
                        <label className={styles.label}>ID del Producto</label>
                        <input
                            type="number"
                            name="id"
                            className={styles.input}
                            value={datosForm.id}
                            onChange={manejarCambio}
                            required
                            min="1"
                            placeholder="Ej: 101"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.label}>Nombre del Producto</label>
                        <input
                            type="text"
                            name="nombre"
                            className={styles.input}
                            value={datosForm.nombre}
                            onChange={manejarCambio}
                            required
                            placeholder="Nombre del dulce"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.label}>Categoría</label>
                        <input
                            type="text"
                            name="categoria"
                            className={styles.input}
                            value={datosForm.categoria}
                            onChange={manejarCambio}
                            required
                            placeholder="Ej: Tortas"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.label}>Precio ($)</label>
                        <input
                            type="number"
                            name="precio"
                            className={styles.input}
                            value={datosForm.precio}
                            onChange={manejarCambio}
                            min="0"
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.label}>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            className={styles.input}
                            value={datosForm.stock}
                            onChange={manejarCambio}
                            min="0"
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.label}>Imagen</label>
                        <input
                            type="file"
                            className={styles.input}
                            accept="image/*"
                            onChange={manejarCambioImagen}
                        />
                    </div>
                </div>

                <div className={styles.campo}>
                    <label className={styles.label}>Descripción</label>
                    <textarea
                        name="descripcion"
                        className={styles.textarea}
                        value={datosForm.descripcion}
                        onChange={manejarCambio}
                        required
                        placeholder="Detalles del producto..."
                        rows="3"
                    />
                </div>

                <div className={styles.campoCheck}>
                    <label className={styles.labelCheck}>
                        <input
                            type="checkbox"
                            name="destacado"
                            checked={datosForm.destacado}
                            onChange={manejarCambio}
                        />
                        <span>Producto Destacado</span>
                    </label>
                </div>

                <button type="submit" className={styles.boton}>
                    {productoAEditar
                        ? "Actualizar Producto"
                        : "Guardar Producto"}
                </button>
            </form>
        </div>
    );
}

export default FormularioProducto;