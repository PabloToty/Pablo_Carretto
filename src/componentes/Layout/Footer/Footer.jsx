import { FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>

            <div className={styles["footer-container"]}>

                <div className={styles["footer-section"]}>
                    <h3>Tu Dulce Evento</h3>
                    <p>
                        Pastelería de autor especializada en piezas exclusivas.
                        Combinamos técnicas artesanales con diseños modernos para crear
                        tortas únicas que transforman cada celebración en una experiencia inolvidable.
                    </p>
                </div>

                <div className={styles["footer-section"]}>
                    <h4>Contacto</h4>
                    <p>📍 Ciudad Autónoma de Buenos Aires</p>
                    <p>
                        📞{" "}
                        <a
                            href="https://wa.me/541124799505"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            +54 11 2479-9505
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://www.instagram.com/tudulceevento/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.instagram}
                        >
                            <FaInstagram />
                            @tudulceevento
                        </a>
                    </p>
                </div>

            </div>

            {}

            <div className={styles["footer-bottom"]}>
                <p>&copy; 2026 Tu Dulce Evento</p>
            </div>

        </footer>
    );
}

export default Footer;