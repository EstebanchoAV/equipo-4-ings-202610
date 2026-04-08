import axios from 'axios';

// CAMBIAR POR EL IP LOCAL
const SERVER_URL = 'http://10.37.63.66:8080';

const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkServerHealth = async () => {
    try {
        const response = await api.get('/api/saludo');
        return response.data;
    } catch (error) {
        console.error('Error al conectar con el servidor:', error.message);
        throw error;
    }
};

export default api;
