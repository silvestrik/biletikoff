import axios from 'axios'

export const getHotelAutocomplete = term => {
    const city = axios.get(`/api/hotelAutocomplete/${term}`)       
        return city
}
