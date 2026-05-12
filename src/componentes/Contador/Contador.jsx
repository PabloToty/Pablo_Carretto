import { useState } from 'react';

export function Contador({ inicial = 0, onChange }) {
    const [cantidad, setCantidad] = useState(inicial);

    const incrementar = () => {
        setCantidad((prev) => {
            const nuevo = prev + 1;
            onChange && onChange(nuevo);
            return nuevo;
        });
    };

    const decrementar = () => {
        setCantidad((prev) => {
            const nuevo = prev > 1 ? prev - 1 : 1;
            onChange && onChange(nuevo);
            return nuevo;
        });
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <button onClick={decrementar}>-</button>
            <span style={{ margin: "0 10px" }}>{cantidad}</span>
            <button onClick={incrementar}>+</button>
        </div>
    );
}