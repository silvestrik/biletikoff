import React, { Component } from 'react'
import { getPrice } from '../function/getPrice'
import { formatTime } from '../function/formatTime'
import { formatStops, formatBaggage} from '../function/formatData'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { minPriceGate } from '../function/minPriceGate'
import  { getBuyLink } from '../redux/actions/dataActions'
import store from '../redux/store'
 
class TicketTemplate extends Component {

    constructor(props) {
        super(props)       

        this.state = {
            limit: 5, 
            btnStyle: {display: 'block'}
        }
        this.buyLink = this.buyLink.bind(this.buyLink)
    }

    moreGate = () => {
        this.setState({
            limit: 15,
            btnStyle: {display: 'none'}
        })
    }

    handlerPopupPrice = () => {

    }

    // получаем ссылку для покупки
    buyLink = (e, link) => {    
        //console.log(e)   
        e.preventDefault()
        //const link = e.target.value
        const search_id = store.getState().data.search_id
        if(search_id !=='' && link !=='') {
            this.props.getBuyLink(link, search_id).then(response => {    
                console.log('response.data', response.data)    
                  
                    // для корректной работы с различными агентствами  

                    // const linkelem = React.createElement(
                    //     "img",
                    //         {   
                    //             src: `//yasen.aviasales.ru/adaptors/
                    //             pixel_click.png?click_id=${response.data.click_id}&gate_id=${response.data.gate_id}`,
                    //             width: "0", 
                    //             height:"0",
                    //             id:"pixel"
                    //         }
                    //     )
                    //     this.setState({
                    //         elem: linkelem
                    //     })
                        
                        
                        // `<img alt="" src="//yasen.aviasales.ru/adaptors/
                        // pixel_click.png?click_id=${response.data.click_id}&gate_id=${response.data.gate_id}" 
                        // width="0" height="0" id="pixel"></img>`)
                        //console.log(elem)


                       
                   setTimeout(() => {                        
                        window.open(response.data.url, '_blank')
                   }, 1000)
                })                
                .catch(error => {
                    console.log(error)
                })
        } else {
            console.log('error ')
        }
        
        
    }
 
