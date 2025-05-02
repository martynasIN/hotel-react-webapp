const API_URL = 'http://localhost:8000/api/v1';

const getAuthHeaders = (token) => ({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
});

const fetchRequest = async (url, options = {}, token) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: { ...getAuthHeaders(token), ...options.headers },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Klaida iš API:', errorData);
            throw new Error(errorData.message || 'Nenurodyta klaida');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Gauna viešbučių sąrašą +
export const getHotels = async (token, queryParams = {}) => {
    const { id, fields, filter } = queryParams;
    const searchParams = new URLSearchParams();

    if (id) searchParams.append('id', id);
    if (fields) searchParams.append('fields', fields);
    if (filter) searchParams.append('filter', filter);

    const url = `/hotels${searchParams.toString() ? `?${searchParams}` : ''}`;

    const res = await fetchRequest(url, { method: 'GET' }, token);

    return res.data.hotels; // <- svarbiausia ši eilutė
};

// Gauna konkursą pagal ID ???
export const getHotelById = async (id, token) => {
    return fetchRequest(`/hotels/${id}`, { method: 'GET' }, token);
};

// Sukuria naują konkursą +
export const createHotel = async (hotelData, token) => {
    return fetchRequest('/hotels', { method: 'POST', body: JSON.stringify(hotelData) }, token);
};

// Atnaujina konkursą +
export const updateHotel = async (id, hotelData, token) => {
    return fetchRequest(`/hotels/${id}`, { method: 'POST', body: JSON.stringify(hotelData) }, token);
};

// Ištrina konkursą +
export const deleteHotel= async (id, token) => {
    const response = await fetchRequest(`/hotels/${id}`, { method: 'DELETE' }, token);
    return response.hotel || null;
};