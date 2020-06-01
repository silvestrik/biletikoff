import axios from 'axios'
import { 
        FETCH_CURRENCIES,
        PLACE_CHANGE, 
        UPDATE_ORIGIN_DATA, 
        UPDATE_DESTINATION_DATA, 
        CHANGE_DATE, 
        CHANGE_COMBACK_DATE, 
        UPDATE_DATE,
        UPDATE_COMBACK_DATE,
        CHANGE_PASS_DATA,
        UPDATE_PASS_DATA,
        UPDATE_GEOIP,
        SET_SEARCH_ID,
        SET_TICKETS,
        SET_FILTER_DATA,
        LOADING_DATA,
        CHANGE_FILTERS,
        SET_FILTERED,       
        SET_CHEAPETS_TICKET,
        SET_FASTEST_TICKET,
        UPDATE_FILTERED_LENGTH,
        SEARCH_STATUS,
        FILTERED_ARRAY_LENGTH_STATUS,
        RESULT_IS_EMPTY,
        ERROR_MESSAGE_SEARCH_FORM,
        SEARCH_ID_RECEIVED,     
        FORM_VISIBLE,
        INFOBOARD_VISIBLE, 
        SET_ADULTS_DATA,
        SET_CHILDREN_DATA,
        SET_CHECKIN_DATE,
        SET_CHECKOUT_DATE,
        SET_PLACE_OR_HOTEL,
        LOADING_HOTEL_DATA,
        HOTEL_SEARCH_ID_RECEIVED,
        HOTEL_FORM_VISIBLE,
        HOTEL_INFOBOARD_VISIBLE,
        SET_HOTEL_SEARCH_ID,
        SET_HOTEL_DATA,
        HOTEL_RESULTS_IS_EMPTY,
        ERROR_MESSAGE_HOTEL_SEARCH_FORM,
        SET_HOTELS_LENGTH,
        SET_HOTEL_FILTER_DATA,
        SET_HOTEL_FILTERED_DATA,
        UPDATE_HOTEL_FILTERED_LENGTH,
        LENGTH_OF_STAY,
        SEARCH_HOTEL_STATUS
    } from '../type'

import store from  '../store' 
import { getAutocomplete } from '../../function/autocomplete'
import { createTickets } from '../../function/createTickets'
import { createFilters } from '../../function/createFilters'
import { sortByPrice, setCheapestTicket, setFastestTicket } from '../../function/sortByPriceCheapFast'
import { createHotelFilters } from '../../function/createHotelFilters'
import { sortHotels } from '../../function/sortHotels'

//получаем курсы валют
export const getCurrencyRate = () => dispatch => {
    axios.get('/api/currencies')
        .then(response => {
            dispatch({
                type: FETCH_CURRENCIES,
                payload: response.data
            }) 
        })
        .catch(err => {
            console.log('Error fetching currence rate')
        })
}


//GeoIP city
export const geoIp = () => (dispatch) => {
     //get IP
    axios.get("http://ip-api.com/json")
    .then(response => {        
        let ip = response.data.query || '161.185.160.93'       
            axios.get(`/api/geoip/${ip}`)
                .then( response => {
                    dispatch({
                        type: UPDATE_GEOIP,
                        payload: response.data
                    })
                     const iataCode = response.data.iata    
                     //загрузка полных данных по городу от Aviasales               
                     getAutocomplete(response.data.name)
                        .then( response => { 
                            // выбираем нужный город по name и iata                            
                            const filterData = response.data.filter(item => item.code === iataCode)       
                            //console.log(filterData[0])                     
                            dispatch({ type: PLACE_CHANGE })
                            dispatch({
                                type: UPDATE_ORIGIN_DATA,
                                payload: filterData[0]
                            })                
                        })
                        .catch(error=> {
                            console.error(error)
                        })                             
                })
                .catch(err => {
                    console.log(err)
                }) 
    }).catch((err) => {
       console.log(err)
    })
}

