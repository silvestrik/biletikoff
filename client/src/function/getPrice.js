export const getPrice = (t, _currency) => {
    var str='';
    var i;
    // eslint-disable-next-line
    if(_currency !== 'rub') t=Math.ceil(t*1/eval("currency_rates."+ _currency));
    t=''+t;
    str='';
    if(t.length>3){
        for(i=0;i<t.length;i++){
            str+=t[i];
            if((i<t.length-1) && (t.length-1-i)%3===0) str+=' ';
        }
    } else str=t;

    //TODO можно взять из масива валют (props)
    if(_currency==='rub') str+=' P'; else
    if(_currency==='usd') str+=' $'; else
    if(_currency==='eur') str+=' €'; else
    if(_currency==='uah') str+=' грн'; else
    if(_currency==='amd') str+=' Դ'; else
    if(_currency==='kzt') str+=' тг'; else
    if(_currency==='thb') str+=' THB'
    return  str;
}
