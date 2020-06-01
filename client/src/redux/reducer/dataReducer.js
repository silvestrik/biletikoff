import {
    FETCH_CURRENCIES, 
    UPDATE_ORIGIN_DATA, 
    UPDATE_DESTINATION_DATA, 
    UPDATE_DATE, 
    UPDATE_COMBACK_DATE,
    UPDATE_PASS_DATA,   
    UPDATE_GEOIP,
    SET_SEARCH_ID,
    SET_TICKETS,
    SET_FILTER_DATA,
    LOADING_DATA,    
    SET_FILTERED,
    SET_CHEAPETS_TICKET,
    SET_FASTEST_TICKET,
    UPDATE_FILTERED_LENGTH,
    RESULT_IS_EMPTY,
    FILTERED_ARRAY_LENGTH_STATUS,
    SEARCH_STATUS,  
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
} from "../type"

const initialState = {
    currencies: {},
    simpleFormParams: {
        segments: []
    },
    multiFormParams: {},
    passData: {
        tripClass: 'Y',
            adults: 1,
            child: 0,
            baby: 0
        },
    geoData: {},   
    ticketsLength: 0,
    filteredLength: 0,    
    tickets: [], // билеты
    filtered: [], //фильрованный массив
    fastest: [],
    cheapets: [],
    filters: {       
        arrayDelays: [],
        arrayDelaysComback: [],
        arrayDurations: [],
        arrayDurationCombacks: [],
        // new filters
        stops: [],
        airlines: [],
        payTypes: [],
        baggage: [],
        handbags: [],
        delay: [],
        delayComback: [],
        duration: [],
        durationComback:[]
    },
    loading: false,    
    // статус поиска
    searchStatus: false,
    // ничего не найдено,
    resultIsEmpty: '',
    // смягчите фильтры
    filteredArrayLengthStatus: '',
    errorMessage: '',
    timeOfReceiptSearchId: '',
    localStorageStatus: false,
    infoboardVisible: false,
    formVisible: true,

    /**** initial state hotel ****/
    hotelParams: {
        formData: {
            cityOrHotelData: '',       
            checkInDate: '',
            checkOutDate: '',
            adults: 1,
            children: [],
            lengthOfStay: 1,
        },
        loadingHotel: false,
        hotelInfoboardVisible: false,  
        hotelFormVisible: true,        
        hotelData: [],
        hotelFilteredData: [],
        // ничего не найдено,
        hotelResultIsEmpty: '',
        hotelsLength: 0,
        hotelsFilteredLength: 0, 
        // фильтры
        hotelFilters: {
            hotelType: [],
            hotelPricePerNight: [],
            hotelPricePerPeriod: [],
            hotelAmenities: [],
            hotelStars: [],
            hotelDistanse: []
        },
        searchHotelStatus: false
    }    
}

