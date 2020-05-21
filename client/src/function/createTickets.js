export const createTickets = _results => {
   
    const ticketsTemp = [] 
    
    //первичная сборка билета
    _results.forEach(val => {
        const airlines = val.airlines
        const airports = val.airports      
        const search_id = val.search_id      

        if (val.proposals) {

            for( var k in val.proposals) {
                const stops = val.proposals[k].max_stops    
                const direct_flights = val.proposals[k].segment[0].flight       
                
                if(val.proposals[k].segment[1]){
                  // eslint-disable-next-line
                    var return_flights = val.proposals[k].segment[1].flight
                } else {
                  // eslint-disable-next-line
                    var return_flights = '' 
                } 
        
                const main_airline = val.proposals[k].validating_carrier        
                const sign = val.proposals[k].sign 

                var i
        
                for( i in val.gates_info){
                  var  label = val.gates_info[i].label
                  var  payment_methods = val.gates_info[i].payment_methods
                  var  gateId = parseInt(i, 10)
                }
        
                for( i in val.proposals[k].terms){
                  var price = parseInt(val.proposals[k].terms[i].unified_price)
                  var order_urls =  parseInt(val.proposals[k].terms[i].url)
                  var flights_baggage = val.proposals[k].terms[i].flights_baggage
                  var flights_handbags = val.proposals[k].terms[i].flights_handbags
                }  
        
                for( i in direct_flights){         	
                    direct_flights[i].flights_baggage = flights_baggage[0][i] 
                    direct_flights[i].flights_handbags = flights_handbags[0][i]  	
                }
        
                if(return_flights.length>0){
                    for( i in return_flights){         	
                        return_flights[i].flights_baggage = flights_baggage[1][i]
                        return_flights[i].flights_handbags = flights_handbags[1][i]   	
                    }
                }               
        
                const ticketTempValues = {
                      'sign'            : sign,
                      'airlines'        : airlines,
                      'airports'        : airports,
                      'stops'           : stops,
                      'direct_flights'  : direct_flights,
                      'return_flights'  : return_flights,
                      'main_airline'    : main_airline,              
                      'label'           : label,
                      'payment_methods' : payment_methods,
                      'price'           : price,
                      'order_urls'      : order_urls,    
                      'gateId'          : gateId,
                      'flights_baggage' : flights_baggage,
                      'flights_handbags': flights_handbags,
                      'search_id'       : search_id
                }
                  
                if(!ticketsTemp[sign]) ticketsTemp[sign] = []
                  
                ticketsTemp[sign].push(ticketTempValues)                
              }
        }       
        //console.log('ticketsTemp', ticketsTemp)
        ticketsBuild(ticketsTemp)
    })

    
    //сборка билета для рендеринга
    function ticketsBuild(ticketsTemp) {       
        _results['tickets'] = []
        var ticketKey = 0

        for (var key in ticketsTemp){
            
            //const price = []
            //const order_urls =  []
            const payment_methods = []  
            const total = []

            // eslint-disable-next-line  
            ticketsTemp[key].forEach((value, index) => {                
                
                const elem = ticketsTemp[key][index]
                               
                const airlines = elem.airlines
                var airports = elem.airports
                const stops = elem.stops
                const search_id = elem.search_id
                const direct_flights = elem.direct_flights                

                if(elem.return_flights && elem.return_flights !==''){
                    // eslint-disable-next-line
                    var return_flights = elem.return_flights
                    } else {
                    // eslint-disable-next-line
                    var return_flights = ''
                }
              
                const main_airline = elem.main_airline
                const sign = elem.sign
                //price[index] = {price : elem.price, label:elem.label, payment_methods:elem.payment_methods }
                //order_urls[index] = elem.order_urls
                payment_methods[index] = elem.payment_methods                
                
                const flights_baggage =  elem.flights_baggage
                const flights_handbags =  elem.flights_handbags 
                
                total[index] =  { gateId: elem.gateId, price: elem.price, label: elem.label, order_urls: elem.order_urls, 
                  payment_methods: elem.payment_methods }    
                
                //console.log('total', total)
                
                var ticketValues = {
                    airlines, airports, stops, direct_flights, return_flights, main_airline, sign, payment_methods, 
                    total, flights_baggage, flights_handbags, search_id
                    } 
                _results['tickets'][ ticketKey ] = ticketValues  
                
            })          
            ticketKey++;              
        }     
        //console.log('ticketsBuild', _results['tickets']); 
        
        ticketRender()
    }

    //рендеринг билета
    function ticketRender(){

        var months_names  = [
            ["январь", "января"],
            ["февраль", "февраля"],
            ["март", "марта"],
            ["апрель", "апреля"],
            ["май", "мая"],
            ["июнь", "июня"],
            ["июль", "июля"],
            ["август", "августа"],
            ["сентябрь", "сентября"],
            ["октябрь", "октября"],
            ["ноябрь", "ноября"],
            ["декабрь", "декабря"]
        ];  
        
        var weekdays_names = [
            ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
            ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
        ];
        
        //var monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        //var dayNamesMin = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

        var j=0; 
      
        for(var i in _results['tickets']) {
          
          _results['tickets'][i]['index']=j;    
      
          var duration=0, delay=0, through='';
      
          // min price in item ticket
          const arr = [];
          for(let k in _results['tickets'][i]['total'] ){
            arr.push(_results['tickets'][i]['total'][k]['price']);
          }
          var min_total = Math.min.apply(null,arr);
      
          const total=[]; // не тот тотал, что в выше !!!!!!!!!!!!!
          for(let k in _results['tickets'][i]['total'] ){
            if(_results['tickets'][i]['total'][k]['price']===min_total){
              total.push(_results['tickets'][i]['total'][k]);
              break;
            }
          }     
      
          _results['tickets'][i]['min_total'] = total;
          
          for(var k in _results['tickets'][i]['direct_flights']){
            
            var t=_results['tickets'][i]['direct_flights'][k];
            
            if(k===0) through+="<b>"+getAirport(t['departure'])+"</b>";
            through+=' <span className="result-head__arrow"></span> ';      
      
            // t['dep_city'] = getAirport(t['departure']) + '<span> ' + t['departure']  + '</span>';
            // t['arr_city'] = getAirport(t['arrival']) + '<span> ' + t['arrival']  + '</span>'; 

            t['dep_city'] = getAirport(t['departure']); 
            t['dep_city_iata'] = t['departure'];
            t['arr_city'] = getAirport(t['arrival']); 
            t['arr_city_iata'] = t['arrival'];             
            
            if(k===_results['tickets'][i]['direct_flights'].length-1) 
            
            through+="<b>"+getAirport(t['arrival'])+"</b>"; 
            else through+=getAirport(t['arrival']);  
      
            //duration+=t['delay']+t['duration'];
            duration+=t['duration'];
            delay+=t['delay'];

            const jsdate1=new Date(t['local_departure_timestamp']*1000);
            //t['departure_str'] =  pad(jsdate1.getUTCHours(), 2)+':'+pad(jsdate1.getUTCMinutes(), 2)+' <span>'+jsdate1.getUTCDate()+' '+months_names[jsdate1.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate1.getUTCDay()]+')</span>';
            //t['departure_str'] =  pad(jsdate1.getUTCHours(), 2)+':'+pad(jsdate1.getUTCMinutes(), 2)+' '+jsdate1.getUTCDate()+' '+months_names[jsdate1.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate1.getUTCDay()]+')';
            t['departure_str_time'] = pad( jsdate1.getUTCHours(), 2)+':'+pad(jsdate1.getUTCMinutes(), 2)
            t['departure_str_date'] = jsdate1.getUTCDate() + ' ' + months_names[jsdate1.getUTCMonth()][1]+' ('+weekdays_names[0][jsdate1.getUTCDay()]+')'
            t['departure_ts'] = ( pad(jsdate1.getUTCHours(), 2)*60*60 + pad(jsdate1.getUTCMinutes(), 2)*60 );
            const jsdate2=new Date(t['local_arrival_timestamp']*1000);
            //t['arrival_str'] =  pad(jsdate2.getUTCHours(), 2)+':'+pad(jsdate2.getUTCMinutes(), 2)+' <span>'+jsdate2.getUTCDate()+' '+months_names[jsdate2.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate2.getUTCDay()]+')</span>';
            //t['arrival_str'] =  pad(jsdate2.getUTCHours(), 2)+':'+pad(jsdate2.getUTCMinutes(), 2)+' '+jsdate2.getUTCDate()+' '+months_names[jsdate2.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate2.getUTCDay()]+')'
            t['arrival_str_time'] =  pad(jsdate2.getUTCHours(), 2)+':'+pad(jsdate2.getUTCMinutes(), 2)
            t['arrival_str_date'] =  jsdate2.getUTCDate() + ' ' + months_names[jsdate2.getUTCMonth()][1]+' ('+weekdays_names[0][jsdate2.getUTCDay()]+')';
            t['arrival_ts'] = ( pad(jsdate2.getUTCHours(), 2)*60*60 + pad(jsdate2.getUTCMinutes(), 2)*60 );          

          }
      
          if(_results['tickets'][i]['return_flights']) {
              for(let k in _results['tickets'][i]['return_flights']){
                var durationComback=0
                var delayComback=0
                var throughComback=''
                let t=_results['tickets'][i]['return_flights'][k];
                //durationComback+=t['delay']+t['duration'];
                durationComback+=t['duration'];
                delayComback+=t['delay'];
                throughComback+=' <span className="result-head__arrow"></span> ';
                if(k===_results['tickets'][i]['return_flights'].length-1) throughComback+="<b>"+getAirport(t['arrival'])+"</b>"; else throughComback+=getAirport(t['arrival']);
        
              //   t['dep_city'] = getAirport(t['departure']) + '<span> ' + t['departure']  + '</span>';
              //   t['arr_city'] = getAirport(t['arrival']) + '<span> ' + t['arrival']  + '</span>';
              t['dep_city'] = getAirport(t['departure']); 
              t['dep_city_iata'] = t['departure'];
              t['arr_city'] = getAirport(t['arrival']); 
              t['arr_city_iata'] = t['arrival']; 
        
                const jsdate3=new Date(t['local_departure_timestamp']*1000);
                //t['departure_str'] =  pad(jsdate3.getUTCHours(), 2)+':'+pad(jsdate3.getUTCMinutes(), 2)+' <span>'+jsdate3.getUTCDate()+' '+months_names[jsdate3.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate3.getUTCDay()]+')</span>';
                t['departure_str_time'] = pad( jsdate3.getUTCHours(), 2)+':'+pad(jsdate3.getUTCMinutes(), 2) 
                t['departure_str_date'] = jsdate3.getUTCDate() + ' ' + months_names[jsdate3.getUTCMonth()][1]+' ('+weekdays_names[0][jsdate3.getUTCDay()]+')'
                //t['departure_str'] =  pad(jsdate3.getUTCHours(), 2)+':'+pad(jsdate3.getUTCMinutes(), 2)+' '+jsdate3.getUTCDate()+' '+months_names[jsdate3.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate3.getUTCDay()]+')';
                t['departure_ts'] = ( pad(jsdate3.getUTCHours(), 2)*60*60 + pad(jsdate3.getUTCMinutes(), 2)*60 );
                const jsdate4=new Date(t['local_arrival_timestamp']*1000);
                //t['arrival_str'] =  pad(jsdate4.getUTCHours(), 2)+':'+pad(jsdate4.getUTCMinutes(), 2)+' <span>'+jsdate4.getUTCDate()+' '+months_names[jsdate4.getUTCMonth()][1]+' ('+weekdays_names[1][jsdate4.getUTCDay()]+')</span>';
                t['arrival_str_time'] =  pad(jsdate4.getUTCHours(), 2)+':'+pad(jsdate4.getUTCMinutes(), 2)
                t['arrival_str_date'] =  jsdate4.getUTCDate() + ' ' + months_names[jsdate4.getUTCMonth()][1]+' ('+weekdays_names[0][jsdate4.getUTCDay()]+')';
                t['arrival_ts'] = ( pad(jsdate4.getUTCHours(), 2)*60*60 + pad(jsdate4.getUTCMinutes(), 2)*60 );
              }

              _results['tickets'][i]['durationComback']=durationComback;
              _results['tickets'][i]['delayComback']=delayComback;
              _results['tickets'][i]['throughComback']=throughComback;

              _results['tickets'][i]['ts_departure_comback'] = _results['tickets'][i]['return_flights'][0]['departure_ts'];
              _results['tickets'][i]['ts_arrival_comback'] = _results['tickets'][i]['return_flights'][ _results['tickets'][i]['return_flights'].length-1 ]['arrival_ts'];
          }
              
          
          // eslint-disable-next-line
          function getAirport(t){
            return _results['tickets'][i]['airports'][t]['city'];
          }
            
          _results['tickets'][i]['duration']=duration;
          _results['tickets'][i]['delay']=delay;
          _results['tickets'][i]['through']=through;          
      
          _results['tickets'][i]['ts_departure'] = _results['tickets'][i]['direct_flights'][0]['departure_ts'];
          _results['tickets'][i]['ts_arrival'] = _results['tickets'][i]['direct_flights'][ _results['tickets'][i]['direct_flights'].length-1 ]['arrival_ts'];
         
          j++;
        }
        //console.log('ticketRender', _results.tickets);
      }

      //вспомогательные функции
      function pad(n, c){
        if ((n+'').length<c) return '0'+n; else return n;
      }   

    return _results.tickets
}
