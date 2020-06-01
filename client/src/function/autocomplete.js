import axios from 'axios'

export const getAutocomplete = term => {
    const city = axios.get(`/api/autocomplete/${term}`)       
        return city
}
