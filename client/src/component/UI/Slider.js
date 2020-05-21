import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { filterChangeArrDepTime } from '../../redux/actions/dataActions'

//slider
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import TimeSlider from 'rc-slider'
const createSliderWithTooltip = TimeSlider.createSliderWithTooltip
const Range = createSliderWithTooltip(TimeSlider.Range)

class Slider extends Component {

    //конвертируем время для фильтра и отображения в формате 00:00:00
    convertTime = value => {
        var hours = Math.floor(value / 60)
        var minutes = value - (hours * 60)           
        if (hours.toString().length === 1) hours = '0' + hours
        if (minutes.toString().length === 1) minutes = '0' + minutes
        if (minutes === 0) minutes = '00'
        let timeStr = hours +':' + minutes
        return timeStr
    }

    // slider время полета обратно
    handleChangeOne = sliderValues => {        
        const timeFromDep = sliderValues[0]
        const timeFromArr = sliderValues[1]
        const timeFromDepConvert = this.convertTime(timeFromDep)
        const timeFromArrConvert = this.convertTime(timeFromArr)        
        const f1=timeFromDepConvert.split(':');
        const t1=timeFromArrConvert.split(':')
        const fromTime = f1[0]*60*60 + f1[1]*60
        const toTime = t1[0]*60*60 + t1[1]*60
        this.setState({ sliderValues })        
        if(this.props.type === "fixedDefaultValue" ) {           
            this.props.filterChangeArrDepTime(this.props.codeOne, fromTime, toTime)          
        } else if(this.props.type === "dynamicDefaultValue") {
            this.props.filterChangeArrDepTime(this.props.codeOne, timeFromDep, timeFromArr)
        }
    }

    handleChangeTwo = sliderValues => {        
        const timeFromDep = sliderValues[0]
        const timeFromArr = sliderValues[1]
        const timeFromDepConvert = this.convertTime(timeFromDep)
        const timeFromArrConvert = this.convertTime(timeFromArr)        
        const f1=timeFromDepConvert.split(':');
        const t1=timeFromArrConvert.split(':')
        const fromTime = f1[0]*60*60 + f1[1]*60
        const toTime = t1[0]*60*60 + t1[1]*60
        this.setState({ sliderValues })        
        if(this.props.type === "fixedDefaultValue" ) {           
            this.props.filterChangeArrDepTime(this.props.codeTwo, fromTime, toTime)          
        } else if(this.props.type === "dynamicDefaultValue") {
            this.props.filterChangeArrDepTime(this.props.codeTwo, timeFromDep, timeFromArr)
        }
    }

    render() {
        return (
            <div className="sidebar_block">
                <h4>{this.props.name}</h4>
                <div>
                <p style={{fontSize: "12px"}}><span className="segment-head">Туда </span> {this.convertTime(this.props.sliderValues[0])} - {this.convertTime(this.props.sliderValues[1])}</p>                                
                <div style={{padding: 10}}>
                    <Range
                        min={this.props.sliderValues[0]}
                        max={this.props.sliderValues[1]}
                        step={1} 
                        onAfterChange={this.handleChangeOne}                            
                        defaultValue={this.props.defaultSliderValues}                       
                        tipFormatter = {value => `${this.convertTime(value)}`}
                    /> 
                </div>                        
                { !this.props.oneway &&
                <div style={{marginTop: 10}}>                   
                    <p style={{fontSize: "12px"}}><span className="segment-head">Обратно </span> {this.convertTime(this.props.sliderValues[0])} - {this.convertTime(this.props.sliderValues[1])}</p>                
                    <div style={{padding: 5}}>
                        <Range
                            min={this.props.sliderValues[0]}
                            max={this.props.sliderValues[1]}
                            step={1} 
                            onAfterChange={this.handleChangeTwo}
                            defaultValue={this.props.defaultSliderValues}                       
                            tipFormatter = {value => `${this.convertTime(value)}`}
                        />
                    </div>
                </div>                           
                }
                </div>
            </div>
        )
    }
}

Slider.propTypes = {
    filters: PropTypes.object,
    filterBuild: PropTypes.func,  
    filterChangeArrDepTime: PropTypes.func
}

const mapStateToProps = state => ({
    filters: state.data.filters,  
    tickets: state.data.tickets,
    oneway: state.UI.oneway,
    combackDate: state.data.simpleFormParams.segments.combackDate,
    searchStatus: state.data.searchStatus
})

const mapDispatchToProps = { filterChangeArrDepTime }

export default connect(mapStateToProps, mapDispatchToProps)(Slider)