export default function (state = initialState, action) { 
    switch ( action.type) {
        case LOADING_DATA: 
            return {
                ...state,
                loading: action.loading
            } 
        case FETCH_CURRENCIES: 
            return {
                ...state,
                currencies: action.payload
            } 
        case UPDATE_GEOIP: 
            return {
                ...state,
                geoData: action.payload,
            }             
        case UPDATE_ORIGIN_DATA:
            return {
                ...state,
                    simpleFormParams: {
                        ...state.simpleFormParams,
                            segments: {
                                ...state.simpleFormParams.segments,
                                origin: action.payload  
                            }
                    }   
            }       
        case UPDATE_DESTINATION_DATA: {
            return {
                ...state,
                    simpleFormParams: {
                        ...state.simpleFormParams,
                            segments: {
                                ...state.simpleFormParams.segments,
                                destination: action.payload  
                            }
                    }   
            } 
        }
        case UPDATE_DATE: {
            return {
                ...state,
                    simpleFormParams: {
                        ...state.simpleFormParams,
                            segments: {
                                ...state.simpleFormParams.segments,
                                date: action.payload  
                            }
                    }   
            }
        }
        case UPDATE_COMBACK_DATE: {
            return {
                ...state,
                    simpleFormParams: {
                        ...state.simpleFormParams,
                            segments: {
                                ...state.simpleFormParams.segments,
                                combackDate: action.payload  
                            }
                    }   
            }
        }
        case UPDATE_PASS_DATA: {
            return {
                ...state,
                    passData: {
                        ...state.passData,
                        [action.payload.fieldName]: action.payload.fieldValue
                }
            }
        }
        case SET_SEARCH_ID: {
            return {
                ...state,
                search_id: action.payload
            }
        }
        case SET_TICKETS: {
            return {
                ...state,
                tickets: action.tickets,
                ticketsLength: action.ticketsLength,   
                filtered: action.filtered
            }
        }
        case SET_FILTERED: {
            return {
                ...state,                   
                filtered: action.payload
            }
        }
        // обновление длины фильтрованного массива
        case UPDATE_FILTERED_LENGTH: {
            return {
                ...state,
                filteredLength: action.payload
            }
        }
        // самый дешевый билет
        case SET_CHEAPETS_TICKET: {
            return {
                ...state,
                cheapets: action.payload
            }
        }
        // самый быстрый билет
        case SET_FASTEST_TICKET : {
            return {
                ...state,
                fastest: action.payload
            }
        }
        
        case SET_FILTER_DATA: {
            return {
                ...state,
                filters: action.payload
            }
        }
        // статус поиска
        case SEARCH_STATUS: {
            return {
                ...state,
                searchStatus: action.payload
            }
        }
        // пустой результат поиска
        case RESULT_IS_EMPTY: {
            return {
                ...state,
                resultIsEmpty: action.payload
            }
        }
        // смягчите фильтры
        case FILTERED_ARRAY_LENGTH_STATUS: {
            return {
                ...state,
                filteredArrayLengthStatus: action.payload
            }
        }
        // соообщение об ошибках заполнения поисковой формы
        case ERROR_MESSAGE_SEARCH_FORM : {
            return {
                ...state,
                errorMessage: action.payload
            }
        }
        // момент получения search_id
        case SEARCH_ID_RECEIVED: {
            return {
                ...state,
                timeOfReceiptSearchId: action.payload
            }
        }
        case INFOBOARD_VISIBLE: {
            return {
                ...state,
                infoboardVisible: action.payload
            }
        }
        case FORM_VISIBLE: {
            return {
                ...state,
                formVisible: action.payload
            }
        }        
        
        
        // hotel block
        case SET_ADULTS_DATA: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                        formData: {
                            ...state.hotelParams.formData,
                            adults: action.payload
                        }
                }
            }            
        }
        case SET_CHILDREN_DATA: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                        formData: {
                            ...state.hotelParams.formData,
                            children: action.payload
                        }
                }
            }            
        }
        case SET_CHECKIN_DATE: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                        formData: {
                            ...state.hotelParams.formData,
                            checkInDate: action.payload
                        }
                }
            }
        }
        case SET_CHECKOUT_DATE: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                        formData: {
                            ...state.hotelParams.formData,
                            checkOutDate: action.payload
                        }
                }
            }
        }
        case  SET_PLACE_OR_HOTEL: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                        formData: {
                            ...state.hotelParams.formData,
                            cityOrHotelData: action.payload
                        }
                }
            }
        }
        // продолжительность проживания
        case  LENGTH_OF_STAY: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                        formData: {
                            ...state.hotelParams.formData,
                            lengthOfStay: action.payload
                        }
                }
            }
        }
        // соообщение об ошибках заполнения поисковой формы
        case ERROR_MESSAGE_HOTEL_SEARCH_FORM: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    errorHotelMessage: action.payload
                }
            } 
        }
        //предожения по отелям
        case LOADING_HOTEL_DATA: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    loadingHotel: action.payload
                }
            } 
        }
        //set hotel_search_id     
        case SET_HOTEL_SEARCH_ID: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelSearchId: action.payload
                }
            }
        }
        //время получения hotel_search_id     
        case HOTEL_SEARCH_ID_RECEIVED: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    timeOfReceiptHotelSearchId: action.payload
                }
            }
        }
        // пустой результат поиска
        case HOTEL_RESULTS_IS_EMPTY: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelResultIsEmpty: action.payload
                }
            }
        }
        // статус поиска отелей        
        case SEARCH_HOTEL_STATUS: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    searchHotelStatus: action.payload
                }
            }
        }
        // скрыть основную форму
        case HOTEL_INFOBOARD_VISIBLE: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelInfoboardVisible: action.payload
                }
            }
        }
        // показать инфобокс
        case HOTEL_FORM_VISIBLE: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelFormVisible: action.payload
                }
            }
        }
        //массив с отелями
        case SET_HOTEL_DATA: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelData: action.payload
                }
            }
        }
        //копия массива с отелями
        case SET_HOTEL_FILTERED_DATA: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelFilteredData: action.payload
                }
            }
        }
        //длина массива с отелями
        case SET_HOTELS_LENGTH: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelsLength: action.payload
                }
            }
        }
        //обновление отфильтрованного массива отелей
         case UPDATE_HOTEL_FILTERED_LENGTH: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelsFilteredLength: action.payload
                }
            }
        }
        //задаем данные фильтра
        case SET_HOTEL_FILTER_DATA: {
            return {
                ...state,
                hotelParams: {
                    ...state.hotelParams,
                    hotelFilters: action.payload
                }
            }
        }

      

        default: return state 
    }        
}
