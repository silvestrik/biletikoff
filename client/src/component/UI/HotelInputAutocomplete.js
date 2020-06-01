import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { autocompletePlaceOrHotel } from '../../redux/actions/dataActions' 
import { getHotelAutocomplete } from '../../function/hotelAutocomplete'

class HotelnputAutocomplete extends Component {

    constructor(props) {
        super(props)       
        this.state = {      
            cityData: [],
            label: this.props.label,       
            activeCity: 0,         
            showCityList: false,
            userInput: ""
        }
        this.cityInput = React.createRef() 
    } 

    componentDidMount(){
        if(localStorage.hasOwnProperty('hotelData')){  
            let hotelParams = localStorage.getItem('hotelData')            
            const cityDataStorage = JSON.parse(hotelParams).cityOrHotelData 
            //console.log(cityDataStorage)
            this.setState({
                userInput: cityDataStorage.cityName ? cityDataStorage.cityName : cityDataStorage.label
            })
            this.props.autocompletePlaceOrHotel(cityDataStorage)
        }
    }
  
    // выбор всего в поле    
    handleFocus = (event) => event.target.select()  

    onChange = e => {
        const userInput = e.target.value
        this.setState({
            userInput: userInput
        })
        if(userInput.length>1) {
            getHotelAutocomplete(userInput)
            .then( response => { 
                //console.log(response.data.results.locations) 
                //console.log(response.data.results.hotels)             
                this.setState({
                    activeCity: 0,                  
                    showCityList: true,
                    showHotelList: true,
                    userInput,
                    cityData: response.data.results.locations,
                    hotelData: response.data.results.hotels
                })               
            })            
            .catch(error=> {
                console.error(error)
            })
        }        
    }    

    onClick = (event, cityTitle, cityData) => {         
        this.setState({
            city: cityTitle,
            activeCity: 0, 
            showCityList: false,            
            userInput: cityTitle
        })
        this.props.autocompletePlaceOrHotel(JSON.parse(`${cityData}`)) 
    }

    onKeyDown = e => {
        const { activeCity, cityData } = this.state        
        if (e.keyCode === 13) { 
                if(cityData[activeCity]) {
                    const cityTitle = cityData[activeCity].name               
                    this.setState({
                        activeCity: 0,
                        showCityList: false,
                        userInput: cityTitle,
                        city: cityTitle,
                    })
                    this.props.autocompletePlaceOrHotel(cityData[activeCity])  
                }
          } else if (e.keyCode === 38) {               
                    if (activeCity === 0) {
                    return
                }      
                this.setState({ activeCity: activeCity - 1 })
          }  else if (e.keyCode === 40) {                
                    if (activeCity - 1 === cityData.length) {
                    return
                }      
                this.setState({ activeCity: activeCity + 1 })
          }
    }

    render() {
        
        const { 
            onChange, onClick, onKeyDown,
            state: {
                userInput, showCityList, activeCity
            }
         } = this

        let cityListComponent
        let hotelListComponent
        
        if(this.state.cityData && this.state.cityData.length>0 && showCityList) {
            cityListComponent = (
            <ul className="cityList" >
                <span style={{fontSize: 14}}>Города</span>
                {    // eslint-disable-next-line    
                    this.state.cityData.length && this.state.cityData.map((item, index) => { 
                        if(index <= 4) {
                            let className
                            if (index === activeCity) {
                                className = "cityList-active";
                            }                  
                            return (                                  
                                <li className={className}
                                    key = {index}                                   
                                    name = {item.cityName}
                                    value = {JSON.stringify(item)}
                                    onClick = {e => onClick(e, item.cityName, JSON.stringify(item))} 
                                >
                                <span className="autocompleteCity">{item.cityName}</span> ({item.countryName})<br/>
                                <span className="autocompleteCountry"><span>{item._score} отелей</span></span>
                                </li>
                            )   
                        } 
                    })                                    
                }
                <span style={{fontSize: 14}}>Отели</span>
                {    // eslint-disable-next-line    
                    this.state.hotelData.length>0 && this.state.hotelData.map((item, index) => { 
                        if(index <= 4) {
                            let className
                            if (index === activeCity) {
                                className = "cityList-active";
                            }                  
                            return (                                  
                                <li className={className}
                                    key = {index}                                   
                                    name = {item.fullName}
                                    value = {JSON.stringify(item)}
                                    onClick = {e => onClick(e, item.fullName, JSON.stringify(item))} 
                                >
                                <span className="autocompleteCity">{item.label}</span><br/>
                                <span className="autocompleteCountry">{item.locationName}</span>
                                </li>
                            )   
                        } 
                    })                                    
                }
            </ul>
            )
        } 
      
        return (
            <>  
            <label htmlFor="city" className="searchFormLabel">Куда вы отправляетесь?</label>
            <input
                className="form-control" 
                autoComplete="off"
                placeholder="Город, место или отель"
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={this.handleFocus}
                value={userInput}
                ref={this.cityInput}                
            />
            {cityListComponent}
            {hotelListComponent}
            </>
        )
    }
}

HotelnputAutocomplete.propTypes = {   
    autocompletePlaceOrHotel: propTypes.func.isRequired   
}

const mapStateToProps = state => ({
    data: state.data.hotelParams
})

const mapDispatchToProps = { autocompletePlaceOrHotel }
export default connect(mapStateToProps, mapDispatchToProps)(HotelnputAutocomplete)
