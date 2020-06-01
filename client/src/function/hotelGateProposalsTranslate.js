export const hotelGateProposalsTranslate = (word, lang) => {

    const wordsObject = {
        deposit: {
            en: 'deposit',
            ru: 'оплата при бронировании'
        },
        breakfast : {
            en: 'Breakfast included',
            ru: 'Завтрак включен'
        },
        refundable: {
            en: 'refundable',
            ru: 'есть возврат'
        },
        cardRequired: {
            en: 'cardRequired',
            ru: 'Нужна карта банка'
        },
        smoking: {
            en: 'smoking',
            ru: 'можно курить в номере'
        },
        freeWifi: {
            en: 'freeWifi',
            ru: 'Wifi в номере'
        },
        hotelWebsite: {
            en: 'hotelWebsite',
            ru: 'бронировать на сайте отеля'
        },
        beds: {
            en: 'Beds',
            ru: 'Отдельные кровати'
        },
        halfBoard: {
            en: 'HalfBoard',
            ru: 'Полупансион'
        }
    }    
   
    try {
        return wordsObject[word][lang]
    } catch (e) {
        return word
    }
}
