import styles from "./TarjetaContacto.module.css";

function TarjetaContacto({ nombre, email, puesto, foto }) {
    return (
        <div className={styles.card}>

            <img
                src={foto}
                alt={nombre}
                className={styles.avatar}
            />

            <h6 className={styles.nombre}>{nombre}</h6>

            <p className={styles.puesto}>{puesto}</p>

            <a href={`mailto:${email}`} className={styles.email}>
                {email}
            </a>

        </div>
    );
}

export default TarjetaContacto;