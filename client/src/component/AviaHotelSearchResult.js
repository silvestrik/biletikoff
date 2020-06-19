import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { preSimpleSearch, preHotelSearch } from '../redux/actions/dataActions'
import TicketTemplate from './TicketTemplate'
import TicketSkeleton from '../component/TicketSkeleton'
import FilterSkeleton from './FilterSkeleton'
import { sortHotels } from '../function/sortHotels'
import HotelListTemplate from './HotelListTemplate'

class AviaHotelSearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ticketsLength: 0
        }
    }

    // обновить поиск
    refreshSearch  = event => {
        event.preventDefault()
        this.props.preSimpleSearch()
        this.props.preHotelSearch()
    }

    render() {       
        return (
            <div>                
                {this.props.search_id === '' &&                       
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
                <div className="row">                    
                    <div className="col-md-3 col-lg-3 col-xl-3 d-none d-sm-none d-md-block" style={{paddingRight: 0}}>
                        { this.props.loading === true &&  this.props.ticketsLength === 0 &&
                            <FilterSkeleton/>                           
                        }
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12">        
                        { this.props.loading === true &&  this.props.ticketsLength === 0 &&
                            <TicketSkeleton/>
                        }
                        { this.props.cheapets[0] && this.props.filtered && this.props.filteredLength > 0 &&
                            this.props.cheapets.map(ticket => <TicketTemplate key={ticket.index} ticket={ticket} type="cheapets"/>)
                        }
                        { this.props.fastest[0] && this.props.filtered && this.props.filteredLength > 0 &&
                            this.props.fastest.map(ticket => <TicketTemplate key={ticket.index} ticket={ticket} type="fastest" />)
                        }

                        {/* { this.props.hotelFilteredData && this.props.hotelsLength > 0 &&
                            <HotelListTemplate hotel={sortHotels(this.props.hotelFilteredData, 'price')[0]} />              
                        } */}

                    </div> 
                </div>                
            </div>
        )
    }
}

AviaHotelSearchResult.propsTypes = {
    cheapets: PropTypes.array.isRequired,
    fastest: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
    filteredLength: PropTypes.number
}

const mapStateToProps = state => ({
    filtered: state.data.filtered,
    cheapets: state.data.cheapets,
    fastest: state.data.fastest,
    ticketsLength: state.data.ticketsLength,
    filteredLength: state.data.filteredLength,
    searchStatus: state.data.searchStatus,
    search_id: state.data.search_id,
    loading: state.data.loading,
    hotelData: state.data.hotelParams.hotelData,
    hotelFilteredData: state.data.hotelParams.hotelFilteredData,
    hotelsLength: state.data.hotelParams.hotelsLength,
})

const mapDispatchToProps = { preSimpleSearch, preHotelSearch }
export default connect(mapStateToProps, mapDispatchToProps)(AviaHotelSearchResult)
