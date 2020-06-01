import React, { Component } from 'react'
import PropTypes from 'prop-types'
//redux
import { connect } from 'react-redux'
//modal window
//import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css'
//расшифровка типов размещения
import { hotelInternalType } from '../function/hotelInternalType'
//расшифровка опций в номере
import { hotelGateProposalsTranslate } from '../function/hotelGateProposalsTranslate'
//курс валюты
import { getPrice } from '../function/getPrice'
//
import axios from 'axios'
// карта
import HotelMap from './HotelMap';
//обновить поиск
import { preHotelSearch } from '../redux/actions/dataActions'
import Gallery from './Gallery'
import "react-image-gallery/styles/css/image-gallery.css"

class HotelCardTemplate extends Component {

    constructor(props){
        super(props)
        this.state = {
            photosHotel: ''
        }
    }

    componentDidMount() {      
        //массив id фото отеля 
        axios.get(`https://yasen.hotellook.com/photos/hotel_photos?id=${this.props.hotelData.id}`)
            .then(response => {                
                this.setState({
                    photosHotel:  response.data
                }) 
                return response.data            
            })
            .catch(err=> {
                console.log(err)
            })             
    }

    // обновить поиск
    refreshSearch  = event => {
        event.preventDefault()
        this.props.preHotelSearch()
    }

    render() {     
        
        console.log('this.state', this.state)

        //уникализируем массив типов комнат
        const arr1 = []
        this.props.hotelData.rooms.forEach(item => {
            arr1.push(item.internalTypeId)       
        })
        const arrayRoomsTmp = new Set(arr1)
        const arrayRooms = [...arrayRoomsTmp].sort()
        // eslint-disable-next-line
        arrayRooms.map(item => {
            console.log(item, this.props.hotelData.rooms.filter(room => room.internalTypeId === item))
        })

        return (                       
            <div>
            <h4>{this.props.hotelData.name}{ this.props.hotelData.stars > 0 && <span className = {`hotel-class hotel-class_${this.props.hotelData.stars}`}></span> }</h4>
            <div className="gallery">
                <div className="col-md-12 col-12">
                    <Gallery photosHotel = {this.state.photosHotel} hotelId={this.props.hotelData.id}/>
                </div>
            </div>

            { arrayRooms.map((item ,idx) => {                     
                   return (
                    <div className="proposalsList" key={idx}>                        
                        <h4 style={{borderBottom: "1px solid #eee"}}>{ hotelInternalType(this.props.language, item)}</h4> 
                        { this.props.hotelData.rooms.filter(room => room.internalTypeId === item).map((room, index) => {
                                return (
                                    <div key={index} className="row">
                                        <div className="col-md-2 col-12">
                                            <div className="hotelPopupCard">
                                                <img src={`http://pics.avs.io/hl_gates/100/50/${room.agencyId}.png`}
                                                alt={room.agencyName}
                                                />                              
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12" style={{paddingTop: '10px', textAlign: 'left'}}>
                                            <span>
                                                {
                                                Object.entries(room.options).filter(([i, option]) => option !== false).map(([i, option]) => {
                                                    return (
                                                        <span key={i} className="hotelInternalType">{hotelGateProposalsTranslate(i, this.props.language)} </span> 
                                                    )
                                                })
                                                }
                                            </span>                                            
                                        </div>
                                        <div className="col-md-2 col-12" style={{paddingTop: 10}}>
                                            <span>
                                                {getPrice(room.total, this.props.currency)}
                                            </span>                                             
                                        </div>
                                        <div className="col-md-2 col-12"> 
                                            { this.props.hotelSearchId === '' && 
                                                <button className="btn btn-danger btn-sm" onClick={ this.refreshSearch } style={{marginTop: 20}}>Обновить</button>
                                            }
                                            { this.props.hotelSearchId !== '' && 
                                                <a className="btn btn-btn btn-warning btn-sm"  
                                                    href={room.fullBookingURL}  
                                                    rel="noopener noreferrer"
                                                    target="_blank">
                                                    Бронировать                                                
                                                </a>
                                            } 
                                        </div>
                                    </div>
                                )
                            })                        
                        }
                    </div>
                   )
                })

            }  
            <h4>{this.props.hotelData.name} на карте</h4>
                <div style={{marginBottom: 15}}>
                    <HotelMap lat={this.props.hotelData.location.lat} lon ={this.props.hotelData.location.lon} hotelName = {this.props.hotelData.name} />
                </div>
                
            </div>
        )
    }
}

// {option.toString()}

HotelCardTemplate.propTypes = {
    hotelData: PropTypes.object.isRequired   
}

const mapStateToProps = state => ({  
    language: state.UI.language.toLowerCase(),
    currency: state.UI.currency,
    hotelSearchId: state.data.hotelParams.hotelSearchId   
})

const mapDispatchToProps = { preHotelSearch }

export default connect(mapStateToProps, mapDispatchToProps )(HotelCardTemplate)
