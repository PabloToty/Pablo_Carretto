import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Layout } from "./componentes/Layout/Layout";
import FormularioContainer from "./pages/FormularioProducto/FormularioContenedor";
import TarjetaProducto from "./pages/TarjetaProducto/TarjetaProducto";
import Directorio from "./pages/TarjetaContacto/Directorio"; 

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<TarjetaProducto />} />
                <Route path="nuevo-producto" element={<FormularioContainer />} />
                
                {}
                <Route path="contacto" element={<Directorio />} />
                
                <Route path="carrito" element={<h1>Próximamente: Tu Carrito de Compras</h1>} />
            </Route>
        </Routes>
    );
}

export default App;