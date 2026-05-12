import { Outlet } from "react-router-dom"; // Importación necesaria
import Header from './Header/Header';
import Footer from './Footer/Footer';

export function Layout() { 
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {}
            </main>
            <Footer />
        </div>
    );
}