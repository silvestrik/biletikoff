export const hotelAmenities = (lang, code) => {    
    const arrTmp =  wordObject[lang]
    // массив с удобствами
    const newArray = []

    if(code.length > 0) {  
        // eslint-disable-next-line      
        code.map(item => { 
           // eslint-disable-next-line
           arrTmp.map(it => {
               // eslint-disable-next-line
                 if(it.id == item) {
                    newArray.push(it.name)
                }        
            }) 
        })
    }
    return newArray
}

export const hotelAmenitiesCheckbox = (lang, code) => {
    const arrTmp = wordObject[lang]  
    // eslint-disable-next-line
    const amenityName = arrTmp.filter(item => item.id == code) 
    return amenityName[0].name 
}

var wordObject = {
    en: [
            {
            id: "148",
            name: "Adults only",
            groupName: "General"
            },
            {
            id: "4",
            name: "TV",
            groupName: "Room"
            },
            {
            id: "9",
            name: "Restaurant",
            groupName: "General"
            },
            {
            id: "11",
            name: "Air conditioning",
            groupName: "Room"
            },
            {
            id: "16",
            name: "Mini bar",
            groupName: "Room"
            },
            {
            id: "23",
            name: "24hr room service",
            groupName: "Services"
            },
            {
            id: "28",
            name: "Pets allowed",
            groupName: "General"
            },
            {
            id: "30",
            name: "Wake up service",
            groupName: "Services"
            },
            {
            id: "35",
            name: "Ironing board",
            groupName: "Room"
            },
            {
            id: "47",
            name: "Faxing Facilities",
            groupName: "Services"
            },
            {
            id: "54",
            name: "Free parking",
            groupName: "Parking"
            },
            {
            id: "59",
            name: "Wheelchair accessible",
            groupName: "General"
            },
            {
            id: "61",
            name: "Bathrobes",
            groupName: "Room"
            },
            {
            id: "66",
            name: "Refrigerator",
            groupName: "Room"
            },
            {
            id: "73",
            name: "Tennis courts",
            groupName: "Activities"
            },
            {
            id: "78",
            name: "Doctor on call",
            groupName: "Services"
            },
            {
            id: "80",
            name: "Playground",
            groupName: "Activities"
            },
            {
            id: "85",
            name: "Sunbathing Terrace",
            groupName: "General"
            },
            {
            id: "92",
            name: "Table tennis",
            groupName: "Activities"
            },
            {
            id: "97",
            name: "Barbecue Area",
            groupName: "General"
            },
            {
            id: "100",
            name: "Animation",
            groupName: "Activities"
            },
            {
            id: "105",
            name: "Nightclub",
            groupName: "Activities"
            },
            {
            id: "112",
            name: "Horse Riding",
            groupName: "Activities"
            },
            {
            id: "117",
            name: "Ski room",
            groupName: "General"
            },
            {
            id: "124",
            name: "Free local telephone calls",
            groupName: "Services"
            },
            {
            id: "129",
            name: "Water Sports",
            groupName: "Activities"
            },
            {
            id: "131",
            name: "Wi-Fi in public areas",
            groupName: "General"
            },
            {
            id: "136",
            name: "English",
            groupName: "Staff languages"
            },
            {
            id: "143",
            name: "Russian",
            groupName: "Staff languages"
            },
            {
            id: "5",
            name: "Telephone",
            groupName: "Room"
            },
            {
            id: "12",
            name: "Shops",
            groupName: "General"
            },
            {
            id: "24",
            name: "Internet Access",
            groupName: "Internet"
            },
            {
            id: "29",
            name: "Disabled facilities",
            groupName: "General"
            },
            {
            id: "31",
            name: "Daily newspaper",
            groupName: "Room"
            },
            {
            id: "36",
            name: "Garden",
            groupName: "General"
            },
            {
            id: "43",
            name: "Reception",
            groupName: "General"
            },
            {
            id: "48",
            name: "Massage",
            groupName: "Activities"
            },
            {
            id: "50",
            name: "24h. Reception",
            groupName: "General"
            },
            {
            id: "62",
            name: "Inhouse movies",
            groupName: "Room"
            },
            {
            id: "67",
            name: "Crib available",
            groupName: "Room"
            },
            {
            id: "74",
            name: "Medical Service",
            groupName: "Services"
            },
            {
            id: "79",
            name: "Water sports (non-motorized)",
            groupName: "Activities"
            },
            {
            id: "81",
            name: "Library",
            groupName: "General"
            },
            {
            id: "86",
            name: "Heated pool",
            groupName: "Activities"
            },
            {
            id: "93",
            name: "Casino",
            groupName: "Activities"
            },
            {
            id: "98",
            name: "Games Room",
            groupName: "Activities"
            },
            {
            id: "101",
            name: "Billiards",
            groupName: "Activities"
            },
            {
            id: "106",
            name: "Welcome drink",
            groupName: "General"
            },
            {
            id: "113",
            name: "Diving",
            groupName: "Activities"
            },
            {
            id: "118",
            name: "Gift Shop",
            groupName: "General"
            },
            {
            id: "120",
            name: "Wheel chair access",
            groupName: "General"
            },
            {
            id: "125",
            name: "Handicapped Room",
            groupName: "Room"
            },
            {
            id: "132",
            name: "Smoking room",
            groupName: "Hotel"
            },
            {
            id: "137",
            name: "French",
            groupName: "Staff languages"
            },
            {
            id: "144",
            name: "Cleaning",
            groupName: "Room"
            },
            {
            id: "6",
            name: "Business center",
            groupName: "Services"
            },
            {
            id: "13",
            name: "Laundry service",
            groupName: "Services"
            },
            {
            id: "18",
            name: "Radio",
            groupName: "Room"
            },
            {
            id: "20",
            name: "Meeting facilities",
            groupName: "General"
            },
            {
            id: "25",
            name: "Room Service",
            groupName: "Services"
            },
            {
            id: "32",
            name: "In-room safe",
            groupName: "Room"
            },
            {
            id: "37",
            name: "Outdoor pool",
            groupName: "Activities"
            },
            {
            id: "44",
            name: "Concierge",
            groupName: "Services"
            },
            {
            id: "49",
            name: "Hotel/airport transfer",
            groupName: "Services"
            },
            {
            id: "51",
            name: "Voice mail",
            groupName: "Room"
            },
            {
            id: "56",
            name: "Car parking",
            groupName: "Parking"
            },
            {
            id: "63",
            name: "Babysitting",
            groupName: "Services"
            },
            {
            id: "68",
            name: "Indoor pool",
            groupName: "Activities"
            },
            {
            id: "70",
            name: "Golf course (on site)",
            groupName: "Activities"
            },
            {
            id: "75",
            name: "Multilingual staff",
            groupName: "General"
            },
            {
            id: "82",
            name: "Wellness",
            groupName: "Activities"
            },
            {
            id: "87",
            name: "Kids pool",
            groupName: "Activities"
            },
            {
            id: "94",
            name: "Beauty Salon",
            groupName: "Services"
            },
            {
            id: "99",
            name: "Video/DVD Player",
            groupName: "Room"
            },
            {
            id: "102",
            name: "Private beach",
            groupName: "General"
            },
            {
            id: "107",
            name: "LGBT friendly",
            groupName: "General"
            },
            {
            id: "114",
            name: "Mini-Supermarket",
            groupName: "General"
            },
            {
            id: "119",
            name: "Eco Friendly",
            groupName: "General"
            },
            {
            id: "121",
            name: "Security Guard",
            groupName: "General"
            },
            {
            id: "126",
            name: "Luggage Service",
            groupName: "Services"
            },
            {
            id: "133",
            name: "Wi-Fi in room",
            groupName: "Room"
            },
            {
            id: "138",
            name: "Deutsch",
            groupName: "Staff languages"
            },
            {
            id: "140",
            name: "Arabic",
            groupName: "Staff languages"
            },
            {
            id: "145",
            name: "Deposit",
            groupName: "Hotel"
            },
            {
            id: "2",
            name: "Hairdryer",
            groupName: "Room"
            },
            {
            id: "7",
            name: "Shower",
            groupName: "Room"
            },
            {
            id: "14",
            name: "Bar",
            groupName: "General"
            },
            {
            id: "19",
            name: "Desk",
            groupName: "Room"
            },
            {
            id: "21",
            name: "Elevator",
            groupName: "General"
            },
            {
            id: "26",
            name: "Bathtub",
            groupName: "Room"
            },
            {
            id: "33",
            name: "Balcony/terrace",
            groupName: "Room"
            },
            {
            id: "38",
            name: "Swimming Pool",
            groupName: "Activities"
            },
            {
            id: "40",
            name: "Gym / Fitness Centre",
            groupName: "Activities"
            },
            {
            id: "45",
            name: "Tours",
            groupName: "Activities"
            },
            {
            id: "52",
            name: "Lobby",
            groupName: "General"
            },
            {
            id: "57",
            name: "Jacuzzi",
            groupName: "Activities"
            },
            {
            id: "64",
            name: "Banquet Facilities",
            groupName: "General"
            },
            {
            id: "69",
            name: "Currency Exchange",
            groupName: "Services"
            },
            {
            id: "71",
            name: "Electronic room keys",
            groupName: "Room"
            },
            {
            id: "76",
            name: "Parasols",
            groupName: "General"
            },
            {
            id: "83",
            name: "Wi-Fi Available",
            groupName: "Internet"
            },
            {
            id: "88",
            name: "Breakfast to go",
            groupName: "Services"
            },
            {
            id: "95",
            name: "Steam Room",
            groupName: "General"
            },
            {
            id: "103",
            name: "Squash courts",
            groupName: "Activities"
            },
            {
            id: "108",
            name: "Water sports (motorized)",
            groupName: "Activities"
            },
            {
            id: "110",
            name: "Slippers",
            groupName: "Room"
            },
            {
            id: "115",
            name: "Mini Golf",
            groupName: "Activities"
            },
            {
            id: "122",
            name: "Children care/activities",
            groupName: "Activities"
            },
            {
            id: "127",
            name: "Copying Services",
            groupName: "Services"
            },
            {
            id: "134",
            name: "Daily Housekeeping",
            groupName: "Room"
            },
            {
            id: "139",
            name: "Spanish",
            groupName: "Staff languages"
            },
            {
            id: "141",
            name: "Italian",
            groupName: "Staff languages"
            },
            {
            id: "146",
            name: "Private Bathroom",
            groupName: "Room"
            },
            {
            id: "3",
            name: "Safe",
            groupName: "Room"
            },
            {
            id: "8",
            name: "Non-smoking rooms",
            groupName: "Room"
            },
            {
            id: "10",
            name: "Separate shower and tub",
            groupName: "Room"
            },
            {
            id: "15",
            name: "Sauna",
            groupName: "Activities"
            },
            {
            id: "22",
            name: "Bathroom",
            groupName: "Room"
            },
            {
            id: "27",
            name: "Coffee/tea maker",
            groupName: "Room"
            },
            {
            id: "41",
            name: "Cafe",
            groupName: "General"
            },
            {
            id: "46",
            name: "Conference Facilities",
            groupName: "General"
            },
            {
            id: "53",
            name: "Kitchenette",
            groupName: "Room"
            },
            {
            id: "58",
            name: "Bicycle rental",
            groupName: "Activities"
            },
            {
            id: "60",
            name: "Microwave",
            groupName: "Room"
            },
            {
            id: "65",
            name: "Spa",
            groupName: "Activities"
            },
            {
            id: "72",
            name: "Solarium",
            groupName: "Activities"
            },
            {
            id: "77",
            name: "Luggage room",
            groupName: "General"
            },
            {
            id: "84",
            name: "Cloakroom",
            groupName: "General"
            },
            {
            id: "89",
            name: "Launderette",
            groupName: "General"
            },
            {
            id: "91",
            name: "Washing machine",
            groupName: "General"
            },
            {
            id: "96",
            name: "Rent a car in the hotel",
            groupName: "Parking"
            },
            {
            id: "104",
            name: "Secretary Service",
            groupName: "Services"
            },
            {
            id: "109",
            name: "Garage",
            groupName: "Parking"
            },
            {
            id: "111",
            name: "Valet service",
            groupName: "Parking"
            },
            {
            id: "116",
            name: "Bowling",
            groupName: "Activities"
            },
            {
            id: "123",
            name: "In-house movie",
            groupName: "General"
            },
            {
            id: "128",
            name: "Porters",
            groupName: "Services"
            },
            {
            id: "130",
            name: "Tour Desk",
            groupName: "General"
            },
            {
            id: "135",
            name: "Connecting rooms",
            groupName: "Room"
            },
            {
            id: "142",
            name: "Chinese",
            groupName: "Staff languages"
            },
            {
            id: "147",
            name: "Shared Bathroom",
            groupName: "Room"
            }
    ], 
    ru: [
            {
            id: "148",
            name: "Adults only",
            groupName: "Основное"
            },
            {
            id: "4",
            name: "Телевизор",
            groupName: "В номере"
            },
            {
            id: "9",
            name: "Ресторан",
            groupName: "Основное"
            },
            {
            id: "11",
            name: "Кондиционер",
            groupName: "В номере"
            },
            {
            id: "16",
            name: "Мини-бар",
            groupName: "В номере"
            },
            {
            id: "23",
            name: "Круглосуточное обслуживание в номерах",
            groupName: "Услуги"
            },
            {
            id: "28",
            name: "Можно с животными",
            groupName: "Основное"
            },
            {
            id: "30",
            name: "Будильник",
            groupName: "Услуги"
            },
            {
            id: "35",
            name: "Гладильная доска",
            groupName: "В номере"
            },
            {
            id: "47",
            name: "Факс",
            groupName: "Услуги"
            },
            {
            id: "54",
            name: "Бесплатная парковка",
            groupName: "Парковка"
            },
            {
            id: "59",
            name: "Условия для лиц с ограниченными возможностями",
            groupName: "Основное"
            },
            {
            id: "61",
            name: "Халаты",
            groupName: "В номере"
            },
            {
            id: "66",
            name: "Холодильник",
            groupName: "В номере"
            },
            {
            id: "73",
            name: "Теннисный корт",
            groupName: "Спорт и отдых"
            },
            {
            id: "78",
            name: "Услуги врача",
            groupName: "Услуги"
            },
            {
            id: "80",
            name: "Игровая площадка",
            groupName: "Спорт и отдых"
            },
            {
            id: "85",
            name: "Терраса для загара",
            groupName: "Основное"
            },
            {
            id: "92",
            name: "Настольный теннис",
            groupName: "Спорт и отдых"
            },
            {
            id: "97",
            name: "Зона для барбекю",
            groupName: "Основное"
            },
            {
            id: "100",
            name: "Анимация",
            groupName: "Спорт и отдых"
            },
            {
            id: "105",
            name: "Ночной клуб",
            groupName: "Спорт и отдых"
            },
            {
            id: "112",
            name: "Катание на лошадях",
            groupName: "Спорт и отдых"
            },
            {
            id: "117",
            name: "Комната для хранения лыж",
            groupName: "Основное"
            },
            {
            id: "124",
            name: "Бесплатные местные телефонные звонки",
            groupName: "Услуги"
            },
            {
            id: "129",
            name: "Водные виды спорта",
            groupName: "Спорт и отдых"
            },
            {
            id: "131",
            name: "Wi-Fi в лобби",
            groupName: "Основное"
            },
            {
            id: "136",
            name: "Английский",
            groupName: "Персонал говорит на"
            },
            {
            id: "143",
            name: "Русский",
            groupName: "Персонал говорит на"
            },
            {
            id: "5",
            name: "Телефон",
            groupName: "В номере"
            },
            {
            id: "12",
            name: "Магазины",
            groupName: "Основное"
            },
            {
            id: "24",
            name: "Доступ в интернет",
            groupName: "Интернет"
            },
            {
            id: "29",
            name: "Удобства для лиц с ограниченными возможностями",
            groupName: "Основное"
            },
            {
            id: "31",
            name: "Ежедневная газета",
            groupName: "В номере"
            },
            {
            id: "36",
            name: "Сад",
            groupName: "Основное"
            },
            {
            id: "43",
            name: "Ресепшн",
            groupName: "Основное"
            },
            {
            id: "48",
            name: "Массаж",
            groupName: "Спорт и отдых"
            },
            {
            id: "50",
            name: "Ресепшн 24 часа",
            groupName: "Основное"
            },
            {
            id: "62",
            name: "Просмотр фильмов в номере",
            groupName: "В номере"
            },
            {
            id: "67",
            name: "Детская кроватка",
            groupName: "В номере"
            },
            {
            id: "74",
            name: "Медицинские услуги",
            groupName: "Услуги"
            },
            {
            id: "79",
            name: "Водные виды спорта (немоторизированные)",
            groupName: "Спорт и отдых"
            },
            {
            id: "81",
            name: "Библиотека",
            groupName: "Основное"
            },
            {
            id: "86",
            name: "Бассейн с подогревом",
            groupName: "Спорт и отдых"
            },
            {
            id: "93",
            name: "Казино",
            groupName: "Спорт и отдых"
            },
            {
            id: "98",
            name: "Игровая комната",
            groupName: "Спорт и отдых"
            },
            {
            id: "101",
            name: "Бильярд",
            groupName: "Спорт и отдых"
            },
            {
            id: "106",
            name: "Бесплатный напиток (welcome drink)",
            groupName: "Основное"
            },
            {
            id: "113",
            name: "Дайвинг",
            groupName: "Спорт и отдых"
            },
            {
            id: "118",
            name: "Сувенирная лавка",
            groupName: "Основное"
            },
            {
            id: "120",
            name: "Доступ для инвалидных колясок",
            groupName: "Основное"
            },
            {
            id: "125",
            name: "Номер для инвалидов",
            groupName: "В номере"
            },
            {
            id: "132",
            name: "Курящие номера",
            groupName: "В отеле"
            },
            {
            id: "137",
            name: "Французский",
            groupName: "Персонал говорит на"
            },
            {
            id: "144",
            name: "Уборка",
            groupName: "В номере"
            },
            {
            id: "6",
            name: "Бизнес-центр",
            groupName: "Услуги"
            },
            {
            id: "13",
            name: "Прачечная",
            groupName: "Услуги"
            },
            {
            id: "18",
            name: "Радио",
            groupName: "В номере"
            },
            {
            id: "20",
            name: "Переговорная комната",
            groupName: "Основное"
            },
            {
            id: "25",
            name: "Обслуживание в номерах",
            groupName: "Услуги"
            },
            {
            id: "32",
            name: "Сейф в номере",
            groupName: "В номере"
            },
            {
            id: "37",
            name: "Открытый бассейн",
            groupName: "Спорт и отдых"
            },
            {
            id: "44",
            name: "Услуги консьержа",
            groupName: "Услуги"
            },
            {
            id: "49",
            name: "Трансфер до аэропорта/отеля",
            groupName: "Услуги"
            },
            {
            id: "51",
            name: "Голосовая почта",
            groupName: "В номере"
            },
            {
            id: "56",
            name: "Парковка для автомобилей",
            groupName: "Парковка"
            },
            {
            id: "63",
            name: "Няня",
            groupName: "Услуги"
            },
            {
            id: "68",
            name: "Крытый бассейн",
            groupName: "Спорт и отдых"
            },
            {
            id: "70",
            name: "Гольф-поле",
            groupName: "Спорт и отдых"
            },
            {
            id: "75",
            name: "Многоязычный персонал",
            groupName: "Основное"
            },
            {
            id: "82",
            name: "Оздоровительные процедуры",
            groupName: "Спорт и отдых"
            },
            {
            id: "87",
            name: "Детский бассейн",
            groupName: "Спорт и отдых"
            },
            {
            id: "94",
            name: "Салон красоты",
            groupName: "Услуги"
            },
            {
            id: "99",
            name: "Видео/DVD плеер",
            groupName: "В номере"
            },
            {
            id: "102",
            name: "Частный пляж",
            groupName: "Основное"
            },
            {
            id: "107",
            name: "Гей-френдли",
            groupName: "Основное"
            },
            {
            id: "114",
            name: "Минимаркет",
            groupName: "Основное"
            },
            {
            id: "119",
            name: "Эко-отель",
            groupName: "Основное"
            },
            {
            id: "121",
            name: "Охрана",
            groupName: "Основное"
            },
            {
            id: "126",
            name: "Камера служба",
            groupName: "Услуги"
            },
            {
            id: "133",
            name: "Wi-Fi в номере",
            groupName: "В номере"
            },
            {
            id: "138",
            name: "Немецкий",
            groupName: "Персонал говорит на"
            },
            {
            id: "140",
            name: "Арабский",
            groupName: "Персонал говорит на"
            },
            {
            id: "145",
            name: "Депозит",
            groupName: "В отеле"
            },
            {
            id: "2",
            name: "Фен",
            groupName: "В номере"
            },
            {
            id: "7",
            name: "Душ",
            groupName: "В номере"
            },
            {
            id: "14",
            name: "Бар",
            groupName: "Основное"
            },
            {
            id: "19",
            name: "Стол",
            groupName: "В номере"
            },
            {
            id: "21",
            name: "Лифт",
            groupName: "Основное"
            },
            {
            id: "26",
            name: "Ванна",
            groupName: "В номере"
            },
            {
            id: "33",
            name: "Балкон/Терраса",
            groupName: "В номере"
            },
            {
            id: "38",
            name: "Бассейн",
            groupName: "Спорт и отдых"
            },
            {
            id: "40",
            name: "Тренажерный зал",
            groupName: "Спорт и отдых"
            },
            {
            id: "45",
            name: "Экскурсии",
            groupName: "Спорт и отдых"
            },
            {
            id: "52",
            name: "Лобби",
            groupName: "Основное"
            },
            {
            id: "57",
            name: "Джакузи",
            groupName: "Спорт и отдых"
            },
            {
            id: "64",
            name: "Банкетный зал",
            groupName: "Основное"
            },
            {
            id: "69",
            name: "Обмен валюты",
            groupName: "Услуги"
            },
            {
            id: "71",
            name: "Электронные ключи",
            groupName: "В номере"
            },
            {
            id: "76",
            name: "Зонтики",
            groupName: "Основное"
            },
            {
            id: "83",
            name: "Wi-Fi",
            groupName: "Интернет"
            },
            {
            id: "88",
            name: "Завтрак на вынос",
            groupName: "Услуги"
            },
            {
            id: "95",
            name: "Сауна/Парная",
            groupName: "Основное"
            },
            {
            id: "103",
            name: "Сквош-корт",
            groupName: "Спорт и отдых"
            },
            {
            id: "108",
            name: "Водные виды спорта (моторизированные)",
            groupName: "Спорт и отдых"
            },
            {
            id: "110",
            name: "Тапочки",
            groupName: "В номере"
            },
            {
            id: "115",
            name: "Мини-гольф",
            groupName: "Спорт и отдых"
            },
            {
            id: "122",
            name: "Развлечения для детей",
            groupName: "Спорт и отдых"
            },
            {
            id: "127",
            name: "Копировальные услуги",
            groupName: "Услуги"
            },
            {
            id: "134",
            name: "Ежедневная уборка",
            groupName: "В номере"
            },
            {
            id: "139",
            name: "Испанский",
            groupName: "Персонал говорит на"
            },
            {
            id: "141",
            name: "Итальянский",
            groupName: "Персонал говорит на"
            },
            {
            id: "146",
            name: "Ванная комната",
            groupName: "В номере"
            },
            {
            id: "3",
            name: "Сейф",
            groupName: "В номере"
            },
            {
            id: "8",
            name: "Номера для некурящих",
            groupName: "В номере"
            },
            {
            id: "10",
            name: "Отдельный душ и ванна",
            groupName: "В номере"
            },
            {
            id: "15",
            name: "Сауна",
            groupName: "Спорт и отдых"
            },
            {
            id: "22",
            name: "Ванная",
            groupName: "В номере"
            },
            {
            id: "27",
            name: "Кофеварка/Чайник",
            groupName: "В номере"
            },
            {
            id: "41",
            name: "Кафе",
            groupName: "Основное"
            },
            {
            id: "46",
            name: "Конференц-зал",
            groupName: "Основное"
            },
            {
            id: "53",
            name: "Кухня",
            groupName: "В номере"
            },
            {
            id: "58",
            name: "Прокат велосипедов",
            groupName: "Спорт и отдых"
            },
            {
            id: "60",
            name: "Микроволновая печь",
            groupName: "В номере"
            },
            {
            id: "65",
            name: "Спа",
            groupName: "Спорт и отдых"
            },
            {
            id: "72",
            name: "Солярий",
            groupName: "Спорт и отдых"
            },
            {
            id: "77",
            name: "Камера хранения",
            groupName: "Основное"
            },
            {
            id: "84",
            name: "Гардероб",
            groupName: "Основное"
            },
            {
            id: "89",
            name: "Прачечная",
            groupName: "Основное"
            },
            {
            id: "91",
            name: "Стиральная машина",
            groupName: "Основное"
            },
            {
            id: "96",
            name: "Прокат автомобилей в отеле",
            groupName: "Парковка"
            },
            {
            id: "104",
            name: "Услуги секретаря",
            groupName: "Услуги"
            },
            {
            id: "109",
            name: "Гараж",
            groupName: "Парковка"
            },
            {
            id: "111",
            name: "Услуги парковки",
            groupName: "Парковка"
            },
            {
            id: "116",
            name: "Боулинг",
            groupName: "Спорт и отдых"
            },
            {
            id: "123",
            name: "Внутренний кино-канал",
            groupName: "Основное"
            },
            {
            id: "128",
            name: "Портье",
            groupName: "Услуги"
            },
            {
            id: "130",
            name: "Экскурсионное бюро",
            groupName: "Основное"
            },
            {
            id: "135",
            name: "Смежные номера",
            groupName: "В номере"
            },
            {
            id: "142",
            name: "Китайский",
            groupName: "Персонал говорит на"
            },
            {
            id: "147",
            name: "Общая ванная",
            groupName: "В номере"
            }
        ]
}
