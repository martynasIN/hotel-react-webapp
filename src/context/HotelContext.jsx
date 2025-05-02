import { createContext, useContext } from 'react';
import * as hotelServices from '../services/HotelServices';
import { useAuth } from './AuthContext';

// Sukuria kontekstą viešbučių valdymui
const HotelContext = createContext();

// Konkursų konteksto teikėjas
export const HotelProvider = ({ children }) => {
    const { token, getResponse } = useAuth();

    // Gauna konkursų sąrašą
    const getHotels = async (queryParams = {}) => {
        const hotels = await getResponse(hotelServices.getHotels(token, queryParams));

        return hotels.map(hotel => ({
            ...hotel,
            id: hotel.id,
        }));
    };

    // Gauna konkursą pagal ID
    const getHotelById = async (id) => {
        const response = await getResponse(hotelServices.getHotelById(id, token));
        const hotel = response.contest || null;

        return hotel ? { ...hotel, id: hotel.id } : null;
    };




    return (
        <HotelContext.Provider
            value={{
                getHotels,
                getHotelById
            }}
        >
            {children}
        </HotelContext.Provider>
    );
};

// Hook'as konkursų konteksto naudojimui
export const useHotels = () => {
    const context = useContext(HotelContext);

    if (!context) {
        throw new Error('useHotels turi būti naudojamas su HotelProvider');
    }

    return context;
};