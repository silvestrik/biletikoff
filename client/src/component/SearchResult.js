import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TicketTemplate from './TicketTemplate'
import { preSimpleSearch } from '../redux/actions/dataActions'
import TicketSkeleton from '../component/TicketSkeleton'

class SearchResult extends Component {

    constructor (props) {
        super(props)  
        this.state = {
            ticketsLength: 0,
            i: 1,
            limit: 10,
            tickets_limit: 10
        }      
    }

    //вывод билетов порциями
    moreTickets = event => {            
        const i = this.state.i        
        this.setState({
            i: i+1           
        })
        const tickets_limit = 10 + i*this.state.limit   
        console.log(tickets_limit) 
        this.setState({
            tickets_limit: tickets_limit
        })        
    }

    // обновить поиск
    refreshSearch  = event => {
        event.preventDefault()
        this.props.preSimpleSearch()
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
                { this.props.filteredArrayLengthStatus &&                 
                <div style={{textAlign: "center"}} className="alert alert-success" role="alert">
                    Вариантов не осталось, смягчите фильтры
                </div>
                }                 
                { this.props.loading === true &&  this.props.ticketsLength === 0 &&
                    <TicketSkeleton/>
                }
                { this.props.cheapets[0] && this.props.filtered && this.props.filteredLength > 0 &&
                  this.props.cheapets.map(ticket => <TicketTemplate key={ticket.index} ticket={ticket} type="cheapets"/>)
                }
                { this.props.fastest[0] && this.props.filtered && this.props.filteredLength > 0 &&
                  this.props.fastest.map(ticket => <TicketTemplate key={ticket.index} ticket={ticket} type="fastest" />)
                }
                { this.props.filtered && this.props.ticketsLength > 0 &&
                    this.props.filtered.filter((item, index) => index < this.state.tickets_limit).map(ticket => <TicketTemplate key={ticket.index} ticket={ticket} />)                
                }   
                { this.props.filteredLength > 10 && !this.props.searchStatus &&
                    <button className="btn btn-info" style={{width: "100%", marginBottom: "15px"}} onClick={this.moreTickets}>Показать еще</button>
                }
            </div>                          
        )
    }
}

SearchResult.propTypes =  {
    tickets: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
    cheapets: PropTypes.array.isRequired,
    fastest: PropTypes.array.isRequired,
    ticketsLength: PropTypes.number,
    filteredLength: PropTypes.number,
    fetchProcess: PropTypes.bool,
    moreTickets: PropTypes.func,
    preSimpleSearch: PropTypes.func
}

const mapStateToProps = state => ({
    tickets: state.data.tickets,
    filtered: state.data.filtered,
    cheapets: state.data.cheapets,
    fastest: state.data.fastest,
    ticketsLength: state.data.ticketsLength,
    filteredLength: state.data.filteredLength,
    fetchProcess: state.data.fetchProcess,
    moreTickets: state.data.moreTickets,    
    filteredArrayLengthStatus: state.data.filteredArrayLengthStatus,
    searchStatus: state.data.searchStatus,
    search_id: state.data.search_id,
    loading: state.data.loading,
})

const mapDispatchToProps = { preSimpleSearch }

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)
