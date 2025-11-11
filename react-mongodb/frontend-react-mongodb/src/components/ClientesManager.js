import { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../services/clienteService';
import './ClientesManager.css'; 

const ClientesManager = () => {
    // --- ESTADOS ---
    // Almacena la lista de clientes que viene del backend
    const [clientes, setClientes] = useState([]);
    // Almacena los datos del formulario (para crear o editar)
    const [clienteActual, setClienteActual] = useState({ nombre: '', correo: '', telefono: '', premium: false });
    // Estado para saber si estamos editando o creando un nuevo cliente
    const [esEditando, setEsEditando] = useState(false);

    // --- EFECTOS ---
    // useEffect con [] se ejecuta solo una vez, cuando el componente se monta
    useEffect(() => {
        cargarClientes();
    }, []);

    // --- FUNCIONES CRUD ---
    const cargarClientes = () => {
        getClientes().then(response => {
            setClientes(response.data);
        }).catch(error => console.error("Error al cargar clientes:", error));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setClienteActual({
            ...clienteActual,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        if (esEditando) {
            updateCliente(clienteActual.id, clienteActual).then(() => {
                cargarClientes(); // Recargar la lista
            });
        } else {
            createCliente(clienteActual).then(() => {
                cargarClientes(); // Recargar la lista
            });
        }
        resetForm();
    };

    const handleEdit = (cliente) => {
        setEsEditando(true);
        setClienteActual(cliente);
    };

    const handleDelete = (id) => {
        deleteCliente(id).then(() => {
            cargarClientes(); // Recargar la lista
        });
    };

    const resetForm = () => {
        setEsEditando(false);
        setClienteActual({ nombre: '', correo: '', telefono: '', premium: false });
    };

    return (
        <div className="manager-container">
            <h2>Formulario de Cliente</h2>
            <form onSubmit={handleSubmit} className="cliente-form">
                <input type="text" name="nombre" placeholder="Nombre" value={clienteActual.nombre} onChange={handleInputChange} required />
                <input type="email" name="correo" placeholder="Correo Electrónico" value={clienteActual.correo} onChange={handleInputChange} required />
                <input type="tel" name="telefono" placeholder="Teléfono" value={clienteActual.telefono} onChange={handleInputChange} />
                <label>
                    <input type="checkbox" name="premium" checked={clienteActual.premium} onChange={handleInputChange} />
                    Premium
                </label>
                <button type="submit">{esEditando ? 'Actualizar' : 'Crear'}</button>
                {esEditando && <button type="button" onClick={resetForm}>Cancelar Edición</button>}
            </form>

            <hr />

            <h2>Lista de Clientes</h2>
            <table className="clientes-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Premium</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.premium ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEdit(cliente)}>Editar</button>
                                <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientesManager;