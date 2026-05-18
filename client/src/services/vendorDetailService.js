const API_URL = 'http://localhost:8080/api/vendedores';
const CATALOGO_API_URL = 'http://localhost:8080/api/catalogos';

export const getVendorDetail = async (idVendedor) => {
    try {
        const response = await fetch(`${API_URL}/${idVendedor}/detalle`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("No se pudo cargar el detalle del vendedor");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCatalogoPorVendedor = async (idVendedor) => {
    try {
        const response = await fetch(`${CATALOGO_API_URL}/vendedor/${idVendedor}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error("No se encontró catálogo para este vendedor");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
