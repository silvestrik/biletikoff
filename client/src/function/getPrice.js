import store from '../redux/store'

export const getPrice = (t, _currency) => {  

    var currencies  = store.getState().data.currencies 
    var str='';    
   
   
    if(_currency !== 'rub') {
        for (var i in currencies) {
            if(i === _currency) {
                 // eslint-disable-next-line    
                t=Math.ceil(t*1/eval(currencies[i]))
            }
        }        
    }     
    t=''+t;
    str='';
    
    if(t.length>3){
        for(i=0;i<t.length;i++){
            str+=t[i];
            if((i<t.length-1) && (t.length-1-i)%3===0) str+=' ';
        }
    } else str=t;
    
    if(_currency==='rub') str+=' ₽'; else
    if(_currency==='usd') str+=' $'; else
    if(_currency==='eur') str+=' €'; else
    if(_currency==='uah') str+=' грн'; else
    if(_currency==='amd') str+=' Դ'; else
    if(_currency==='kzt') str+=' тг'; else
    if(_currency==='thb') str+=' THB'

    return  str;
}