    render() {      
        const data = this.props.ticket 
        const type = this.props.type

        //const { ticket, data } = this.props
        //const { limit, btnStyle } = this.state
        
        
        return (

            

        <div className="result-item">
            {type === "cheapets" &&  
                <div className="result-head" style={{background: '#b3bc01', color: "#ffffff"}}>
                    <div className="row">                    
                        <div className="col-lg-6 col-md-5">
                            <div className="result-head__air">                               
                                Самый дешевый
                                {/* {data.through} */}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="result-head__time">
                                {/* Туда:  {formatStops(data.stops)}, перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)} */}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {type === "fastest" &&  
                <div className="result-head" style={{background: '#f74730', color: "#ffffff"}}>
                    <div className="row">                    
                        <div className="col-lg-6 col-md-5">
                            <div className="result-head__air">                               
                                Самый быстрый
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="result-head__time">
                                {/* Туда:  {formatStops(data.stops)}, перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)} */}
                            </div>
                        </div>
                    </div>
                </div>             
            }
            {type !== "cheapets" && type !== "fastest" &&
                <div className="result-head">
                    <div className="row">                    
                        <div className="col-lg-6 col-md-5">
                            <div className="result-head__air">                               
                               
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="result-head__time">
                                {/* Туда:  {formatStops(data.stops)}, перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)} */}
                            </div>
                        </div>
                    </div>
                </div> 
            }
            <div className="row">  
                <div className="col-md-9">
                <p className="segment-head">                    
                    {data.direct_flights && <span>{data.direct_flights.length}</span>  }Туда {formatStops(data.stops)}, перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)}                    
                </p> 
                { this.props.filteredLength>0 && data.direct_flights.map((item, index) => (                            
                    <div className="flight" key={index}>
                        <div key={index} className="row" style={{ paddingTop: "10px"}}> 
                            <div className="col-sm-1">
                                <img 
                                    src={`//pics.avs.io/al_square/36/36/${item.operating_carrier}@2x.png`}                                            
                                    alt={item.operating_carrier} 
                                    className="flight__logo"   
                                />
                            </div>
                            <div className="col-sm-5">                            
                                <div className="flight__city">
                                    {item.dep_city} <span>{item.dep_city_iata}</span>
                                </div>
                                <span className="flight__date">{item.departure_str_time}, {item.departure_str_date}</span>                       
                            </div>
                            <div className="col-sm-5">                           
                                <div className="flight__city">
                                    {item.arr_city} <span>{item.arr_city_iata}</span>
                                </div>    
                                <span className="flight__date">{item.arrival_str_time}, {item.arrival_str_date}</span>                       
                            </div>
                    </div>
                            
                            

                            
                            
                            
                            {/* <p style={{width: "100%", marginTop: "10px"}}> 
                              {item.dep_city} ({item.dep_city_iata}) - {item.arr_city} ({item.arr_city_iata}), в пути {formatTime(item.duration)}
                            </p>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4" style={{textAlign: "center"}}>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.dep_city} ({item.dep_city_iata})</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.departure_str_date}</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.departure_str_time}</p>
                                        </div>
                                        <div className="col-md-4" style={{textAlign: "center"}}> 
                                            <div>
                                                <img 
                                                    src={`//pics.avs.io/al_square/36/36/${item.operating_carrier}@2x.png`} 
                                                    style={{width: 24, height: 24}}
                                                    alt={item.operating_carrier}    
                                                />
                                            </div>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.operating_carrier} {item.number}</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.aircraft}</p> 
                                            <p style={{margin: 0, fontSize: "14px"}}>
                                                <strong>Багаж: </strong>{formatBaggage(item.flights_baggage)}                                                 
                                            </p>  
                                            <p style={{margin: 0, fontSize: "14px"}}>                                               
                                                <strong>Ручная кладь: </strong>{formatBaggage(item.flights_handbags)}
                                            </p>                                                                             
                                        </div>
                                        <div className="col-md-4" style={{textAlign: "center"}}>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.arr_city} ({item.arr_city_iata})</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.arrival_str_time}</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.arrival_str_date}</p>
                                        </div>
                                    </div>
                                </div>  */}






                        </div>
                    ))
                } 
                { this.props.filteredLength>0 && data.return_flights && 
                    <div>                   
                        <p className="segment-head">                    
                            Обратно {formatStops(data.stops)}, перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)}                    
                        </p>         
                    </div>       
                }
                  { this.props.filteredLength>0 && data.return_flights && data.return_flights.map((item, index) => (                            
                    <div className="flight" key={index}>
                        <div key={index} className="row" style={{ paddingTop: "10px"}}> 
                            <div className="col-sm-1">
                                <img 
                                    src={`//pics.avs.io/al_square/36/36/${item.operating_carrier}@2x.png`}                                            
                                    alt={item.operating_carrier} 
                                    className="flight__logo"   
                                />
                            </div>
                            <div className="col-sm-5">                            
                                <div className="flight__city">
                                    {item.dep_city} <span>{item.dep_city_iata}</span>
                                </div>
                                <span className="flight__date">{item.departure_str_time}, {item.departure_str_date}</span>                       
                            </div>
                            <div className="col-sm-5">                           
                                <div className="flight__city">
                                    {item.arr_city} <span>{item.arr_city_iata}</span>
                                </div>    
                                <span className="flight__date">{item.arrival_str_time}, {item.arrival_str_date}</span>                       
                            </div>
                        </div>
                    </div>                                      
                ))

                }
                

            </div>
            <div className="col-md-3" style={{textAlign: "center"}}>               
                <div className="price"> 
                    <button 
                        type="button" 
                        className="btn btn-warning"                          
                        onClick = { e => this.buyLink(e, data.min_total[0].order_urls)}
                        >
                        Купить за {getPrice(data.min_total[0].price, this.props.currency)}
                    </button>
                </div>
                <div className="more">
                        <button
                            type="button" 
                            className="more__link"
                            onClick={this.handlerPopupPrice}                                           
                        >     
                            О рейсе                                       
                        </button>
                </div>
            </div>


             




                {/* {this.props.filteredLength>0 && data.return_flights && 
                    <div className="row" style={{marginTop: 15}}>
                        <p style={{width: "100%", margin: 0, fontSize: "14px", background: "#ddd", paddingLeft: "5px"}}>
                        <strong>Обратно: {formatStops(data.stops)},
                         перелет {formatTime(data.durationComback)}, пересадки {formatTime(data.delayComback)}</strong></p>
                    </div> }
                { data.return_flights &&
                    data.return_flights.map((item, index) => (  
                        <div key={index} className="row" style={{ paddingTop: "10px"}}> 
                            <p style={{width: "100%", marginTop: "10px"}}>                        
                              {item.dep_city} ({item.dep_city_iata}) - {item.arr_city} ({item.arr_city_iata}), в пути {formatTime(item.duration)}
                            </p>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4" style={{textAlign: "center"}}>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.dep_city} ({item.dep_city_iata})</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.departure_str_date}</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.departure_str_time}</p>
                                        </div>
                                        <div className="col-md-4" style={{textAlign: "center"}}>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.operating_carrier} {item.number}</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.aircraft}</p> 
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.flights_baggage} {item.flights_handbags}</p>                                                                               
                                        </div>
                                        <div className="col-md-4" style={{textAlign: "center"}}>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.arr_city} ({item.arr_city_iata})</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.arrival_str_time}</p>
                                            <p style={{margin: 0, fontSize: "14px"}}>{item.arrival_str_date}</p>
                                        </div>
                                    </div>
                                </div>                               
                        </div>
                    ))
                }              */}
           
                {/* <div className="col-md-3">   
                        {type === "cheapets"  && <p style={{color: '#9aa204', fontWeight: "bold", textAlign: "center"}}>Самый дешевый</p>} 
                        {type === "fastest" &&   <p style={{color: '#e8402a', fontWeight: "bold",  textAlign: "center"}}>Самый быстрый</p>}            
                    <div>
                        <ul>
                            { minPriceGate(data.total).slice(0,this.state.limit).map((item, index) => (
                                <li style={{listStyleType: "none", textAlign: "left", fontSize: "14px"}} key={index}>
                                    <button
                                        className="btn btn-link"                                      
                                        onClick = { e => this.buyLink(e, item[0].order_urls)}
                                        >
                                        {item[0].label} {getPrice(item[0].price, this.props.currency)}
                                    </button>
                                    { index === 4 && 
                                        <button 
                                            type="button" 
                                            className="btn btn-primary btn-sm"
                                            onClick={this.moreGate}
                                            style={this.state.btnStyle}
                                        >
                                        Показать все
                                        </button> 
                                    }                                  
                                </li>  
                               
                            )) }                        
                        </ul>
                    </div>
                    <div style={{textAlign: "center", paddingBottom: "10px"}}>
                        <button 
                            type="button" 
                            className="btn btn-warning"                          
                            onClick = { e => this.buyLink(e, data.min_total[0].order_urls)}
                            >
                            Купить за {getPrice(data.min_total[0].price, this.props.currency)}
                        </button>  
                        <span>{data.min_total[0].label}</span>         
                    </div>
                </div> */}
            </div>
        </div>
        )
    }
}

TicketTemplate.propTypes = {
    currency: PropTypes.string,
    ticket: PropTypes.object.isRequired,
    filteredLength: PropTypes.number,
    search_id: PropTypes.string,
    getBuyLink: PropTypes.func
}

const mapStateToProps = state => ({
    currency: state.data.currency,
    filteredLength: state.data.filteredLength
})

const mapDispatchToProps = { getBuyLink }

export default connect(mapStateToProps, mapDispatchToProps)(TicketTemplate)
