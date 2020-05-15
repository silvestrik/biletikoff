import React, { Component } from 'react'
import { getPrice } from '../function/getPrice'
import { formatTime } from '../function/formatTime'
import { formatStops, formatBaggage} from '../function/formatData'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { minPriceGate } from '../function/minPriceGate'
import  { getBuyLink, preSimpleSearch } from '../redux/actions/dataActions'
import store from '../redux/store'
//modal window
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
 
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

    // обновить поиск
    refreshSearch  = event => {
        event.preventDefault()
        this.props.preSimpleSearch()
    }
 
    render() {      
        const data = this.props.ticket 
        const type = this.props.type        
        return (  
        <div className="result-item">
            {type === "cheapets" &&  
                <div className="result-head" style={{background: '#b3bc01', color: "#ffffff"}}>
                    <div className="row">                    
                        <div className="col-lg-6 col-md-5">
                            <div className="result-head__air">                               
                                {formatStops(data.stops)} Самый дешевый                                
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
                                {formatStops(data.stops)} Самый быстрый
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
                                {formatStops(data.stops)}  
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
                { this.props.filteredLength>0 && data.direct_flights &&                     
                    <div className="flight">
                        <div className="row" style={{ paddingTop: "5px"}}> 
                            <div className="col-md-1 col-sm-1 col-1">
                                <img 
                                    src={`//pics.avs.io/al_square/36/36/${data.direct_flights[0].operating_carrier}@2x.png`}                                            
                                    alt={data.direct_flights[0].operating_carrier} 
                                    className="flight__logo"   
                                />
                            </div>
                            <div className="col-md-5 col-sm-5 col-5">                            
                                <div className="flight__city">
                                    {data.direct_flights[0].dep_city} <span>{data.direct_flights[0].dep_city_iata}</span>
                                </div>
                                <span className="flight__date">{data.direct_flights[0].departure_str_time}, {data.direct_flights[0].departure_str_date}</span>                       
                            </div>
                            <div className="col-md-5 col-sm-5 col-5">                           
                                <div className="flight__city">
                                    {data.direct_flights[data.direct_flights.length-1].arr_city} <span>{data.direct_flights[data.direct_flights.length-1].arr_city_iata}</span>
                                </div>    
                                <span className="flight__date">{data.direct_flights[data.direct_flights.length-1].arrival_str_time}, {data.direct_flights[data.direct_flights.length-1].arrival_str_date}</span>                       
                            </div>
                        </div>
                    </div>                    
                }               
                { this.props.filteredLength>0 && data.return_flights &&                            
                    <div className="flight">
                        <div className="row" style={{ paddingTop: "5px"}}> 
                            <div className="col-md-1 col-sm-1 col-1">
                                <img 
                                    src={`//pics.avs.io/al_square/36/36/${data.return_flights[0].operating_carrier}@2x.png`}                                            
                                    alt={data.return_flights[0].operating_carrier} 
                                    className="flight__logo"   
                                />
                            </div>
                            <div className="col-md-5 col-sm-5 col-5">                           
                                <div className="flight__city">
                                    {data.return_flights[0].dep_city} <span>{data.return_flights[0].dep_city_iata}</span>
                                </div>
                                <span className="flight__date">{data.return_flights[0].departure_str_time}, {data.return_flights[0].departure_str_date}</span>                       
                            </div>

                            <div className="col-md-5 col-sm-5 col-5">                           
                                <div className="flight__city">
                                    {data.return_flights[data.return_flights.length-1].arr_city} <span>{data.return_flights[data.return_flights.length-1].arr_city_iata}</span>
                                </div>    
                                <span className="flight__date">{data.return_flights[data.return_flights.length-1].arrival_str_time}, {data.return_flights[data.return_flights.length-1].arrival_str_date}</span>                       
                            </div>                                                       
                        </div>
                    </div>
                }
                </div>
                <div className="row col-md-3" style={{textAlign: "right"}}>   
                    <div className="col-sm-1 col-1"></div>            
                    <div className="price col-md-12 col-sm-4 col-4">                       
                        <span style={{fontSize: "18px", fontWeight: "600", color: "#264f67"}}>{getPrice(data.min_total[0].price, this.props.currency)}</span>
                    </div>
                    <div className="col-sm-1 col-1"></div>  
                    <div className="more col-md-12 col-sm-4 col-4">
                            { this.props.search_id === '' && 
                                <button className="btn btn-danger btn-sm" onClick={ this.refreshSearch }>Обновить</button>
                            }
                            { this.props.search_id !== '' && 
                                <button className="btn btn-success btn-sm" onClick={() => this.refs.modal.open() }>Посмотреть</button>
                            } 
                            <PureModal
                                header="Информация о рейсе"                              
                                onClose={() => {                    
                                    return true;
                                }}               
                                ref="modal"
                                width="500px"
                                >
                                { this.props.filteredLength>0 && data.direct_flights &&                                     
                                    <div className="flight__segment_info" style={{marginBottom: "10px"}}>
                                        <div className="flight__segment_data" style={{justifyContent: "start",
                                            background: "#02122c", color: "#ffffff", padding: "5px"
                                        }}>       
                                            <div className="flight__date">
                                            <span><strong>Туда: </strong>перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)}</span>                                             
                                            </div>      
                                        </div>
                                    </div>
                                }                                
                                { this.props.filteredLength>0 && data.direct_flights.map((item, index) => ( 
                                    <div className="flight" key={index}>
                                        <div key={index}> 
                                            <div className="flight__segment_info">
                                                <div className="flight__segment_city">
                                                    <div className="flight__city">
                                                        {item.dep_city} <span>{item.dep_city_iata}</span>                                                   
                                                    </div> 
                                                </div>
                                                <div className="flight__segment_data">       
                                                    <div className="flight__date">
                                                        {item.departure_str_time}, {item.departure_str_date}
                                                    </div>      
                                                </div>                                                             
                                            </div> 
                                            <div className="flight__segment_info">
                                                <div className="flight__segment_city">
                                                    <div className="flight__city">
                                                    <img 
                                                        src={`//pics.avs.io/al_square/36/36/${item.operating_carrier}@2x.png`}                                            
                                                        alt={item.operating_carrier} 
                                                        className="flight__logo"   
                                                        style={{margin: 0}}
                                                    />                                                   
                                                    </div> 
                                                </div>
                                                <div className="flight__segment_data">       
                                                    <div className="flight__date">
                                                        <span style={{paddingRight: "10px"}}><strong>Рейс: </strong></span>
                                                        <span>{item.number} <strong> Самолет: </strong>{item.aircraft}</span>
                                                    </div>      
                                                </div>                                                             
                                            </div>
                                            <div className="flight__segment_info">
                                                <div className="flight__segment_city">
                                                    <div className="flight__city">
                                                        {item.arr_city} <span>{item.arr_city_iata}</span>                                                   
                                                    </div> 
                                                </div>
                                                <div className="flight__segment_data">       
                                                    <div className="flight__date">
                                                        {item.arrival_str_time}, {item.arrival_str_date}
                                                    </div>      
                                                </div>                                                             
                                            </div>
                                            <div className="flight__segment_info" style={{marginBottom: "10px"}}>
                                                <div className="flight__segment_data" style={{justifyContent: "start"}}>       
                                                    <div className="flight__date">
                                                    <span><strong>Багаж: </strong>{formatBaggage(item.flights_baggage)}</span>
                                                        <span style={{paddingLeft: "10px"}}><strong>Ручная кладь: </strong>{formatBaggage(item.flights_handbags)}</span> 
                                                    </div>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                                <div className="flight__segment_info" style={{marginTop: "10px"}}>
                                    <div className="flight__segment_data" style={{justifyContent: "start",
                                        background: "#02122c", color: "#ffffff", padding: "5px"
                                    }}>       
                                        <div className="flight__date">
                                        <span><strong>Обратно: </strong>перелет {formatTime(data.duration)}, пересадки {formatTime(data.delay)}</span>                                             
                                        </div>      
                                    </div>
                                </div>
                                { this.props.filteredLength>0 && data.return_flights && data.return_flights.map((item, index) => ( 
                                    <div className="flight" key={index}>
                                        <div key={index}> 
                                            <div className="flight__segment_info">
                                                <div className="flight__segment_city">
                                                    <div className="flight__city">
                                                        {item.dep_city} <span>{item.dep_city_iata}</span>                                                   
                                                    </div> 
                                                </div>
                                                <div className="flight__segment_data">       
                                                    <div className="flight__date">
                                                        {item.departure_str_time}, {item.departure_str_date}
                                                    </div>      
                                                </div>                                                             
                                            </div> 
                                            <div className="flight__segment_info">
                                                <div className="flight__segment_city">
                                                    <div className="flight__city">
                                                    <img 
                                                        src={`//pics.avs.io/al_square/36/36/${item.operating_carrier}@2x.png`}                                            
                                                        alt={item.operating_carrier} 
                                                        className="flight__logo"   
                                                    />                                                   
                                                    </div> 
                                                </div>
                                                <div className="flight__segment_data">       
                                                    <div className="flight__date">
                                                        <span style={{paddingRight: "10px"}}><strong>Рейс: </strong></span>
                                                        <span>{item.number} <strong> Самолет: </strong>{item.aircraft}</span>
                                                    </div>      
                                                </div>                                                             
                                            </div>
                                            <div className="flight__segment_info">
                                                <div className="flight__segment_city">
                                                    <div className="flight__city">
                                                        {item.arr_city} <span>{item.arr_city_iata}</span>                                                   
                                                    </div> 
                                                </div>
                                                <div className="flight__segment_data">       
                                                    <div className="flight__date">
                                                        {item.arrival_str_time}, {item.arrival_str_date}
                                                    </div>      
                                                </div>                                                             
                                            </div>
                                            <div className="flight__segment_info" style={{marginBottom: "10px"}}>
                                                <div className="flight__segment_data" style={{justifyContent: "start"}}>       
                                                    <div className="flight__date">
                                                    <span><strong>Багаж: </strong>{formatBaggage(item.flights_baggage)}</span>
                                                        <span style={{paddingLeft: "10px"}}><strong>Ручная кладь: </strong>{formatBaggage(item.flights_handbags)}</span> 
                                                    </div>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                                <div className="flight__more_price">                                   
                                        { minPriceGate(data.total).slice(0,this.state.limit).map((item, index) => (
                                            <div className="flight__more_gate" key={index}>                                                
                                                <div className="flight__more_gate_name">
                                                    {item[0].label}
                                                </div>
                                                <div className="flight__more_gate_price_block">
                                                    <div className="flight__more_gate_price_block_price">
                                                        <span>{getPrice(item[0].price, this.props.currency)}</span>       
                                                    </div>                                                    
                                                    { this.props.search_id === '' && 
                                                        <button className="btn btn-danger btn-sm" onClick={ this.refreshSearch }>Обновить</button>
                                                    }

                                                    { this.props.search_id !== '' && 
                                                        <button
                                                            className="btn btn-btn btn-primary btn-sm"                                      
                                                            onClick = { e => this.buyLink(e, item[0].order_urls)}
                                                            >
                                                            Бронировать                                                
                                                        </button>                                                    
                                                    }
                                                </div> 
                                            </div>
                                        )) }
                                        <div className="flight__more_gate">                                                
                                            <div className="flight__more_gate_name">{data.min_total[0].label}</div> 
                                            <div className="flight__more_gate_price_block">
                                                <div className="flight__more_gate_price_block_price">
                                                    <span>{getPrice(data.min_total[0].price, this.props.currency)}</span>       
                                                </div>                                                
                                                { this.props.search_id === '' && 
                                                    <button className="btn btn-danger btn-sm" onClick={ this.refreshSearch }>Обновить</button>
                                                }
                                                { this.props.search_id !== '' && 
                                                    <button
                                                        className="btn btn-btn btn-warning btn-sm"                                      
                                                        onClick = { e => this.buyLink(e, data.min_total[0].order_urls)}
                                                        >
                                                        Бронировать                                                
                                                    </button>
                                                } 
                                            </div> 
                                        </div> 
                                </div>
                            </PureModal>
                    </div>
                </div>                
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
    getBuyLink: PropTypes.func,
    preSimpleSearch: PropTypes.func
}

const mapStateToProps = state => ({
    currency: state.UI.currency,
    filteredLength: state.data.filteredLength,
    search_id: state.data.search_id
})

const mapDispatchToProps = { getBuyLink, preSimpleSearch }

export default connect(mapStateToProps, mapDispatchToProps)(TicketTemplate)
