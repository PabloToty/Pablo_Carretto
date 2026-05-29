import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Layout } from "./componentes/Layout/Layout";
import Inicio from "./pages/Inicio/Inicio";
import FormularioContainer from "./pages/FormularioProducto/FormularioContenedor";
import TarjetaProducto from "./pages/TarjetaProducto/TarjetaProducto";
import Directorio from "./pages/TarjetaContacto/Directorio"; 
import ItemDetalle from './componentes/ItemDetalle/ItemDetalle';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Inicio />} />
                
                <Route path="productos" element={<TarjetaProducto Mensaje="Nuestro Catálogo Completo" />} />
                
                {/* Al entrar a /producto/:id, ItemDetalle captura el id y hace el fetch */}
                <Route path="producto/:id" element={<ItemDetalle />} />

                <Route path="nuevo-producto" element={<FormularioContainer />} />
                
                <Route path="contacto" element={<Directorio />} />
                
                <Route path="carrito" element={<h1>Próximamente: Tu Carrito de Compras</h1>} />
            </Route>
        </Routes>
    );
}

export default App;