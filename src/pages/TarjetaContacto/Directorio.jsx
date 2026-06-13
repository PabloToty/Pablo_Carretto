import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import TarjetaContacto from "./TarjetaContacto";
import styles from "./Directorio.module.css"; 

function Directorio() {
    const [personas, setPersonas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const equipoRef = collection(db, "equipo");

        getDocs(equipoRef)
            .then((resp) => {
                setPersonas(
                    resp.docs.map((doc) => {
                        return { ...doc.data() }
                    })
                );
            })
            .catch((err) => {
                console.error("Error cargando equipo de Firebase:", err);
                setError(err.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) return <p className={styles.loading}>Cargando equipo...</p>;
    if (error) return <p className={styles.error}>Error: {error}</p>;

    return (
        <section className={styles.container}>
            {personas.map((persona) => (
                <TarjetaContacto key={persona.id} {...persona} />
            ))}
        </section>
    );
}

export default Directorio;