export const createHotelFilters = data => {   

    // stars
    const arr1 = []
    data.forEach(element => {
        arr1.push(element.stars)
    })
    const arrayStarsTmp = new Set(arr1)
    const arrayStars = [...arrayStarsTmp].sort()

    const stars = []
    arrayStars.forEach(item => {
        item = {
            value: item,
            status: true
        }
        stars.push(item)
    })

    // amenities
    const arr2 = []
    data.forEach(element => {
        element.amenities.forEach(value => {
            arr2.push(value)
        })
    })
    const arrayAmenitiesTmp = new Set(arr2)
    const arrayAmenities = [...arrayAmenitiesTmp].sort()

    const amenities = []
    arrayAmenities.forEach(item => {
        item = {
            value: item,
            status: true
        }
        amenities.push(item)
    })

    
    //min price total
    const arr3 = []
    data.forEach(element => {
        arr3.push(element.maxPrice)
    })
    const arrayMaxPriceTmp = new Set(arr3)
    const arrayMaxPrice = [...arrayMaxPriceTmp].sort((a, b) => a - b)
    //console.log('arrayMaxPrice', arrayMaxPrice)
    const arrayMaxPriceMin = arrayMaxPrice[0]
    const arrayMaxPriceMax = arrayMaxPrice[arrayMaxPrice.length-1]    
    const arrayMinMaxTotalPrice = [arrayMaxPriceMin, arrayMaxPriceMax]    
    
    //distance
    const arr4 = []
    data.forEach(element => {
        arr4.push(element.distance)
    })
    const arrayDistanseTmp = new Set(arr4)
    const arrayDistanse = [...arrayDistanseTmp].sort((a, b) => a - b)

    const arrayDistanseMin = arrayDistanse[0]
    const arrayDistanseMax = arrayDistanse[arrayDistanse.length-1]    
    const arrayDistanseMinMax = [arrayDistanseMin, arrayDistanseMax]


    //rating
    const arr5 = []
    data.forEach(element => {
        arr5.push(element.rating)
    })
    const arrayRatingTmp = new Set(arr5)
    const arrayRating = [...arrayRatingTmp].sort((a, b) => a - b)

    const arrayRatingMin = arrayRating[0]/10
    const arrayRatingMax = arrayRating[arrayRating.length-1]/10 
    const arrayRatingMinMax = [arrayRatingMin, arrayRatingMax]


    //agencies    
    const arr6 = []
    data.forEach(element => {
        // все агенства по отелю
        element.rooms.forEach(value => {
            arr6.push(value.agencyName)
        })
        // агентство с самой низкой ценой
        //arr6.push(element.rooms[0].agencyName)
    })
    const arrayAgencyTmp = new Set(arr6)
    const arrayAgency = [...arrayAgencyTmp].sort()

    const agencies = []
    arrayAgency.forEach(item => {
        item = {
            value: item,
            status: true
        }
        agencies.push(item)
    })

    // выгрузка в store
    const filterData = {         
        stars,
        amenities, 
        arrayMinMaxTotalPrice,
        arrayDistanseMinMax,
        arrayRatingMinMax,
        agencies 
    }

    //console.log(filterData)
    return filterData
}