// обновляем данные формы если что то есть в localStorage
export const setStorageDataToForm  = () => dispatch => {   
    if(localStorage.getItem('formData')){
        let formData = localStorage.getItem('formData')
        var formDataObj = JSON.parse(formData) 
        var originIata = formDataObj.origin.code ? formDataObj.origin.code : 'MOW'
        var origin = formDataObj.origin.name ? formDataObj.origin.name : 'Moscow'
    }
    getAutocomplete(origin)
        .then( response => { 
            // выбираем нужный город по name и iata                            
            const filterData = response.data.filter(item => item.code === originIata )       
            //console.log(filterData[0])                     
            dispatch({ type: PLACE_CHANGE })
            dispatch({
                type: UPDATE_ORIGIN_DATA,
                payload: filterData[0]
            })
        })
        .catch(error=> {
            console.error(error)
        })
    if(localStorage.getItem('formData') && formDataObj.destination ) {
        var destination = formDataObj.destination.name
        var destinationIata = formDataObj.destination.code 
    }  
    getAutocomplete(destination)
        .then( response => { 
            // выбираем нужный город по name и iata                            
            const filterData = response.data.filter(item => item.code === destinationIata )
            //console.log(filterData[0])                     
            dispatch({ type: PLACE_CHANGE })
            dispatch({
                type: UPDATE_DESTINATION_DATA,
                payload: filterData[0]
            })                
        })
        .catch(error=> {
            console.error(error)
        })
}  

export const autocompleteOrigin = (data) => dispatch => {   
    dispatch({ type: PLACE_CHANGE })
    dispatch({
        type: UPDATE_ORIGIN_DATA,
        payload: data
    })
}

export const autocompleteDestination = (data) => dispatch => {       
    dispatch({ type: PLACE_CHANGE })
    dispatch({
        type: UPDATE_DESTINATION_DATA,
        payload: data
    })
}

export const setDate = (data) => dispatch => {
    dispatch({ type: CHANGE_DATE })
    dispatch({
        type: UPDATE_DATE,
        payload: data
    })
}

export const setCombackDate = (data) => dispatch => {
    dispatch({ type: CHANGE_COMBACK_DATE })
    dispatch({
        type: UPDATE_COMBACK_DATE,
        payload: data
    })
}

export const setPassData = (fieldName, fieldValue) => dispatch => {
    dispatch({ type: CHANGE_PASS_DATA})
    //console.log(fieldName, fieldValue)
    dispatch({
         type: UPDATE_PASS_DATA,
         payload: { fieldName, fieldValue }         
    })
}

