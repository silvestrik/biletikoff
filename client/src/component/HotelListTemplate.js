import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//modal window
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css'
//fa icons
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { preHotelSearch } from '../redux/actions/dataActions'
import { hotelAmenities } from '../function/hotelAmenities'
//курс валюты
import { getPrice } from '../function/getPrice'
// HotelCard
import HotelCardTemplate from '../component/HotelCardTemplate'
// карта
import HotelMap from './HotelMap';

class HotelListTemplate extends Component {

    // обновить поиск
    refreshSearch  = event => {
        event.preventDefault()
        this.props.preHotelSearch()
    }

    render() {
        const data = this.props.hotel
        return (
            <div className="result-item">                
                <div className="result-head">
                    <div className="row">                    
                        <div className="col-lg-12 col-md-12">
                            <div className="result-head__air">                               
                                <span style={{marginRight: 10}}>{data.name}</span>                                
                                { data.stars > 0 && <span className = {`hotel-class hotel-class_${data.stars}`}></span> } 
                            </div>
                        </div>                     
                    </div>
                </div>                
                <div className="row" style={{minHeight: 200}}>
                    <div className="col-md-4 col-sm-12 col-12">
                            <div className="search-hotel-image">
                                <img src={`https://photo.hotellook.com/image_v2/limit/h${data.id}_1/286/200.auto`}
                                alt={data.name}
                                style={{width:"100%", height: 200, objectFit: "cover", borderRadius: '0 0 0 10px'}}/>                              
                            </div>
                            { data.rating >0 && 
                                <span className="rating_hotel">{ data.rating/10 }</span>
                            }
                    </div>
                    <div className="col-md-5 col-sm-12 col-12">
                        { data.address  !== '' && <p style={{fontSize: 12}}><FontAwesomeIcon icon={faMapMarkerAlt} /> {data.address }</p> }
                        <p>
                            { hotelAmenities(this.props.language, data.amenities).slice(0, 10).map((item, index) => (
                                <span className="amenities" key={index}>{item}</span>
                            ))
                            }
                        </p>
                        <p style={{fontSize: 12}}><strong>Расстояние от центра: </strong> { data.distance } км &nbsp;   
                            <>                     
                            <button className="btn btn-link btn-sm" onClick={() => this.refs.map.open() }> На карте</button>   
                            <PureModal                                                          
                                onClose={() => {                    
                                    return true;
                                }}               
                                ref="map"
                                width="95%"                               
                                >
                                <HotelMap lat={data.location.lat} lon ={data.location.lon} hotelName = {data.name} />
                            </PureModal>       
                            </>                 
                        </p> 
                    </div>
                    <div className="col-md-3 col-sm-12 col-12" style={{textAlign: "center"}}>                             
                            <div className="price col-md-12 col-sm-4 col-4">
                                <p style={{fontSize: "18px", fontWeight: "600", color: "rgb(38, 79, 103)"}}> 
                                    {getPrice(data.rooms[0].total, this.props.currency)}                                
                                </p>
                                <span className="flight__date">За {this.props.lengthOfStay} ночей</span>
                            </div>
                            { this.props.hotelSearchId === '' && 
                                <button className="btn btn-danger btn-sm" onClick={ this.refreshSearch } style={{marginTop: 20}}>Обновить</button>
                            }
                            { this.props.hotelSearchId !== '' && 
                                <button className="btn btn-success btn-sm" onClick={() => this.refs.modal.open() } style={{marginTop: 20}}>Подробнее</button>
                            }
                            <PureModal                                                          
                                onClose={() => {                    
                                    return true;
                                }}               
                                ref="modal"
                                width="100%"                               
                                >
                                <HotelCardTemplate hotelData = {data}/>
                            </PureModal>                            
                            <div className="more col-md-12 col-sm-4 col-4">
                                <img src={` http://pics.avs.io/hl_gates/100/50/${data.rooms[0].agencyId}.png`}
                                alt={data.rooms[0].agencyName}/>
                            </div>
                    </div>                            
                </div>
            </div>
        )
    }
}

HotelListTemplate.propTypes = {
    preHotelSearch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    hotelSearchId: state.data.hotelParams.hotelSearchId, 
    language: state.UI.language.toLowerCase(),
    lengthOfStay: state.data.hotelParams.formData.lengthOfStay,
    currency: state.UI.currency
})

const mapDispatchToProps = { preHotelSearch }

export default connect(mapStateToProps, mapDispatchToProps)(HotelListTemplate)
