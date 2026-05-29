import productos from "../../assets/productos.json";

import Item from "../Item/Item";

import styles from "./ItemListContainer.module.css";

function ItemListContainer({ destacados }) {

    const productosFiltrados = destacados
        ? productos.filter((producto) => producto.destacado)
        : productos;

    return (

        <section className={styles.contenedor}>

            {productosFiltrados.map((producto) => (

                <Item
                    key={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                />

            ))}

        </section>

    );
}

export default ItemListContainer;