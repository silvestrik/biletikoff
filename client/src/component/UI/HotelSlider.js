import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//action
import { filterHotelSlider } from '../../redux/actions/dataActions'
//slider
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import TimeSlider from 'rc-slider'
const createSliderWithTooltip = TimeSlider.createSliderWithTooltip
const Range = createSliderWithTooltip(TimeSlider.Range)

class HotelSlider extends Component {

    handlerChange = sliderValues => {  
        this.props.filterHotelSlider(sliderValues[0], sliderValues[1], this.props.code) 
    }

    render() {
        return (
            <div className="sidebar_block">
                <h4>{this.props.name}</h4>
                <div>
                <p style={{fontSize: "12px"}}> {this.props.sliderValues[0]} - {this.props.sliderValues[1]}</p>                                
                <div style={{padding: 10}}>
                    <Range
                        min={this.props.sliderValues[0]}
                        max={this.props.sliderValues[1]}
                        step={0.1} 
                        onAfterChange={this.handlerChange}                            
                        defaultValue={this.props.defaultSliderValues}                       
                        tipFormatter = {value => value }
                    /> 
                </div> 
                </div>
            </div>
        )
    }
}


HotelSlider.propTypes = {
    filterHotelSlider: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {filterHotelSlider}

export default connect(mapStateToProps, mapDispatchToProps)(HotelSlider)
