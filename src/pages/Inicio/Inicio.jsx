import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import styles from "./Inicio.module.css";

function Inicio() {
    return (
        <div className={styles.inicioContainer}>
            <section className={styles.hero}>
                <h2 className={styles.bienvenida}>¡Bienvenidos a Tu Dulce Evento!</h2>
                <p className={styles.subtitulo}>
                    Descubrí nuestras tentaciones artesanales preparadas con el mejor chocolate e ingredientes seleccionados.
                </p>
            </section>

            {}
            <TarjetaProducto Mensaje="Nuestros Destacados ⭐" Destacados={true} />
        </div>
    );
}

export default Inicio;