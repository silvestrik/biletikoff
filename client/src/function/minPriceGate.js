// минимаьная цена от гейта для вывода в билете

export const minPriceGate = data => {
    // 1. массив с гейтами
    var arr = []
    data.forEach(elem => {
        arr.push(elem.gateId)
    })
    // 2. уникализация массива с гейтами
    const arr1 = new Set(arr)
    const arr2 = [...arr1]       
    // 3. меняем ключи на значения 
    const arr3 = []
    arr2.forEach((item, index) => {
        arr3[item] = index         
    })        
    // 4. собираем массив гейт->предложения 
    arr3.forEach((elem, index) => {            
        arr3[index] = []
        data.forEach(element => {             
            if(element.gateId === index) {
                arr3[index].push(element)
            }
        })
    })
    // 5. Сбрасываем ключи
    const arr4 = arr3.filter(function(val){return val})  
    // 6. Оставляем только миним стоимость от гейта
    const arrMinPrice = []
    arr4.forEach((item, index) => {
        const arrPrice = []
        item.forEach(element => {                
            arrPrice.push(element.price)
        })
        const minPrice =  Math.min.apply(null, arrPrice)            
        const arr5 = item.filter(i => i.price === minPrice)   
        arrMinPrice.push(arr5)   
    })
    //console.log(arrMinPrice)
    return arrMinPrice
}
// payment_methods: undefined}