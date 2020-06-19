import React, { Component } from 'react'
import AviaHotelSearchForm from '../component/AviaHotelSearchForm'
import { connect } from  'react-redux'
import AviaHotelSearchResult from '../component/AviaHotelSearchResult'

class AviaHotelContainer extends Component {
    render() {
        return (
            <div>
                <form className="searchFormHeader" style={{paddingTop: '8px'}}> 
                    <AviaHotelSearchForm/>
                </form>
                <div style={{marginTop: 20}}>
                    <AviaHotelSearchResult/>                
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AviaHotelContainer)
