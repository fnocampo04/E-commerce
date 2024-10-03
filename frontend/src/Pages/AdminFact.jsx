import React, { useState } from 'react';
import './CSS/AdminFact.css'; // Asegúrate de ajustar esta ruta si es necesario
import axios from 'axios';

export const AdminFact = () => {
    const [idClie, setIdClie] = useState('');
    const [facturas, setFacturas] = useState({}); // Estado para almacenar las facturas
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const [error, setError] = useState(''); // Estado para manejar errores

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/verfacturas', {
                idClie
            });

            if (response.data && response.data.facturas) {
                setFacturas(response.data.facturas); // Actualiza las facturas con los datos devueltos por la API
            } else {
                alert(response.message)
                setFacturas({});
                setError('No se encontraron facturas para este cliente.');
            }
        } catch (err) {
            setFacturas({});
            setError('Error al obtener las facturas. Revise que el cliente exista.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-bg">
            <div className="admin-container">
                <h1>Consultar Facturas de Cliente</h1>
                <form onSubmit={handleSubmit} className="admin-fields">
                    <div className="admin-input">
                        <input
                            type="text"
                            placeholder="ID Cliente *"
                            value={idClie}
                            onChange={(e) => setIdClie(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Buscar Facturas</button>
                </form>

                {loading && <p>Cargando...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && !error && Object.keys(facturas).length > 0 && (
                    <div className="admin-factura-list">
                        <h2>Facturas del Cliente</h2>
                        <ul>
                            {Object.keys(facturas).map(idFact => (
                                <li key={idFact}>
                                    <p><strong>ID Factura:</strong> {idFact}</p>
                                    <p><strong>Fecha:</strong> {facturas[idFact].fecha}</p>
                                    <p><strong>Total:</strong> ${facturas[idFact].total}</p>
                                    <p><strong>Subtotal:</strong> ${facturas[idFact].subtotal}</p>
                                    <p><strong>Productos:</strong></p>
                                    <ul>
                                        {facturas[idFact].productos.map((producto, i) => (
                                            <li key={i}>
                                                <p><strong>ID Producto:</strong> {producto.idprod}</p>
                                                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                                                <p><strong>Precio Unitario:</strong> ${producto.precio_unitario}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFact;
