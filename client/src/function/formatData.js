export const formatStops = t => {
    return formatStr(t,'пересадка','пересадки','пересадок','без пересадок');
}

const formatStr = (t,a,b,c,d) => {  
    var str='';       
    switch (t) {
        case 0: return d;
        case 1: str=a;break;
        case 2:
        case 3:
        case 4: str=b;break;
        default: str=c;
    }
    return t+' '+str;
}

// заглушка
export const formatAirlines = data => {
    return data
}

export const formatPaymentsMethod = data => {
    switch (data){
        case "card": return "Visa/MasterCard";     
        case "cash": return "Наличные";
        case "euroset": return "Евросеть";      
        case "svyaznoy": return "Связной";
        case "web_money": return  "WebMoney";     
        case "qiwi": return  "Qiwi";
        case "moneywall": return  "Moneywall";
        case "paylate": return  "Paylate";
        case "yandex_money": return "Яндекс.Деньги";      
        case "terminal": return "Терминалы QIWI";     
        case "elexnet": return "Элекснет";
        case "contact": return "Контакт";     
        case "exp": return "Курьеру"; 
        case "applepay": return "Applepay";
        case "cyberplat": return "Cyberplat";
        case "googlepay": return "Googlepay"
        case "internetbank": return "Internetbank"
        case "monetaru": return "Monetaru"
        case "revoplus": return "Revoplus"
        case "samsungpay": return "Samsungpay"
        case "unionpay": return "Unionpay"
        case "bank": return"Банковский перевод";
        default: return "";     
      } 
}

export const formatBaggage = data =>{
    switch (data){         
        case "1PC" :  return "1 место*";  
        case "1PC5":  return "1X5 кг";  
        case "1PC6":  return "1X6 кг"; 
        case "1PC7":  return "1X7 кг"; 
        case "1PC8":  return "1X8 кг"; 
        case "1PC10": return "1X10 кг";
        case "1PC12": return "1X12 кг";
        case "1PC15": return "1X15 кг";
        case "1PC20": return "1X20 кг";
        case "1PC23": return "1X23 кг";
        case "1PC25": return "1X25 кг";
        case "1PC30": return "1X30 кг";
        case "1PC32": return "1X30 кг";
        case "1PC35": return "1X32 кг";
        case "1PC40": return "1X40 кг"; 
        case "2PC5":  return "2X5 кг";   
        case "2PC8":  return "2X8 кг";
        case "2PC10": return "2X10 кг";
        case "2PC15": return "2X15 кг";
        case "2PC20": return "2X20 кг";
        case "2PC23": return "2X23 кг";
        case "2PC25": return "2X25 кг";
        case "2PC30": return "2X30 кг";
        case "2PC32": return "2X32 кг";
        case "2PC35": return "2X35 кг";
        case "2PC40": return "2X40 кг";   
        case "": return "нет данных";     
        case false: return "не включен";
        case undefined:  return "нет данных"; 
        default: return "уточнить";    
      }      
}

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

export const formatTime = t => {
    return Math.floor(t/60)+" ч. "+t%60+" мин.";
}

export const formatLanguageName = data => {
    switch (data) {
        case 'RU':
            return 'Русский'            
        case 'EN':
            return 'English'   
        case 'DE':
            return 'Deutsch'            
        case 'ES':
            return 'Español'        
        default:
            break;
    }
}

//
// export const plus7days = (data, day) => {
//     data = data.split('/');
//     data = new Date(data[2], +data[1]-1, +data[0]+day, 0, 0, 0, 0);
//     data = [data.getDate(),data.getMonth()+1,data.getFullYear()];
//     data = data.join('/').replace(/(^|\/)(\d)(?=\/)/g,"$10$2");
//     return data
// }
// dt = new Date().setDate(new Date().getDate()+7)
//alert(get("29/08/2013", 7));

//сравнить даты

// let now = new Date(),
//     birthday = new Date('10/10/2001')

// if (now > birthday) {
//   // ...
// }