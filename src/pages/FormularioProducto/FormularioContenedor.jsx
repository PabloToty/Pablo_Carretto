import { useState } from "react";
import FormularioProducto from "./FormularioProducto";

function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
    });

    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen.");
            return;
        }

        const apiKey = "86f482617cb1c5910cf97007c24a09b3";
        const formData = new FormData();
        formData.append("image", imagenFile);
        try {
            console.log("Subiendo imagen...");

            const respuestaImgbb = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                const productoCompleto = {
                    ...datosForm,
                    precio: Number(datosForm.precio),
                    stock: Number(datosForm.stock),  
                    urlImagen: datosImgbb.data.url
                };

                console.log("Producto a guardar:", productoCompleto);
                alert("Producto procesado correctamente (ver consola)");

                setDatosForm({
                    nombre: "",
                    precio: "",
                    stock: "",
                });

                setImagenFile(null);
            } else {
                throw new Error("Error al subir imagen");
            }

        } catch (error) {
            console.error(error);
            alert("Hubo un error");
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarCambioImagen={manejarCambioImagen}
            manejarEnvio={manejarEnvio}
        />
    );
}

export default FormularioContainer;