export const preSimpleSearch = () => dispatch => {
    // TODO переделать !!!!!!
    const tmpData = store.getState().data
    const simpleFormParams = tmpData.simpleFormParams   
    const origin = simpleFormParams.segments.origin.code  
    const toDate = simpleFormParams.segments.date   
    const combackDate = simpleFormParams.segments.combackDate 
    if(simpleFormParams.segments.destination) {
        var destination = simpleFormParams.segments.destination.code
    } else {
         // eslint-disable-next-line
        var destination = ''
    }     
    const {tripClass, adults, child, baby } = tmpData.passData 

    dispatch({ type: LOADING_DATA, loading: true })
    dispatch({ type: SEARCH_STATUS, payload: false })
    dispatch({ type: RESULT_IS_EMPTY, payload: false })
    dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })

    //localStorage.setItem('lastFrmData', JSON.stringify(origin, destination, toDate, combackDate, tripClass, adults, child, baby))

    axios.post('/api/getInitialData', {origin, destination, toDate, combackDate, tripClass, adults, child, baby})
        .then(response => {
            dispatch({ type: ERROR_MESSAGE_SEARCH_FORM, payload: '' })
            // const currency_rates = response.data.currency_rates
            // dispatch({
            //     type: FETCH_CURRENCIES,
            //     payload: currency_rates
            // })    
            dispatch({
                type: SEARCH_STATUS,
                payload: true
            })        
            const search_id = response.data.search_id
            dispatch({
               type: SET_SEARCH_ID,
               payload: search_id
            })
            if(search_id) {
                                
                const current_time = new Date()                    
                dispatch({ type: SEARCH_ID_RECEIVED, payload: current_time })
                
                //показываем табло с данными о рейсе
                dispatch({ type: FORM_VISIBLE, payload: false })
                //скрываем форму
                dispatch({ type: INFOBOARD_VISIBLE, payload: true })
                
                // запускаем таймер обратного отсчета времени и стираем searchId           
                setTimeout(() => {
                    dispatch({
                        type: SET_SEARCH_ID,
                        payload: ''
                     })                    
                }, 600000)

                var step=0                
                const _results = []                
                const getAsyncResult = (search_id) => {                                       
                    step++
                    if(step<7) {
                        axios.post( '/api/getResult', {search_id})                        
                        .then(response => {                             
                            const proposals = response.data

                            proposals.forEach(val => {
                                if( !val.proposals && val.search_id) {            
                                    step = 10; 
                                    dispatch({ type: SEARCH_STATUS, payload: false }) 
                                    console.log('fin')       
                                } 
                            })

                            proposals.forEach((item, index) => {
                                if( item.proposals && item.proposals.length > 0){ 

                                    _results.push(item) 
                                    const tickets = createTickets(_results)

                                    if(tickets && tickets.length>0) {
                                        //сортировка по стоимости                               
                                        sortByPrice(tickets)
                                        var ticketsLength = tickets.length
                                        dispatch({
                                            type: UPDATE_FILTERED_LENGTH,
                                            payload: ticketsLength
                                        })
                                        // cheapest ticket
                                        const cheapest = setCheapestTicket(tickets)
                                        dispatch({
                                            type: SET_CHEAPETS_TICKET,
                                            payload: cheapest
                                        })
                                        // fastest ticket
                                        const fastest = setFastestTicket(tickets)
                                        dispatch({
                                            type: SET_FASTEST_TICKET,
                                            payload: fastest
                                        })

                                        // массив фильтров
                                        var filters = createFilters(tickets)                                            
                                        dispatch({ type: SET_FILTER_DATA, payload: filters }) 
                                        
                                        var filtered = tickets
                                        // массив билетов и длина массива
                                        dispatch({
                                            type: SET_TICKETS,
                                            tickets, 
                                            filtered,                                   
                                            ticketsLength
                                        })
                                    }                                                                           
                                }                                                          
                            })                            
                            setTimeout(() => {
                                getAsyncResult(search_id)
                            }, 2000)      
                        })                       
                        .catch(err => {
                            console.log(err)
                        })               
                    } else {          
                        console.log('Search is finished')                       
                        dispatch({ type: LOADING_DATA, loading: false })
                        dispatch({ type: SEARCH_STATUS, payload: false })

                        const ticketsLength = store.getState().data.ticketsLength
                        if(ticketsLength===0) {
                            dispatch({ type: RESULT_IS_EMPTY, payload: true }) 
                        }
                    }
                } 
                getAsyncResult(search_id)
            }             
        })
        .catch(err => {
            //console.log('Ошибка: ', err.response.data.message)
            dispatch({ type: LOADING_DATA, loading: false })
            dispatch({ type: ERROR_MESSAGE_SEARCH_FORM, payload: err.response.data.message })
        })  
}

