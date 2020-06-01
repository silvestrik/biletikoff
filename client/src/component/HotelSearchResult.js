import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { preHotelSearch } from '../redux/actions/dataActions'
import HotelListTemplate from '../component/HotelListTemplate'
import HotelListSkeleton from '../component/HotelListSkeleton'

class HotelSearchResult extends Component {

   constructor(props) {
       super(props)
        this.state = {
            hotelsLength: 0,
            i: 1,
            limit: 10,
            hotels_limit: 10
        }
   } 

   //вывод отелей порциями
   moreHotels = event => {            
        const i = this.state.i        
        this.setState({
            i: i+1           
        })
        const hotels_limit = 10 + i*this.state.limit   
        console.log(hotels_limit) 
        this.setState({
            hotels_limit: hotels_limit
        })        
    }

    // обновить поиск
    refreshSearch  = event => {
        event.preventDefault()
        this.props.preHotelSearch()
    }


    render() {
        return (
            <div>
                {this.props.hotelSearchId === '' &&                       
                    <div style={{textAlign: "center"}} className="alert alert-warning" role="alert">
                        Увы, но данные устарели
                        <button 
                            type="button" 
                            className="btn btn-link" 
                            data-toggle="button" 
                            aria-pressed="false"
                            onClick = { this.refreshSearch }
                        >
                            Обновить поиск
                        </button>
                    </div>                        
                }
                { this.props.hotelsFilteredLength === 0 && this.props.hotelsLength > 0 &&
                    <div style={{textAlign: "center"}} className="alert alert-success" role="alert">
                        Вариантов не осталось, смягчите фильтры
                    </div>
                }
                { this.props.loadingHotel === true &&  this.props.hotelsLength === 0 &&
                    <HotelListSkeleton/>
                }
                { this.props.hotelFilteredData && this.props.hotelsLength > 0 &&
                    this.props.hotelFilteredData.filter((item, index) => index < this.state.hotels_limit).map(hotel => <HotelListTemplate key={hotel.id} hotel={hotel} />)                
                }
                { this.props.hotelsFilteredLength > 10 && this.props.searchHotelStatus === false && 
                    <button className="btn btn-info" style={{width: "100%", marginBottom: "15px"}} onClick={this.moreHotels}>Показать еще</button>
                }
            </div>
        )
    }
}

HotelSearchResult.propTypes = {
    //hotelData: PropTypes.object,   
    //hotelFilteredData: PropTypes.object, 
    hotelsLength: PropTypes.number.isRequired,    
    loadingHotel: PropTypes.bool.isRequired,
    preHotelSearch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    hotelData: state.data.hotelParams.hotelData,
    hotelFilteredData: state.data.hotelParams.hotelFilteredData,
    hotelsLength: state.data.hotelParams.hotelsLength,
    hotelsFilteredLength: state.data.hotelParams.hotelsFilteredLength,
    searchHotelStatus: state.data.hotelParams.searchHotelStatus,
    hotelSearchId: state.data.hotelParams.hotelSearchId,
    loadingHotel: state.data.hotelParams.loadingHotel
})

const mapDispatchToProps = { preHotelSearch }

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResult)
