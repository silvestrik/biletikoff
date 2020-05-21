//!!!! с английским подставлять в автокоплит англ слова, также в датапикере

export const translate = (word, lang) => {    
  
    const wordsObject = {
        one_way: {
            en: 'One way',
            ru: 'В одну сторону'
            
        },
        round_trip: {
            en: 'Round trip',      
            ru: 'Туда-обратно'                  
        },
        from: {
            en: 'From',
            ru: 'Откуда'                        
        },
        to: {
            en: 'To',    
            ru: 'Куда'                    
        },
        there: {
            en: 'There',
            ru: 'Туда'
        },
        options: {
            en: 'options',
            ru: 'вариантов'
        },
        date: {
            en: 'Date',
            ru: 'Дата' 
        },
        back: {
            en: 'Back',
            ru: 'Обратно' 
        },
        class_passangers: {
            en: 'Class and pass.',
            ru: 'Класс и пассажиры'
        },
        search: {
            en: 'Search',
            ru: 'Найти билеты'
        },
        pass: {
            en: 'pass.',
            ru: 'пасс'
        },
        class: {
            en: 'Class',
            ru: 'Класс'
        },
        econom: {
            en: 'Econom',
            ru: 'Эконом'
        },
        business: {
            en: 'Business',
            ru: 'Бизнес'
        },
        adults: {
            en: 'Adults',
            ru: 'Взрослые'
        },
        children: {
            en: 'children',
            ru: 'дети'
        },
        babies: {
            en: 'Babies',
            ru: 'Младенцы'
        },        
        data_out_of_date: {
            en: 'Data out of date',
            ru: 'Увы, но данные устарели'
        },
        update: {
            en: 'Update',
            ru: 'Обновить'
        },
        there: {
            en: 'There',
            ru: 'Туда'
        },
        change_time: {
            en: 'Change time',
            ru: 'Время пересадок'
        },
        departure_time: {
            en: 'Departure time',
            ru: 'Время вылета'
        },
        all: {
            en: 'All',
            ru: 'Все'
        },
        more_tickets: {
            en: 'More tickets',
            ru: 'Показать еще'
        },
        stops: {
            en: 'Stops',
            ru: 'Пересадки'
        },
        cheapest: {
            en: 'Cheapest',
            ru: 'Саый дешевый'
        },
        fastest: {
            en: 'Fastest',
            ru: 'Саый быстрый'
        },
        non_stop: {
            en: 'Non stop',
            ru: 'Без пересадок'
        },
        one_stop: {
            en: 'One stop',
            ru: 'Одна остановка'
        },
        two_stop: {
            en: 'Two stops',
            ru: 'Две остановки'
        },
        three_stop: {
            en: 'Three stops',
            ru: 'Три остановки'
        },
        four_stop: {
            en: 'Four stop',
            ru: 'Четыре остановки'
        },
        airlines: {
            en: 'Airlines',
            ru: 'Авиакомпании'
        },
        payment_methods: {
            en: 'Payment methods',
            ru: 'Способы оплаты'
        },
        cash: {
            en: 'Cash',
            ru: 'Наличные'
        },
        euroset: {
            en: 'Euroset',
            ru: 'Евросеть'
        },
        svyaznoy: {
            en: 'Svyaznoy',
            ru: 'Связной'
        },
        yandex_money: {
            en: 'Yandex-money',
            ru: 'Яндекс-деньги'
        },
        qiwi: {
            en: 'QIWI',
            ru: 'QIWI'
        },
        elecsnet: {
            en: 'Elecsnet',
            ru: 'Элекснет'
        },
        contact: {
            en: 'Contact',
            ru: 'Контакт'
        },
        courier: {
            en: 'Courier',
            ru: 'Курьер'
        },
        bank_transfer: {
            en: 'Bank Transfer',
            ru: 'Банковский перевод'
        },
        baggage: {
            en: 'Baggage',
            ru: 'Багаж'
        },
        piece: {
            en: 'piece',
            ru: 'место'
        },
        no_data: {
            en: 'No data',
            ru: 'Нет данных'
        },
        not_included: {
            en: 'Not included',
            ru: 'Не включен'
        },
        clarify: {
            en: 'Clarify',
            ru: 'Уточнить'
        },
        hour: {
            en: 'h',
            ru: 'ч.'
        },
        min: {
            en: 'min',
            ru: 'мин'
        },
        kg: {
            en: 'kg',
            ru: 'кг'
        },
        january: { en: 'January', ru: 'январь'},
        february: { en: 'February', ru: 'февраль'},
        march: { en: 'March', ru: 'март'},
        april: { en: 'April', ru: 'апрель'},
        may: { en: 'May', ru: 'май'},
        june: { en: 'June', ru: 'июнь'},
        july: { en: 'July', ru: 'июль'},
        august: { en: 'August', ru: 'август'},
        september: { en: 'September', ru: 'сентябрь'},
        october: { en: 'October', ru: 'октябрь'},
        november: { en: 'November', ru: 'ноябрь'},
        december: { en: 'December', ru: 'декабрь'},
        january1: { en: 'January', ru: 'января'},
        february1: { en: 'February', ru: 'февраля'},
        march1: { en: 'March', ru: 'марта'},
        april1: { en: 'April', ru: 'апреля'},
        may1: { en: 'May', ru: 'мая'},
        june1: { en: 'June', ru: 'июня'},
        july1: { en: 'July', ru: 'июля'},
        august1: { en: 'August', ru: 'августа'},
        september1: { en: 'September', ru: 'сентября'},
        october1: { en: 'October', ru: 'октября'},
        november1: { en: 'November', ru: 'ноября'},
        december1: { en: 'December', ru: 'декабря'},
        sunday: { en: 'Sunday', ru: 'воскресенье'},
        monday: { en: 'Monday', ru: 'понедельник'},
        tuesday: { en: 'Tuesday', ru: 'вторник'},
        wednesday: { en: 'Wednesday', ru: 'среда'},
        thursday: { en: 'Thursday', ru: 'четверг'},
        friday: { en: 'Friday', ru: 'пятница'},
        saturday: { en: 'Saturday', ru: 'суббота'},        
        sunday_shot: { en: 'Sun', ru: 'вс'},
        monday_shot: { en: 'Mon', ru: 'пн'},
        tuesday_shot: { en: 'Tue', ru: 'вт'},
        wednesday_shot: { en: 'Wed', ru: 'ср'},
        thursday_shot: { en: 'Thu', ru: 'чт'},
        friday_shot: { en: 'Fri', ru: 'пт'},
        saturday_shot: { en: 'Sat', ru: 'сб'}
    }
  
    var ln = lang.toLowerCase()
    const translate = wordsObject[word][ln] 
    return translate 
}