export const changeFilters = (name, onlyChecked) => dispatch => {     

    dispatch({ type: CHANGE_FILTERS })    
    const tickets = store.getState().data.tickets    
    var filtered = Object.assign([], tickets)   
    var searchStatus = store.getState().data.searchStatus 

    // filters 
    var stops = store.getState().data.filters.stops
    var airlines = store.getState().data.filters.airlines
    var payTypes = store.getState().data.filters.payTypes 
    var baggage = store.getState().data.filters.baggage 
    var handbags = store.getState().data.filters.handbags 
    

    // применение фильтра по пересадкам
    if(name.includes("stops") === true) {
        
        let stopItem = parseInt (name.replace('stops_', ''), 10)  
        
        if(onlyChecked === 'all') {
            stops.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            stops.forEach(item => {
                if(item.value === stopItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true){
            stops.forEach(item => {
                if(item.value === stopItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== stopItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        } 
        
        for(var s=filtered.length-1; s>=0; s--){   
            var remove = true     
            for(var i=0; i<stops.length; i++) {                     
                if(stops[i].value === filtered[s].stops && stops[i].status===true) {
                    remove = false
                    break                    
                }             
            }
            if ( remove ) {
                filtered.splice(s , 1)
            }
        } 
        
        dispatch({ type: SET_FILTERED, payload: filtered })       
        dispatch({ type: UPDATE_FILTERED_LENGTH, payload: filtered.length }) 
       
        const cheapest = setCheapestTicket(filtered)
        dispatch({ type: SET_CHEAPETS_TICKET, payload: cheapest })        
        const fastest = setFastestTicket(filtered)        
        dispatch({ type: SET_FASTEST_TICKET, payload: fastest })    

        // для сообщения "нет вариантов"
        if(filtered.length===0 && searchStatus===false) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: true })
        } else if(filtered.length !== 0) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })
        }           

    // применение фильтра по авиакомпаниям
    } else if(name.includes("airlines") === true) {
        let airlineItem = name.replace('airlines_', '')        

        if(onlyChecked === 'all') {
            airlines.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            airlines.forEach(item => {
                if(item.value === airlineItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true){
            airlines.forEach(item => {
                if(item.value === airlineItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== airlineItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        }   
      
        for(var s1=filtered.length-1; s1>=0; s1--){   
            var remove1 = true    
            for(var i1=0; i1<airlines.length; i1++) {
                if(airlines[i1].value === filtered[s1].main_airline && airlines[i1].status === true) {                    
                    remove1 = false
                    break                  
                }
            }
            if ( remove1 ) {
                filtered.splice(s1 , 1)
                
            }
        }

        dispatch({ type: SET_FILTERED, payload: filtered })       
        dispatch({ type: UPDATE_FILTERED_LENGTH, payload: filtered.length  }) 
       
        const cheapest = setCheapestTicket(filtered)
        dispatch({ type: SET_CHEAPETS_TICKET, payload: cheapest })        
        const fastest = setFastestTicket(filtered)        
        dispatch({ type: SET_FASTEST_TICKET, payload: fastest })    

        // для сообщения "нет вариантов"
        if(filtered.length===0 && searchStatus===false) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: true })
        } else if(filtered.length !== 0) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })
        }         
    // применение фильтра по способам оплаты    
    } else if(name.includes("paymentMethods") === true) {
        let payItem = name.replace('paymentMethods_', '')

        if(onlyChecked === 'all') {
            payTypes.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            payTypes.forEach(item => {
                if(item.value === payItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true) {
            payTypes.forEach(item => {
                if(item.value === payItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== payItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        } 

        for(var s2=filtered.length-1; s2>=0; s2--){  
            for(var j in filtered[s2].payment_methods) { 
                var remove2 = true    
                for(var i9=0; i9<payTypes.length; i9++) {
                    if(filtered[s2].payment_methods[j].includes(payTypes[i9].value)===true && payTypes[i9].status === true) {                    
                        remove2 = false
                        break
                    }
                }
            }
            if ( remove2 ) {
                filtered.splice(s2 , 1)                    
            }            
        } 
        
        dispatch({ type: SET_FILTERED, payload: filtered })       
        dispatch({ type: UPDATE_FILTERED_LENGTH, payload: filtered.length  }) 
       
        const cheapest = setCheapestTicket(filtered)
        dispatch({ type: SET_CHEAPETS_TICKET, payload: cheapest })        
        const fastest = setFastestTicket(filtered)        
        dispatch({ type: SET_FASTEST_TICKET, payload: fastest })    

        // для сообщения "нет вариантов"
        if(filtered.length===0 && searchStatus===false) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: true })
        } else if(filtered.length !== 0) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })
        }

    } else if(name.includes("arrayBaggage") === true) {
        
        let baggageItem = name.replace('arrayBaggage_', '')     
        
        if(onlyChecked === 'all') {
            baggage.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            baggage.forEach(item => {
                if(item.value === baggageItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true) {
            baggage.forEach(item => {
                if(item.value === baggageItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== baggageItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        }

        for(var s3=filtered.length-1; s3>=0; s3--){  
            for(var j1 in filtered[s3].flights_baggage) { 
                var remove3= true    
                for(var i2=0; i2<baggage.length; i2++) {
                    if(filtered[s3].flights_baggage[j1].includes(baggage[i2].value)===true && baggage[i2].status === true) {                    
                        remove3 = false
                        break
                    }
                }
            }
            if ( remove3 ) {
                filtered.splice(s3, 1)                    
            }            
        }

        dispatch({ type: SET_FILTERED, payload: filtered })       
        dispatch({ type: UPDATE_FILTERED_LENGTH, payload: filtered.length  }) 
       
        const cheapest = setCheapestTicket(filtered)
        dispatch({ type: SET_CHEAPETS_TICKET, payload: cheapest })        
        const fastest = setFastestTicket(filtered)        
        dispatch({ type: SET_FASTEST_TICKET, payload: fastest })    

        // для сообщения "нет вариантов"
        if(filtered.length===0 && searchStatus===false) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: true })
        } else if(filtered.length !== 0) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })
        } 

    } else if(name.includes("arrayHandbags") === true) {
        let handbagsItem = name.replace('arrayHandbags_', '')  

        if(onlyChecked === 'all') {
            handbags.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            handbags.forEach(item => {
                if(item.value === handbagsItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true) {
            handbags.forEach(item => {
                if(item.value === handbagsItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== handbagsItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        }

        for(var s4=filtered.length-1; s4>=0; s4--){  
            for(var j2 in filtered[s4].flights_handbags) { 
                var remove4 = true    
                for(var i3=0; i3<handbags.length; i3++) {
                    if(filtered[s4].flights_handbags[j2].includes(handbags[i3].value)===true && handbags[i3].status === true) {                    
                        remove4 = false
                        break
                    }
                }
            }
            if ( remove4 ) {
                filtered.splice(s4, 1)                    
            }            
        } 

        // console.log('handbags', handbags)     

        dispatch({ type: SET_FILTERED, payload: filtered })       
        dispatch({ type: UPDATE_FILTERED_LENGTH, payload: filtered.length  }) 
       
        const cheapest = setCheapestTicket(filtered)
        dispatch({ type: SET_CHEAPETS_TICKET, payload: cheapest })        
        const fastest = setFastestTicket(filtered)        
        dispatch({ type: SET_FASTEST_TICKET, payload: fastest })    

        // для сообщения "нет вариантов"
        if(filtered.length===0 && searchStatus===false) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: true })
        } else if(filtered.length !== 0) {
            dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })
        }

        //console.log('tickets', tickets)
        //console.log('filtered', filtered)
    }
}

// время вылета туда или обратно
export const filterChangeArrDepTime = (type, fromTime, toTime) => dispatch => {

    dispatch({ type: CHANGE_FILTERS })    
    const tickets = store.getState().data.tickets 
    var filtered = Object.assign([], tickets)

    console.log('slider filtered before', type, fromTime, toTime)

    if(type==="sliderOneValues" && filtered.length>0) {        
        for(var i=filtered.length-1; i>=0; i--) {
            if ((filtered[i].ts_departure < fromTime) || (filtered[i].ts_arrival > toTime)) {
                filtered.splice(i, 1)              
            }           
        }
    } else if(type==="sliderTwoValues" && filtered.length>0) {
        for(var i3=filtered.length-1; i3>=0; i3--) {     
            if ((filtered[i3].ts_departure_comback < fromTime) || (filtered[i3].ts_arrival_comback > toTime)) {                
                filtered.splice(i3, 1)
            }           
        }        
    } else if(type==="sliderThreeValues" && filtered.length>0) {

        for(var i4=filtered.length-1; i4>=0; i4--) {            
            if ((filtered[i4].delay < fromTime) || (filtered[i4].delay > toTime)) {                
                filtered.splice(i4, 1)
            }           
        }
    } else if(type==="sliderFourValues" && filtered.length>0) {
        for(var i5=filtered.length-1; i5>=0; i5--) {     
            if ((filtered[i5].delayComback < fromTime) || (filtered[i5].delayComback > toTime)) {
                filtered.splice(i5, 1)
            }           
        }
    } else if(type==="sliderFiveValues" && filtered.length>0) {
        for(var i6=filtered.length-1; i6>=0; i6--) { 
            
            if ((filtered[i6].duration < fromTime) || (filtered[i6].duration > toTime)) {                
                filtered.splice(i6, 1)            }           
        }

    } else if(type==="sliderSixValues" && filtered.length>0) {
        for(var i7=filtered.length-1; i7>=0; i7--) {     
            if ((filtered[i7].durationComback < fromTime) || (filtered[i7].durationComback > toTime)) {
                filtered.splice(i7, 1)
            }           
        }
    }
    
    dispatch({ type: SET_FILTERED, payload: filtered })                
    dispatch({ type: UPDATE_FILTERED_LENGTH, payload: filtered.length })    

    const cheapest = setCheapestTicket(filtered)
    dispatch({ type: SET_CHEAPETS_TICKET, payload: cheapest })        
    const fastest = setFastestTicket(filtered)        
    dispatch({ type: SET_FASTEST_TICKET, payload: fastest }) 

    if(filtered.length===0) {
        dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: true })
    } else if(filtered.length !== 0) {
        dispatch({ type: FILTERED_ARRAY_LENGTH_STATUS, payload: false })                  
    }    
    //console.log('slider filtered after', filtered)
}

