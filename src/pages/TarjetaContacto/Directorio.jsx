import { useEffect, useState } from "react";
import TarjetaContacto from "./TarjetaContacto";
import styles from "./Directorio.module.css"; 

function Directorio() {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        fetch("/data/personal.json")
            .then((res) => res.json())
            .then((data) => setPersonas(data))
            .catch((err) => console.error("Error cargando personal:", err));
    }, []);

    return (
        <section className={styles.container}>
            {personas.map((persona) => (
                <TarjetaContacto key={persona.id} {...persona} />
            ))}
        </section>
    );
}

export default Directorio;