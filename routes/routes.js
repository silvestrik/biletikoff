const {Router} = require('express')
const router = Router()
const axios = require('axios')
const md5 = require('md5')
var token = '86d4ba7e94a304f5b4cc22c88eeb94df' 
var marker = '21724'

//курс вылют
router.get('/currencies', async (request, response) => { 
    try { 
        const currencies = await axios.get('http://yasen.aviasales.ru/adaptors/currency.json')         
        response.json(currencies.data)     
    } catch (error) {
        console.error(error)
    }
})

router.get('/autocomplete/:term', async (request, response) =>{
    const search = encodeURI (request.params.term)    
    try {    
        const city = await axios.get(`http://autocomplete.travelpayouts.com/places2?term=${search}&locale=ru&types[]=city`)    
        response.json(city.data)  
    } catch (error) {
        console.error(error)
    }
})

//geoIP
router.get('/geoip/:ip', async(req, res) => {
    const ip = req.params.ip 
    const cityData = await axios.get(`http://www.travelpayouts.com/whereami?locale=ru&callback=useriata&ip=${ip}`)
    try{
        var useriata = cityData.data
        var f = new Function('useriata', useriata)
        f(function(json){
            res.json(json)
        })               
    } catch (err) {
        console.log(err)
    }
})

router.post('/getInitialData', async (request, response) => {
    try {  
        const { origin, destination, toDate, combackDate, tripClass, adults, child, baby } = request.body

        //валидация
        if(!origin || origin === "" || origin === undefined) {
            response.status(400).json({message: 'Не выбран пункт отправления'})        
        } else if ( !destination || destination === '' || destination === undefined) {
            response.status(400).json({message:'Не выбран пункт прибытия'})
        } else if ( origin === destination) {
            response.status(400).json({message:'Пункт отправления и прибытия совпадают'})
        //добавить сравнение даты, что бы вылет не был позде возврата    
        } else if (toDate === null){
            response.status(400).json({message:'Выберите дату вылета'}) 
        } else if (           
            combackDate &&
            combackDate !==null &&
            new Date(toDate.substr(0, 4), toDate.substr(5, 2), toDate.substr(-2)) > 
            new Date(combackDate.substr(0, 4), combackDate.substr(5, 2), combackDate.substr(-2)) ) {            
            response.status(400).json({message:'Дата возврата меньше даты вылета'})
        } else {
            // const marker = '21724'
            const ip = '163.172.146.130'
            const host = 'beta.aviasales.ru'
            const apiUrl = 'http://api.travelpayouts.com/v1/flight_search'
    
            //вспомогательная функция для сортировки параметров
            alphabeticSort = (data) => {
                const sortedData = Object.keys(data)
                        .sort()
                        .reduce((acc, key) => ({
                            ...acc, [key]: data[key]
                        }), {})
                return sortedData        
            }
    
            const segment_0 =  {'origin': origin, 'destination': destination, 'date':toDate}   
            const segment_1 =  {'origin': destination, 'destination': origin, 'date':combackDate}
            const passengers = {adults, child, baby } 
           
            const segment_0_sorted = Object.values(alphabeticSort(segment_0))             
            const segment_1_sorted = Object.values(alphabeticSort(segment_1)) 
            const passengers_sorted = Object.values(alphabeticSort(passengers))         
            
            if(combackDate && combackDate !== null) {
                // для получения searchId
                var segments = [segment_0_sorted, segment_1_sorted]
                //для поиска
                var searchSegments = [segment_0, segment_1]
            } else {
                // для получения searchId
                var segments = [segment_0_sorted]
                //для поиска
                var searchSegments = [segment_0]
            }
    
            const params = {
                marker: '21724',
                host,
                user_ip:  ip, 
                marker,
                locale: 'ru',
                trip_class: tripClass,
                passengers: passengers_sorted,         
                segments: segments
            }
            
            //подготовка параметров
            const sorted_params = alphabeticSort(params) 
            const requestTmp = Object.values(sorted_params).join(':')
            const requestParams = requestTmp.replace(/,/g, ':')
            const signature =  md5(`${token}:${requestParams}`)     
           
            //запрос для получения searchId 
            const searchParams = {
                signature,
                marker,
                host,
                user_ip:  ip, 
                locale: 'ru',
                trip_class: tripClass,
                passengers: {
                    adults: adults,
                    children: child,
                    infants: baby
                },
                segments: searchSegments 
            }

            //console.log('searchParams:', searchParams)
            
            const searchIdData = await axios.post(apiUrl, searchParams)
                .then(response => {
                    return response.data            
                })
                .catch(err=> {
                    console.log(err)
                })
                //возвращаем данные с searchId и вспомогательную информацию
                if(searchIdData) {
                    response.json(searchIdData)        
                } else {
                    response.status(500).json({message:'Видимо что то случилось...попробуйте позже'})
                }                
        }
    } catch (error) {
        console.error(error)
    }
}) 

//асинхронное получение результата
router.post('/getResult', async (request, response) => {
    try {
        const search_id = request.body.search_id
        const result = await axios.get(`http://api.travelpayouts.com/v1/flight_search_results?uuid=${search_id}`)
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
            })            
            response.json(result)      
    } catch (error) {
        console.error(error)
    }
})

