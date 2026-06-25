import { useState, useEffect } from "react";
import FormularioProducto from "./FormularioProducto";
import GestionProductos from "./GestionProductos";
import styles from "./GestionProductos.module.css";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

import { db } from "../../firebase/config";

function FormularioContainer() {
    const estadoInicialForm = {
        id: "",
        nombre: "",
        categoria: "",
        descripcion: "",
        destacado: false,
        precio: "",
        stock: ""
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [imagenFile, setImagenFile] = useState(null);
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);

    useEffect(() => {
        traerProductos();
    }, []);

    const traerProductos = async () => {
        try {
            const productosRef = collection(db, "productos");
            const respuesta = await getDocs(productosRef);
            const productosCargados = respuesta.docs.map((doc) => ({
                ...doc.data(),
                idFirebase: doc.id
            }));
            productosCargados.sort((a, b) => a.id - b.id);
            setProductos(productosCargados);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    const manejarCambio = (evento) => {
        const { name, value, type, checked } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const manejarCambioImagen = (evento) => {
        if (evento.target.files[0]) {
            setImagenFile(evento.target.files[0]);
        }
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        try {
            const existe = productos.some((p) => p.id === Number(datosForm.id));
            if (existe && !productoAEditar) {
                alert("Este ID ya está asignado a otro producto.");
                return;
            }

            let urlImagen = productoAEditar?.imagen || "";

            if (imagenFile) {
                const apiKey = "86f482617cb1c5910cf97007c24a09b3";
                const formData = new FormData();
                formData.append("image", imagenFile);

                const respuestaImgbb = await fetch(
                    `https://api.imgbb.com/1/upload?key=${apiKey}`,
                    { method: "POST", body: formData }
                 );
                const datosImgbb = await respuestaImgbb.json();
                if (datosImgbb.success) urlImagen = datosImgbb.data.url;
            }

            const productoCompleto = {
                ...datosForm,
                id: Number(datosForm.id),
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                imagen: urlImagen
            };

            if (productoAEditar) {
                const docRef = doc(db, "productos", productoAEditar.idFirebase);
                await updateDoc(docRef, productoCompleto);
                alert("Producto actualizado correctamente");
            } else {
                await addDoc(collection(db, "productos"), productoCompleto);
                alert("Producto guardado correctamente");
            }

            setDatosForm(estadoInicialForm);
            setImagenFile(null);
            setProductoAEditar(null);
            traerProductos();

        } catch (error) {
            console.error("Error al procesar el producto:", error);
            alert("Ocurrió un error inesperado");
        }
    };

    const handleDelete = async (idFirebase) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            await deleteDoc(doc(db, "productos", idFirebase));
            traerProductos();
        }
    };

    const handleEdit = (producto) => {
        setProductoAEditar(producto);
        setDatosForm({
            id: producto.id,
            nombre: producto.nombre,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            destacado: producto.destacado,
            precio: producto.precio,
            stock: producto.stock
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            {}
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
                productoAEditar={productoAEditar}
            />

            {}
            <GestionProductos 
                productos={productos}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default FormularioContainer;