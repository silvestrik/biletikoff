// пользовательская сортировка
export const sortHotels = (data, sortType) => {
    switch (sortType) {
        case 'price': // ACS            
            return data.sort((a, b) => Number(a.minPriceTotal) - Number(b.minPriceTotal))            
        case 'rating': //DESC            
            return data.sort((a, b) => Number(b.rating) - Number(a.rating))
        case 'name': // ACS        
            return data.sort((a, b) => String(a.name) - String(b.name))       
        case 'distance': // ACS           
            return data.sort((a, b) => Number(a.distance) - Number(b.distance))  
        case 'stars': //DESC            
            return data.sort((a, b) => Number(b.stars) - Number(a.stars)) 
        case 'popularity': //DESC            
            return data.sort((a, b) => Number(b.popularity) - Number(a.popularity)) 
        default:
            return '';
    }
}
