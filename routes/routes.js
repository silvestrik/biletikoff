const {Router} = require('express')
const router = Router()
const axios = require('axios')
const md5 = require('md5')

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

router.post('/searchId', async (request, response) => {
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
            toDate !=="" && 
            toDate !== null &&
            combackDate !=="" &&
            combackDate !==null &&
            new Date(toDate.substr(0, 4), toDate.substr(5, 2), toDate.substr(-2)) > 
            new Date(combackDate.substr(0, 4), combackDate.substr(5, 2), combackDate.substr(-2)) ) {            
            response.status(400).json({message:'Дата возврата меньше даты вылета'})
        } else {
            const token = '86d4ba7e94a304f5b4cc22c88eeb94df'
            const marker = '21724'
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
            
            if(combackDate !== '' && combackDate !== null) {
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
           

            //console.log('requestParams:', requestParams)
            //console.log('signature:', signature)   
            
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
                response.json(searchIdData)
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

module.exports = router
