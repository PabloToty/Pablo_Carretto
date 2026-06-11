import React, { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        
        if (itemInCart) {
            const nuevaCantidad = itemInCart.quantity + quantity;
            if (nuevaCantidad > product.stock) {
                alert(`No puedes agregar más de ${product.stock} unidades de este producto.`);
                return;
            }

            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: nuevaCantidad }
                    : item
            );
            setCart(updatedCart);
        } else {
            if (quantity > product.stock) {
                alert(`No puedes agregar más de ${product.stock} unidades de este producto.`);
                return;
            }
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        const item = cart.find(i => i.id === productId);
        if (!item) return;

        if (newQuantity < 1) return;
        
        if (newQuantity > item.stock) {
            alert(`Lo sentimos, solo hay ${item.stock} unidades disponibles.`);
            return;
        }
        
        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
    };

    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    const getCantidadActual = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart, 
            addToCart, 
            updateQuantity,
            removeItem,
            isInCart,
            getCantidadActual,
            clearCart,
            getCartQuantity, 
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};