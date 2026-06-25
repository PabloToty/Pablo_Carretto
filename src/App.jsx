import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Layout } from "./componentes/Layout/Layout";
import Inicio from "./pages/Inicio/Inicio";
import TarjetaProducto from "./pages/TarjetaProducto/TarjetaProducto";
import ItemDetalle from "./componentes/ItemDetalle/ItemDetalle";
import Cart from "./pages/Carrito/Cart";
import Directorio from "./pages/TarjetaContacto/Directorio";
import FormularioContainer from "./pages/FormularioProducto/FormularioContenedor";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                {}
                <Route index element={<Inicio />} />

                {}
                <Route
                    path="productos"
                    element={<TarjetaProducto Mensaje="Nuestro Catálogo Completo" />}
                />

                <Route path="producto/:id" element={<ItemDetalle />} />

                {}
                <Route path="carrito" element={<Cart />} />

                {}
                <Route path="contacto" element={<Directorio />} />

                {}
                <Route path="gestion">
                    <Route
                        index
                        element={<FormularioContainer />}
                    />
                </Route>

            </Route>
        </Routes>
    );
}

export default App;