// получение ссылки для покупки билета
router.post('/getBuyLink', async (request, response) => {
    const search_id = request.body.search_id
    const link = request.body.link    
    try  {
        const result = await axios.get(`https://api.travelpayouts.com/v1/flight_searches/${search_id}/clicks/${link}.json`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
        response.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
})

// hotel block
router.get('/hotelAutocomplete/:term', async (request, response) =>{
    const search = encodeURI (request.params.term) 
    console.log(search)
    try {    
        const cityAndHotel = await axios.get(`http://engine.hotellook.com/api/v2/lookup.json?query=${search}&lang=ru&lookFor=both&limit=10&token=token`)    
        response.json(cityAndHotel.data)  
    } catch (error) {
        console.error(error)
    }
})

router.post('/getHotelInitialData', async (request, response) => {
    try {
        
        const { id, checkInDate, checkOutDate, adults, children, currency, language, objectID } = request.body
        if(id === "") {
            response.status(400).json({message:'Выберите город или отель'}) 
         } else if(checkInDate === null || checkInDate === "" ) {
            response.status(400).json({message:'Не указана дата заезда'})
         } else if(checkOutDate === null || checkOutDate === "") {
            response.status(400).json({message:'Не указана дата выезда'})
         } else if (
            new Date(checkInDate.substr(0, 4), checkInDate.substr(5, 2), checkInDate.substr(-2)) > 
            new Date(checkOutDate.substr(0, 4), checkOutDate.substr(5, 2), checkOutDate.substr(-2))
        ) {
            response.status(400).json({message:'Дата выезда меньше даты заезда'})
        } else {        
            //сигнатура поиска !! CUSTOMER IP использовать           
            //массив деток
            const childrenCount = children.length            
            if(childrenCount===1) {
                var childrenAgeObj = {childAge1: children[0]}
            } else if (childrenCount===2){
                var childrenAgeObj = {childAge1: children[0], childAge2: children[1]}
            } else if (childrenCount===3){
                var childrenAgeObj = {childAge1: children[0], childAge2: children[1], childAge3: children[2]}   
            } else {
                var childrenAgeObj=''
            }            

            // тип объекта запроса - город или отель
            if(objectID === 'hotelId') {
                var typeLocationObj = { hotelId: id}                
            } else if (objectID ==='cityId') {
                var typeLocationObj = {cityId: id}               
            }             

            const paramsObj = {                
                checkIn: checkInDate,
                checkOut: checkOutDate,
                adultsCount: adults,
                customerIP: '163.172.146.130',
                childrenCount: childrenCount,               
                lang: language.toLowerCase(),
                currency: currency.toUpperCase(),
                waitForResult: 0
            }            

            var resultObj = {}
            var resultObj = { ...paramsObj, ...typeLocationObj, ...childrenAgeObj}

            //вспомогательная функция для сортировки параметров
            alphabeticSort = (data) => {
                const sortedData = Object.keys(data)
                        .sort()
                        .reduce((acc, key) => ({
                            ...acc, [key]: data[key]
                        }), {})
                return sortedData        
            }           

            const sorted_params = alphabeticSort(resultObj)
            const requestTmp = Object.values(sorted_params).join(':')
            const requestParams = requestTmp.replace(/,/g, ':')  
            const signature =  md5(`${token}:${marker}:${requestParams}`) 
           
            const apiHotelUrl = 'http://engine.hotellook.com/api/v2/search/start.json?'            
            const requestPreData = 
                JSON.stringify(sorted_params)
                .replace(/:/g, '=')
                .replace(/"/g, '')
                .replace(/,/g, '&')
                .replace('{', '')
                .replace('}', '') 
          
            // запрос на получение searchId
                const requestUrl = `${apiHotelUrl}${requestPreData}&marker=${marker}&signature=${signature}`
                //console.log(requestUrl)

            const searchHotelIdData = await axios.post(requestUrl)
                .then(response => {
                    if(response.data.status === 'ok'){
                        return response.data
                    }      
                })
                .catch(err=> {
                    console.log(err)
                })

                //возвращаем данные с searchId и вспомогательную информацию
                if(searchHotelIdData) {
                    response.json(searchHotelIdData)        
                } else {
                    response.status(500).json({message:'Видимо что то случилось...попробуйте позже'})
                }

        }  
    } catch (e) {
        console.log(e)
    }
})


//асинхронное получение результата
router.post('/getHotelResult', async (request, response) => { 
    
    try {
        const hotelSearchId = request.body.hotelSearchId
        const apiHotelUrl = 'http://engine.hotellook.com/api/v2/search/getResult.json?'       
        const signature = md5(`${token}:${marker}:${hotelSearchId}`)
        const fullApiResultHotel = `${apiHotelUrl}searchId=${hotelSearchId}&marker=${marker}&signature=${signature}`       
        
        const result = await axios.get(fullApiResultHotel)
            .then(response => {                
                return response.data
            })
            .catch(err => {
                console.log(err)
            })
            response.json(result)  
        } catch (error) {
            console.error(error)
        }    
})

module.exports = router
