import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Layout } from "./componentes/Layout/Layout";
import Inicio from "./pages/Inicio/Inicio";
import FormularioContainer from "./pages/FormularioProducto/FormularioContenedor";
import TarjetaProducto from "./pages/TarjetaProducto/TarjetaProducto";
import Directorio from "./pages/TarjetaContacto/Directorio";
import ItemDetalle from "./componentes/ItemDetalle/ItemDetalle";
import Cart from "./pages/Carrito/Cart";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Inicio />} />

                <Route
                    path="productos"
                    element={<TarjetaProducto Mensaje="Nuestro Catálogo Completo" />}
                />

                <Route path="producto/:id" element={<ItemDetalle />} />
                <Route
                    path="nuevo-producto"
                    element={<FormularioContainer />}
                />

                <Route path="contacto" element={<Directorio />} />
                <Route path="carrito" element={<Cart />} />
            </Route>
        </Routes>
    );
}

export default App;