export const getBuyLink = (link, search_id) => dispatch =>{        
    if(search_id !=='') {
        const result = axios.post('/api/getBuyLink', {search_id, link})            
            return result
    } else {
        console.log('search_id is empty')
    }
}

//переключение видимости форма-инфотабло
export const toggleForm = data => dispatch => {
    dispatch({
        type: FORM_VISIBLE,
        payload: data
    })
}

// TODO
// 10. Сбросить все фильтры (сверху блока фильтров, появляется если выбран хоть один фильтр)
// заменить "показать далее" на автоподгрузку
// слайдер цены
//ошибки в консоли???
// !!!! крутилку на фоне кнопки "ВВЕРХ"




/** Hotel actions */

//set adult 
export const setAdultData = data => dispatch => {
    dispatch ({
        type: SET_ADULTS_DATA,
        payload: data
    })
}

//set children
export const setChildrenData = data => dispatch => {
    dispatch({
        type: SET_CHILDREN_DATA,
        payload: data
    })
}

//дата заезда
export const setCheckInDate = (data) => dispatch => {    
    dispatch({
        type: SET_CHECKIN_DATE,
        payload: data
    })
}

//дата выезда
export const setCheckOutDate = (data) => dispatch => {
    dispatch({
        type: SET_CHECKOUT_DATE,
        payload: data
    })
}

