import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import styles from "./FormularioProducto.module.css";

function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarCambioImagen,
    manejarEnvio
}) {

    return (
        <div className={styles.container}>
            <form
                className={styles.formulario}
                onSubmit={manejarEnvio}
            >
                <h2 className={styles.titulo}>
                    Agregar Producto
                </h2>
                <div className={styles.campo}>
                    <label className={styles.label}>
                        Nombre del Producto
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Ej: Torta Chocolate"
                        name="nombre"
                        value={datosForm.nombre}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className={styles.campo}>
                    <label className={styles.label}>
                        Precio
                    </label>
                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Ej: 25000"
                        name="precio"
                        value={datosForm.precio}
                        onChange={manejarCambio}
                        min="0"
                        required
                    />
                </div>
                <div className={styles.campo}>
                    <label className={styles.label}>
                        Imagen
                    </label>
                    <input
                        className={styles.input}
                        type="file"
                        accept="image/*"
                        onChange={manejarCambioImagen}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={styles.boton}
                >
                    Guardar Producto
                </button>
            </form>
        </div>
    );
}

export default FormularioProducto;