import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes';

// Función auxiliar para obtener el token guardado en localStorage
const getToken = () => localStorage.getItem('token');

// Función auxiliar para construir los encabezados de autorización
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});

// Todas las funciones ahora usarán getAuthHeaders() para enviar el token
const getClientes = () => {
    return axios.get(API_URL, getAuthHeaders());
};

const createCliente = (cliente) => {
    return axios.post(API_URL, cliente, getAuthHeaders());
};

const updateCliente = (id, cliente) => {
    return axios.put(`${API_URL}/${id}`, cliente, getAuthHeaders());
};

const deleteCliente = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export { getClientes, createCliente, updateCliente, deleteCliente };