export const autocompletePlaceOrHotel = (data) => dispatch => {       
    dispatch({
        type: SET_PLACE_OR_HOTEL,
        payload: data
    })
}

//переключение видимости форма-инфотабло
export const hotelToggleForm = data => dispatch => {
    dispatch({
        type: HOTEL_FORM_VISIBLE,
        payload: data
    })
}

// search_id
export const preHotelSearch = data => dispatch => {
    const tmpData = store.getState().data.hotelParams.formData

    if(tmpData.cityOrHotelData.label) {
        // eslint-disable-next-line
        var id = tmpData.cityOrHotelData.id
        // eslint-disable-next-line
        var objectID = 'hotelId'
    } else if (tmpData.cityOrHotelData.hotelsCount) {
        // eslint-disable-next-line
        var id = tmpData.cityOrHotelData.id
        // eslint-disable-next-line
        var objectID = 'cityId'
    }
    
    const date1 = new Date(tmpData.checkInDate);
    const date2 = new Date(tmpData.checkOutDate)
    const lengthOfStay = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
    dispatch({
        type: LENGTH_OF_STAY,
        payload:lengthOfStay
    })    

dispatch({ type: HOTEL_RESULTS_IS_EMPTY, payload: false }) 

    const checkInDate = tmpData.checkInDate
    const checkOutDate = tmpData.checkOutDate
    const adults = tmpData.adults
    const children = tmpData.children    
    const currency = store.getState().UI.currency
    const language = store.getState().UI.language

    dispatch({ type: LOADING_HOTEL_DATA, payload: true })   
    
    axios.post('/api/getHotelInitialData', {id, checkInDate, checkOutDate, adults, children, currency, language, objectID})
        .then(response => {
            dispatch({ type: ERROR_MESSAGE_HOTEL_SEARCH_FORM, payload: '' })
            const hotelSearchId = response.data.searchId
            //console.log(hotelSearchId)
        if(hotelSearchId) {
                //searchId->store     
                dispatch({ type: SET_HOTEL_SEARCH_ID, payload: hotelSearchId })
                //время получения
                const current_time = new Date()                    
                dispatch({ type: HOTEL_SEARCH_ID_RECEIVED, payload: current_time })                
                //показываем табло с данными о бронировании
                dispatch({ type: HOTEL_FORM_VISIBLE, payload: false })
                //скрываем форму
                dispatch({ type: HOTEL_INFOBOARD_VISIBLE, payload: true })                
                // запускаем таймер обратного отсчета времени и стираем searchId/ напоминаем об обновлении   
                setTimeout(() => {
                    dispatch({
                        type: SET_HOTEL_SEARCH_ID,
                        payload: ''
                        })                    
                }, 600000)
                //обнуляем массивы с отелями, длины
                dispatch({ type: SET_HOTEL_DATA, payload: '' }) 
                dispatch({type: SET_HOTEL_FILTERED_DATA, payload: ''})
                dispatch({ type: SET_HOTELS_LENGTH, payload: 0 })  
                dispatch({ type: UPDATE_HOTEL_FILTERED_LENGTH, payload: 0 })
                dispatch({ type: SEARCH_HOTEL_STATUS, payload: true })

            var hotelStep = 0
            //const hotelResults = [] 
            
            const getAsyncHotelResult = hotelSearchId => { 
                hotelStep ++      
                if(hotelStep < 15) {
                    axios.post('/api/getHotelResult', {hotelSearchId})
                    .then(response => {
                        const hotelProprosals = response.data.result
                        //console.log(hotelProprosals) 
                        // hotelResults.push(hotelProprosals.result)                        
                        if( response.data.status ==='ok') {
                            hotelStep=15 
                            
                            //массив с отелями
                            dispatch({ type: SET_HOTEL_DATA, payload: hotelProprosals })
                            // записывам общее число предложений
                            dispatch({ type: SET_HOTELS_LENGTH, payload: hotelProprosals.length }) 
                            
                            // делаем копию основого массива для дальнейших манипуляций 
                            var hotelFiltered = hotelProprosals
                            //console.log('hotelFiltered', hotelFiltered)

                            // вспомогательная функция, базовая сортировка по цене
                            const hotels = sortHotels(hotelProprosals, 'rating')

                            dispatch({type: SET_HOTEL_FILTERED_DATA, payload: hotels})
                            //обновляем длину отфильтрованного массива
                            dispatch({ type: UPDATE_HOTEL_FILTERED_LENGTH, payload: hotelFiltered.length })                                                       
                            
                            // создаем массив фильтров
                            var hotelFilters = createHotelFilters(hotelProprosals)
                            //console.log(hotelFilters)
                            dispatch({ type: SET_HOTEL_FILTER_DATA, payload: hotelFilters }) 

                            // скрываем загрузку
                            dispatch({ type: LOADING_HOTEL_DATA, payload: false})
                            // статус поиска отелей
                            dispatch({ type: SEARCH_HOTEL_STATUS, payload: false })

                        }                                               
                        // пауза при запросе
                        setTimeout(() => {
                            getAsyncHotelResult(hotelSearchId)
                        }, 5000) 
                    })  
                    .catch(error => {
                        console.log(error)
                    })     
                } else {
                    //console.log('Search Hotel is finished') 
                    dispatch({ type: LOADING_HOTEL_DATA, payload: false})
                    dispatch({ type: SEARCH_HOTEL_STATUS, payload: false })
                    // если предложений по отелям нет
                    const hotelProposalsLength = store.getState().data.hotelParams.hotelData.length
                    if(hotelProposalsLength===0) {
                        dispatch({ type: HOTEL_RESULTS_IS_EMPTY, payload: true }) 
                    }
                }
            }
            getAsyncHotelResult(hotelSearchId)  
        }
        })
        .catch(err => {
            dispatch({type: LOADING_HOTEL_DATA, payload: false})
            dispatch({ type: ERROR_MESSAGE_HOTEL_SEARCH_FORM, payload: err.response.data.message })
        })
}

