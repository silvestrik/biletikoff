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
        SEARCH_ID_RECEIVED     
    } from '../type'

import store from  '../store' 
import { getAutocomplete } from '../../function/autocomplete'
import { createTickets } from '../../function/createTickets'
import { createFilters } from '../../function/createFilters'
import { sortByPrice, setCheapestTicket, setFastestTicket } from '../../function/sortByPriceCheapFast'

//GeoIP city
export const geoIp = () => (dispatch) => {
     //get IP
    axios.get("http://ip-api.com/json")
    .then(response => {        
        let ip = response.data.query || '161.185.160.93'       
            axios.get(`/aviasales/geoip/${ip}`)
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
    let formData = localStorage.getItem('formData')
    let formDataObj = JSON.parse(formData) 
    const originIata = formDataObj.origin.code
    const origin = formDataObj.origin.name
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
    if(formDataObj.destination ) {
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

    axios.post('/aviasales/getInitialData', {origin, destination, toDate, combackDate, tripClass, adults, child, baby})
        .then(response => {
            dispatch({ type: ERROR_MESSAGE_SEARCH_FORM, payload: '' })
            const currency_rates = response.data.currency_rates
            dispatch({
                type: FETCH_CURRENCIES,
                payload: currency_rates
            })    
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
                        axios.post( '/aviasales/getResult', {search_id})                        
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

    console.log('slider filtered before', filtered)

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
    console.log('slider filtered after', filtered)
}

export const getBuyLink = (link, search_id) => dispatch =>{        
    if(search_id !=='') {
        const result = axios.post('/aviasales/getBuyLink', {search_id, link})            
            return result
    } else {
        console.log('search_id is empty')
    }
}

// TODO
// 10. Сбросить все фильтры (сверху блока фильтров, появляется если выбран хоть один фильтр)
// 12. Скелетоны билетов
// 13. Схлопывать форму при прокрутке или прокручить вверх
// заменить "показать далее" на автоподгрузку
// поправить кнопку "наверх"
// по мере возможности
// слайдер цены
// слайдер обратно работает некорректно
// слайдер время вылета: сделать как в продолжительности и задержке

