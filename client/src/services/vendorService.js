// src/services/vendorService.js

// Usando la misma convención de host que authService
export const API_URL = 'http://localhost:8080/api/vendedores';

export const getRecomendados = async () => {
    try {
        const response = await fetch(`${API_URL}/recomendados`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("No se pudieron cargar los vendedores recomendados");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const buscarVendedores = async (nombre) => {
    try {
        const response = await fetch(`${API_URL}/buscar?nombre=${encodeURIComponent(nombre)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("No se pudo realizar la búsqueda");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
