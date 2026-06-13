import styles from "./TarjetaContacto.module.css";

function TarjetaContacto({ nombre, linkedinURL, puesto, fotoURL }) {
    return (
        <div className={styles.card}>

            <img
                src={fotoURL}
                alt={nombre}
                className={styles.avatar}
            />

            <h6 className={styles.nombre}>{nombre}</h6>

            <p className={styles.puesto}>{puesto}</p>

            {}
            <a href={linkedinURL} target="_blank" rel="noopener noreferrer" className={styles.email}>
                Ver Perfil LinkedIn
            </a>

        </div>
    );
}

export default TarjetaContacto;