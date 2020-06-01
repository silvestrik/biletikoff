import React, { Component } from 'react'
import PropTypes from 'prop-types'
//redux
import { connect } from 'react-redux'
//авиа - контейнер с формой поиска и результами 
import AviaContainer from '../container/AviaContainer'
//отели - контейнер с формой поиска и результами
import HotelContainer from '../container/HotelContainer'
import { getCurrencyRate } from '../redux/actions/dataActions'


class  Search extends Component {    
    constructor(props) {        
        super(props)
        this.state = {          
            proposalsLength: 0,
            loading: false,            
            allChecked: true,
            // tabAvia: {
            //     style: {background: '#036', color: '#fff'},
            //     showIndex: {display: 'block'}
            // },
            // tabHotel: {
            //     style: {background: '#fff', color: '#036'},
            //     showIndex: {display: 'none'}
            // }
            tabHotel: {
                style: {background: '#036', color: '#fff'},
                showIndex: {display: 'block'}
            },
            tabAvia: {
                style: {background: '#fff', color: '#036'},
                showIndex: {display: 'none'}
            }
        } 
    } 
    
    componentDidMount() {
        this.props.getCurrencyRate()
    }

    handlerTab = (e, name) => {
        console.log(name)
        if(name==='avia') {
            this.setState({
                tabAvia: {
                    style: {background: '#036', color: '#fff'},
                    showIndex: {display: 'block'}
                },
                tabHotel: {
                    style: {background: '#fff', color: '#036'},
                    showIndex: {display: 'none'}
                }
            })
        } else {
            this.setState({
                tabHotel: {
                    style: {background: '#036', color: '#fff'},
                    showIndex: {display: 'block'}
                },
                tabAvia: {
                    style: {background: '#fff', color: '#036'},
                    showIndex: {display: 'none'}
                }
            })
        } 
    } 

    render () {  
        if(this.props.ticketsLength && this.props.ticketsLength > 0) {
            var divStyle = {paddingTop: "48px"}
        }    
        return (            
            <div className="col-md-12" style={{padding: "0 15px 0 15px", minHeight: 500 }}>
            
                <nav className="nav-top" style={divStyle}>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <span                         
                            className="nav-item nav-link"
                            style={this.state.tabAvia.style}                        
                            onClick={e => this.handlerTab(e, 'avia')}
                            >
                            Авиабилеты
                        </span>
                        <span 
                            className="nav-item nav-link"  
                            style={this.state.tabHotel.style}
                            onClick={e => this.handlerTab(e, 'hotel')}
                            >
                            Отели
                        </span>
                    </div>
                </nav>
                <div>
                    <div style = {this.state.tabAvia.showIndex} >                    
                        <AviaContainer/> 
                    </div>
                    <div style = {this.state.tabHotel.showIndex}>
                        <HotelContainer/> 
                    </div>
                </div>                
                               
            </div>                        
        )
    }    
}

Search.propTypes = {      
    // currencies: PropTypes.object,  
    // loading: PropTypes.bool,
    ticketsLength: PropTypes.number,
    getCurrencyRate: PropTypes.func.isRequired 
}

const mapStateToProps = state => ({ 
    ticketsLength: state.data.ticketsLength, 
    language: state.UI.language
})

const mapDispatchToProps = { getCurrencyRate  }

export default connect(mapStateToProps, mapDispatchToProps)(Search)
