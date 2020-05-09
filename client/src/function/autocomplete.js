import axios from 'axios'

export const getAutocomplete = term => {
    const city = axios.get(`/aviasales/autocomplete/${term}`)       
        return city
}
