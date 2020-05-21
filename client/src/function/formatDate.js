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

var monthNames = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
var dayNames = ['вс','пн','вт','ср','чт','пт','сб'];

export const formatDateTopForm = data => {      
    var day = new Date(data).getDate()
    var weekday = new Date(data).getDay()
    var month = new Date(data).getMonth()+1    
    const newDate = `${day} ${monthNames[month]}, ${dayNames[weekday]}`
    return newDate
}
