import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HotelCheckbox from '../component/UI/HotelCheckbox'
import HotelSlider from './UI/HotelSlider'
import { hotelSort } from '../redux/actions/dataActions'

class HotelFilter extends Component {

    checkBoxHandler = e => {     
        this.props.changeFilters(e.target.name, e.target.value)
    }

    sortHandler = event => {
        [event.target.name] = event.target.value
        //console.log(event.target.value)
        this.props.hotelSort(event.target.value)
    }

    render() {
        return (
            <>
            { this.props.hotelsLength >0 &&  
                <>  
                <div className="filter">
                <div style={{padding: 10}}>
                    <h4 style={{fontSize: '1.2rem'}}>Сортировка</h4>
                    <select 
                        className="form-control"                            
                        name="tripClass"                        
                        onChange={this.sortHandler}>
                        <option value="rating">Рейтинг</option>
                        <option value="price">Цена</option>                        
                        <option value="name">Название</option>
                        <option value="distance">Расстояние от центра</option> 
                        <option value="stars">Класс</option> 
                        <option value="popularity">Популярность</option>                                        
                    </select>
                </div>
                {this.props.hotelFilters.arrayMinMaxTotalPrice &&
                    <div style={{marginBottom: "10px"}}>
                    <HotelSlider
                        name="Стоимость" 
                        code="sliderPrice"                         
                        defaultSliderValues = {[ this.props.hotelFilters.arrayMinMaxTotalPrice[0], this.props.hotelFilters.arrayMinMaxTotalPrice[1]]} 
                        sliderValues = {[ this.props.hotelFilters.arrayMinMaxTotalPrice[0], this.props.hotelFilters.arrayMinMaxTotalPrice[1]]}
                    />                   
                    </div>
                }
                {this.props.hotelFilters.arrayDistanseMinMax &&            
                    <div style={{marginBottom: "10px"}}>
                    <HotelSlider
                        name="Расстояние от центра, км" 
                        code="sliderDistance"                         
                        defaultSliderValues = {[ this.props.hotelFilters.arrayDistanseMinMax[0], this.props.hotelFilters.arrayDistanseMinMax[1]]} 
                        sliderValues = {[ this.props.hotelFilters.arrayDistanseMinMax[0], this.props.hotelFilters.arrayDistanseMinMax[1]]}
                    />                   
                    </div>
                }
                {this.props.hotelFilters.arrayRatingMinMax &&    
                <div style={{marginBottom: "10px"}}>
                <HotelSlider
                    name="Рейтинг" 
                    code="sliderRating"                         
                    defaultSliderValues = {[ this.props.hotelFilters.arrayRatingMinMax[0], this.props.hotelFilters.arrayRatingMinMax[1]]} 
                    sliderValues = {[ this.props.hotelFilters.arrayRatingMinMax[0], this.props.hotelFilters.arrayRatingMinMax[1]]}
                />                   
                </div>
                }  
                {this.props.hotelFilters && this.props.hotelFilters.stars && 
                    <HotelCheckbox
                        checkBoxTitle="Класс"
                        checkBoxPrefix="stars"
                        data = {this.props.hotelFilters.stars}
                    />
                }
                {this.props.hotelFilters && this.props.hotelFilters.amenities && 
                    <HotelCheckbox
                        checkBoxTitle="Удобства"
                        checkBoxPrefix="amenities"
                        data = {this.props.hotelFilters.amenities}
                    />
                }                    
                {this.props.hotelFilters && this.props.hotelFilters.agencies && 
                    <HotelCheckbox
                        checkBoxTitle="Предложения"
                        checkBoxPrefix="agencies"
                        data = {this.props.hotelFilters.agencies}
                    />
                }
                </div>
                </>           
            }                
            </>
        )
    }
}

HotelFilter.propTypes = {
    hotelFilters: PropTypes.object.isRequired,
    hotelsLength: PropTypes.number.isRequired,
    hotelSort: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    hotelFilters: state.data.hotelParams.hotelFilters,
    hotelsLength: state.data.hotelParams.hotelsLength,
    lengthOfStay: state.data.hotelParams.formData.lengthOfStay,
    currency: state.UI.currency
})

const mapDispatchToProps = {hotelSort}

export default connect (mapStateToProps, mapDispatchToProps)(HotelFilter)
