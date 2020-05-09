export const sortByPrice = filtered => {
    for(var i=filtered.length-1; i>=0; i--) {
        for(var j=i-1; j>=0; j--) {
            if(filtered[i].min_total[0].price<filtered[j].min_total[0].price){
                const tmp=filtered[i];
                filtered[i]=filtered[j];
                filtered[j]=tmp;
            }
        }
    }

    return sortByPrice
}

export const setCheapestTicket = filtered => {
    var filteredCopy = Object.assign([], filtered) 
    var price_min = 9999999, imin = -1;
    for(var i=0; i<filteredCopy.length; i++) {
        if ( price_min > (filteredCopy[i].min_total[0].price * 1) ) {
            price_min = (filteredCopy[i].min_total * 1);
            imin = i;
        }
    }
    const cheap = ( imin > -1 ? { index: imin, item: filteredCopy[imin]} : false );
    filteredCopy.splice(cheap.index, 1);
    const cheapest = []
    cheapest.push(cheap.item)

    return cheapest
}

export const setFastestTicket = filtered => {
    var filteredCopy = Object.assign([], filtered) 
    var timestamp_min = 9999999, imin = -1;
    for(var i=0; i<filteredCopy.length; i++) {
        if ( timestamp_min > filteredCopy[i].duration ) {
            timestamp_min = filteredCopy[i].duration;
            imin = i;
        }
    }
    const dear = ( imin > -1 ? {index: imin, item: filteredCopy[imin]} : false );
    filteredCopy.splice(dear.index, 1);
    const fastest = []
    fastest.push(dear.item)

    return fastest
}