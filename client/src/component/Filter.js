import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formatStops, formatAirlines, formatPaymentsMethod, formatBaggage} from '../function/formatData'
import { changeFilters } from '../redux/actions/dataActions'
import { filterChangeArrDepTime} from '../redux/actions/dataActions'
import Checkbox from './UI/Checkbox'
import Slider from './UI/Slider'

class Filter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            airlineLimit: 5,
            payMethodsLimit: 5,          
            airlineBtnStyle: {display: 'block'},
            payMethodsBtnStyle: {display: 'block'}           
        }
        this.checkBoxHandler = this.checkBoxHandler.bind(this)    
    }

    // показать все авиакомпании
    moreAirlines = () => {
        this.setState({
            airlineLimit: 15,
            airlineBtnStyle: {display: 'none'}
        })
    }
    // показать все способы оплаты
    morePayMethods = () => {
        this.setState({
            payMethodsLimit: 15,
            payMethodsBtnStyle: {display: 'none'}
        })
    }

    checkBoxHandler = e => {     
        this.props.changeFilters(e.target.name, e.target.value)
    }

    render() {       
        return (
            <>
                { this.props.tickets.length>0 && 
                    <div className="filter">
                        {this.props.filters && this.props.filters.stops.length>0 && 
                            <Checkbox
                                checkBoxTitle="Пересадки"
                                checkBoxPrefix="stops"
                                handler = {formatStops}                  
                                data = {this.props.filters.stops}
                            />
                        }       
                        {this.props.filters && this.props.filters.airlines.length>0 && 
                            <div style={{marginBottom: "10px"}}>
                                <Checkbox
                                    checkBoxTitle="Авиакомпании"
                                    checkBoxPrefix="airlines"
                                    handler = {formatAirlines}
                                    data = {this.props.filters.airlines}
                                    subData = {true}
                                />
                            </div>
                        }            
                        {this.props.filters && this.props.filters.payTypes.length>0 && 
                            <div style={{marginBottom: "10px"}}>
                                <Checkbox
                                    checkBoxTitle="Способы оплаты"
                                    checkBoxPrefix="paymentMethods"
                                    handler = {formatPaymentsMethod}
                                    data = {this.props.filters.payTypes}
                                />
                            </div>
                        }
                        {this.props.filters && this.props.filters.baggage.length>0 &&
                            <div style={{marginBottom: "10px"}}> 
                                <Checkbox
                                    checkBoxTitle="Багаж"
                                    checkBoxPrefix="arrayBaggage"
                                    handler = {formatBaggage}
                                    data = {this.props.filters.baggage}
                                />
                            </div>
                        }
                        {this.props.filters && this.props.filters.handbags.length>0 && 
                            <div style={{marginBottom: "10px"}}>
                                <Checkbox
                                    checkBoxTitle="Ручная кладь"
                                    checkBoxPrefix="arrayHandbags"
                                    handler = {formatBaggage}
                                    data = {this.props.filters.handbags}
                                />
                            </div>
                        }
                        { this.props.tickets.length>0 && 
                            <div style={{marginBottom: "10px"}}>
                                <Slider
                                    name="Время вылета" 
                                    codeOne="sliderOneValues" 
                                    codeTwo="sliderTwoValues"
                                    defaultSliderValues = {[ 0, 1440]} 
                                    sliderValues = {[ 0, 1440]}   
                                    type="fixedDefaultValue"
                                    combackRule = {this.props.oneway !==true && this.props.combackDate !== null && this.props.combackDate !== ''}
                                />                   
                            </div>
                        }
                        { this.props.tickets.length>0 && this.props.filters.arrayDurations && this.props.filters.arrayDurations.length>0 
                            && !this.props.searchStatus &&
                            <div style={{marginBottom: "10px"}}>
                                <Slider
                                    name="Время полета" 
                                    codeOne="sliderFiveValues" 
                                    codeTwo="sliderSixValues"
                                    defaultSliderValues = {[ this.props.filters.arrayDurations[0], this.props.filters.arrayDurations[1]]} 
                                    sliderValues = {[ this.props.filters.arrayDurations[0], this.props.filters.arrayDurations[1]]}   
                                    type="dynamicDefaultValue"
                                    combackRule={this.props.filters.arrayDurationsComback && this.props.filters.arrayDurationsComback.length>0 && 
                                    !this.props.searchStatus}
                                />                   
                            </div>
                        }
                        { this.props.tickets.length>0 && this.props.filters.arrayDelays && this.props.filters.arrayDelays.length>0 
                        && !this.props.searchStatus &&
                            <div style={{marginBottom: "10px"}}>
                                <Slider
                                    name="Время пересадок" 
                                    codeOne="sliderThreeValues" 
                                    codeTwo="sliderFourValues"
                                    defaultSliderValues = {[ this.props.filters.arrayDelays[0], this.props.filters.arrayDelays[1]]} 
                                    sliderValues = {[ this.props.filters.arrayDelays[0], this.props.filters.arrayDelays[1]]}   
                                    type="dynamicDefaultValue"
                                    combackRule={this.props.filters.arrayDelaysComback && this.props.filters.arrayDelaysComback.length>0
                                    && !this.props.searchStatus}
                                />                   
                            </div>
                        } 
                </div>
            }
           </>
        )        
    }       
}

Filter.propTypes = {
    filters: PropTypes.object,
    filterBuild: PropTypes.func,
    changeFilters: PropTypes.func,
    filterChangeArrDepTime: PropTypes.func   
}

const mapStateToProps = state => ({
    filters: state.data.filters,
    oneway: state.UI.oneway,
    tickets: state.data.tickets,
    combackDate: state.data.simpleFormParams.segments.combackDate,
    searchStatus: state.data.searchStatus
})

const mapDispatchToProps = {changeFilters, filterChangeArrDepTime}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
