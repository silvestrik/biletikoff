export const hotelType = (ln, id) => {
    
    const wordObject = {
        en: {
            0: "Other",
            1: "Hotel",
            2: "Apartment Hotel",
            3: "Bed & Breakfast",
            4: "Apartment / Condominium",
            5: "Motel",
            6: "Guest House",
            7: "Hostel",
            8: "Resort",
            9: "Farm Stay",
            10: "Vacation Rental",
            11: "Lodge",
            12: "Villa",
            13: "Room"
        },
        ru: {
            0: "Другое",
            1: "Отель",
            2: "Апартотель",
            3: "Ночлег и завтрак",
            4: "Апартаменты",
            5: "Мотель",
            6: "Гостевой дом",
            7: "Хостел",
            8: "Резорт",
            9: "Ферма",
            10: "Аренда жилья",
            11: "Небольшой дом",
            12: "Вилла",
            13: "Room"
        }
    }
    
    const translate = wordsObject[ln][id]
    
    return translate
}