//change filters

export const changeHotelFilters = (name, onlyChecked) => dispatch => {     
    const hotelData = store.getState().data.hotelParams.hotelData
    const hotelDataFiltered = Object.assign([], hotelData)

    var stars = store.getState().data.hotelParams.hotelFilters.stars
    var amenities = store.getState().data.hotelParams.hotelFilters.amenities
    var agencies = store.getState().data.hotelParams.hotelFilters.agencies   

    if(name.includes('stars') === true) {
        
        let starItem = parseInt(name.replace('stars_', ''), 10)

        if(onlyChecked === 'all') {
            stars.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            stars.forEach(item => {
                if(item.value === starItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true){
            stars.forEach(item => {
                if(item.value === starItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== starItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        }

        for(var s=hotelDataFiltered.length-1; s>=0; s--){   
            var remove = true     
            for(var i=0; i<stars.length; i++) {                     
                if(stars[i].value === hotelDataFiltered[s].stars && stars[i].status===true) {
                    remove = false
                    break                    
                }             
            }
            if ( remove ) {
                hotelDataFiltered.splice(s , 1)
            }
        }

        dispatch({ type: SET_HOTEL_FILTERED_DATA, payload: hotelDataFiltered })       
        dispatch({ type: UPDATE_HOTEL_FILTERED_LENGTH, payload: hotelDataFiltered.length }) 

    } else if (name.includes('amenities') === true) {
        let amenitiesItem = parseInt(name.replace('amenities_', ''), 10)
        

        if(onlyChecked === 'all') {
            amenities.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            amenities.forEach(item => {
                if(item.value === amenitiesItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true){
            amenities.forEach(item => {
                if(item.value === amenitiesItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== amenitiesItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        }        

        for(var s12=hotelDataFiltered.length-1; s12>=0; s12--){             
                var remove3 = true                    
                for(var i9=0; i9<amenities.length; i9++) { 
                    if(hotelDataFiltered[s12].amenities.includes(amenities[i9].value)===true && amenities[i9].status === true) { 
                        remove3 = false
                        break
                    }
                }
           
            if ( remove3 ) {
                hotelDataFiltered.splice(s12 , 1)                    
            }            
        }

        dispatch({ type: SET_HOTEL_FILTERED_DATA, payload: hotelDataFiltered })       
        dispatch({ type: UPDATE_HOTEL_FILTERED_LENGTH, payload: hotelDataFiltered.length })   
    }  else if (name.includes('agencies') === true) { 


        let agenciesItem = name.replace('agencies_', '')
        

        if(onlyChecked === 'all') {
            agencies.forEach(item => {
                item.status = true
            })
        } else if(onlyChecked === false) {
            agencies.forEach(item => {
                if(item.value === agenciesItem) {
                    item.status = !item.status                   
                } 
            })
        } else if(onlyChecked === true){
            agencies.forEach(item => {
                if(item.value === agenciesItem && item.status === false) {
                    item.status = !item.status 
                } else if(item.value !== agenciesItem && item.status === true) {
                    item.status = !item.status 
                }
            })
        }

        for(var s13=hotelDataFiltered.length-1; s13>=0; s13--){  
            for(var j in hotelDataFiltered[s13].rooms) { 
                var remove4 = true    
                for(var i19=0; i19<agencies.length; i19++) {
                    if(hotelDataFiltered[s13].rooms[j].agencyName.includes(agencies[i19].value)===true && agencies[i19].status === true) {                    
                        remove4 = false
                        break
                    }
                }
            }
            if ( remove4 ) {
                hotelDataFiltered.splice(s13 , 1)                    
            }            
        }      

        dispatch({ type: SET_HOTEL_FILTERED_DATA, payload: hotelDataFiltered })       
        dispatch({ type: UPDATE_HOTEL_FILTERED_LENGTH, payload: hotelDataFiltered.length }) 
    }
}

export const filterHotelSlider = (sliderValues1, sliderValues2, code) => dispatch => {
    console.log(sliderValues1, sliderValues2, code)
   
    const hotelData = store.getState().data.hotelParams.hotelData
    const hotelDataFiltered = Object.assign([], hotelData)

    if(code==="sliderPrice" && hotelDataFiltered.length>0) {        
        for(var i=hotelDataFiltered.length-1; i>=0; i--) {
            if ((hotelDataFiltered[i].minPriceTotal < sliderValues1) || (hotelDataFiltered[i].maxPrice > sliderValues2)) {
                hotelDataFiltered.splice(i, 1)              
            }           
        }
    } else if(code==="sliderDistance" && hotelDataFiltered.length>0) {        
        for(var i2=hotelDataFiltered.length-1; i2>=0; i2--) {
            if ((hotelDataFiltered[i2].distance < sliderValues1) || (hotelDataFiltered[i2].distance > sliderValues2)) {
                hotelDataFiltered.splice(i, 1)              
            }           
        }
    } else if(code==="sliderRating" && hotelDataFiltered.length>0) {        
        for(var i3=hotelDataFiltered.length-1; i3>=0; i3--) {
            if ((hotelDataFiltered[i3].rating/10 < sliderValues1) || (hotelDataFiltered[i3].rating/10 > sliderValues2)) {
                hotelDataFiltered.splice(i, 1)              
            }           
        }
    }

    dispatch({ type: SET_HOTEL_FILTERED_DATA, payload: hotelDataFiltered })       
    dispatch({ type: UPDATE_HOTEL_FILTERED_LENGTH, payload: hotelDataFiltered.length })
}

//пользовательская сортировка
export const hotelSort = sortType => dispatch => {
    
    const hotelData = store.getState().data.hotelParams.hotelData
    const hotelDataFiltered = Object.assign([], hotelData)   
    
    const hotelSortedData = sortHotels(hotelDataFiltered, sortType)
    dispatch({ type: SET_HOTEL_FILTERED_DATA, payload: hotelSortedData })     
}
