export const createFilters = data => {
        //stops
        const arr1 = []
        data.forEach(element => {    
            arr1.push(element.stops)
        })
        const arrayTmpStops = new Set(arr1)
        const arrayStops = [...arrayTmpStops].sort()
       
        const stops = []
        arrayStops.forEach(item => {
            item = {
                value: item,
                status: true
            }
            stops.push(item)
         }) 

        //airlines (main)
        const arr2 = []
        const arr22 = []
        data.forEach((element, index) => { 
            const main_airline = element.main_airline 
            const airinesList = element.airlines 
            for (var i in airinesList) {
                if(i===main_airline){
                    arr2[index] = main_airline
                    arr22[index] = airinesList[i].name          
                }
            }         
        })
        // уникальный массив кодов
        const arrayTmpAirlinesCode = new Set(arr2)
        const arrayAirlinesCode = [...arrayTmpAirlinesCode]
        // уникальный массив наименований авиакомпаний
        const arrayTmpAirlinesName = new Set(arr22)
        const arrayAirlinesName = [...arrayTmpAirlinesName]

        const airlines = []
        arrayAirlinesCode.forEach(item => {
            item = {
                value: item,
                status: true
            }
            airlines.push(item)
        })       
      
        //payTypes
        const arr3 = []
        data.forEach(element => {  
            var item = element.payment_methods 
            for (var i in item){
                for (var j in item[i]){          
                arr3.push(item[i][j])
                } 
            }
        })
        const arrayTmpPayTypes = new Set(arr3)
        const arrayPayTypes = [...arrayTmpPayTypes].sort()
       
        const payTypes = []
        arrayPayTypes.forEach(item => {
            item = {
                value: item,
                status: true
            }
            payTypes.push(item)
        })      

        // багаж
        const arr4 = []
        data.forEach(element => {  
            var item = element.flights_baggage 
            for (var i in item){
                for (var j in item[i]){                      
                    if(item[i][j] !== " " || item[i][j] !== undefined) {
                        arr4.push(item[i][j])
                    }                   
                } 
            }
        })
        const arrayTmpBaggage = new Set(arr4)
        const arrayBaggage = [...arrayTmpBaggage].sort()

        // baggage new
        const baggage = []
        arrayBaggage.forEach(item => {
             item = {
                 value: item,
                 status: true
             }
             baggage.push(item)
         })
        //const baggage = baggageTmp.filter(item => item !== "" && item !== undefined && item !== null)       

        // ручная кладь
        const arr5 = []
        data.forEach(element => {  
            var item = element.flights_handbags 
            for (var i in item){
                for (var j in item[i]){  
                    if(item[i][j] !==' ' || item[i][j] !== undefined) {
                        arr5.push(item[i][j])
                    }                        
                } 
            }
        })
        const arrayTmpHandbags = new Set(arr5)
        const arrayHandbags = [...arrayTmpHandbags].sort()

        // handbags new
        const handbags = []
        arrayHandbags.forEach(item => {
             item = {
                 value: item,
                 status: true
             }
             handbags.push(item)
         })
        //const handbags = handbagsTmp.filter(item => item !== "" && item !== undefined && item !== null)  

        // время пересадки
        const arr6 = []
        const arr7 = [] //обратно
        data.forEach(element => {    
            arr6.push(parseInt(element.delay, 10))
            if(element.delayComback) {
                arr7.push(parseInt(element.delayComback, 10))
            }
        })
               
        const sortNumber = (a, b) => {
            return a - b;
        }
        const arrayTmpDelay = new Set(arr6) 
        const arrayDelay = [...arrayTmpDelay].sort(sortNumber)
        const arrayDelayLength = arrayDelay.length
        const arrayDelayStart = arrayDelay[0]
        const arrayDelayEnd = arrayDelay[arrayDelay.length-1]
        const arrayDelays = [arrayDelayStart, arrayDelayEnd, arrayDelayLength]

        if(arr7.length>0) {
            const arrayTmpDelayComback = new Set(arr7) 
            const arrayDelayComback = [...arrayTmpDelayComback].sort(sortNumber)
            const arrayDelayCombackLength = arrayDelayComback.length
            const arrayDelayCombackStart = arrayDelayComback[0]
            const arrayDelayCombackEnd = arrayDelayComback[arrayDelayComback.length-1]
            var arrayDelaysComback = [arrayDelayCombackStart, arrayDelayCombackEnd, arrayDelayCombackLength]
        }       
        // время в пути        
        const arr8 = []
        const arr9 = [] //обратно
        data.forEach(element => {    
            arr8.push(parseInt(element.duration, 10))
            if(element.durationComback) {
                arr9.push(parseInt(element.durationComback, 10))
            }
        })

        const arrayTmpDuration = new Set(arr8) 
        const arrayDuration = [...arrayTmpDuration].sort(sortNumber)
        const arrayDurationLength = arrayDuration.length
        const arrayDurationStart = arrayDuration[0]
        const arrayDurationEnd = arrayDuration[arrayDuration.length-1]
        const arrayDurations = [arrayDurationStart, arrayDurationEnd, arrayDurationLength]

        if(arr9.length>0) {
            const arrayTmpDurationComback = new Set(arr9) 
            const arrayDurationComback = [...arrayTmpDurationComback].sort(sortNumber)
            const arrayDurationCombackLength = arrayDurationComback.length
            const arrayDurationCombackStart = arrayDurationComback[0]
            const arrayDurationCombackEnd = arrayDurationComback[arrayDurationComback.length-1]
            var arrayDurationsComback = [arrayDurationCombackStart, arrayDurationCombackEnd, arrayDurationCombackLength]
        }

        const filterData = {         
            arrayAirlinesName,            
            arrayDelays,
            arrayDelaysComback,
            arrayDurations,
            arrayDurationsComback,            
            stops,
            airlines,
            payTypes,
            baggage,
            handbags
        }
    return filterData
}
