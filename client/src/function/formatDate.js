//конверируем дату
export const formatDate = (date) => {     
    if(date !==null) {
        var day = date.getDate(); 
        if (day < 10) { 
            day = "0" + day; 
        } 
        var month = date.getMonth() + 1; 
        if (month < 10) { 
            month = "0" + month; 
        } 
        var year = date.getFullYear(); 
        return year + "-" + month + "-" + day; 
    } else {
        return null
    }
}

export const plus7days = (data, day) => {
    data = data.split('/');
    data = new Date(data[2], +data[1]-1, +data[0]+day, 0, 0, 0, 0);
    data = [data.getDate(),data.getMonth()+1,data.getFullYear()];
    data = data.join('/').replace(/(^|\/)(\d)(?=\/)/g,"$10$2");
    return data
}
// dt = new Date().setDate(new Date().getDate()+7)
//alert(get("29/08/2013", 7));

//сравнить даты

// let now = new Date(),
//     birthday = new Date('10/10/2001')

// if (now > birthday) {
//   // ...
// }